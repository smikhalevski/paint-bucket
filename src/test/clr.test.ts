import { clr } from '../main';

describe('clr', () => {
  test('parses hex color', () => {
    expect(clr('#abc').rgb()).toEqual([170, 187, 204, 1]);
  });

  test('creates a gradient', () => {
    expect(clr.gradient().stop(0, 'red').stop(50, 'pink').stop(100, 'blue').at(70).css()).toBe('#9973e0');
  });
});
