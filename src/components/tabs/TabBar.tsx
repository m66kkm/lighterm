import React from 'react';
import { TabBarProps } from '../../types';
import TabActions from './TabActions';
import '../../styles/tabs.css';

/**
 * 自定义标签栏组件
 * 包含标签和右侧操作按钮
 */
const TabBar: React.FC<TabBarProps & {
  children: React.ReactNode;
}> = ({ 
  children, 
  showSettings, 
  onAddTab, 
  onToggleSettings 
}) => {
  return (
    <div className="tab-bar-container">
      <div style={{ flex: 1 }}>{children}</div>
      <TabActions 
        showSettings={showSettings}
        onAddTab={onAddTab}
        onToggleSettings={onToggleSettings}
      />
    </div>
  );
};

export default TabBar;
