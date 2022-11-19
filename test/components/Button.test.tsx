import '@testing-library/jest-dom';
import {render} from '../utils/testUtils';
import {Button} from '../../src/components/Button';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('test/components/Button.test.ts', () => {
  test('It should be a render button', async () => {
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Button onClick={e => (eventType = e?.type)}>
        <button data-cy="button-1" type="reset">
          "button"
        </button>
      </Button>,
    );

    expect(getByDataCy('button-1')).toHaveAttribute('type');
    expect(getByDataCy('button-1')).toHaveTextContent('button');
  });

  test('It should be a button click', async () => {
    const user = userEvent.setup();
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Button onClick={e => (eventType = e?.type)}>
        <button data-cy="button-1" type="reset">
          "button"
        </button>
      </Button>,
    );

    await user.click(getByDataCy('button-1'));
    expect(eventType).toEqual('click');
  });

  test('It should be a disabled button', async () => {
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Button onClick={e => (eventType = e?.type)} disabled>
        <button data-cy="button-1" type="reset">
          "button"
        </button>
      </Button>,
    );

    getByDataCy('button-1');

    expect(eventType).toEqual(undefined);
  });
});
