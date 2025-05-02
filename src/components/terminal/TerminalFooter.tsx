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
  const [memoryUsage, setMemoryUsage] = useState<string>('0.0/0.0 G');
  
  // 更新当前时间 - 使用紧凑格式以适应有限空间
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // 更紧凑的时间格式
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      // 使用更紧凑的日期时间格式
      const dateString = `${year}/${month}/${day} ${hours}:${minutes}`;
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
          setMemoryUsage(`${sysInfo[1]}/${sysInfo[2]}G`);
        }
      } catch (error) {
        console.error('获取系统信息失败:', error);
        // 发生错误时使用默认值
        setCpuUsage('0.0%');
        setMemoryUsage('0.00/0.00G');
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
      {/* 第一组: 连接状态和Shell类型 */}
      <div className="footer-group connection-group">
        <span className={sessionStatus.connectionState === ConnectionState.Connected ? 'connected' : 'disconnected'}>
          {sessionStatus.connectionState}
        </span>
        <span className="footer-item" title={sessionStatus.connectionMode}>{sessionStatus.connectionMode}</span>
        <span className="footer-item" title={sessionStatus.shellType}>{sessionStatus.shellType}</span>
      </div>
      
      {/* 第二组: 窗口和位置信息 */}
      <div className="footer-group content-group">
        <span className="footer-item" title={`窗口 ${contentStatus.dimensions.cols}×${contentStatus.dimensions.rows}`}>
          窗口 {contentStatus.dimensions.cols}×{contentStatus.dimensions.rows}
        </span>
        <span className="footer-item" title={`位置 ${contentStatus.position.x}×${contentStatus.position.y}`}>
          位置 {contentStatus.position.x}×{contentStatus.position.y}
        </span>
      </div>
      
      {/* 第三组: 系统信息 */}
      <div className="footer-group system-group">
        <span className="footer-item time-item" title={currentTime}>{currentTime}</span>
        <span className="cpu-stat footer-item" title={`CPU使用率: ${cpuUsage}`}>{cpuUsage}</span>
        <span className="memory-stat footer-item" title={`内存使用: ${memoryUsage}`}>{memoryUsage}</span>
      </div>
    </div>
  );
};

export default TerminalFooter;
