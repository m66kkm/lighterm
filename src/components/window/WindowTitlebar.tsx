import React from 'react';
import AppIcon from '../common/AppIcon';
import WindowControls from './WindowControls';
import '../../styles/window-titlebar.css';

/**
 * 窗口标题栏组件
 * 包含应用图标、标题和窗口控制按钮
 */
const WindowTitlebar: React.FC = () => {
  return (
    <div className="window-titlebar" data-tauri-drag-region>
      <div className="titlebar-left">
        <AppIcon />
        <div className="titlebar-title">
          <span className="title-text">LighTerm</span> <span className="version-text">alpha 0.1.0</span>
        </div>
      </div>
      <WindowControls />
    </div>
  );
};

export default WindowTitlebar;
