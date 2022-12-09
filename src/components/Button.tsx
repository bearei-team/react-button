import {bindEvents, handleDefaultEvent} from '@bearei/react-util/lib/event';
import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode, Ref, TouchEvent, useId} from 'react';
import type {GestureResponderEvent, TouchableHighlightProps} from 'react-native';

/**
 * Base button props
 */
export interface BaseButtonProps<T = HTMLButtonElement>
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<T>, T> & TouchableHighlightProps,
    'onClick' | 'onTouchEnd' | 'onPress' | 'type'
  > {
  /**
   * Custom ref
   */
  ref?: Ref<T>;

  /**
   * Button item icon
   */
  icon?: ReactNode;

  /**
   *  Whether or not to disable the button
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
   * Button size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Button shape
   */
  shape?: 'square' | 'circle' | 'round';

  /**
   * Button type
   */
  type?: 'primary' | 'secondary' | 'dashed' | 'link' | 'text';

  /**
   * HTML native button type
   */
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];

  /**
   * Danger button
   */
  danger?: boolean;

  /**
   * Warning button
   */
  warning?: boolean;

  /**
   * This function is called when button is clicked
   */
  onClick?: (e: React.MouseEvent<T, MouseEvent>) => void;

  /**
   * This function is called when the button is pressed
   */
  onTouchEnd?: (e: TouchEvent<T>) => void;

  /**
   * This function is called when the button is pressed -- react native
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
  renderMain: (props: ButtonMainProps<T>) => ReactNode;

  /**
   * Render the button container
   */
  renderContainer: (props: ButtonContainerProps) => ReactNode;
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

const Button = <T extends HTMLButtonElement>(props: ButtonProps<T>) => {
  const {
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
    ...args
  } = props;

  const id = useId();
  const events = Object.keys(props).filter(key => key.startsWith('on'));
  const childrenProps = {...args, loading, disabled, id};
  const handleResponse = <E,>(e: E, callback?: (e: E) => void) => {
    const isResponse = !loading && !disabled;

    isResponse && callback?.(e);
  };

  const handleCallback = (key: string) => {
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
  const main = renderMain({
    ...childrenProps,
    ref,
    loading,
    disabled,
    ...bindEvents(events, handleCallback),
    icon: iconNode,
  });

  const container = renderContainer({...childrenProps, children: main});

  return <>{container}</>;
};

export default Button;
