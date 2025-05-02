import React from 'react';
import { SettingOutlined, MinusOutlined, BorderOutlined, CloseOutlined } from '@ant-design/icons';
import { useWindowControl } from '../../context/WindowControlContext';
import { useSettings } from '../../context/SettingsContext';
import IconButton from '../common/IconButton';
import '../../styles/window-controls.css';

/**
 * 窗口控制按钮组件
 * 显示在窗口标题栏右侧，包含设置、最小化、最大化和关闭按钮
 */
/**
 * 窗口控制按钮组件
 * 显示在窗口标题栏右侧，包含设置、最小化、最大化和关闭按钮
 */
const WindowControls: React.FC = () => {
  const { minimizeWindow, maximizeWindow, closeWindow, isWindowMaximized } = useWindowControl();
  const { toggleSettings } = useSettings();

  return (
    <div className="window-controls">
      <IconButton
        icon={<SettingOutlined />}
        onClick={() => toggleSettings()}
        className="window-control-btn settings-btn"
      />
      <div className="window-native-controls">
        <IconButton
          icon={<MinusOutlined />}
          onClick={minimizeWindow}
          className="window-control-btn"
        />
        <IconButton
          icon={isWindowMaximized ? <BorderOutlined /> : <BorderOutlined />}
          onClick={maximizeWindow}
          className="window-control-btn"
        />
        <IconButton
          icon={<CloseOutlined />}
          onClick={closeWindow}
          className="window-control-btn close-btn"
        />
      </div>
    </div>
  );
};

export default WindowControls;
