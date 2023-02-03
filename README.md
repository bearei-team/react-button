# react-button

Base button components that support React and React native

## Installation

> yarn add @bearei/react-button --save

## Parameters

| Name | Type | Required | Description |
| :-- | --: | --: | :-- |
| icon | `ReactNode` | ✘ | Button icon |
| disabled | `boolean` | ✘ | Whether or not to disable the button |
| loading | `boolean` | ✘ | Whether the button is loading |
| content | `ReactNode` | ✘ | Button to display content |
| size | `small` `medium` `large` | ✘ | Button size |
| color | `string` | ✘ | Button color |
| border | `boolean` | ✘ | Whether or not to display the button border |
| shape | `square` `circle` `round` | ✘ | Button shape |
| type | `default` `primary` `secondary` `dashed` `ghost` `link` `text` | ✘ | Button type |
| htmlType | `ButtonHTMLAttributes<HTMLButtonElement>['type']` | ✘ | HTML native button type |
| danger | `boolean` | ✘ | Danger button |
| warning | `boolean` | ✘ | Warning button |
| onClick | `(e: React.MouseEvent) => void` | ✘ | This function is called when button is clicked |
| onTouchEnd | `(e: React.TouchEvent) => void` | ✘ | This function is called when the button is pressed |
| onPress | `(e: GestureResponderEvent) => void` | ✘ | This function is called when the button is pressed -- react native |
| renderIcon | `(props: ButtonIconProps) => ReactNode` | ✘ | Render the button icon |
| renderMain | `(props: ButtonMainProps) => ReactNode` | ✔ | Render the button main |
| renderContainer | `(props: ButtonContainerProps) => ReactNode` | ✔ | Render the button container |

## Use

```typescript
import React from 'React';
import ReactDOM from 'react-dom';
import Button from '@bearei/react-button';

const button = (
  <Button
    content="button"
    icon={<i>"icon"</i>}
    renderIcon={({ children }) => <i>{children}</i>}
    renderMain={({ content, ...props }) => (
      <button {...props} type="reset">
        {content}
      </button>
    )}
    renderContainer={({ id, children }) => (
      <div data-id={id} tabIndex={1}>
        {children}
      </div>
    )}
  />
);

ReactDOM.render(button, container);
```
