import { useCallback, useRef, useState } from 'react';

import { useInfiniteScroll } from 'react-bits';

const POSTS = [
  { title: 'Morning light', text: 'The harbor stays grey until the first ferry crosses.' },
  { title: 'Field notes', text: 'Three new birds on the wire, none of them in the book.' },
  { title: 'Late train', text: 'The platform clock is five minutes ahead of the phone.' },
  { title: 'Kitchen window', text: 'Rain on the glass, soup on the stove, nobody in a hurry.' },
  { title: 'Market day', text: 'Peaches in one crate, letters in another.' },
  { title: 'North road', text: 'The pines start where the town signs stop.' },
  { title: 'Small museum', text: 'A boat model, a cracked compass, a ticket from 1962.' },
  { title: 'Evening class', text: 'Someone asks the question the chapter skipped.' },
  { title: 'River path', text: 'The current is louder after the bend.' },
  { title: 'Workshop', text: 'Sawdust on the floor and a list of things still to fix.' },
  { title: 'Quiet office', text: 'The last lamp stays on for the person finishing a draft.' },
  { title: 'Sunday map', text: 'A pencil line from the station to the hill.' },
];

const PAGE_SIZE = 3;

const Demo = () => {
  const [count, setCount] = useState(4);
  const lockRef = useRef(false);

  const callBack = useCallback(() => {
    if (lockRef.current) return;

    lockRef.current = true;
    setCount((value) => Math.min(value + PAGE_SIZE, POSTS.length));
    window.setTimeout(() => {
      lockRef.current = false;
    }, 400);
  }, []);

  useInfiniteScroll({
    callBack,
    distanceToBottom: 160,
  });

  return (
    <section className="demo demo-feed">
      {POSTS.slice(0, count).map((post) => (
        <article className="demo-card" key={post.title}>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
        </article>
      ))}
    </section>
  );
};

export default Demo;
