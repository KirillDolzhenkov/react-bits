import type { ShowProps } from './show.props';

/**
 * Renders `children` when `when` is true, otherwise renders nothing.
 *
 * @param {ShowProps} props
 * @param {boolean} props.when Condition that controls rendering.
 * @param {React.ReactNode} props.children Content to render when the condition is met.
 *
 * @example
 * <Show when={isOpen}>
 *   <Panel />
 * </Show>
 */
const Show = (props: ShowProps) => {
  const { when, children } = props;

  return when ? children : null;
};

export default Show;
