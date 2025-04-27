import React from 'react';
import { Button, ButtonProps } from 'antd';
import '../../styles/tabs.css';

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * 图标按钮组件
 * 在标签栏和其他区域使用的统一样式的图标按钮
 */
const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  onClick, 
  className = '',
  ...rest 
}) => {
  return (
    <Button
      type="text"
      icon={icon}
      onClick={onClick}
      className={`tab-action-btn ${className}`}
      {...rest}
    />
  );
};

export default IconButton;
