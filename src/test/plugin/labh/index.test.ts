import { Color } from '../../../main/core';
import labhPlugin from '../../../main/plugin/labh';

labhPlugin(Color);

describe('labh', () => {
  test('mutates LABh color components', () => {
    expect(new Color().labh([11, 22, 33]).labh()).toEqual([11, 22, 33, 1]);
  });
});
