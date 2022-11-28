import type {HandleEvent} from '@bearei/react-util/lib/event';
import handleEvent from '@bearei/react-util/lib/event';
import type {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, Ref, TouchEvent} from 'react';
import {useId} from 'react';
import type {GestureResponderEvent, TouchableHighlightProps} from 'react-native';

/**
 * Base button props
 */
export interface BaseButtonProps<T, E>
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<T>, T> & TouchableHighlightProps,
    'onClick' | 'onTouchEnd' | 'onPress' | 'type'
  > {
  ref?: Ref<T>;

  /**
   * Set button icon component
   */
  icon?: ReactNode;

  /**
   * Whether or not to disable the button
   */
  disabled?: boolean;

  /**
   * Whether the button is loading
   */
  loading?: boolean;

  /**
   * Button to display text
   */
  text?: string;

  /**
   * Set the button size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Set the button shape
   */
  shape?: 'square' | 'circle' | 'round';

  /**
   * Set the button type
   */
  type?: 'primary' | 'secondary' | 'dashed' | 'link' | 'text';

  /**
   * Set the native type value of the HTML button
   */
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];

  /**
   * Set the danger button
   */
  danger?: boolean;

  /**
   * Set the warning button
   */
  warning?: boolean;

  /**
   * A callback when a button is clicked
   */
  onClick?: (e: ButtonClickEvent<T>) => void;

  /**
   * A callback for pressing a button
   */
  onTouchEnd?: (e: ButtonTouchEvent<T>) => void;

  /**
   * A callback for pressing a button -- react native
   */
  onPress?: (e: ButtonPressEvent) => void;
}

/**
 * Button props
 */
export interface ButtonProps<T, E> extends BaseButtonProps<T, E> {
  /**
   * Render the button icon
   */
  renderIcon?: (props: ButtonIconProps<T, E>) => ReactNode;

  /**
   * Render the button main
   */
  renderMain?: (props: ButtonMainProps<T, E>) => ReactNode;

  /**
   * Render the button container
   */
  renderContainer?: (props: ButtonContainerProps<T, E>) => ReactNode;
}

/**
 * Button children props
 */
export interface ButtonChildrenProps<T, E>
  extends Omit<
    ButtonProps<T, E>,
    'icon' | 'ref' | 'renderIcon' | 'renderMain' | 'renderContainer'
  > {
  /**
   * The unique ID of the component
   */
  id: string;
  children?: ReactNode;

  /**
   * Used to handle some common default events
   */
  handleEvent: HandleEvent;
}

export type ButtonClickEvent<T> = React.MouseEvent<T, MouseEvent>;
export type ButtonTouchEvent<T> = TouchEvent<T>;
export type ButtonPressEvent = GestureResponderEvent;

export type ButtonIconProps<T, E> = ButtonChildrenProps<T, E>;
export type ButtonMainProps<T, E> = ButtonChildrenProps<T, E> & Pick<ButtonProps<T, E>, 'ref'>;
export type ButtonContainerProps<T, E> = ButtonChildrenProps<T, E>;

function Button<T, E = React.MouseEvent<T, MouseEvent>>({
  ref,
  icon,
  loading,
  disabled,
  onClick,
  onPress,
  onTouchEnd,
  renderIcon,
  renderMain,
  renderContainer,
  ...props
}: ButtonProps<T, E>) {
  const id = useId();
  const childrenProps = {...props, loading, disabled, id, handleEvent};

  function handleCallback<C>(callback: (e: C) => void) {
    const response = !disabled && !loading;

    return (e: C) => response && callback(e);
  }

  const handleClick = handleCallback((e: ButtonClickEvent<T>) => onClick?.(e));
  const handleTouchEnd = handleCallback((e: ButtonTouchEvent<T>) => onTouchEnd?.(e));
  const handPress = handleCallback((e: ButtonPressEvent) => onPress?.(e));
  const iconNode = icon && renderIcon?.({...childrenProps, children: icon});
  const main = (
    <>
      {iconNode}
      {renderMain?.({
        ...childrenProps,
        ref,
        loading,
        disabled,
        ...(onClick ? {onClick: handleEvent(handleClick)} : undefined),
        ...(onTouchEnd ? {onTouchEnd: handleEvent(handleTouchEnd)} : undefined),
        ...(onPress ? {onPress: handleEvent(handPress)} : undefined),
      })}
    </>
  );

  const container = renderContainer?.({...childrenProps, children: main}) ?? main;

  return <>{container}</>;
}

export default Button;
