import React, { useState, useEffect } from 'react';
import { TerminalFooterProps, ConnectionState } from '../../types';
import '../../styles/terminal.css';
import { invoke } from '@tauri-apps/api/core';

/**
 * 终端底部状态栏组件
 * 显示终端状态信息、窗口尺寸、时间和系统资源使用情况
 */
const TerminalFooter: React.FC<TerminalFooterProps> = ({
  sessionStatus,
  contentStatus
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [cpuUsage, setCpuUsage] = useState<string>('0.0%');
  const [memoryUsage, setMemoryUsage] = useState<string>('0.00/0.00 GiB');
  
  // 更新当前时间
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      const dateString = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${timeString}`;
      setCurrentTime(dateString);
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 60000); // 每分钟更新一次
    
    return () => clearInterval(timeInterval);
  }, []);
  
  // 从Rust后端获取系统资源使用情况
  useEffect(() => {
    const updateSystemStats = async () => {
      try {
        // 调用Rust的get_system_info命令
        const sysInfo: string[] = await invoke('get_system_info');
        
        // 更新状态
        if (sysInfo && sysInfo.length === 3) {
          setCpuUsage(sysInfo[0]);
          setMemoryUsage(`${sysInfo[1]}/${sysInfo[2]} GiB`);
        }
      } catch (error) {
        console.error('获取系统信息失败:', error);
        // 发生错误时使用默认值
        setCpuUsage('0.0%');
        setMemoryUsage('0.00/0.00 GiB');
      }
    };
    
    // 立即更新一次
    updateSystemStats();
    
    // 设置定时更新
    const statsInterval = setInterval(updateSystemStats, 3000);
    return () => clearInterval(statsInterval);
  }, []);
  return (
    <div className="terminal-footer">
      <div className="terminal-footer-left">
        <span className={sessionStatus.connectionState === ConnectionState.Connected ? 'connected' : 'disconnected'}>
          {sessionStatus.connectionState}
        </span>
      </div>
      <div className="terminal-footer-center">
        <span>{sessionStatus.connectionMode}</span>
        <span>{sessionStatus.shellType}</span>
        <span>窗口 {contentStatus.dimensions.cols}×{contentStatus.dimensions.rows}</span>
        <span>位置 {contentStatus.position.x}×{contentStatus.position.y}</span>
      </div>
      <div className="terminal-footer-right">
        <span>{currentTime}</span>
        <span className="terminal-footer-stats">
          <span className="cpu-stat">{cpuUsage}</span>
          <span className="memory-stat">{memoryUsage}</span>
        </span>
      </div>
    </div>
  );
};

export default TerminalFooter;
