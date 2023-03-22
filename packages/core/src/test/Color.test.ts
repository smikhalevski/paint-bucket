import { Color, ColorModel, Rgb } from '../main';

describe('Color', () => {
  const abcColorModel: ColorModel = {
    componentCount: 4,
    componentsToRgb(components, rgb) {
      rgb[0] = components[0] / 0xff;
      rgb[1] = components[1] / 0xff;
      rgb[2] = components[2] / 0xff;
      rgb[3] = components[3];
    },
    rgbToComponents(rgb, components) {
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

    abc1 = color.get(abcColorModel);
    abc2 = color.get(abcColorModel);

    expect(abc1).toEqual([0, 0, 0, 1]);
    expect(abc1).toBe(abc2);
  });

  test('returns same color for read and update', () => {
    let abc1;
    let abc2;

    const color = new Color();

    abc1 = color.use(abcColorModel);
    abc2 = color.get(abcColorModel);

    expect(abc1).toEqual([0, 0, 0, 1]);
    expect(abc1).toBe(abc2);
  });

  test('converts color models', () => {
    const color = new Color();

    const abc = color.use(abcColorModel);
    abc[0] = abc[1] = abc[2] = 0xff;

    expect(color.get(Rgb)).toEqual([1, 1, 1, 1]);
  });

  test('bumps color version on use', () => {
    const color = new Color();

    color.use(abcColorModel);
    color.use(abcColorModel);
    color.use(abcColorModel);

    expect(color.version).toBe(3);
  });

  test('does not bump color version on get', () => {
    const color = new Color();

    color.get(abcColorModel);
    color.get(abcColorModel);
    color.get(abcColorModel);

    expect(color.version).toBe(0);
  });

  test('reuses temp components between two get calls', () => {
    const color = new Color();

    const abcColorModelMock: ColorModel = {
      componentCount: 4,
      componentsToRgb: jest.fn(abcColorModel.componentsToRgb),
      rgbToComponents: jest.fn(abcColorModel.rgbToComponents),
    };

    color.get(abcColorModelMock);
    color.get(abcColorModelMock);

    expect(abcColorModelMock.rgbToComponents).toHaveBeenCalledTimes(1);
  });

  test('reuses temp components between get and use calls', () => {
    const color = new Color(Rgb, [1, 1, 1, 1]);

    const abcColorModelMock: ColorModel = {
      componentCount: 4,
      componentsToRgb: jest.fn(abcColorModel.componentsToRgb),
      rgbToComponents: jest.fn(abcColorModel.rgbToComponents),
    };

    const abc1 = color.get(abcColorModelMock);
    const abc2 = color.use(abcColorModelMock);

    expect(abcColorModelMock.rgbToComponents).toHaveBeenCalledTimes(1);

    expect(abc1).toEqual(abc2);
    expect(abc1).not.toBe(abc2);
    expect(abc2).toEqual([0xff, 0xff, 0xff, 1]);
  });

  test('returns initial color', () => {
    const rgb: Rgb = [1, 1, 1, 0.77];

    expect(new Color(Rgb, rgb).get(Rgb)).toBe(rgb);
  });

  test('clones instance', () => {
    const rgb: Rgb = [1, 1, 1, 0.77];
    const color = new Color(Rgb, rgb);
    const colorClone = color.clone();

    expect(colorClone['_model']).toBe(Rgb);
    expect(colorClone['_components']).not.toBe(rgb);
    expect(colorClone['_components']).toEqual(rgb);
  });
});
