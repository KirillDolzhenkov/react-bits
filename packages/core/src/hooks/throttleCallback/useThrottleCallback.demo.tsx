import { useState } from 'react';

import { useThrottleCallback } from 'react-bits';

const INITIAL = { brightness: 100, contrast: 100 };

const Demo = () => {
  const [draft, setDraft] = useState(INITIAL);
  const [applied, setApplied] = useState(INITIAL);

  const apply = useThrottleCallback((next: typeof INITIAL) => {
    setApplied(next);
  }, 200);

  const onChange = (key: keyof typeof INITIAL, value: number) => {
    const next = { ...draft, [key]: value };
    setDraft(next);
    apply(next);
  };

  return (
    <section className="demo">
      <div
        className="demo-stage"
        style={{
          filter: `brightness(${applied.brightness}%) contrast(${applied.contrast}%)`,
        }}
      />
      <label className="demo-slider">
        <span>Brightness {draft.brightness}</span>
        <input
          type="range"
          min={40}
          max={160}
          value={draft.brightness}
          onChange={(event) => onChange('brightness', Number(event.target.value))}
        />
      </label>
      <label className="demo-slider">
        <span>Contrast {draft.contrast}</span>
        <input
          type="range"
          min={40}
          max={160}
          value={draft.contrast}
          onChange={(event) => onChange('contrast', Number(event.target.value))}
        />
      </label>
    </section>
  );
};

export default Demo;
