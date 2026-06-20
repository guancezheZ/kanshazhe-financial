mod activation;

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
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
