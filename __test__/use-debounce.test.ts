import useDebounce from '../src';
import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';

jest.spyOn(global, 'setTimeout');

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

let ABC = 'abc';

describe('useDebounce testing', () => {
  it('should not run callback on initiation.', () => {
    const callback = jest.fn();
    const interval = 1000;
    renderHook(() => useDebounce(callback, interval, [ABC]));
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it("should not run callback after interval if the dependencies didn't change.", () => {
    const callback = jest.fn();
    const interval = 1000;
    renderHook(() => useDebounce(callback, interval, [ABC]));
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(interval);
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should run callback after interval if the dependencies have change.', async () => {
    const callback = jest.fn();
    const interval = 1000;
    const { result } = renderHook(() => useState(true));
    const { rerender } = renderHook(() =>
      useDebounce(callback, interval, [result.current[0]])
    );
    act(() => {
      result.current[1](false);
    });
    rerender();
    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not run callback after interval if the dependencies have not changed.', async () => {
    const callback = jest.fn();
    const interval = 1000;
    const { result } = renderHook(() => useState(true));
    const { rerender } = renderHook(() =>
      useDebounce(callback, interval, [result.current[0]])
    );
    rerender();
    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should not run callback if full interval has not passed and the dependencies have not changed.', async () => {
    const callback = jest.fn();
    const interval = 1000;
    const { result } = renderHook(() => useState(true));
    const { rerender } = renderHook(() =>
      useDebounce(callback, interval, [result.current[0]])
    );
    act(() => {
      result.current[1](false);
    });
    rerender();
    jest.advanceTimersByTime(interval / 2);

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
