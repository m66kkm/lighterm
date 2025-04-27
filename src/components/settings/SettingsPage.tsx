import React from 'react';
import { SettingsPageProps } from '../../types';
import { useSettings } from '../../context/SettingsContext';
import SettingsSidebar from './SettingsSidebar';
import SettingsContent from './SettingsContent';
import '../../styles/settings.css';

/**
 * 设置页面组件
 * 包含侧边栏和内容区
 */
const SettingsPage: React.FC<SettingsPageProps> = ({ onClose }) => {
  // 初始化设置上下文
  const { setSelectedSettingsKey } = useSettings();
  
  // 关闭设置页面时的处理
  const handleClose = () => {
    // 重置选中的设置项
    setSelectedSettingsKey('app');
    // 关闭设置页面
    onClose();
  };

  return (
    <div className="settings-container">
      <SettingsSidebar />
      <SettingsContent />
    </div>
  );
};

export default SettingsPage;
