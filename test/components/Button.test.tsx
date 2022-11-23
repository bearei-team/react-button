import '@testing-library/jest-dom';
import {render} from '../utils/testUtils';
import Button from '../../src/components/Button';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('test/components/Button.test.ts', () => {
  test('It should be a render button', async () => {
    const {getByDataCy} = render(
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
      />,
    );

    expect(getByDataCy('container')).toHaveAttribute('tabIndex');
    expect(getByDataCy('button')).toHaveAttribute('type');
    expect(getByDataCy('button')).toHaveTextContent('button');
  });

  test('It should be a button click', async () => {
    const user = userEvent.setup();
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Button
        onClick={e => (eventType = e?.type)}
        renderChildren={props => (
          <button {...props} data-cy="button-1" type="reset">
            "button"
          </button>
        )}
      />,
    );

    await user.click(getByDataCy('button-1'));
    expect(eventType).toEqual('click');
  });

  test('It should be a disabled button', async () => {
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Button
        onClick={e => {
          console.info(e);
          eventType = e?.type;
        }}
        disabled
        renderChildren={props => (
          <button {...props} data-cy="button-1" type="reset">
            "button"
          </button>
        )}
      />,
    );

    getByDataCy('button-1');
    expect(eventType).toEqual(undefined);
  });
});
