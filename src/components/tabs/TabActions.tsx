import React from 'react';
import { PlusOutlined, SettingOutlined, MinusOutlined, ExpandOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TabBarProps } from '../../types';
import IconButton from '../common/IconButton';
import '../../styles/tabs.css';

/**
 * 标签栏操作按钮组件
 * 显示标签栏右侧的操作按钮
 */
const TabActions: React.FC<TabBarProps> = ({ 
  showSettings,
  onAddTab,
  onToggleSettings
}) => {
  return (
    <div className="tab-actions">
      <IconButton icon={<PlusOutlined />} onClick={onAddTab} />
      <IconButton icon={<SettingOutlined />} onClick={onToggleSettings} />
      <IconButton icon={<ExpandOutlined />} />    
    </div>
  );
};

export default TabActions;
