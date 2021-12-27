import {color} from '../main';

describe('color', () => {

  test('', () => {
    expect(color('#aaa').isJnd(color(0xAA_BB_CC))).toBe(false);
  });
});
