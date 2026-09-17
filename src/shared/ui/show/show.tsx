import { ShowTypes } from './show.types.ts';

const Show: React.FC<ShowTypes> = ({
  when,
  children,
}) => {
  return when ? children : null;
};

export default Show;