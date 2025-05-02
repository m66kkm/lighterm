import React from 'react';
import '../../styles/tabs.css';

/**
 * 自定义标签栏组件
 * 仅包含标签，移除了右侧操作按钮
 */
const TabBar: React.FC<{
  children: React.ReactNode;
}> = ({ 
  children
}) => {
  return (
    <div className="tab-bar-container">
      <div style={{ flex: 1 }}>{children}</div>
      {/* 移除了TabActions组件，不再显示操作按钮 */}
    </div>
  );
};

export default TabBar;
