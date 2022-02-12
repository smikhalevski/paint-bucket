import {Color, Gradient, Rgb} from '../main';
import {lerp} from 'algomatic';

describe('get', () => {

  test('returns components at value', () => {
    const gradient = new Gradient([new Color(Rgb, [1, 1, 1, 1]), new Color()], [0, 1]);

    expect(gradient.get(Rgb, 0.5, lerp)).toEqual([0.5, 0.5, 0.5, 1]);
  });

  test('returns components at out-of-bounds value', () => {
    const gradient = new Gradient([new Color(Rgb, [1, 1, 1, 1]), new Color()], [0, 1]);

    expect(gradient.get(Rgb, -1, lerp)).toEqual([1, 1, 1, 1]);
    expect(gradient.get(Rgb, 2, lerp)).toEqual([0, 0, 0, 1]);
  });

  test('supports multiple stops', () => {
    const gradient = new Gradient([new Color(Rgb, [1, 1, 1, 1]), new Color(), new Color(Rgb, [1, 0, 0, 1])], [0, 0.5, 1]);

    expect(gradient.get(Rgb, 0.25, lerp)).toEqual([0.5, 0.5, 0.5, 1]);
    expect(gradient.get(Rgb, 0.5, lerp)).toEqual([0, 0, 0, 1]);
    expect(gradient.get(Rgb, 0.75, lerp)).toEqual([0.5, 0, 0, 1]);
  });

  test('detects if color was changed', () => {
    const color1 = new Color(Rgb, [1, 1, 1, 1]);
    const color2 = new Color();
    const gradient = new Gradient([color1, color2], [0, 1]);

    expect(gradient.get(Rgb, 0.5, lerp)).toEqual([0.5, 0.5, 0.5, 1]);

    color1.use(Rgb)[1] = 0.5;

    expect(gradient.get(Rgb, 0.5, lerp)).toEqual([0.5, 0.25, 0.5, 1]);
  });
});
