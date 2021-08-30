import {and, clampByte, left, or, right, xor} from '../main/int';

describe('left', () => {

  test('shifts left bitwise', () => {
    expect(left(0xAA, 32)).toBe(0xAA_00_00_00_00);
    expect(left(0xAA_AA_AA_AA_AA_AA, 8)).toBe(0xAA_AA_AA_AA_AA_AA_00);
    expect(left(0xAA, 8)).toBe(0xAA00);
    expect(left(0xA, 4)).toBe(0xA0);
  });
});

describe('right', () => {

  test('shifts right bitwise', () => {
    expect(right(0xAA_AA_AA_AA_AA_AA, 32)).toBe(0xAA_AA);
    expect(right(0xAA_AA_AA_AA_AA_AA, 8)).toBe(0xAA_AA_AA_AA_AA);
    expect(right(0xAA_AA, 8)).toBe(0xAA);
    expect(right(0xA, 4)).toBe(0);
  });
});

describe('xor', () => {

  test('bitwise xor', () => {
    expect(xor(0xAA_00_00_00_00_00, 0x00_00_00_00_00_BB)).toBe(0xAA_00_00_00_00_BB);
    expect(xor(0xAA_00_00_00_00_00, 0xAA_00_00_00_00_BB)).toBe(0xBB);
  });
});

describe('or', () => {

  test('bitwise or', () => {
    expect(or(0xAA_00_00_00_00_00, 0x00_00_00_00_00_BB)).toBe(0xAA_00_00_00_00_BB);
  });
});

describe('and', () => {

  test('bitwise and', () => {
    expect(and(0xAA_00_00_00_00_00, 0x22_00_00_00_00_00)).toBe(0x22_00_00_00_00_00);
  });
});

describe('clampByte', () => {

  test('clamps int to byte', () => {
    expect(clampByte(0xAA_00_00_00_00_00)).toBe(0xFF);
    expect(clampByte(-0xAA_00_00_00_00_00)).toBe(0xFF);
    expect(clampByte(0xAA)).toBe(0xAA);
    expect(clampByte(-0xAA)).toBe(0xAA);
  });
});

