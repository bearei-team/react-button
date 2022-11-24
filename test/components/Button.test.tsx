import '@testing-library/jest-dom';
import {render} from '../utils/testUtils';
import Button from '../../src/components/Button';
import React from 'react';
import userEvent from '@testing-library/user-event';
import {pickHTMLAttributes} from '@bearei/react-util';

describe('test/components/Button.test.ts', () => {
  test('It should be a render button', async () => {
    const {getByDataCy} = render(
      <Button<HTMLButtonElement>
        text="button"
        icon={<i>"icon"</i>}
        renderIcon={(_props, element) => <i data-cy="icon">{element}</i>}
        renderMain={({text, ...props}) => (
          <button {...pickHTMLAttributes(props)} data-cy="button" type="reset">
            {text}
          </button>
        )}
        renderContainer={({id}, element) => (
          <div data-cy="container" data-id={id} tabIndex={1}>
            {element}
          </div>
        )}
      />,
    );

    expect(getByDataCy('container')).toHaveAttribute('tabIndex');
    expect(getByDataCy('button')).toHaveAttribute('type');
    expect(getByDataCy('button')).toHaveTextContent('button');
    expect(getByDataCy('icon')).toHaveTextContent('icon');
  });

  test('It should be a button click', async () => {
    const user = userEvent.setup();
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Button<HTMLButtonElement>
        onClick={e => (eventType = e?.type)}
        renderMain={({...props}) => (
          <button {...pickHTMLAttributes(props)} data-cy="button" type="reset">
            "button"
          </button>
        )}
      />,
    );

    await user.click(getByDataCy('button'));
    expect(eventType).toEqual('click');
  });

  test('It should be a disabled button', async () => {
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Button<HTMLButtonElement>
        onClick={e => (eventType = e?.type)}
        disabled
        renderMain={({...props}) => (
          <button {...pickHTMLAttributes(props)} data-cy="button" type="reset">
            "button"
          </button>
        )}
      />,
    );

    getByDataCy('button');
    expect(eventType).toEqual(undefined);
  });

  test('It should be the button loading', async () => {
    let eventType!: string | undefined;

    const {getByDataCy} = render(
      <Button<HTMLButtonElement>
        onClick={e => (eventType = e?.type)}
        loading
        renderMain={({...props}) => (
          <button {...pickHTMLAttributes(props)} data-cy="button" type="reset">
            "button"
          </button>
        )}
      />,
    );

    getByDataCy('button');
    expect(eventType).toEqual(undefined);
  });
});
