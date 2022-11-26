# react-button

A basic button component that supports react and native react.

## Installation

> yarn add @bearei/react-button --save

## Parameters

| Name | Type | Required | Description |
| :-- | --: | --: | :-- |
| icon | `ReactNode` | ✘ | Set button icon component |
| disabled | `boolean` | ✘ | Whether or not to disable the button |
| loading | `boolean` | ✘ | Whether the button is loading |
| text | `string` | ✘ | Button to display text |
| size | `small` `medium` `large` | ✘ | Set the button size |
| shape | `square` `circle` `round` | ✘ | Set the button shape |
| type | `primary` `secondary` `dashed` `link` `text` | ✘ | Set the button type |
| htmlType | `ButtonHTMLAttributes<HTMLButtonElement>['type']` | ✘ | Set the native type value of the HTML button |
| danger | `boolean` | ✘ | Set the danger button |
| warning | `boolean` | ✘ | Set the warning button |
| onClick | `(e: ButtonClickEvent) => void` | ✘ | A callback when a button is clicked |
| onTouchEnd | `(e: ButtonTouchEvent) => void` | ✘ | A callback for pressing a button |
| onPress | `(e: ButtonPressEvent) => void` | ✘ | A callback for pressing a button -- react native |
| renderIcon | `(props: ButtonIconProps) => ReactNode` | ✘ | Render the button icon |
| renderMain | `(props: ButtonMainProps) => ReactNode` | ✘ | Render the button main |
| renderContainer | `(props: ButtonContainerProps) => ReactNode` | ✘ | Render the button container |

## Use

```typescript
import React from 'React';
import ReactDOM from 'react-dom';
import Button from '@bearei/react-button';

const button = (
  <Button<HTMLButtonElement>
    text="button"
    icon={<i>"icon"</i>}
    renderIcon={({children}) => <i data-cy="icon">{children}</i>}
    renderMain={({text, ...props}) => (
      <button {...pickHTMLAttributes(props)} data-cy="button" type="reset">
        {text}
      </button>
    )}
    renderContainer={({id, children}) => (
      <div data-cy="container" data-id={id} tabIndex={1}>
        {children}
      </div>
    )}
  />
);

ReactDOM.render(button, container);
```
