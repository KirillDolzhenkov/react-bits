import { useCallback, useRef, useState } from 'react';
import type { PointerEvent } from 'react';

import { useResizeObserver } from 'react-bits';

const PEOPLE = [
  { name: 'Ada Lovelace', text: 'The notes are ready for review.' },
  { name: 'Grace Hopper', text: 'Compile it again before the meeting.' },
  { name: 'Katherine Johnson', text: 'The trajectory matches the table.' },
  { name: 'Margaret Hamilton', text: 'Priority display is in the build.' },
  { name: 'Mary Jackson', text: 'The tunnel test is scheduled.' },
];

const NARROW_WIDTH = 180;

const Demo = () => {
  const columnRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startWidth: 280, startX: 0 });
  const [width, setWidth] = useState(280);
  const [narrow, setNarrow] = useState(false);

  const onResize = useCallback((entry: ResizeObserverEntry) => {
    setNarrow(entry.contentRect.width < NARROW_WIDTH);
  }, []);

  useResizeObserver(columnRef, onResize);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { startWidth: width, startX: event.clientX };
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const next = dragRef.current.startWidth + (event.clientX - dragRef.current.startX);
    setWidth(Math.min(420, Math.max(96, next)));
  };

  return (
    <section className="demo">
      <div
        className={narrow ? 'demo-column is-narrow' : 'demo-column'}
        ref={columnRef}
        style={{ width }}
      >
        {PEOPLE.map((person) => (
          <div className="demo-person" key={person.name}>
            <span className="demo-person-name">{person.name}</span>
            <span className="demo-person-text">{person.text}</span>
          </div>
        ))}
        <button
          type="button"
          className="demo-column-grip"
          aria-label="Resize column"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
        />
      </div>
    </section>
  );
};

export default Demo;
