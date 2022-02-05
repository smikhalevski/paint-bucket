import {color, Color, ColorModel, Rgb} from '../main';

describe('Color', () => {

  const abcColorModel: ColorModel = {
    componentCount: 4,
    componentsToRgb(components, rgb) {
      rgb[0] = components[0] / 0xFF;
      rgb[1] = components[1] / 0xFF;
      rgb[2] = components[2] / 0xFF;
      rgb[3] = components[3];
    },
    rgbToComponents(rgb, components) {
      components[0] = rgb[0] * 0xFF;
      components[1] = rgb[1] * 0xFF;
      components[2] = rgb[2] * 0xFF;
      components[3] = rgb[3];
    },
  };

  const colorParser = Color.parser;

  beforeEach(() => {
    Color.parser = colorParser;
  });

  test('creates a new color', () => {
    expect(Color.parser(undefined)).toBeInstanceOf(Color);
  });

  test('overrides parser', () => {
    const parserMock = jest.fn();
    const cbMock = jest.fn(() => parserMock);

    Color.overrideParser(cbMock);

    expect(parserMock).not.toHaveBeenCalled();
    expect(cbMock).toHaveBeenCalledTimes(1);
    expect(cbMock).toHaveBeenLastCalledWith(colorParser);

    color('abc' as any);

    expect(parserMock).toHaveBeenCalledTimes(1);
    expect(parserMock).toHaveBeenLastCalledWith('abc');
  });

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
    abc[0] = abc[1] = abc[2] = 0xFF;

    expect(color.get(Rgb)).toEqual([1, 1, 1, 1]);
  });

  test('bumps color version', () => {
    const color = new Color();

    color.use(abcColorModel);
    color.use(abcColorModel);
    color.use(abcColorModel);

    expect(color.version).toBe(3);
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
    expect(abc2).toEqual([0xFF, 0xFF, 0xFF, 1]);
  });

  test('returns initial color', () => {
    const rgb: Rgb = [1, 1, 1, 0.77];

    expect(new Color(Rgb, rgb).get(Rgb)).toBe(rgb);
  });

  test('clones instance', (done) => {
    const rgb: Rgb = [1, 1, 1, 0.77];
    const color = new Color(Rgb, rgb);
    const colorClone = color.clone();

    (function (this: Color) {
      expect(this.model).toBe(Rgb);
      expect(this.components).not.toBe(rgb);
      expect(this.components).toEqual(rgb);
      done();
    }).call(colorClone);
  });

});
