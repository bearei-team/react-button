import {useId} from 'react';
import type {ButtonHTMLAttributes, ReactElement, ReactNode, TouchEvent, Ref} from 'react';
import type {GestureResponderEvent, TouchableHighlightProps} from 'react-native';
import handleEvent from '@bearei/react-util/lib/event';
import type {HandleEvent} from '@bearei/react-util/lib/event';

/**
 * Button props
 */
export interface BaseButtonProps<T>
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement> & TouchableHighlightProps,
    'onClick' | 'onTouchEnd' | 'onPress' | 'type' | 'ref'
  > {
  /**
   * Custom button ref
   */
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
  onClick?: (e: ButtonClickEvent) => void;

  /**
   * A callback for pressing a button
   */
  onTouchEnd?: (e: ButtonTouchEvent) => void;

  /**
   * A callback for pressing a button -- react native
   */
  onPress?: (e: ButtonPressEvent) => void;
}

export interface ButtonProps<T> extends BaseButtonProps<T> {
  /**
   * Render the button icon
   */
  renderIcon?: (props: ButtonIconProps<T>, element?: ReactNode) => ReactNode;

  /**
   * Render the button main
   */
  renderMain?: (props: ButtonMainProps<T>) => ReactElement<T>;

  /**
   * Render the button container
   */
  renderContainer?: (props: ButtonContainerProps<T>, element?: ReactNode) => ReactNode;
}

/**
 * Button children props
 */
export interface ButtonChildrenProps<T> extends Omit<BaseButtonProps<T>, 'icon' | 'ref'> {
  /**
   * Unique ID of card component
   */
  id: string;

  /**
   * Used to handle some common default events
   */
  handleEvent: HandleEvent;
}

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ButtonTouchEvent = TouchEvent<HTMLButtonElement>;
export type ButtonPressEvent = GestureResponderEvent;
export type ButtonIconProps<T> = ButtonChildrenProps<T>;
export interface ButtonMainProps<T> extends ButtonChildrenProps<T> {
  ref?: Ref<T>;
}

export type ButtonContainerProps<T> = ButtonChildrenProps<T>;

function Button<T>({
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

  const handleClick = handleCallback((e: ButtonClickEvent) => onClick?.(e));
  const handleTouchEnd = handleCallback((e: ButtonTouchEvent) => onTouchEnd?.(e));
  const handPress = handleCallback((e: ButtonPressEvent) => onPress?.(e));
  const iconElement = <>{icon && renderIcon?.(childrenProps, icon)}</>;
  const mainElement = (
    <>
      {iconElement}
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

  const containerElement = <>{renderContainer?.(childrenProps, mainElement) ?? mainElement}</>;

  return <>{containerElement}</>;
}

export default Button;
