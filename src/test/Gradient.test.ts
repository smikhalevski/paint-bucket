import { describe, test, expect, vi } from 'vitest';
import { Color, Gradient, Interpolator, RGB } from '../main/core.js';
import { lerp } from 'algomatic';

describe('Gradient', () => {
  test('returns black color for an empty gradient', () => {
    const gradient = new Gradient();

    expect(gradient.getComponents(RGB, 0.5, lerp)).toStrictEqual([0, 0, 0, 1]);
  });

  test('returns the only color for a gradient with a single color', () => {
    const gradient = new Gradient().stop(0, new Color(RGB, [1, 1, 1, 1]));

    expect(gradient.getComponents(RGB, 0.5, lerp)).toStrictEqual([1, 1, 1, 1]);
  });

  test('returns components at value', () => {
    const gradient = new Gradient().stop(0, new Color(RGB, [1, 1, 1, 1])).stop(1, new Color());

    expect(gradient.getComponents(RGB, 0.5, lerp)).toStrictEqual([0.5, 0.5, 0.5, 1]);
  });

  test('returns components at out-of-bounds value', () => {
    const gradient = new Gradient().stop(0, new Color(RGB, [1, 1, 1, 1])).stop(1, new Color());

    expect(gradient.getComponents(RGB, -1, lerp)).toStrictEqual([1, 1, 1, 1]);
    expect(gradient.getComponents(RGB, 2, lerp)).toStrictEqual([0, 0, 0, 1]);
  });

  test('supports multiple stops', () => {
    const gradient = new Gradient()
      .stop(1, new Color(RGB, [1, 0, 0, 1]))
      .stop(0, new Color(RGB, [1, 1, 1, 1]))
      .stop(0.5, new Color());

    expect(gradient.getComponents(RGB, 0.25, lerp)).toStrictEqual([0.5, 0.5, 0.5, 1]);
    expect(gradient.getComponents(RGB, 0.5, lerp)).toStrictEqual([0, 0, 0, 1]);
    expect(gradient.getComponents(RGB, 0.75, lerp)).toStrictEqual([0.5, 0, 0, 1]);
  });

  test('updates interpolators if color was changed', () => {
    const color1 = new Color();
    const color2 = new Color();
    const gradient = new Gradient().stop(0, color1).stop(1, color2);

    const interpolatorUpdateMock = vi.fn();
    const interpolatorFactoryMock = vi.fn(() => {
      const interpolator: Interpolator = () => 0;
      interpolator.update = interpolatorUpdateMock;
      return interpolator;
    });

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(0);

    gradient.getComponents(RGB, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(4);
    expect(interpolatorUpdateMock).not.toHaveBeenCalled();

    color1.useComponents(RGB)[1] = 0.5;
    gradient.getComponents(RGB, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(4);
    expect(interpolatorUpdateMock).toHaveBeenCalledTimes(4);
  });

  test('updates interpolators if a new model was requested', () => {
    const gradient = new Gradient().stop(0, new Color()).stop(1, new Color());

    const interpolatorFactoryMock = vi.fn(() => () => 0);

    gradient.getComponents(RGB, 0.5, interpolatorFactoryMock);
    gradient.getComponents({ ...RGB }, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(8);
  });

  test('re-creates non-updatable interpolators if color was changed', () => {
    const color1 = new Color();
    const color2 = new Color();
    const gradient = new Gradient().stop(0, color1).stop(1, color2);

    const interpolatorFactoryMock = vi.fn(() => () => 0);

    gradient.getComponents(RGB, 0.5, interpolatorFactoryMock);
    color1.useComponents(RGB)[1] = 0.5;
    gradient.getComponents(RGB, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(8);
  });

  test('returns a color instance at position', () => {
    const color = new Gradient()
      .stop(0, new Color())
      .stop(1, new Color(RGB, [1, 1, 1, 1]))
      .at(0.5);

    expect(color).toStrictEqual(new Color(RGB, [0.5, 0.5, 0.5, 1]));
  });
});
