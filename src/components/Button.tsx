import * as React from 'react';
import {useId} from 'react';
import {GestureResponderEvent, TouchableHighlightProps} from 'react-native';
import {handleEvent} from '@bearei/react-util/lib/event';

/**
 * Button props
 */
export interface ButtonProps
  extends Omit<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
      TouchableHighlightProps,
    'onClick' | 'onTouchEnd' | 'onPress'
  > {
  /**
   * Set button icon component
   */
  icon?: React.ReactNode;

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
   * Render the button icon
   */
  renderIcon?: (props: ButtonIconProps, element?: React.ReactNode) => React.ReactNode;

  /**
   * Render the button main
   */
  renderMain?: (
    props: ButtonMainProps,
  ) =>
    | React.ReactElement<TouchableHighlightProps>
    | React.ReactElement<
        React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
      >;

  /**
   * Render the button container
   */
  renderContainer?: (props: ButtonContainerProps, element?: React.ReactNode) => React.ReactNode;

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

/**
 * Button children props
 */
export interface ButtonChildrenProps
  extends Omit<ButtonProps, 'renderContainer' | 'renderMain' | 'renderIcon' | 'icon' | 'ref'> {
  /**
   * Unique ID of card component
   */
  id: string;

  /**
   * Used to handle some common default events
   */
  handleEvent: typeof handleEvent;
}

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ButtonTouchEvent = React.TouchEvent<HTMLButtonElement>;
export type ButtonPressEvent = GestureResponderEvent;
export type ButtonIconProps = ButtonChildrenProps;
export type ButtonMainProps = Pick<ButtonProps, 'ref'> & ButtonChildrenProps;
export type ButtonContainerProps = ButtonChildrenProps;

const Button: React.FC<ButtonProps> = ({
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
}) => {
  const id = useId();
  const childrenProps = {...args, loading, disabled, id, handleEvent};

  function handleResponse<T>(callback: (e: T) => void) {
    const response = !disabled && !loading;

    return (e: T) => response && callback(e);
  }

  const handleClick = handleResponse((e: ButtonClickEvent) => onClick?.(e));
  const handleTouchEnd = handleResponse((e: ButtonTouchEvent) => onTouchEnd?.(e));
  const handPress = handleResponse((e: ButtonPressEvent) => onPress?.(e));
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

  const containerElement = (
    <>{renderContainer ? renderContainer?.(childrenProps, mainElement) : mainElement}</>
  );

  return <>{containerElement}</>;
};

export default Button;
