import {abs, floor, min, pow} from './math';

export type Byte = number;

// Max value 0x1f_ff_ff_ff_ff_ff_ff
export type Int = number;

const HI = 0x80000000;
const LO = 0x7fffffff;

export function left(x: Int, shift: Int): Int {
  return floor(x) * pow(2, shift);
}

export function right(x: Int, shift: Int): Int {
  return floor(x / pow(2, shift));
}

export function xor(a: Int, b: Int): Int {
  return ((a / HI) ^ (b / HI)) * HI + ((a & LO) ^ (b & LO));
}

export function or(a: Int, b: Int): Int {
  return ((a / HI) | (b / HI)) * HI + ((a & LO) | (b & LO));
}

export function and(a: Int, b: Int): Int {
  return ((a / HI) & (b / HI)) * HI + ((a & LO) & (b & LO));
}

export function clampByte(a: Int): Byte {
  return min(abs(a), 0xFF) | 0;
}
