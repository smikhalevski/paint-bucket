import {color, Color, ColorModel, Rgb} from '../main';

describe('Color', () => {

  const rgbColorModel: ColorModel<Rgb> = {
    createComponents() {
      return {R: 0, G: 0, B: 0, a: 1};
    },
    cloneComponents(components) {
      return Object.assign({}, components);
    },
    componentsToRgb(components, rgb) {
      Object.assign(rgb, components);
    },
    rgbToComponents(rgb, components) {
      Object.assign(components, rgb);
    },
  };

  interface IAbc {
    A: number;
    B: number;
    C: number;
    a: number;
  }

  const abcColorModel: ColorModel<IAbc> = {
    createComponents() {
      return {A: 0, B: 0, C: 0, a: 1};
    },
    cloneComponents(components) {
      return Object.assign({}, components);
    },
    componentsToRgb(components, rgb) {
      rgb.R = components.A * 100;
      rgb.G = components.B * 100;
      rgb.B = components.C * 100;
      rgb.a = components.a;
    },
    rgbToComponents(rgb, components) {
      components.A = rgb.R / 100;
      components.B = rgb.G / 100;
      components.C = rgb.B / 100;
      components.a = rgb.a;
    },
  };

  const colorFactory = Color.factory;

  beforeEach(() => {
    Color.factory = colorFactory;
  });

  test('creates a new color', () => {
    expect(Color.create()).toBeInstanceOf(Color);
    expect(Color.factory(undefined)).toBeInstanceOf(Color);
  });

  test('overrides factory', () => {
    const factoryMock = jest.fn();
    const cbMock = jest.fn(() => factoryMock);

    Color.overrideFactory(cbMock);

    expect(factoryMock).not.toHaveBeenCalled();
    expect(cbMock).toHaveBeenCalledTimes(1);
    expect(cbMock).toHaveBeenLastCalledWith(colorFactory);

    color('abc' as any);

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenLastCalledWith('abc');
  });

  test('returns the same color', () => {
    let abc1;
    let abc2;

    const color = Color.create();

    (function (this: Color) {
      abc1 = this.get(abcColorModel);
    }).call(color);

    (function (this: Color) {
      abc2 = this.get(abcColorModel);
    }).call(color);

    expect(abc1).toEqual({A: 0, B: 0, C: 0, a: 1});
    expect(abc1).toBe(abc2);
  });

  test('returns same color for read and update', () => {
    let abc1;
    let abc2;

    const color = Color.create();

    (function (this: Color) {
      abc1 = this.use(abcColorModel);
    }).call(color);

    (function (this: Color) {
      abc2 = this.get(abcColorModel);
    }).call(color);

    expect(abc1).toEqual({A: 0, B: 0, C: 0, a: 1});
    expect(abc1).toBe(abc2);
  });

  test('converts color models', (done) => {
    const color = Color.create();

    (function (this: Color) {
      const abc = this.use(abcColorModel);
      abc.A = abc.B = abc.C = 1;
    }).call(color);

    (function (this: Color) {
      expect(this.get(rgbColorModel)).toEqual({R: 100, G: 100, B: 100, a: 1});
      done();
    }).call(color);
  });

  test('returns initial color', (done) => {
    const rgb: Rgb = {R: 127, G: 127, B: 127, a: 0.77};

    (function (this: Color) {
      expect(this.get(rgbColorModel)).toBe(rgb);
      done();
    }).call(Color.create(rgbColorModel, rgb));
  });

  test('clones instance', (done) => {
    const rgb: Rgb = {R: 127, G: 127, B: 127, a: 0.77};
    const color = Color.create(rgbColorModel, rgb);
    const colorClone = color.clone();

    (function (this: Color) {
      expect(this.model).toBe(rgbColorModel);
      expect(this.components).not.toBe(rgb);
      expect(this.components).toEqual(rgb);
      done();
    }).call(colorClone);
  });

  test('returns components copy', (done) => {
    const rgb: Rgb = {R: 127, G: 127, B: 127, a: 0.77};

    (function (this: Color) {
      const rgb2 = this.getCopy(rgbColorModel);

      expect(rgb2).not.toBe(rgb);
      expect(rgb2).toEqual(rgb);
      done();
    }).call(Color.create(rgbColorModel, rgb));
  });

  test('sets components', (done) => {
    const abc: IAbc = {A: 100, B: 100, C: 100, a: 1};

    (function (this: Color) {
      this.set(abcColorModel, abc);

      expect(this.get(abcColorModel)).toBe(abc);
      done();
    }).call(Color.create());
  });

});
