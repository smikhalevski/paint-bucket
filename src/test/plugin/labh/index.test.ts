import { Color } from '../../../main/core';
import '../../../main/plugin/labh';

describe('labh', () => {
  test('mutates LABh color components', () => {
    expect(new Color().labh([11, 22, 33]).labh()).toEqual([11, 22, 33, 1]);
  });
});
