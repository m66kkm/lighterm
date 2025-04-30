// 模块声明
pub mod sysinfo;
pub mod theme;
pub mod hotkeys;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // 设置热键监听器
            hotkeys::setup_hotkey_listener(app)?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // 基本命令
            greet,
            // 系统信息命令
            sysinfo::get_system_info,
            // 主题相关命令
            theme::get_theme,
            // 热键相关命令
            hotkeys::register_hotkey,
            hotkeys::unregister_all_hotkeys,
            hotkeys::get_registered_hotkeys,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
