import React, { createContext, useContext, useState } from 'react';
import { TabItem } from '../types';

// 定义上下文类型
interface TerminalContextType {
  tabs: TabItem[];
  activeTab: string;
  addTab: () => void;
  removeTab: (key: string) => void;
  setActiveTab: (key: string) => void;
}

// 创建上下文
const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

// 提供者组件
export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 标签页状态
  const [activeTab, setActiveTab] = useState("1");
  const [tabs, setTabs] = useState<TabItem[]>([
    {
      key: "1",
      label: "C:\\Program Files\\Pow...",
      content: "lighterm on main via v20.11.1\n16:46:26 > ",
      path: "C:\\Program Files\\PowerShell\\7\\pwsh.exe"
    },
    {
      key: "2",
      label: "C:\\Program Files\\Pow...",
      content: "",
      path: "C:\\Program Files\\PowerShell\\7\\pwsh.exe"
    }
  ]);

  // 添加新标签页
  const addTab = () => {
    const newKey = String(tabs.length + 1);
    setTabs([...tabs, {
      key: newKey,
      label: "C:\\Program Files\\Pow...",
      content: "",
      path: "C:\\Program Files\\PowerShell\\7\\pwsh.exe"
    }]);
    setActiveTab(newKey);
  };

  // 移除标签页
  const removeTab = (targetKey: string) => {
    const targetIndex = tabs.findIndex(item => item.key === targetKey);
    const newTabs = tabs.filter(item => item.key !== targetKey);
    
    // 如果关闭的是当前活动标签，则需要设置新的活动标签
    if (newTabs.length && targetKey === activeTab) {
      const newActiveTab = newTabs[targetIndex === newTabs.length ? targetIndex - 1 : targetIndex].key;
      setActiveTab(newActiveTab);
    }
    
    setTabs(newTabs);
  };

  // 提供上下文值
  const value = {
    tabs,
    activeTab,
    addTab,
    removeTab,
    setActiveTab
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
};

// 自定义Hook，方便消费上下文
export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};
