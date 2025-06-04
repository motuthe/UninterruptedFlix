import { renderHook, act } from '@testing-library/react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import useCheckboxState from './useCheckboxState';

describe('useCheckboxState', () => {
  const getMock = jest.fn();
  const setMock = jest.fn();

  beforeEach(() => {
    getMock.mockReset();
    setMock.mockReset();
    (global as any).chrome = {
      storage: { sync: { get: getMock, set: setMock } },
      runtime: { lastError: null },
    };
  });

  it('initializes with value from chrome storage', () => {
    getMock.mockImplementation((key: string, cb: (data: any) => void) => cb({ [key]: true }));

    const { result } = renderHook(() => useCheckboxState('skipIntro'));
    expect(result.current.isChecked).toBe(true);
    expect(getMock).toHaveBeenCalledWith('skipIntro', expect.any(Function));
  });

  it('updates storage and state on change', () => {
    getMock.mockImplementation((key: string, cb: (data: any) => void) => cb({ [key]: false }));

    const { result } = renderHook(() => useCheckboxState('skipIntro'));
    expect(result.current.isChecked).toBe(false);

    const event = { target: { checked: true } } as React.ChangeEvent<HTMLInputElement>;
    act(() => result.current.handleCheckboxChange(event));

    expect(setMock).toHaveBeenCalledWith({ skipIntro: true });
    expect(result.current.isChecked).toBe(true);
  });

  it('logs an error when chrome runtime reports one', () => {
    const error = new Error('fail');
    getMock.mockImplementation((_key: string, cb: (data: any) => void) => {
      (global as any).chrome.runtime.lastError = error;
      cb({});
    });
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useCheckboxState('skipIntro'));

    expect(result.current.isChecked).toBe(false);
    expect(errorSpy).toHaveBeenCalledWith(error);

    errorSpy.mockRestore();
  });

  it('defaults to false when storage has no value', () => {
    getMock.mockImplementation((_key: string, cb: (data: any) => void) => cb({}));

    const { result } = renderHook(() => useCheckboxState('skipIntro'));

    expect(result.current.isChecked).toBe(false);
  });
});
