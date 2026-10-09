export interface ControlFunctions {
  isPending(): boolean;
  cancel(): void;
  flush(): void;
}

export type DebouncedState<Args extends unknown[]> = ((
  ...args: Args
) => void) & ControlFunctions;
