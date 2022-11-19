import * as React from 'react';
import {getPlatformEvent, HandleEvent} from '@bearei/react-util';

/**
 * 按钮 Props
 */
export interface ButtonProps {
  /**
   * HTML Button 类型 -- 只在浏览器环境中生效
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * 是否禁用按钮
   */
  disabled?: boolean;

  /**
   * 是否在加载状态
   */
  loading?: boolean;

  /**
   * 按钮子级
   */
  children?: JSX.Element;

  /**
   * 监听点击
   */
  onClick?: (e?: HandleEvent) => void;

  /**
   * 监听移动端按压
   */
  onTouchEnd?: (e?: HandleEvent) => void;

  /**
   * 监听RN按压
   */
  onPress?: (e?: HandleEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled = false,
  children,
  onClick,
  onPress,
  onTouchEnd,
}) => {
  const handleUserEvent = (e?: HandleEvent) => {
    if (!disabled && !loading) {
      onClick?.(e);
      onTouchEnd?.(e);
      onPress?.(e);
    }
  };

  return <>{children && React.cloneElement(children, getPlatformEvent(handleUserEvent))}</>;
};
