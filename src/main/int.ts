import {abs, floor, min, pow} from './math';

export type Byte = number;

export type Int32 = number;
export type Int64 = number;

export type Uint32 = number;
export type Uint64 = number;

const HI = 0x80000000;
const LO = 0x7fffffff;

export function left(x: number, shift: number): Int64 {
  return floor(x) * pow(2, shift);
}

export function right(x: number, shift: number): Int64 {
  return floor(x / pow(2, shift));
}

export function xor(a: number, b: number): number {
  return ((a / HI) ^ (b / HI)) * HI + ((a & LO) ^ (b & LO));
}

export function or(a: number, b: number): number {
  return ((a / HI) | (b / HI)) * HI + ((a & LO) | (b & LO));
}

export function and(a: number, b: number): number {
  return ((a / HI) & (b / HI)) * HI + ((a & LO) & (b & LO));
}

export function clampByte(a: Int32): Byte {
  return min(floor(abs(a)), 0xFF);
}
