import * as React from 'react';
import {getPlatformEvent, HandleEvent} from '@bearei/react-util';

/**
 * Button props.
 */
export interface ButtonProps {
  /**
   * HTML Button type-only works in a browser environment.
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Whether to disable the button.
   */
  disabled?: boolean;

  /**
   * The button is loaded or not.
   */
  loading?: boolean;
  children?: JSX.Element;

  /**
   * Listening for clicks.
   */
  onClick?: (e?: HandleEvent) => void;

  /**
   * Listen for mobile compressions.
   */
  onTouchEnd?: (e?: HandleEvent) => void;

  /**
   * Listen for native press events.
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
