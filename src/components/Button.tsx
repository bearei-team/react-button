import React from 'react';
import {GestureResponderEvent} from 'react-native';

/**
 * 处理事件
 */
export type HandleEvent =
  | React.MouseEvent<HTMLButtonElement, MouseEvent>
  | React.TouchEvent<HTMLButtonElement>
  | GestureResponderEvent;

/**
 * 按钮 Props
 */
export interface ButtonProps {
  /**
   * RN 按压事件
   */
  onPress?: (event?: GestureResponderEvent) => void;

  /**
   * 浏览器点击事件
   */
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  /**
   * 移动端按压事件
   */
  onTouchEnd?: (event?: React.TouchEvent<HTMLButtonElement>) => void;

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
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  loading = false,
  onPress,
  onClick,
  onTouchEnd,
}) => {
  const handleEvent = (e: HandleEvent) => {
    e.preventDefault?.();
    e.stopPropagation?.();

    return !disabled && !loading;
  };

  const handlePress = (e: GestureResponderEvent) => handleEvent(e) && onPress?.(e);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    handleEvent(e) && onClick?.(e);

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) =>
    handleEvent(e) && onTouchEnd?.(e);

  return (
    <>
      {children &&
        React.cloneElement(children, {
          ...(onPress && typeof global !== 'undefined' ? {onPress: handlePress} : undefined),
          ...(onClick ? {onClick: handleClick} : undefined),
          ...(onTouchEnd ? {onTouchEnd: handleTouchEnd} : undefined),
        })}
    </>
  );
};
