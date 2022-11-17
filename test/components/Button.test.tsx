import '@testing-library/jest-dom';
import {render} from '../test_utils';
import {Button} from '../../src/components/Button';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('test/components/Button.test.ts', () => {
  test('It should be a render button', async () => {
    const user = userEvent.setup();
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

    await user.click(getByDataCy('button-1'));
    expect(eventType).toEqual('click');
  });

  test('It should be a disabled button', () => {
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Button onClick={e => (eventType = e?.type)} disabled>
        <button data-cy="button-1" type="reset">
          "button"
        </button>
      </Button>,
    );

    expect(getByDataCy('button-1')).toHaveAttribute('type');
    expect(getByDataCy('button-1')).toHaveTextContent('button');

    getByDataCy('button-1');

    expect(eventType).toEqual(undefined);
  });
});
