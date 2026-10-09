import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import useInfiniteScroll from './useInfiniteScroll';

const originalScrollHeight = Object.getOwnPropertyDescriptor(
  document.documentElement,
  'scrollHeight',
);
const originalScrollTop = Object.getOwnPropertyDescriptor(
  document.documentElement,
  'scrollTop',
);
const originalInnerHeight = Object.getOwnPropertyDescriptor(window, 'innerHeight');

function mockScrollMetrics(scrollHeight: number, scrollTop: number, innerHeight: number) {
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    configurable: true,
    value: scrollHeight,
  });
  Object.defineProperty(document.documentElement, 'scrollTop', {
    configurable: true,
    value: scrollTop,
  });
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    value: innerHeight,
  });
}

function restoreScrollMetrics() {
  if (originalScrollHeight) {
    Object.defineProperty(document.documentElement, 'scrollHeight', originalScrollHeight);
  } else {
    delete (document.documentElement as { scrollHeight?: number }).scrollHeight;
  }

  if (originalScrollTop) {
    Object.defineProperty(document.documentElement, 'scrollTop', originalScrollTop);
  } else {
    delete (document.documentElement as { scrollTop?: number }).scrollTop;
  }

  if (originalInnerHeight) {
    Object.defineProperty(window, 'innerHeight', originalInnerHeight);
  } else {
    delete (window as { innerHeight?: number }).innerHeight;
  }
}

describe('useInfiniteScroll', () => {
  afterEach(() => {
    restoreScrollMetrics();
    vi.restoreAllMocks();
  });

  it('calls callback when scrolled near the bottom', () => {
    const callBack = vi.fn();

    renderHook(() =>
      useInfiniteScroll({
        callBack,
        distanceToBottom: 100,
      }),
    );

    // distance to bottom = 1000 - (800 + 150) = 50 < 100
    mockScrollMetrics(1000, 150, 800);

    act(() => {
      document.dispatchEvent(new Event('scroll'));
    });

    expect(callBack).toHaveBeenCalledTimes(1);
  });

  it('does not call callback when far from the bottom', () => {
    const callBack = vi.fn();

    renderHook(() =>
      useInfiniteScroll({
        callBack,
        distanceToBottom: 100,
      }),
    );

    // distance to bottom = 1000 - (500 + 0) = 500 >= 100
    mockScrollMetrics(1000, 0, 500);

    act(() => {
      document.dispatchEvent(new Event('scroll'));
    });

    expect(callBack).not.toHaveBeenCalled();
  });

  it('removes the scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() =>
      useInfiniteScroll({
        callBack: vi.fn(),
      }),
    );

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
