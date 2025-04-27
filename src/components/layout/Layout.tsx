import React from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { TerminalProvider } from '../../context/TerminalContext';
import { SettingsProvider } from '../../context/SettingsContext';
import TerminalTabs from '../terminal/TerminalTabs';
import '../../styles/global.css';

/**
 * 主布局组件
 * 包含全局配置和上下文提供者
 */
const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: antTheme.darkAlgorithm,
        token: {
          colorBgContainer: '#1e1e1e',
          colorText: '#ffffff',
          colorBgElevated: '#1e1e1e',
          borderRadius: 0
        }
      }}
    >
      <TerminalProvider>
        <SettingsProvider>
          <div className="terminal-container">
            {children || <TerminalTabs />}
          </div>
        </SettingsProvider>
      </TerminalProvider>
    </ConfigProvider>
  );
};

export default Layout;
