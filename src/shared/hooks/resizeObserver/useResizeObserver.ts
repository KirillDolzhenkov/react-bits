import { useEffect } from 'react';
import type { RefObject } from 'react';

import type { UseResizeCallback } from './useResizeObserver.types';

/**
 * Observes size changes of a DOM element using the ResizeObserver API.
 *
 * @param {RefObject<Element | null>} ref - React ref whose `current` element is observed.
 *   When `current` is `null`, the hook does nothing.
 * @param {UseResizeCallback} [callback] - Called when the observed element's size changes.
 *   Receives a `ResizeObserverEntry` and the `ResizeObserver` instance.
 *
 * @example
 * const MyComponent = () => {
 *   const divRef = useRef<HTMLDivElement>(null);
 *
 *   useResizeObserver(divRef, (entry) => {
 *     const { width, height } = entry.contentRect;
 *     console.log(`Element size: ${width}px x ${height}px`);
 *   });
 *
 *   return (
 *     <div ref={divRef} style={{ width: '100px', height: '100px', resize: 'both', overflow: 'auto' }}>
 *       Resize me!
 *     </div>
 *   );
 * };
 */
function useResizeObserver(
  ref: RefObject<Element | null>,
  callback?: UseResizeCallback,
) {
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(
      (
        entries: ResizeObserverEntry[],
        observer: ResizeObserver,
      ) => {
        for (const entry of entries) {
          callback?.(entry, observer);
        }
      },
    );

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [callback, ref]);
}

export default useResizeObserver;
