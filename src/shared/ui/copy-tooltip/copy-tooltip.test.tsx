import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import copyToClipboard from '../../lib/copyToClipboard';

import CopyTooltip from './copy-tooltip';

vi.mock('../../lib/copyToClipboard', () => ({
  default: vi.fn(),
}));

const mockedCopy = vi.mocked(copyToClipboard);

describe('CopyTooltip', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('copies text on click', async () => {
    mockedCopy.mockResolvedValue(true);

    render(
      <CopyTooltip text="sku-1">
        <button type="button">sku</button>
      </CopyTooltip>,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(mockedCopy).toHaveBeenCalledWith('sku-1');
  });

  it('shows the tooltip when copy succeeds', async () => {
    mockedCopy.mockResolvedValue(true);

    render(
      <CopyTooltip text="sku-1">
        <button type="button">sku</button>
      </CopyTooltip>,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(screen.getByText('Copied')).toBeTruthy();
  });

  it('does not show the tooltip when copy fails', async () => {
    mockedCopy.mockResolvedValue(false);

    render(
      <CopyTooltip text="sku-1">
        <button type="button">sku</button>
      </CopyTooltip>,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(screen.queryByText('Copied')).toBeNull();
  });

  it('still calls the child onClick', async () => {
    mockedCopy.mockResolvedValue(true);
    const onClick = vi.fn();

    render(
      <CopyTooltip text="sku-1">
        <button type="button" onClick={onClick}>
          sku
        </button>
      </CopyTooltip>,
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
