import React from 'react';
import { Tabs } from 'antd';
import { useTerminal } from '../../context/TerminalContext';
import { useSettings } from '../../context/SettingsContext';
import TabBar from '../tabs/TabBar';
import TerminalContent from './TerminalContent';
import SettingsPage from '../settings/SettingsPage';
import { ConnectionState, ConnectionMode, ShellType } from '../../types';
import '../../styles/tabs.css';
import '../../styles/terminal.css';

/**
 * 终端标签页组件
 * 显示多个终端标签或设置页面
 */
const TerminalTabs: React.FC = () => {
  // 获取终端上下文
  const { tabs, activeTab, addTab, removeTab, setActiveTab } = useTerminal();
  // 获取设置上下文
  const { showSettings, toggleSettings } = useSettings();

  // 处理标签切换
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  // 处理标签编辑（添加/删除）
  const handleTabEdit = (
    targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>, 
    action: 'add' | 'remove'
  ) => {
    if (action === 'add') {
      addTab();
    } else if (action === 'remove' && typeof targetKey === 'string') {
      removeTab(targetKey);
    }
  };

  // 自定义标签栏渲染（用于普通终端标签）
  const renderTabBar = (props: any, DefaultTabBar: React.ComponentType<any>) => (
    <TabBar>
      <DefaultTabBar {...props} />
    </TabBar>
  );

  // 如果显示设置页面
  if (showSettings) {
    return (
      <Tabs
        activeKey="settings"
        type="card" // 改为card类型，不显示添加按钮
        addIcon={null} // 确保不显示添加图标
        hideAdd={true} // 隐藏添加按钮
        items={[
          {
            key: "settings",
            label: <span style={{ fontSize: '25px', fontWeight: 'bold' }}>设置</span>, // 增大设置字体
            closable: false,
            children: <SettingsPage onClose={() => toggleSettings()} />
          }
        ]}
        // renderTabBar={renderSettingsTabBar} // 使用设置页面专用的标签栏渲染函数
      />
    );
  }

  // 否则显示终端标签页
  return (
    <Tabs
      type="editable-card"
      activeKey={activeTab}
      onChange={handleTabChange}
      onEdit={handleTabEdit}
      // renderTabBar={null}
      items={tabs.map((item, index) => ({
        key: item.key,
        label: <span><strong>{index + 1}</strong> {item.label}</span>,
        closable: true, // 始终设置为可关闭，但通过CSS控制显示
        children: (
          <TerminalContent 
            id={item.key} 
            defaultContent={item.content}
            sessionStatus={{
              connectionState: item.path?.includes('remote') ? ConnectionState.Disconnected : ConnectionState.Connected,
              connectionMode: item.path?.includes('remote') ? ConnectionMode.Remote : ConnectionMode.Local,
              shellType: item.path?.includes('powershell') ? ShellType.PowerShell : 
                        item.path?.includes('cmd') ? ShellType.Cmd : ShellType.Zsh
            }}
            dimensions={{ cols: 30, rows: 9 }}
          />
        )
      }))}
    />
  );
};

export default TerminalTabs;
