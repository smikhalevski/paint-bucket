import {mapRange} from '../main/math';

describe('mapRange', () => {

  test('maps value from one mapRange to another', () => {
    expect(mapRange(2, 1, 3, 0, 100)).toBe(50);
  });

  test('maps value between inverse ranges', () => {
    expect(mapRange(-75, -100, 0, 0, 100)).toBe(25);
  });

  test('maps value outside of initial mapRange', () => {
    expect(mapRange(4, 1, 2, -100, 100)).toBe(500);
  });
});
