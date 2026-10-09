import { useEffect, useMemo, useState } from 'react';
import type { ComponentType } from 'react';

type DemoModule = {
  default: ComponentType;
};

const modules = import.meta.glob<DemoModule>(
  '../../core/src/**/*.demo.tsx',
  { eager: true },
);

const GROUP_ORDER = ['hooks', 'ui', 'lib'];

const GROUP_LABELS: Record<string, string> = {
  hooks: 'Hooks',
  ui: 'UI',
  lib: 'Lib',
};

type DemoEntry = {
  id: string;
  group: string;
  name: string;
  Component: ComponentType;
};

const demos: DemoEntry[] = Object.entries(modules)
  .map(([path, module]) => {
    const match = path.match(/\/src\/([^/]+)\/[^/]+\/([^/]+)\.demo\.tsx$/);
    const group = match?.[1] ?? 'other';
    const name = match?.[2] ?? path;

    return {
      id: `${group}/${name}`,
      group,
      name,
      Component: module.default,
    };
  })
  .sort((a, b) => {
    const groupDelta = GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group);
    if (groupDelta !== 0) return groupDelta;
    return a.name.localeCompare(b.name);
  });

const demoFromHash = () => {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  return demos.find((demo) => demo.id === hash) ?? demos[0];
};

const App = () => {
  const [activeId, setActiveId] = useState(() => demoFromHash()?.id ?? '');

  useEffect(() => {
    const onHashChange = () => {
      const next = demoFromHash();
      if (next) setActiveId(next.id);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const active = useMemo(
    () => demos.find((demo) => demo.id === activeId) ?? demos[0],
    [activeId],
  );

  const groups = useMemo(() => {
    const order = [...new Set(demos.map((demo) => demo.group))];
    return order.map((group) => ({
      group,
      items: demos.filter((demo) => demo.group === group),
    }));
  }, []);

  const openDemo = (id: string) => {
    setActiveId(id);
    window.history.replaceState(null, '', `#${encodeURIComponent(id)}`);
  };

  if (!active) {
    return <p className="main">No demos yet.</p>;
  }

  const ActiveDemo = active.Component;

  return (
    <div className="shell">
      <aside className="sidebar">
        <p className="sidebar-title">react-bits</p>
        {groups.map(({ group, items }) => (
          <div key={group}>
            <p className="sidebar-group">{GROUP_LABELS[group] ?? group}</p>
            {items.map((demo) => (
              <button
                key={demo.id}
                type="button"
                className="sidebar-item"
                aria-current={demo.id === active.id ? 'page' : undefined}
                onClick={() => openDemo(demo.id)}
              >
                {demo.name}
              </button>
            ))}
          </div>
        ))}
      </aside>
      <main className="main">
        <h1 className="main-title">{active.name}</h1>
        <ActiveDemo />
      </main>
    </div>
  );
};

export default App;
