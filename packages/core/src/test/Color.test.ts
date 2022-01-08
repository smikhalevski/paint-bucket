import {color, Color, ColorModel, Rgb} from '../main';

describe('Color', () => {

  const abcColorModel: ColorModel = {
    componentsToRgb(components, rgb) {
      rgb[0] = components[0] * 100;
      rgb[1] = components[1] * 100;
      rgb[2] = components[2] * 100;
      rgb[3] = components[3];
    },
    rgbToComponents(rgb, components) {
      components[0] = rgb[0] / 100;
      components[1] = rgb[1] / 100;
      components[2] = rgb[2] / 100;
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

    (function (this: Color) {
      abc1 = this.get(abcColorModel);
    }).call(color);

    (function (this: Color) {
      abc2 = this.get(abcColorModel);
    }).call(color);

    expect(abc1).toEqual([0, 0, 0, 1]);
    expect(abc1).toBe(abc2);
  });

  test('returns same color for read and update', () => {
    let abc1;
    let abc2;

    const color = new Color();

    (function (this: Color) {
      abc1 = this.use(abcColorModel);
    }).call(color);

    (function (this: Color) {
      abc2 = this.get(abcColorModel);
    }).call(color);

    expect(abc1).toEqual([0, 0, 0, 1]);
    expect(abc1).toBe(abc2);
  });

  test('converts color models', (done) => {
    const color = new Color();

    (function (this: Color) {
      const abc = this.use(abcColorModel);
      abc[0] = abc[1] = abc[2] = 1;
    }).call(color);

    (function (this: Color) {
      expect(this.get(Rgb)).toEqual([100, 100, 100, 1]);
      done();
    }).call(color);
  });

  test('returns initial color', (done) => {
    const rgb: Rgb = [127, 127, 127, 0.77];

    (function (this: Color) {
      expect(this.get(Rgb)).toBe(rgb);
      done();
    }).call(new Color(Rgb, rgb));
  });

  test('clones instance', (done) => {
    const rgb: Rgb = [127, 127, 127, 0.77];
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
