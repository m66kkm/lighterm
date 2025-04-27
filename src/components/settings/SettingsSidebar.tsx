import React from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SkinOutlined,
  SettingOutlined,
  CodeOutlined,
  FormatPainterOutlined,
  CloudSyncOutlined,
  KeyOutlined,
  ApiOutlined,
  CodeSandboxOutlined,
  SecurityScanOutlined,
  SafetyOutlined,
  WindowsOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { SettingsMenuItem } from '../../types';
import { useSettings } from '../../context/SettingsContext';
import '../../styles/settings.css';

/**
 * 设置菜单数据
 */
const settingsMenuItems: SettingsMenuItem[] = [
  { key: 'app', label: '应用', icon: <AppstoreOutlined /> },
  { key: 'appearance', label: '外观', icon: <SkinOutlined /> },
  { key: 'connection', label: '配置和连接', icon: <SettingOutlined /> },
  { key: 'terminal', label: '终端', icon: <CodeOutlined /> },
  { key: 'colorScheme', label: '配色方案', icon: <FormatPainterOutlined /> },
  { key: 'sync', label: '配置同步', icon: <CloudSyncOutlined /> },
  { key: 'shortcuts', label: '快捷键', icon: <KeyOutlined /> },
  { key: 'plugins', label: '插件', icon: <ApiOutlined /> },
  { key: 'shell', label: 'Shell', icon: <CodeSandboxOutlined /> },
  { key: 'ssh', label: 'SSH', icon: <SecurityScanOutlined /> },
  { key: 'vault', label: '保险库', icon: <SafetyOutlined /> },
  { key: 'window', label: '窗口', icon: <WindowsOutlined /> },
  { key: 'config', label: '配置文件', icon: <FileOutlined /> }
];

/**
 * 设置侧边栏组件
 */
const SettingsSidebar: React.FC = () => {
  const { selectedSettingsKey, setSelectedSettingsKey } = useSettings();
  
  const handleSelect = ({ key }: { key: string }) => {
    setSelectedSettingsKey(key);
  };

  return (
    <div className="settings-sidebar">
      <Menu
        selectedKeys={[selectedSettingsKey]}
        mode="vertical"
        className="settings-menu"
        onSelect={handleSelect}
        items={settingsMenuItems}
      />
    </div>
  );
};

export default SettingsSidebar;
