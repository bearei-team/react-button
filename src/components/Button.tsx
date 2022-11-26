import {useId} from 'react';
import type {ButtonHTMLAttributes, ReactElement, ReactNode, TouchEvent, Ref} from 'react';
import type {GestureResponderEvent, TouchableHighlightProps} from 'react-native';
import handleEvent from '@bearei/react-util/lib/event';
import type {HandleEvent} from '@bearei/react-util/lib/event';

/**
 * Base button props
 */
export interface BaseButtonProps<T>
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement> & TouchableHighlightProps,
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
export interface ButtonProps<T> extends BaseButtonProps<T> {
  /**
   * Render the button icon
   */
  renderIcon?: (props: ButtonIconProps<T>) => ReactNode;

  /**
   * Render the button main
   */
  renderMain?: (props: ButtonMainProps<T>) => ReactElement<T>;

  /**
   * Render the button container
   */
  renderContainer?: (props: ButtonContainerProps<T>) => ReactNode;
}

/**
 * Button children props
 */
export interface ButtonChildrenProps<T> extends Omit<BaseButtonProps<T>, 'icon' | 'ref'> {
  /**
   * Unique ID of card component
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

export type ButtonIconProps<T> = ButtonChildrenProps<T>;
export type ButtonMainProps<T> = ButtonChildrenProps<T> & Pick<ButtonProps<T>, 'ref'>;
export type ButtonContainerProps<T> = ButtonChildrenProps<T>;

function Button<T = HTMLButtonElement>({
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
}: ButtonProps<T>) {
  const id = useId();
  const childrenProps = {...props, loading, disabled, id, handleEvent};

  function handleCallback<E>(callback: (e: E) => void) {
    const response = !disabled && !loading;

    return (e: E) => response && callback(e);
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
