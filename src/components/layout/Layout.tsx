import React from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { TerminalProvider } from '../../context/TerminalContext';
import { SettingsProvider } from '../../context/SettingsContext';
import { WindowControlProvider } from '../../context/WindowControlContext';
import WindowTitlebar from '../window/WindowTitlebar';
import TerminalTabs from '../terminal/TerminalTabs';
import '../../styles/global.css';
import '../../styles/theme.css';

/**
 * 主布局组件
 * 包含全局配置和上下文提供者，以及窗口标题栏
 */
const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: antTheme.darkAlgorithm,
        token: {
          colorBgContainer: 'var(--ant-color-bg-container)',
          colorText: 'var(--ant-color-text)',
          colorBgElevated: 'var(--ant-color-bg-elevated)',
          borderRadius: 0 // 必须是数字类型
        }
      }}
    >
      <TerminalProvider>
        <SettingsProvider>
          <WindowControlProvider>
            <div className="app-container">
              <WindowTitlebar />
              <div className="terminal-container">
                {children || <TerminalTabs />}
              </div>
            </div>
          </WindowControlProvider>
        </SettingsProvider>
      </TerminalProvider>
    </ConfigProvider>
  );
};

export default Layout;
