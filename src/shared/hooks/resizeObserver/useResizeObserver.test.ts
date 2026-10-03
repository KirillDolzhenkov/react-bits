import type { RefObject } from 'react';
import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import useResizeObserver from './useResizeObserver';

type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver,
) => void;

function refOf(element: Element | null): RefObject<Element | null> {
  return { current: element };
}

describe('useResizeObserver', () => {
  let observerCallback: ResizeObserverCallback | null = null;
  const observe = vi.fn();
  const disconnect = vi.fn();

  beforeEach(() => {
    observerCallback = null;
    observe.mockClear();
    disconnect.mockClear();

    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: ResizeObserverCallback) {
          observerCallback = cb;
        }

        observe = observe;
        disconnect = disconnect;
        unobserve = vi.fn();
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('does nothing when ref.current is null', () => {
    renderHook(() => useResizeObserver(refOf(null), vi.fn()));

    expect(observe).not.toHaveBeenCalled();
  });

  it('observes the element and calls callback on resize', () => {
    const element = document.createElement('div');
    const callback = vi.fn();
    const entry = { contentRect: { width: 100, height: 50 } } as ResizeObserverEntry;

    renderHook(() => useResizeObserver(refOf(element), callback));

    expect(observe).toHaveBeenCalledWith(element);
    expect(observerCallback).not.toBeNull();

    observerCallback?.([entry], {} as ResizeObserver);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(entry, expect.any(Object));
  });

  it('disconnects on unmount', () => {
    const element = document.createElement('div');
    const { unmount } = renderHook(() => useResizeObserver(refOf(element), vi.fn()));

    unmount();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
