use serde::Serialize;
use std::io::Error;

#[derive(Serialize, Debug, Clone, Copy, PartialEq)]
pub enum ThemeMode {
    Light,
    Dark,
    Unknown,
}

/// 获取当前系统主题设置（亮色/暗色）
#[cfg(target_os = "windows")]
pub fn get_system_theme() -> Result<ThemeMode, Error> {
    // 使用注册表方式直接检查Windows是否使用暗色主题
    if is_dark_mode_enabled() {
        Ok(ThemeMode::Dark)
    } else {
        Ok(ThemeMode::Light)
    }
}

/// 在Windows上检查是否启用了暗色模式
#[cfg(target_os = "windows")]
fn is_dark_mode_enabled() -> bool {
    use std::process::Command;
    
    // 使用PowerShell查询注册表值
    let output = Command::new("powershell")
        .args(&[
            "-Command",
            "(Get-ItemProperty -Path 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize' -Name 'AppsUseLightTheme').AppsUseLightTheme"
        ])
        .output();
        
    match output {
        Ok(output) => {
            let result = String::from_utf8_lossy(&output.stdout);
            // 如果AppsUseLightTheme为0，则表示启用了暗色模式
            result.trim() == "0"
        },
        Err(_) => false, // 如果无法查询，默认为非暗色模式
    }
}

/// 非Windows系统的实现
#[cfg(not(target_os = "windows"))]
pub fn get_system_theme() -> Result<ThemeMode, Error> {
    // 其他系统如macOS或Linux的实现可以在这里添加
    // 目前返回Unknown
    Ok(ThemeMode::Unknown)
}

/// Tauri命令：获取系统主题
#[tauri::command]
pub fn get_theme() -> String {
    match get_system_theme() {
        Ok(ThemeMode::Light) => "light".to_string(),
        Ok(ThemeMode::Dark) => "dark".to_string(),
        _ => "unknown".to_string(),
    }
}
