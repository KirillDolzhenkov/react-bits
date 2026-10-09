import * as React from 'react';

import useClickTooltip from '../../hooks/useClickTooltip';
import copyToClipboard from '../../lib/copyToClipboard';

import type { CopyTooltipProps } from './copy-tooltip.props';

/**
 * Copies `text` to the clipboard on click and shows a tooltip at the pointer.
 * Renders a single child; `onClick` is merged via `cloneElement`.
 *
 * @param {CopyTooltipProps} props
 * @param {React.ReactElement} props.children Clickable element.
 * @param {number} [props.duration] Tooltip duration in milliseconds.
 * @param {string} [props.message='Copied'] Tooltip text. Pass a translated string from the app.
 * @param {string} props.text Clipboard payload.
 *
 * @example
 * <CopyTooltip text={sku} message={t('copied')}>
 *   <button type="button">{sku}</button>
 * </CopyTooltip>
 */
const CopyTooltip = (props: CopyTooltipProps) => {
  const {
    children,
    duration,
    message = 'Copied',
    text,
  } = props;

  const {
    show,
    tooltip,
  } = useClickTooltip({
    duration,
    message,
  });

  const child = React.Children.only(children);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    if (typeof child.props.onClick === 'function') {
      child.props.onClick(event);
    }

    const copied = await copyToClipboard(text);
    if (copied) {
      show(event);
    }
  };

  return (
    <>
      {tooltip}
      {React.cloneElement(child, { onClick: handleClick })}
    </>
  );
};

export default CopyTooltip;
