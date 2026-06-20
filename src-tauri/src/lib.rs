mod activation;
use tauri::Manager;

/// 在默认浏览器中打开配套资料文件
#[tauri::command]
fn open_doc(filename: String, app: tauri::AppHandle) -> Result<String, String> {
    let resource_dir = app.path().resource_dir().map_err(|e| e.to_string())?;
    let file_path = resource_dir.join(&filename);
    let path_str = file_path.to_string_lossy().to_string();
    open::that(&path_str).map_err(|e| format!("打开失败: {}", e))?;
    Ok(path_str)
}

/// 在默认浏览器中打开网址（检查更新用）
#[tauri::command]
fn open_url(url: String) -> Result<(), String> {
    open::that(&url).map_err(|e| format!("打开失败: {}", e))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            activation::get_hardware_id,
            activation::is_activated,
            activation::get_activation_code,
            activation::activate,
            activation::deactivate,
            activation::encrypt_data,
            activation::decrypt_data,
            open_doc,
            open_url,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
