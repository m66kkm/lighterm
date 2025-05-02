import React, { createContext, useContext, useState } from 'react';
import { Window, getCurrentWindow } from '@tauri-apps/api/window';
import { useSettings } from './SettingsContext';

// 定义窗口控制上下文类型
interface WindowControlContextType {
  minimizeWindow: () => Promise<void>;
  maximizeWindow: () => Promise<void>;
  closeWindow: () => Promise<void>;
  isWindowMaximized: boolean;
}

// 创建上下文
const WindowControlContext = createContext<WindowControlContextType | undefined>(undefined);

// 提供者组件
export const WindowControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWindowMaximized, setIsWindowMaximized] = useState(false);
  const { toggleSettings } = useSettings();

  // 获取当前窗口的引用
  const [appWindow, setAppWindow] = useState<Window | null>(null);
  
  // 初始化窗口引用
  React.useEffect(() => {
    const initWindow = async () => {
      try {
        console.log('初始化窗口引用');
        const window = await getCurrentWindow();
        setAppWindow(window);
        const maximized = await window.isMaximized();
        console.log('初始窗口最大化状态:', maximized);
        setIsWindowMaximized(maximized);
      } catch (error) {
        console.error('初始化窗口引用时出错:', error);
      }
    };
    
    initWindow();
  }, []);

  // 最小化窗口
  const minimizeWindow = async () => {
    try {
      if (appWindow) {
        console.log('最小化窗口');
        await appWindow.minimize();
      } else {
        console.error('窗口引用未初始化');
      }
    } catch (error) {
      console.error('最小化窗口时出错:', error);
    }
  };

  // 最大化或还原窗口
  const maximizeWindow = async () => {
    try {
      if (appWindow) {
        console.log('切换窗口最大化状态');
        await appWindow.toggleMaximize();
        const maximized = await appWindow.isMaximized();
        console.log('窗口最大化状态:', maximized);
        setIsWindowMaximized(maximized);
      } else {
        console.error('窗口引用未初始化');
      }
    } catch (error) {
      console.error('最大化/还原窗口时出错:', error);
    }
  };

  // 关闭窗口
  const closeWindow = async () => {
    try {
      if (appWindow) {
        console.log('关闭窗口');
        await appWindow.close();
      } else {
        console.error('窗口引用未初始化');
      }
    } catch (error) {
      console.error('关闭窗口时出错:', error);
    }
  };

  // 监听窗口大小变化
  React.useEffect(() => {
    let unlisten: any;
    
    const setupListener = async () => {
      try {
        if (appWindow) {
          console.log('设置窗口大小变化监听器');
          unlisten = await appWindow.onResized(async () => {
            try {
              const maximized = await appWindow.isMaximized();
              console.log('窗口大小变化，最大化状态:', maximized);
              setIsWindowMaximized(maximized);
            } catch (error) {
              console.error('获取窗口最大化状态时出错:', error);
            }
          });
        }
      } catch (error) {
        console.error('设置窗口大小变化监听器时出错:', error);
      }
    };
    
    if (appWindow) {
      setupListener();
    }
    
    return () => {
      if (unlisten) {
        try {
          console.log('移除窗口大小变化监听器');
          unlisten();
        } catch (error) {
          console.error('移除窗口大小变化监听器时出错:', error);
        }
      }
    };
  }, [appWindow]);

  // 提供上下文值
  const value = {
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    isWindowMaximized
  };

  return (
    <WindowControlContext.Provider value={value}>
      {children}
    </WindowControlContext.Provider>
  );
};

// 自定义Hook，方便消费上下文
export const useWindowControl = () => {
  const context = useContext(WindowControlContext);
  if (context === undefined) {
    throw new Error('useWindowControl must be used within a WindowControlProvider');
  }
  return context;
};
