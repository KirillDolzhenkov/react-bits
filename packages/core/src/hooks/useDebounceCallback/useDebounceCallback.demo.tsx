import { useState } from 'react';

import { useDebounceCallback } from 'react-bits';

const CITIES = [
  'Lisbon',
  'Kyoto',
  'Reykjavik',
  'Marrakesh',
  'Bergen',
  'Valencia',
  'Tbilisi',
  'Quebec',
];

const Demo = () => {
  const [query, setQuery] = useState('');
  const [applied, setApplied] = useState('');

  const search = useDebounceCallback((value: string) => {
    setApplied(value);
  }, 500);

  const onChange = (value: string) => {
    setQuery(value);
    search(value);
  };

  const needle = applied.trim().toLowerCase();
  const results = CITIES.filter((city) => city.toLowerCase().includes(needle));
  const pending = query !== applied;

  return (
    <section className="demo">
      <label className="demo-field">
        City
        <input
          placeholder="Type to search"
          value={query}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <div className="demo-row">
        <button type="button" onClick={() => search.flush()}>
          Search now
        </button>
        <button type="button" onClick={() => search.cancel()}>
          Cancel
        </button>
      </div>
      <ul className={pending ? 'demo-results is-pending' : 'demo-results'}>
        {results.length === 0 ? (
          <li className="demo-muted">No matches</li>
        ) : (
          results.map((city) => <li key={city}>{city}</li>)
        )}
      </ul>
    </section>
  );
};

export default Demo;
