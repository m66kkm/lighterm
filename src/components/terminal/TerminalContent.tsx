import React, { useState, useEffect, useRef } from 'react';
import { TerminalContentProps } from '../../types';
import '../../styles/terminal.css';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
// 从Tauri v2版本导入invoke函数
import { invoke } from '@tauri-apps/api/core';


/**
 * 终端内容组件
 * 使用xterm.js渲染终端，并显示底部状态信息
 */
const TerminalContent: React.FC<TerminalContentProps> = ({ 
  id, 
  defaultContent = '', 
  shellType = 'powershell',
  dimensions = { cols: 30, rows: 9 }
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  // 这个状态变量暂时不使用，但将来可能需要在其他功能中使用
  const [_terminal, setTerminal] = useState<Terminal | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [cpuUsage, setCpuUsage] = useState<string>('6.5%');
  const [memoryUsage, setMemoryUsage] = useState<string>('17.45/31.92 GiB');
  
  // 初始化xterm终端
  useEffect(() => {
    if (terminalRef.current) {
      // 创建新的终端实例
      const term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'Consolas, "Courier New", monospace',
        theme: {
          background: '#1e1e1e',
          foreground: '#d4d4d4',
          cursor: '#d4d4d4'
        },
        cols: dimensions.cols,
        rows: dimensions.rows
      });
      
      // 打开终端
      term.open(terminalRef.current);
      
      // 如果有默认内容，写入终端
      if (defaultContent) {
        term.write(defaultContent);
      }
      
      // 写入欢迎消息
      term.write(`\r\n\x1b[1;32m欢迎使用 LighTerm 终端 (${shellType})\x1b[0m\r\n\r\n`);
      term.write(`${shellType}> `);
      
      // 添加输入处理
      term.onData(data => {
        // 这里可以添加与后端shell交互的逻辑
        term.write(data);
        if (data === '\r') {
          term.write(`\n${shellType}> `);
        }
      });
      
      setTerminal(term);
      
      // 清理函数
      return () => {
        term.dispose();
      };
    }
  }, [id, defaultContent, dimensions, shellType]);
  
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
    <div className="terminal-container">
      <div className="terminal-content" ref={terminalRef}></div>
      
      <div className="terminal-footer">
        <div className="terminal-footer-left">
          就绪
        </div>
        <div className="terminal-footer-center">
          <span>远程模式</span>
          <span>窗口 {dimensions.cols}×{dimensions.rows}</span>
          <span>行 {dimensions.rows}</span>
          <span>字符 {dimensions.cols}</span>
          <span>{shellType}</span>
        </div>
        <div className="terminal-footer-right">
          <span>{currentTime}</span>
          <span className="terminal-footer-stats">
            <span className="cpu-stat">{cpuUsage}</span>
            <span className="memory-stat">{memoryUsage}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TerminalContent;
