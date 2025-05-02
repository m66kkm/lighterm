import React from 'react';
import '../../styles/app-icon.css';

/**
 * 应用图标组件
 * 在标题栏中显示应用图标
 */
const AppIcon: React.FC = () => {
  return (
    <div className="app-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="#333333" stroke="#00D8FF" strokeWidth="1.5"/>
        <path d="M6 10L9 12L6 14" stroke="#00D8FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 16H16" stroke="#00D8FF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default AppIcon;
