import * as React from 'react';
import {useId} from 'react';
import {GestureResponderEvent, TouchableHighlightProps} from 'react-native';
import {handleEvent} from '@bearei/react-util/lib/event';

export type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ButtonTouchEvent = React.TouchEvent<HTMLButtonElement>;
export type ButtonPressEvent = GestureResponderEvent;
export type ButtonChildrenProps = ButtonOmitProps;
export type ButtonOmitProps = Omit<ButtonProps, 'renderContainer' | 'renderChildren'>;

/**
 * Button container props.
 */
export interface ButtonContainerProps extends ButtonOmitProps {
  /**
   * The unique ID of the text box component.
   */
  id: string;
}

/**
 * Button props.
 */
export interface ButtonProps
  extends Omit<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
      TouchableHighlightProps,
    'onClick' | 'onTouchEnd' | 'onPress'
  > {
  /**
   * Whether to disable the button.
   */
  disabled?: boolean;

  /**
   * The button is loading.
   */
  loading?: boolean;

  /**
   * The text displayed by the button.
   */
  title?: string;

  /**
   *  Render button container.
   */
  renderContainer?: (props: ButtonContainerProps, element?: React.ReactNode) => React.ReactNode;

  /**
   * Render button children.
   */
  renderChildren?: (
    props: ButtonChildrenProps,
  ) =>
    | React.ReactElement<TouchableHighlightProps>
    | React.ReactElement<
        React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
      >;

  /**
   * The handler that PC browser users call when they click this button.
   */
  onClick?: (e: ButtonClickEvent) => void;

  /**
   * The handler that the mobile browser user calls when the button is clicked.
   */
  onTouchEnd?: (e: ButtonTouchEvent) => void;

  /**
   * React-native the handler that the user calls when the button is clicked.
   */
  onPress?: (e: ButtonPressEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  loading,
  disabled,
  onClick,
  onPress,
  onTouchEnd,
  renderContainer,
  renderChildren,
  ...args
}) => {
  const id = useId();

  function handleResponse<T>(callback: (e: T) => void) {
    const response = !disabled && !loading;

    return (e: T) => response && callback(e);
  }

  const handleClick = handleResponse((e: ButtonClickEvent) => onClick?.(e));
  const handleTouchEnd = handleResponse((e: ButtonTouchEvent) => onTouchEnd?.(e));
  const handPress = handleResponse((e: ButtonPressEvent) => onPress?.(e));

  const childrenElement = (
    <>
      {renderChildren?.({
        ...args,
        loading,
        disabled,
        ...(onClick ? {onClick: handleEvent(handleClick)} : undefined),
        ...(onTouchEnd ? {onTouchEnd: handleEvent(handleTouchEnd)} : undefined),
        ...(onPress ? {onPress: handleEvent(handPress)} : undefined),
      })}
    </>
  );

  const containerElement = renderContainer ? (
    renderContainer?.({...args, id}, childrenElement)
  ) : (
    <>{childrenElement}</>
  );

  return <>{containerElement}</>;
};

export default Button;
