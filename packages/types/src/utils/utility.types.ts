export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type PartialFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Maybe<T> = T | null | undefined;

export type NonEmptyArray<T> = [T, ...T[]];

export type StringRecord<V = string> = Record<string, V>;

export type Awaited<T> = T extends Promise<infer U> ? U : T;

export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;

export type VoidFn = () => void;
export type AsyncVoidFn = () => Promise<void>;
export type Callback<T> = (value: T) => void;
export type AsyncFn<T, R> = (arg: T) => Promise<R>;

export interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

export type FormState<T extends object> = {
  [K in keyof T]: FormField<T[K]>;
};

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface SelectOption<V = string> {
  label: string;
  value: V;
  disabled?: boolean;
  icon?: string;
}

// export interface TableColumn<T> {
//   key: keyof T | string;
//   header: string;
//   sortable?: boolean;
//   width?: string;
//   align?: "left" | "center" | "right";
//   render?: (row: T) => React.ReactNode;
// }

export interface FilterOption {
  key: string;
  label: string;
  value: string | number | boolean;
}

export interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}
