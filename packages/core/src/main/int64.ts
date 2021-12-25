import {abs, floor, min, pow, round} from './math';
import {Byte, Int64} from './core-types';

const HI = 0x80000000;
const LO = 0x7fffffff;

export function left(x: Int64, shift: Int64): Int64 {
  return floor(x) * pow(2, shift);
}

export function right(x: Int64, shift: Int64): Int64 {
  return floor(x / pow(2, shift));
}

export function xor(a: Int64, b: Int64): Int64 {
  return ((a / HI) ^ (b / HI)) * HI + ((a & LO) ^ (b & LO));
}

export function or(a: Int64, b: Int64): Int64 {
  return ((a / HI) | (b / HI)) * HI + ((a & LO) | (b & LO));
}

export function and(a: Int64, b: Int64): Int64 {
  return ((a / HI) & (b / HI)) * HI + ((a & LO) & (b & LO));
}

export function clampByte(a: Int64): Byte {
  return min(round(abs(a)), 0xFF);
}
