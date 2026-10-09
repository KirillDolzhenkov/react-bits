import { afterEach, describe, expect, it, vi } from 'vitest';

import copyToClipboard from './copyToClipboard';

describe('copyToClipboard', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns true when writeText resolves', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    await expect(copyToClipboard('sku')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('sku');
  });

  it('returns false when writeText rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    await expect(copyToClipboard('sku')).resolves.toBe(false);
  });

  it('returns false when clipboard API is missing', async () => {
    vi.stubGlobal('navigator', {});

    await expect(copyToClipboard('sku')).resolves.toBe(false);
  });
});
