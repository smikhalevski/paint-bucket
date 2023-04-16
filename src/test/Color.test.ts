import { lerp } from 'algomatic';
import { Color, ColorModel, Gradient, Interpolator, RGB } from '../main/core';

describe('Color', () => {
  const abcColorModel: ColorModel = {
    name: 'ABC',
    componentCount: 4,
    convertComponentsToRGB(components, rgb) {
      rgb[0] = components[0] / 0xff;
      rgb[1] = components[1] / 0xff;
      rgb[2] = components[2] / 0xff;
      rgb[3] = components[3];
    },
    convertRGBToComponents(rgb, components) {
      components[0] = rgb[0] * 0xff;
      components[1] = rgb[1] * 0xff;
      components[2] = rgb[2] * 0xff;
      components[3] = rgb[3];
    },
  };

  test('returns the same color', () => {
    let abc1;
    let abc2;

    const color = new Color();

    abc1 = color.getComponents(abcColorModel);
    abc2 = color.getComponents(abcColorModel);

    expect(abc1).toEqual([0, 0, 0, 1]);
    expect(abc1).toBe(abc2);
  });

  test('returns same color for read and update', () => {
    let abc1;
    let abc2;

    const color = new Color();

    abc1 = color.useComponents(abcColorModel);
    abc2 = color.getComponents(abcColorModel);

    expect(abc1).toEqual([0, 0, 0, 1]);
    expect(abc1).toBe(abc2);
  });

  test('converts color models', () => {
    const color = new Color();

    const abc = color.useComponents(abcColorModel);
    abc[0] = abc[1] = abc[2] = 0xff;

    expect(color.getComponents(RGB)).toEqual([1, 1, 1, 1]);
  });

  test('bumps color version on use', () => {
    const color = new Color();

    color.useComponents(abcColorModel);
    color.useComponents(abcColorModel);
    color.useComponents(abcColorModel);

    expect(color.version).toBe(3);
  });

  test('does not bump color version on get', () => {
    const color = new Color();

    color.getComponents(abcColorModel);
    color.getComponents(abcColorModel);
    color.getComponents(abcColorModel);

    expect(color.version).toBe(0);
  });

  test('reuses temp components between two get calls', () => {
    const color = new Color();

    const abcColorModelMock: ColorModel = {
      name: 'ABC',
      componentCount: 4,
      convertComponentsToRGB: jest.fn(abcColorModel.convertComponentsToRGB),
      convertRGBToComponents: jest.fn(abcColorModel.convertRGBToComponents),
    };

    color.getComponents(abcColorModelMock);
    color.getComponents(abcColorModelMock);

    expect(abcColorModelMock.convertRGBToComponents).toHaveBeenCalledTimes(1);
  });

  test('reuses temp components between get and use calls', () => {
    const color = new Color(RGB, [1, 1, 1, 1]);

    const abcColorModelMock: ColorModel = {
      name: 'ABC',
      componentCount: 4,
      convertComponentsToRGB: jest.fn(abcColorModel.convertComponentsToRGB),
      convertRGBToComponents: jest.fn(abcColorModel.convertRGBToComponents),
    };

    const abc1 = color.getComponents(abcColorModelMock);
    const abc2 = color.useComponents(abcColorModelMock);

    expect(abcColorModelMock.convertRGBToComponents).toHaveBeenCalledTimes(1);

    expect(abc1).toEqual(abc2);
    expect(abc1).not.toBe(abc2);
    expect(abc2).toEqual([0xff, 0xff, 0xff, 1]);
  });

  test('returns initial color', () => {
    const rgb: RGB = [1, 1, 1, 0.77];

    expect(new Color(RGB, rgb).getComponents(RGB)).toBe(rgb);
  });

  test('clones instance', () => {
    const rgb: RGB = [1, 1, 1, 0.77];
    const color = new Color(RGB, rgb);
    const colorClone = color.clone();

    expect(color.getComponents(RGB)).not.toBe(colorClone.getComponents(RGB));
  });
});

describe('Gradient', () => {
  test('returns black color for an empty gradient', () => {
    const gradient = new Gradient([], []);

    expect(gradient.getComponents(RGB, 0.5, lerp)).toEqual([0, 0, 0, 1]);
  });

  test('returns the only color for a gradient with a single color', () => {
    const gradient = new Gradient([new Color(RGB, [1, 1, 1, 1])], [0]);

    expect(gradient.getComponents(RGB, 0.5, lerp)).toEqual([1, 1, 1, 1]);
  });

  test('returns components at value', () => {
    const gradient = new Gradient([new Color(RGB, [1, 1, 1, 1]), new Color()], [0, 1]);

    expect(gradient.getComponents(RGB, 0.5, lerp)).toEqual([0.5, 0.5, 0.5, 1]);
  });

  test('returns components at out-of-bounds value', () => {
    const gradient = new Gradient([new Color(RGB, [1, 1, 1, 1]), new Color()], [0, 1]);

    expect(gradient.getComponents(RGB, -1, lerp)).toEqual([1, 1, 1, 1]);
    expect(gradient.getComponents(RGB, 2, lerp)).toEqual([0, 0, 0, 1]);
  });

  test('supports multiple stops', () => {
    const gradient = new Gradient(
      [new Color(RGB, [1, 1, 1, 1]), new Color(), new Color(RGB, [1, 0, 0, 1])],
      [0, 0.5, 1]
    );

    expect(gradient.getComponents(RGB, 0.25, lerp)).toEqual([0.5, 0.5, 0.5, 1]);
    expect(gradient.getComponents(RGB, 0.5, lerp)).toEqual([0, 0, 0, 1]);
    expect(gradient.getComponents(RGB, 0.75, lerp)).toEqual([0.5, 0, 0, 1]);
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

    gradient.getComponents(RGB, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(4);
    expect(interpolatorUpdateMock).not.toHaveBeenCalled();

    color1.useComponents(RGB)[1] = 0.5;
    gradient.getComponents(RGB, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(4);
    expect(interpolatorUpdateMock).toHaveBeenCalledTimes(4);
  });

  test('updates interpolators if a new model was requested', () => {
    const gradient = new Gradient([new Color(), new Color()], [0, 1]);

    const interpolatorFactoryMock = jest.fn(() => () => 0);

    gradient.getComponents(RGB, 0.5, interpolatorFactoryMock);
    gradient.getComponents({ ...RGB }, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(8);
  });

  test('re-creates non-updatable interpolators if color was changed', () => {
    const color1 = new Color();
    const color2 = new Color();
    const gradient = new Gradient([color1, color2], [0, 1]);

    const interpolatorFactoryMock = jest.fn(() => () => 0);

    gradient.getComponents(RGB, 0.5, interpolatorFactoryMock);
    color1.useComponents(RGB)[1] = 0.5;
    gradient.getComponents(RGB, 0.5, interpolatorFactoryMock);

    expect(interpolatorFactoryMock).toHaveBeenCalledTimes(8);
  });
});
