import { Color, Gradient, RGB } from '../main';
import { Interpolator, lerp } from 'algomatic';

describe('get', () => {
  test('returns black color for an empty gradient', () => {
    const gradient = new Gradient([], []);

    expect(gradient.get(RGB, 0.5, lerp)).toEqual([0, 0, 0, 1]);
  });

  test('returns the only color for a gradient with a single color', () => {
    const gradient = new Gradient([new Color(RGB, [1, 1, 1, 1])], [0]);

    expect(gradient.get(RGB, 0.5, lerp)).toEqual([1, 1, 1, 1]);
  });

  test('returns components at value', () => {
    const gradient = new Gradient([new Color(RGB, [1, 1, 1, 1]), new Color()], [0, 1]);

    expect(gradient.get(RGB, 0.5, lerp)).toEqual([0.5, 0.5, 0.5, 1]);
  });

  test('returns components at out-of-bounds value', () => {
    const gradient = new Gradient([new Color(RGB, [1, 1, 1, 1]), new Color()], [0, 1]);

    expect(gradient.get(RGB, -1, lerp)).toEqual([1, 1, 1, 1]);
    expect(gradient.get(RGB, 2, lerp)).toEqual([0, 0, 0, 1]);
  });

  test('supports multiple stops', () => {
    const gradient = new Gradient(
      [new Color(RGB, [1, 1, 1, 1]), new Color(), new Color(RGB, [1, 0, 0, 1])],
      [0, 0.5, 1]
    );

    expect(gradient.get(RGB, 0.25, lerp)).toEqual([0.5, 0.5, 0.5, 1]);
    expect(gradient.get(RGB, 0.5, lerp)).toEqual([0, 0, 0, 1]);
    expect(gradient.get(RGB, 0.75, lerp)).toEqual([0.5, 0, 0, 1]);
  });

  test('updates interpolators if color was changed', () => {
    const color1 = new Color();
    const color2 = new Color();
    const gradient = new Gradient([color1, color2], [0, 1]);

    const interpolatorUpdateMock = jest.fn();
    const interpolatorFactoryMock = jest.fn(() => {
      const interpolator: Interpolator = () => 0;
      interpolator.update = interpolatorUpdateMock;
      return interpolator;
    });

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(0);

    gradient.get(RGB, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(4);
    expect(interpolatorUpdateMock).not.toHaveBeenCalled();

    color1.use(RGB)[1] = 0.5;
    gradient.get(RGB, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(4);
    expect(interpolatorUpdateMock).toHaveBeenCalledTimes(4);
  });

  test('updates interpolators if a new model was requested', () => {
    const gradient = new Gradient([new Color(), new Color()], [0, 1]);

    const interpolatorFactoryMock = jest.fn(() => () => 0);

    gradient.get(RGB, 0.5, interpolatorFactoryMock);
    gradient.get({ ...RGB }, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(8);
  });

  test('re-creates non-updatable interpolators if color was changed', () => {
    const color1 = new Color();
    const color2 = new Color();
    const gradient = new Gradient([color1, color2], [0, 1]);

    const interpolatorFactoryMock = jest.fn(() => () => 0);

    gradient.get(RGB, 0.5, interpolatorFactoryMock);
    color1.use(RGB)[1] = 0.5;
    gradient.get(RGB, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(8);
  });
});
