export type Octet = number;

export type Int32 = number;
export type Int64 = number;

export type Uint32 = number;
export type Uint64 = number;

export function abs(x: Int32): Uint32 {
  return (x ^ (x >> 31)) - (x >> 31);
}

export function max(a: Int32, b: Int32): Int32 {
  return a - ((a - b) & ((a - b) >> 31));
}

export function min(a: Int32, b: Int32): Int32 {
  return a - ((a - b) & ((b - a) >> 31));
}
