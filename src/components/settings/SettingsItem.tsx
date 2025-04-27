import React from 'react';
import { Typography } from 'antd';
import { SettingsItemProps } from '../../types';
import '../../styles/settings.css';

const { Title, Paragraph } = Typography;

/**
 * 单个设置项组件
 * 用于设置页面中的每个设置项，包括标题、描述和控制元素
 */
const SettingsItem: React.FC<SettingsItemProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="settings-item">
      <div className="settings-item-label">
        <Title level={4}>{title}</Title>
        {description && (
          typeof description === 'string' 
            ? <Paragraph>{description}</Paragraph> 
            : description
        )}
      </div>
      <div className="settings-item-control">
        {children}
      </div>
    </div>
  );
};

export default SettingsItem;
