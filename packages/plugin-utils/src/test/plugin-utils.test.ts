import { clamp } from '@paint-bucket/core';

describe('clamp', () => {
  test('clamps value', () => {
    expect(clamp(NaN)).toBe(0);
    expect(clamp('aaa' as unknown as number)).toBe(0);
    expect(clamp('-1' as unknown as number)).toBe(0);
    expect(clamp('10' as unknown as number)).toBe(1);
    expect(clamp('10a' as unknown as number)).toBe(0);
    expect(clamp(-1)).toBe(0);
    expect(clamp(10)).toBe(1);
    expect(clamp(1.5)).toBe(1);
    expect(clamp(0.5)).toBe(0.5);
  });
});
