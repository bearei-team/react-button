import {bindEvents, handleDefaultEvent} from '@bearei/react-util/lib/event';
import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, Ref, TouchEvent, useId} from 'react';
import type {GestureResponderEvent, TouchableHighlightProps} from 'react-native';

/**
 * Base button props
 */
export interface BaseButtonProps<T = HTMLElement>
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<T>, T> & TouchableHighlightProps,
    'onClick' | 'onTouchEnd' | 'onPress' | 'type'
  > {
  /**
   * Custom ref
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
   * Call this function back when you click the button
   */
  onClick?: (e: React.MouseEvent<T, MouseEvent>) => void;

  /**
   * Call this function after pressing the button
   */
  onTouchEnd?: (e: TouchEvent<T>) => void;

  /**
   * Call this function after pressing the button -- react native
   */
  onPress?: (e: GestureResponderEvent) => void;
}

/**
 * Button props
 */
export interface ButtonProps<T> extends BaseButtonProps<T> {
  /**
   * Render the button icon
   */
  renderIcon?: (props: ButtonIconProps) => ReactNode;

  /**
   * Render the button main
   */
  renderMain?: (props: ButtonMainProps<T>) => ReactNode;

  /**
   * Render the button container
   */
  renderContainer?: (props: ButtonContainerProps) => ReactNode;
}

/**
 * Button children props
 */
export interface ButtonChildrenProps extends Omit<BaseButtonProps, 'ref'> {
  /**
   * Component unique ID
   */
  id: string;
  children?: ReactNode;
}

export type ButtonIconProps = ButtonChildrenProps;
export type ButtonMainProps<T> = ButtonChildrenProps & Pick<BaseButtonProps<T>, 'ref'>;
export type ButtonContainerProps = ButtonChildrenProps;

const Button = <T extends HTMLElement>(props: ButtonProps<T>) => {
  const {
    ref,
    icon,
    loading,
    disabled,
    renderIcon,
    renderMain,
    renderContainer,
    onClick,
    onPress,
    onTouchEnd,
    ...args
  } = props;

  const id = useId();
  const events = Object.keys(props).filter(key => key.startsWith('on'));
  const childrenProps = {...args, loading, disabled, id};
  const handleCallback = (key: string) => {
    const handleResponse = <E,>(e: E, callback?: (e: E) => void) => {
      const response = !loading && !disabled;

      response && callback?.(e);
    };

    const event = {
      onClick: handleDefaultEvent((e: React.MouseEvent<T, MouseEvent>) =>
        handleResponse(e, onClick),
      ),
      onTouchEnd: handleDefaultEvent((e: TouchEvent<T>) => handleResponse(e, onTouchEnd)),
      onPress: handleDefaultEvent((e: GestureResponderEvent) => handleResponse(e, onPress)),
    };

    return event[key as keyof typeof event];
  };

  const iconNode = icon && renderIcon?.({...childrenProps, children: icon});
  const main = renderMain?.({
    ...childrenProps,
    ref,
    loading,
    disabled,
    ...bindEvents(events, handleCallback),
  });

  const content = (
    <>
      {iconNode}
      {main}
    </>
  );

  const container = renderContainer?.({...childrenProps, children: content});

  return <>{container}</>;
};

export default Button;
