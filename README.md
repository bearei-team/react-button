# react-button

A basic button component that supports react and native react.

## Installation

> yarn add @bearei/react-button --save

## Use

```typescript
import React from 'React';
import ReactDOM from 'react-dom';
import Button from '@bearei/react-button';

const ButtonComponent = (
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

ReactDOM.render(ButtonComponent, container);
```
