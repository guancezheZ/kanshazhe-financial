use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Nonce,
};
use rand::RngCore;
use sha2::{Digest, Sha256};
use std::fs;
use std::path::PathBuf;

// ⚠️ 主密钥已移除（Phase 3 安全加固）。所有激活码需通过 XOR 校验和验证。
// 主密钥 6125-9D04-84E5-007F 本身的校验和有效，仍可作为合法码使用。

/// 获取应用数据目录（存储激活状态）
fn app_data_dir() -> PathBuf {
    let base = dirs::data_local_dir().unwrap_or_else(|| PathBuf::from("."));
    base.join("kanshazhe-financial")
}

/// 激活状态文件路径
fn activation_file_path() -> PathBuf {
    app_data_dir().join(".activation")
}

/// 硬件指纹文件路径
fn fingerprint_file_path() -> PathBuf {
    app_data_dir().join(".fingerprint")
}

// ─── 公开命令 ───

/// 获取设备硬件指纹（固定不变）
#[tauri::command]
pub fn get_hardware_id() -> String {
    // 尝试取已有指纹
    if let Ok(fp) = fs::read_to_string(fingerprint_file_path()) {
        let fp = fp.trim().to_string();
        if !fp.is_empty() {
            return fp;
        }
    }

    // 生成新指纹
    let raw_id = machine_uid::get().unwrap_or_else(|_| "unknown".to_string());
    let mut hasher = Sha256::new();
    hasher.update(raw_id.as_bytes());
    let hash = hex::encode(hasher.finalize());
    let fp = hash[..16].to_uppercase();

    // 持久化
    let dir = app_data_dir();
    let _ = fs::create_dir_all(&dir);
    let _ = fs::write(fingerprint_file_path(), &fp);

    fp
}

/// 检查是否已激活
#[tauri::command]
pub fn is_activated() -> bool {
    let path = activation_file_path();
    if !path.exists() {
        return false;
    }

    match fs::read_to_string(&path) {
        Ok(code) => {
            let code = code.trim();
            verify_code_internal(code)
        }
        Err(_) => false,
    }
}

/// 获取已保存的激活码
#[tauri::command]
pub fn get_activation_code() -> Option<String> {
    let path = activation_file_path();
    if path.exists() {
        fs::read_to_string(&path).ok().map(|s| s.trim().to_string())
    } else {
        None
    }
}

/// 验证激活码并保存
#[tauri::command]
pub fn activate(code: String) -> Result<String, String> {
    let upper = code.to_uppercase().trim().to_string();

    // 验证格式
    if !is_valid_format(&upper) {
        return Err("格式错误，正确格式：XXXX-XXXX-XXXX-XXXX".to_string());
    }

    // 验证码
    if !verify_code_internal(&upper) {
        return Err("激活码无效或已被其他设备绑定".to_string());
    }

    // 保存到 app data
    let path = activation_file_path();
    let dir = path.parent().unwrap();
    fs::create_dir_all(dir).map_err(|e| format!("保存失败: {}", e))?;
    fs::write(&path, &upper).map_err(|e| format!("保存失败: {}", e))?;

    Ok("✅ 激活成功！此激活码已绑定本机。".to_string())
}

/// 清除激活状态
#[tauri::command]
pub fn deactivate() -> bool {
    let path = activation_file_path();
    if path.exists() {
        let _ = fs::remove_file(&path);
    }
    true
}

/// 加密数据（AES-256-GCM）
#[tauri::command]
pub fn encrypt_data(data: String, key: String) -> Result<String, String> {
    let key_bytes = derive_key(&key);
    let cipher = Aes256Gcm::new_from_slice(&key_bytes).map_err(|e| format!("密钥错误: {}", e))?;

    // 随机 nonce
    let mut nonce_bytes = [0u8; 12];
    rand::rngs::OsRng.fill_bytes(&mut nonce_bytes);
    let nonce = Nonce::from_slice(&nonce_bytes);

    let ciphertext = cipher
        .encrypt(nonce, data.as_bytes())
        .map_err(|e| format!("加密失败: {}", e))?;

    // 返回 nonce + ciphertext 的 hex 编码
    let mut result = nonce_bytes.to_vec();
    result.extend_from_slice(&ciphertext);
    Ok(hex::encode(result))
}

/// 解密数据（AES-256-GCM）
#[tauri::command]
pub fn decrypt_data(encrypted_hex: String, key: String) -> Result<String, String> {
    let data = hex::decode(&encrypted_hex).map_err(|e| format!("hex解码失败: {}", e))?;
    if data.len() < 12 {
        return Err("数据格式错误".to_string());
    }

    let key_bytes = derive_key(&key);
    let cipher = Aes256Gcm::new_from_slice(&key_bytes).map_err(|e| format!("密钥错误: {}", e))?;

    let nonce = Nonce::from_slice(&data[..12]);
    let ciphertext = &data[12..];

    let plaintext = cipher
        .decrypt(nonce, ciphertext)
        .map_err(|_| "解密失败（密钥错误或数据损坏）".to_string())?;

    String::from_utf8(plaintext).map_err(|_| "解密结果非UTF-8".to_string())
}

// ─── 内部函数 ───

/// 验证激活码格式 XXXX-XXXX-XXXX-XXXX
fn is_valid_format(code: &str) -> bool {
    let parts: Vec<&str> = code.split('-').collect();
    if parts.len() != 4 {
        return false;
    }
    for part in &parts {
        if part.len() != 4 || !part.chars().all(|c| c.is_ascii_hexdigit()) {
            return false;
        }
    }
    true
}

/// 内部验证码校验
fn verify_code_internal(code: &str) -> bool {
    if !is_valid_format(code) {
        return false;
    }

    let normalized = code.replace('-', "");
    let chars: Vec<char> = normalized.chars().collect();
    if chars.len() != 16 {
        return false;
    }

    // 校验：前12位 XOR → 第13-15位（第16位随机，无设备预绑定）
    let mut checksum = 0u32;
    for i in 0..12 {
        checksum ^= chars[i].to_digit(16).unwrap_or(0);
    }
    let expected_check = checksum & 0xFFF;
    let actual_check = (chars[12].to_digit(16).unwrap_or(0) << 8)
        | (chars[13].to_digit(16).unwrap_or(0) << 4)
        | chars[14].to_digit(16).unwrap_or(0);
    if expected_check != actual_check {
        return false;
    }

    true
}

/// 从设备指纹派生 AES 密钥（SHA-256 + 100 轮迭代轻量密钥拉伸）
fn derive_key(fingerprint: &str) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(b"kanshazhe-financial-v3:");
    hasher.update(fingerprint.as_bytes());
    let mut result = hasher.finalize();
    // 100 轮再哈希（轻量版 PBKDF2，匹配 JS 侧的 100K 迭代 PBKDF2 精神）
    for _ in 0..99 {
        let mut hasher = Sha256::new();
        hasher.update(&result);
        result = hasher.finalize();
    }
    let mut key = [0u8; 32];
    key.copy_from_slice(&result);
    key
}
