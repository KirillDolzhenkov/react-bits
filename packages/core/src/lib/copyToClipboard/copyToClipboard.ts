/**
 * Copies plain text to the clipboard via the Clipboard API.
 * Requires a secure context (HTTPS or localhost) and a user gesture.
 *
 * @param {string} text - Payload to write.
 * @returns {Promise<boolean>} `true` if the write succeeded, otherwise `false`.
 *
 * @example
 * const copied = await copyToClipboard(sku);
 */
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

export default copyToClipboard;
