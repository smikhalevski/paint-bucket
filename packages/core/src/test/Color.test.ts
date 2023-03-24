import { Color, ColorModel, RGB } from '../main';

describe('Color', () => {
  const abcColorModel: ColorModel = {
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

  const colorParser = Color.parse;

  beforeEach(() => {
    Color.parse = colorParser;
  });

  // test('creates a new color', () => {
  //   expect(new Color.parse(undefined)).toBeInstanceOf(Color);
  // });
  //
  // test('overrides parser', () => {
  //   const parserMock = jest.fn();
  //   const cbMock = jest.fn(() => parserMock);
  //
  //   Color['_enhanceParser'](cbMock);
  //
  //   expect(parserMock).not.toHaveBeenCalled();
  //   expect(cbMock).toHaveBeenCalledTimes(1);
  //   expect(cbMock).toHaveBeenLastCalledWith(colorParser);
  //
  //   Color.parse('abc' as any);
  //
  //   expect(parserMock).toHaveBeenCalledTimes(1);
  //   expect(parserMock).toHaveBeenLastCalledWith('abc');
  // });

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

    expect(colorClone['_model']).toBe(RGB);
    expect(colorClone['_components']).not.toBe(rgb);
    expect(colorClone['_components']).toEqual(rgb);
  });
});
