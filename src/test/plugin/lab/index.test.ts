import { Color } from '../../../main/core';
import '../../../main/plugin/lab';

describe('lab', () => {
  test('mutates LAB color components', () => {
    expect(new Color().lab([11, 22, 33]).lab()).toEqual([11, 22, 33, 1]);
  });
});
