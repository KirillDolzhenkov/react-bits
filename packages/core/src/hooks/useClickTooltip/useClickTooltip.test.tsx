import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import useClickTooltip from './useClickTooltip';

function TooltipHarness({
  duration,
  message,
}: {
  duration?: number;
  message: string;
}) {
  const { show, tooltip } = useClickTooltip({ duration, message });

  return (
    <>
      {tooltip}
      <button type="button" onClick={show}>
        trigger
      </button>
    </>
  );
}

function clickTrigger(clientX: number, clientY: number) {
  fireEvent.click(screen.getByRole('button'), { clientX, clientY });
}

describe('useClickTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('returns null tooltip until show is called', () => {
    render(<TooltipHarness message="Copied" />);

    expect(screen.queryByText('Copied')).toBeNull();
    expect(document.querySelector('.click-tooltip')).toBeNull();
  });

  it('portals the message to document.body at the pointer offset', () => {
    render(<TooltipHarness message="Copied" />);

    act(() => {
      clickTrigger(100, 50);
    });

    const tooltip = screen.getByText('Copied');

    expect(tooltip.className).toBe('click-tooltip');
    expect(tooltip.parentElement).toBe(document.body);
    expect(tooltip.style.left).toBe('108px');
    expect(tooltip.style.top).toBe('58px');
  });

  it('hides after the default duration of 500ms', () => {
    render(<TooltipHarness message="Copied" />);

    act(() => {
      clickTrigger(10, 20);
    });

    expect(screen.getByText('Copied')).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(screen.getByText('Copied')).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.queryByText('Copied')).toBeNull();
  });

  it('hides after a custom duration', () => {
    render(<TooltipHarness duration={200} message="Copied" />);

    act(() => {
      clickTrigger(10, 20);
    });

    act(() => {
      vi.advanceTimersByTime(199);
    });

    expect(screen.getByText('Copied')).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(screen.queryByText('Copied')).toBeNull();
  });

  it('resets the hide timer and updates position on repeated show calls', () => {
    render(<TooltipHarness duration={500} message="Copied" />);

    act(() => {
      clickTrigger(10, 20);
      vi.advanceTimersByTime(300);
      clickTrigger(40, 60);
    });

    const tooltip = screen.getByText('Copied');

    expect(tooltip.style.left).toBe('48px');
    expect(tooltip.style.top).toBe('68px');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText('Copied')).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(screen.queryByText('Copied')).toBeNull();
  });

  it('updates the message while the tooltip is open', () => {
    const { rerender } = render(<TooltipHarness message="First" />);

    act(() => {
      clickTrigger(10, 20);
    });

    expect(screen.getByText('First')).toBeTruthy();

    rerender(<TooltipHarness message="Second" />);

    expect(screen.queryByText('First')).toBeNull();
    expect(screen.getByText('Second')).toBeTruthy();
  });

  it('clears the hide timer on unmount', () => {
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { unmount } = render(<TooltipHarness duration={500} message="Copied" />);

    act(() => {
      clickTrigger(10, 20);
    });

    clearSpy.mockClear();
    unmount();

    expect(clearSpy).toHaveBeenCalled();
    expect(document.querySelector('.click-tooltip')).toBeNull();

    clearSpy.mockRestore();
  });

  it('keeps a stable show identity when duration does not change', () => {
    const { result, rerender } = renderHook(() =>
      useClickTooltip({ message: 'Copied' }),
    );

    const first = result.current.show;
    rerender();

    expect(result.current.show).toBe(first);
  });
});
