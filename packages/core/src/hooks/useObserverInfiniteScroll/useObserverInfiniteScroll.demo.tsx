import { useCallback, useRef, useState } from 'react';

import { useObserverInfiniteScroll } from 'react-bits';

const MESSAGES = [
  { name: 'Ada', text: 'The notes from yesterday are on the desk.' },
  { name: 'Grace', text: 'Compile it once more before lunch.' },
  { name: 'Alan', text: 'I left the diagram on the second page.' },
  { name: 'Katherine', text: 'The numbers check out. Send the draft.' },
  { name: 'Margaret', text: 'The telescope log is updated through Thursday.' },
  { name: 'Barbara', text: 'Can you look at the last paragraph?' },
  { name: 'Mary', text: 'The sample arrived. It needs a label.' },
  { name: 'Dorothy', text: 'I marked the route in blue pencil.' },
  { name: 'Hedy', text: 'The frequency shifts after the third minute.' },
  { name: 'Radia', text: 'The evening slot is free if you want it.' },
  { name: 'Lise', text: 'Read the footnote before you reply.' },
  { name: 'Emmy', text: 'The proof is shorter if we start from the group.' },
];

const MAX_COUNT = MESSAGES.length;

const Demo = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(7);

  const callBack = useCallback(() => {
    setCount((value) => Math.min(value + 3, MAX_COUNT));
  }, []);

  useObserverInfiniteScroll({
    callBack,
    triggerRef,
    wrapperRef,
    rootMargin: '0px',
    threshold: 0.1,
  });

  return (
    <section className="demo">
      <div className="demo-chat" ref={wrapperRef}>
        {MESSAGES.slice(0, count).map((message) => (
          <div className="demo-message" key={message.name}>
            <strong>{message.name}</strong>
            <span>{message.text}</span>
          </div>
        ))}
        <div className="demo-sentinel" ref={triggerRef}>
          {count >= MAX_COUNT ? 'End' : 'Scroll to load more'}
        </div>
      </div>
    </section>
  );
};

export default Demo;
