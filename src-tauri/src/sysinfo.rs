use serde::Serialize;
use sysinfo::System;
use once_cell::sync::Lazy;
use std::sync::Mutex;

// 创建一个全局的 System 实例，避免每次都重新创建
pub static SYSTEM: Lazy<Mutex<System>> = Lazy::new(|| {
    let mut sys = System::new_all();
    // 初始刷新一次，确保有基准数据
    sys.refresh_all();
    Mutex::new(sys)
});

/// 系统信息结构体，用于返回给前端
#[derive(Serialize)]
pub struct SystemInfo {
    cpu_percent: String,
    used_memory: String,
    total_memory: String,
}

/// 获取系统信息: CPU使用率和内存使用情况
/// 
/// 返回一个包含三个元素的数组:
/// - 第一个元素是CPU使用率百分比
/// - 第二个元素是已使用内存（GB），保留2位小数
/// - 第三个元素是总内存（GB），保留2位小数
#[tauri::command]
pub fn get_system_info() -> Vec<String> {
    // 获取全局 System 实例并锁定 Mutex
    let mut sys = SYSTEM.lock().unwrap();
    
    // 只刷新需要的组件
    sys.refresh_cpu_all(); // 刷新CPU数据
    sys.refresh_memory(); // 刷新内存数据
    
    // 计算CPU使用率
    // sysinfo 需要两次读取之间的差异来计算真实使用率
    // 这里使用全局的 System 实例，保留了上次读取的数据
    let cpu_usage: f32 = sys.cpus().iter().map(|cpu| cpu.cpu_usage()).sum::<f32>() 
        / sys.cpus().len() as f32;
    
    // 确保CPU使用率在合理范围内
    let cpu_usage = cpu_usage.min(100.0);
    
    // 获取内存信息 (转换为GB并保留2位小数)
    let used_memory = sys.used_memory() as f64 / 1024.0 / 1024.0 / 1024.0;
    let total_memory = sys.total_memory() as f64 / 1024.0 / 1024.0 / 1024.0;
    
    // 格式化数据
    let cpu_percent = format!("{:.1}%", cpu_usage);
    let used_mem_gb = format!("{:.2}", used_memory);
    let total_mem_gb = format!("{:.2}", total_memory);
    
    // 返回结果数组
    vec![cpu_percent, used_mem_gb, total_mem_gb]
}
