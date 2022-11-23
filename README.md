# react-button

A basic button component that supports react and native react.

## Installation

> yarn add @bearei/react-button --save

## Parameters

| Name | Type | Required | Description |
| :-- | --: | --: | :-- |
| icon | ReactNode | ✘ | Set button icon component |
| disabled | boolean | ✘ | Whether or not to disable the button |
| loading | boolean | ✘ | Whether the button is loading |
| text | string | ✘ | Button to display text |
| size | 'small','medium','large' | ✘ | Set the button size |
| shape | 'square','circle','round' | ✘ | Set the button shape |
| renderIcon | function(props,element) | ✘ | Render the button icon |
| renderMain | function(props) | ✘ | Render the button main |
| renderContainer | function(props,element) | ✘ | Render the button container |
| onClick | function(e) | ✘ | A callback when a button is clicked |
| onTouchEnd | function(e) | ✘ | A callback for pressing a button |
| onPress | function(e) | ✘ | A callback for pressing a button -- react native |

## Use

```typescript
import React from 'React';
import ReactDOM from 'react-dom';
import Button from '@bearei/react-button';

const button = (
  <Button
    text="button"
    icon={<i>"icon"</i>}
    renderIcon={(_props, element) => <i data-cy="icon">{element}</i>}
    renderMain={({text, handleEvent, ...props}) => (
      <button {...props} data-cy="button" type="reset">
        {text}
      </button>
    )}
    renderContainer={({id}, element) => (
      <div data-cy="container" data-id={id} tabIndex={1}>
        {element}
      </div>
    )}
  />
);

ReactDOM.render(button, container);
```
