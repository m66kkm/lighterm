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
 * 连接状态枚举
 */
export enum ConnectionState {
  Connected = "已连接",
  Disconnected = "断线"
}

/**
 * 连接模式枚举
 */
export enum ConnectionMode {
  Remote = "远程",
  Local = "本地"
}

/**
 * Shell类型枚举
 */
export enum ShellType {
  Cmd = "cmd",
  PowerShell = "powershell",
  Zsh = "zsh"
}

/**
 * 会话状态接口
 */
export interface SessionStatus {
  connectionState: ConnectionState;
  connectionMode: ConnectionMode;
  shellType: ShellType;
}

/**
 * 光标位置接口
 */
export interface CursorPosition {
  x: number;
  y: number;
}

/**
 * 窗口尺寸接口
 */
export interface WindowDimensions {
  cols: number;
  rows: number;
}

/**
 * 终端内容状态接口
 */
export interface ContentStatus {
  dimensions: WindowDimensions;
  position: CursorPosition;
}

/**
 * 终端内容属性
 */
export interface TerminalContentProps {
  id: string;
  defaultContent?: string;
  sessionStatus?: SessionStatus;
  dimensions?: WindowDimensions; // 用于向后兼容
  contentStatus?: ContentStatus;
}

/**
 * 终端底部状态栏属性
 */
export interface TerminalFooterProps {
  sessionStatus: SessionStatus;
  contentStatus: ContentStatus;
}
