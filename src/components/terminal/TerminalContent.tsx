import React, { useState, useEffect, useRef } from 'react';
import { TerminalContentProps, ConnectionState, ConnectionMode, ShellType, ContentStatus, CursorPosition, WindowDimensions } from '../../types';
import '../../styles/terminal.css';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
import { Window } from '@tauri-apps/api/window';
import TerminalFooter from './TerminalFooter';

/**
 * 终端内容组件
 * 使用xterm.js渲染终端，并显示底部状态信息
 */
const TerminalContent: React.FC<TerminalContentProps> = ({ 
  id, 
  defaultContent = '', 
  sessionStatus = {
    connectionState: ConnectionState.Connected,
    connectionMode: ConnectionMode.Local,
    shellType: ShellType.PowerShell
  },
  dimensions = { cols: 30, rows: 9 }
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  // 这个状态变量暂时不使用，但将来可能需要在其他功能中使用
  const [_terminal, setTerminal] = useState<Terminal | null>(null);
  
  // 终端内容状态：窗口大小和光标位置
  const [contentStatus, setContentStatus] = useState<ContentStatus>({
    dimensions: dimensions || { cols: 30, rows: 9 },
    position: { x: 0, y: 0 }
  });
  
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
      term.write(`\r\n\x1b[1;32m欢迎使用 LighTerm 终端 (${sessionStatus.shellType})\x1b[0m\r\n\r\n`);
      term.write(`${sessionStatus.shellType}> `);
      
      // 添加输入处理
      term.onData(data => {
        // 这里可以添加与后端shell交互的逻辑
        term.write(data);
        if (data === '\r') {
          term.write(`\n${sessionStatus.shellType}> `);
        }
      });
      
      setTerminal(term);
      
      // 清理函数
      return () => {
        term.dispose();
      };
    }
  }, [id, defaultContent, dimensions, sessionStatus]);
  
  // 监听终端光标位置变化
  useEffect(() => {
    if (_terminal) {
      // 添加光标位置事件监听
      _terminal.onCursorMove(() => {
        // 尝试获取光标位置
        if (_terminal.buffer && _terminal.buffer.active) {
          setContentStatus(prev => ({
            ...prev,
            position: {
              x: _terminal.buffer.active.cursorX,
              y: _terminal.buffer.active.cursorY
            }
          }));
        }
      });
    }
  }, [_terminal]);

  // 监听窗口大小变化
  useEffect(() => {
    // 初始获取窗口大小
    const fetchWindowSize = async () => {
      try {
        // 使用Tauri窗口API获取窗口大小
        const appWindow = Window.getCurrent();
        const size = await appWindow.innerSize();
        
        // 估算终端列数和行数（基于字体大小）
        const fontWidth = 10; // 估算值：每个字符宽10像素
        const fontHeight = 16; // 估算值：每个字符高16像素
        const cols = Math.floor(size.width / fontWidth);
        const rows = Math.floor(size.height / fontHeight);
        
        setContentStatus(prev => ({
          ...prev,
          dimensions: { cols, rows }
        }));
        
        // 如果终端实例存在，也更新xterm的大小
        if (_terminal) {
          _terminal.resize(cols, rows);
        }
      } catch (error) {
        console.error('获取窗口大小失败:', error);
      }
    };
    
    fetchWindowSize();
    
    // 监听窗口大小变化事件
    const listenToResizeEvents = async () => {
      const appWindow = Window.getCurrent();
      const unlisten = await appWindow.onResized(() => {
        fetchWindowSize(); // 窗口大小变化时重新获取
      });
      
      return unlisten;
    };
    
    // 设置监听并返回清理函数
    let unlistenPromise = listenToResizeEvents();
    
    return () => {
      // 清理监听器
      unlistenPromise.then(unlisten => unlisten());
    };
  }, [_terminal]);
  
  return (
    <div className="terminal-container">
      <div className="terminal-content" ref={terminalRef}></div>
      
      <TerminalFooter
        sessionStatus={sessionStatus}
        contentStatus={contentStatus}
      />
    </div>
  );
};

export default TerminalContent;
