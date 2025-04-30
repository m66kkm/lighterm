import React from 'react';
import { SettingsPageProps } from '../../types';
// 目前未使用，保留以备将来使用
// import { useSettings } from '../../context/SettingsContext';
import SettingsSidebar from './SettingsSidebar';
import SettingsContent from './SettingsContent';
import '../../styles/settings.css';

/**
 * 设置页面组件
 * 包含侧边栏和内容区
 */
const SettingsPage: React.FC<SettingsPageProps> = (/* { onClose } */) => {
  // 初始化设置上下文，目前未使用但保留以备将来使用
  // const { setSelectedSettingsKey } = useSettings();
  
  // 注：以下是设置页面关闭处理的示例代码
  // 当需要添加关闭功能时，可取消注释以下代码和参数
  /*
  const handleClose = () => {
    // 重置选中的设置项
    setSelectedSettingsKey('app');
    // 关闭设置页面
    onClose();
  };
  */

  return (
    <div className="settings-container">
      <SettingsSidebar />
      <SettingsContent />
    </div>
  );
};

export default SettingsPage;
