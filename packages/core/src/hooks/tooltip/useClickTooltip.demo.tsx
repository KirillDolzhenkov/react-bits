import { useClickTooltip } from 'react-bits';

const Demo = () => {
  const { show, tooltip } = useClickTooltip({
    duration: 800,
    message: 'Saved',
  });

  return (
    <section className="demo">
      {tooltip}
      <button type="button" onClick={show}>
        Click to show the tooltip
      </button>
    </section>
  );
};

export default Demo;
