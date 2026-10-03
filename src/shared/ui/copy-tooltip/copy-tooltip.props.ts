import type { MouseEvent, ReactElement } from 'react';

export interface CopyTooltipProps {
  children: ReactElement<{
    onClick?: (event: MouseEvent<HTMLElement>) => void;
  }>;
  duration?: number;
  message?: string;
  text: string;
}
