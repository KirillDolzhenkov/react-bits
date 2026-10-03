import type { RefObject } from 'react';

export interface UseObserverInfiniteScrollOptions<T extends HTMLElement>
  extends Partial<IntersectionObserverInit> {
  triggerRef: RefObject<T | null>;
  wrapperRef?: RefObject<T | null>;

  callBack?(entry: IntersectionObserverEntry): Promise<void> | void;
}
