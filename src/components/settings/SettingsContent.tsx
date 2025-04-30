import React from 'react';
import { Typography, Switch, Select, Input, Button } from 'antd';
import { useSettings } from '../../context/SettingsContext';
import SettingsHeader from './SettingsHeader';
import SettingsItem from './SettingsItem';
import '../../styles/settings.css';

const { Title, Paragraph } = Typography;
const { Option } = Select;

/**
 * 自定义ToolOutlined图标
 */
const ToolOutlined = () => (
  <svg viewBox="64 64 896 896" focusable="false" data-icon="tool" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <path d="M876.6 239.5c-.5-.9-1.2-1.8-2-2.5-5-5-13.1-5-18.1 0L684.2 409.3l-67.9-67.9L788.7 169c.8-.8 1.4-1.6 2-2.5 3.6-6.1 1.6-13.9-4.5-17.5-98.2-58-226.8-44.7-311.3 39.7-67 67-89.2 162-66.5 247.4l-293 293c-3 3-2.8 7.9.3 11l169.7 169.7c3.1 3.1 8.1 3.3 11 .3l292.9-292.9c85.5 22.8 180.5.7 247.6-66.4 84.4-84.5 97.7-213.1 39.7-311.3zM786 499.8c-58.1 58.1-145.3 69.3-214.6 33.6l-8.8 8.8-.1-.1-274 274.1-79.2-79.2 230.1-230.1s0 .1.1.1l52.8-52.8c-35.7-69.3-24.5-156.5 33.6-214.6a184.2 184.2 0 01144-53.5L537 318.9a32.05 32.05 0 000 45.3l124.5 124.5a32.05 32.05 0 0045.3 0l132.8-132.8c3.7 51.8-14.4 104.8-53.6 143.9z"></path>
  </svg>
);

/**
 * 设置内容组件
 */
const SettingsContent: React.FC = () => {
  const { selectedSettingsKey } = useSettings();

  // 检查更新处理函数
  const handleCheckUpdate = () => {
    console.log('检查更新');
  };

  return (
    <div className="settings-content">
      {selectedSettingsKey === 'app' && (
        <div className="settings-section">
          <SettingsHeader onCheckUpdate={handleCheckUpdate} />
          <hr/>
          
          <Title level={3}>应用程序设置</Title>

          <SettingsItem 
            title="语言"
          >
            <Select defaultValue="zh-cn" style={{ width: 240 }}>
              <Option value="zh-cn">中文（简体）</Option>
              <Option value="en">English</Option>
            </Select>
          </SettingsItem>

          <SettingsItem 
            title="Shell 焦点" 
            description="允许在选定的文件夹中快速打开终端"
          >
            <Switch />
          </SettingsItem>

          <SettingsItem 
            title="自动更新" 
            description="当更新可用时，启用自动安装"
          >
            <Switch defaultChecked />
          </SettingsItem>

          <SettingsItem title="调试">
            <Button icon={<ToolOutlined />}>开启开发者工具</Button>
          </SettingsItem>
          
          <hr/>
          
          <Title level={3}>辅助功能</Title>

          <SettingsItem title="开启动画效果">
            <Switch defaultChecked />
          </SettingsItem>
          
          <SettingsItem title="最低对比度">
            <Input defaultValue="4" style={{ width: 240 }} />
          </SettingsItem>
        </div>
      )}

      {selectedSettingsKey !== 'app' && (
        <div className="settings-section">
          <Title level={3}>其他设置页面待实现</Title>
          <Paragraph>您选择的是：{selectedSettingsKey} 设置</Paragraph>
        </div>
      )}
    </div>
  );
};

export default SettingsContent;
