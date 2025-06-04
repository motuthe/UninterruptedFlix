import { renderHook, act } from '@testing-library/react';
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
});
