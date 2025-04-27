import React from 'react';
import { TerminalContentProps } from '../../types';
import '../../styles/terminal.css';

/**
 * 终端内容组件
 * 显示终端的输出内容和闪烁的光标
 */
const TerminalContent: React.FC<TerminalContentProps> = ({ content }) => {
  return (
    <div className="terminal-content">
      <pre>{content}</pre>
      <div className="terminal-cursor"></div>
    </div>
  );
};

export default TerminalContent;
