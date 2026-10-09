export interface ControlFunctions {
  isPending(): boolean;
  cancel(): void;
  flush(): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebouncedState<Args extends any[]> = ((
  ...args: Args
) => void) & ControlFunctions;
