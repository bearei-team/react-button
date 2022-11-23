# react-button

A basic button component that supports react and native react.

## Installation

> yarn add @bearei/react-button --save

## Use

```typescript
import React from 'React';
import ReactDOM from 'react-dom';
import Button from '@bearei/react-button';

const Button = (
  <Button
    renderContainer={({id}, element) => (
      <div data-cy="container" id={id} tabIndex={1}>
        {element}
      </div>
    )}
    renderChildren={props => (
      <button {...props} data-cy="button" type="reset">
        "button"
      </button>
    )}
  />
);

ReactDOM.render(Button, container);
```
