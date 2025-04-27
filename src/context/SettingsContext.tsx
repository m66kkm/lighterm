import React, { createContext, useContext, useState } from 'react';

// 定义设置上下文类型
interface SettingsContextType {
  showSettings: boolean;
  selectedSettingsKey: string;
  toggleSettings: () => void;
  setSelectedSettingsKey: (key: string) => void;
  closeSettings: () => void;
}

// 创建上下文
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// 提供者组件
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 设置页面状态
  const [showSettings, setShowSettings] = useState(false);
  const [selectedSettingsKey, setSelectedSettingsKey] = useState('app');

  // 切换设置页面显示状态
  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  // 关闭设置页面
  const closeSettings = () => {
    setShowSettings(false);
  };

  // 提供上下文值
  const value = {
    showSettings,
    selectedSettingsKey,
    toggleSettings,
    setSelectedSettingsKey,
    closeSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// 自定义Hook，方便消费上下文
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
