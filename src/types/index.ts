// 类型定义文件

/**
 * 终端标签页类型定义
 */
export interface TabItem {
  key: string;
  label: string;
  content: string;
  path: string;
}

/**
 * 设置项类型定义
 */
export interface SettingsMenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

/**
 * 设置页面属性
 */
export interface SettingsPageProps {
  onClose: () => void;
}

/**
 * 设置项属性
 */
export interface SettingsItemProps {
  title: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
}

/**
 * 标签栏渲染属性
 */
export interface TabBarProps {
  showSettings: boolean;
  onAddTab: () => void;
  onToggleSettings: () => void;
}

/**
 * 终端内容属性
 */
export interface TerminalContentProps {
  id: string;
  defaultContent?: string;
  shellType?: string;
  dimensions?: {
    cols: number;
    rows: number;
  };
}
