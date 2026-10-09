import { useAutoId } from 'react-bits';

const Demo = () => {
  const explicitId = useAutoId('name-field');
  const generatedId = useAutoId();

  return (
    <section className="demo">
      <p className="demo-muted">Click a label to focus its field.</p>
      <div className="demo-field">
        <label htmlFor={explicitId}>Name</label>
        <input id={explicitId} placeholder="Ada Lovelace" />
        <p className="demo-muted">id: {explicitId}</p>
      </div>
      <div className="demo-field">
        <label htmlFor={generatedId}>Name</label>
        <input id={generatedId} placeholder="Grace Hopper" />
        <p className="demo-muted">id: {generatedId}</p>
      </div>
    </section>
  );
};

export default Demo;
