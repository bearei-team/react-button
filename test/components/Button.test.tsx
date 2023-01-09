import { pickHTMLAttributes } from '@bearei/react-util';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Button from '../../src/components/Button';
import { render } from '../utils/test-utils';

describe('test/components/Button.test.ts', () => {
  test('It should be a render button', async () => {
    const { getByDataCy } = render(
      <Button
        content="button"
        icon={<i>"icon"</i>}
        renderIcon={({ children }) => <i data-cy="icon">{children}</i>}
        renderMain={({ content, icon, ...props }) => (
          <>
            {icon}
            <button
              {...pickHTMLAttributes(props)}
              data-cy="button"
              type="reset"
            >
              {content}
            </button>
          </>
        )}
        renderContainer={({ id, children }) => (
          <div data-cy="container" data-id={id} tabIndex={1}>
            {children}
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

    const { getByDataCy } = render(
      <Button
        onClick={e => (eventType = e?.type)}
        renderMain={({ ...props }) => (
          <button {...pickHTMLAttributes(props)} data-cy="button" type="reset">
            "button"
          </button>
        )}
        renderContainer={({ children }) => <div>{children}</div>}
      />,
    );

    await user.click(getByDataCy('button'));
    expect(eventType).toEqual('click');
  });

  test('It should be a disabled button', async () => {
    const user = userEvent.setup();
    let eventType!: string | undefined;

    const { getByDataCy } = render(
      <Button
        onClick={e => (eventType = e?.type)}
        disabled
        renderMain={({ ...props }) => (
          <button {...pickHTMLAttributes(props)} data-cy="button" type="reset">
            "button"
          </button>
        )}
        renderContainer={({ children }) => <div>{children}</div>}
      />,
    );

    await user.click(getByDataCy('button'));
    expect(eventType).toEqual(undefined);
  });

  test('It should be the button loading', async () => {
    const user = userEvent.setup();
    let eventType!: string | undefined;

    const { getByDataCy } = render(
      <Button
        onClick={e => (eventType = e?.type)}
        loading
        renderMain={({ ...props }) => (
          <button {...pickHTMLAttributes(props)} data-cy="button" type="reset">
            "button"
          </button>
        )}
        renderContainer={({ children }) => <div>{children}</div>}
      />,
    );

    await user.click(getByDataCy('button'));
    expect(eventType).toEqual(undefined);
  });
});
