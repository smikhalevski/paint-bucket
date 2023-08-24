const tinycolor2 = require('tinycolor2');
const chromaJs = require('chroma-js');
const { clr, Gradient, RGB, LAB } = require('./lib');
const { csplineMonot, lerp } = require('algomatic');

// Create color from components
describe('clr([255, 255, 255])', () => {
  test('tinycolor2', measure => {
    const rgb = { r: 0xab, g: 0xcd, b: 0xef };
    measure(() => tinycolor2(rgb));
  });

  test('chroma.js', measure => {
    const rgb = [0xab, 0xcd, 0xef];
    measure(() => chromaJs(rgb));
  });

  test('paint-bucket', measure => {
    const rgb = [0xab, 0xcd, 0xef];
    measure(() => clr(rgb));
  });
});

// Parse color from short HEX
describe("clr('#abc')", () => {
  test('tinycolor2', measure => {
    measure(() => tinycolor2('#abc'));
  });

  test('chroma.js', measure => {
    measure(() => chromaJs('#abc'));
  });

  test('paint-bucket', measure => {
    measure(() => clr('#abc'));
  });
});

// Parse color from 24-bit HEX
describe("clr('#abcdef')", () => {
  test('tinycolor2', measure => {
    measure(() => tinycolor2('#abcdef'));
  });

  test('chroma.js', measure => {
    measure(() => chromaJs('#abcdef'));
  });

  test('paint-bucket', measure => {
    measure(() => clr('#abcdef'));
  });
});

// Parse color from 32-bit HEX
describe("clr('#abcdefff')", () => {
  test('tinycolor2', measure => {
    measure(() => tinycolor2('#abcdefff'));
  });

  test('chroma.js', measure => {
    measure(() => chromaJs('#abcdefff'));
  });

  test('paint-bucket', measure => {
    measure(() => clr('#abcdefff'));
  });
});

// Parse color from 24-bit integer
describe('clr(0xab_cd_ef)', () => {
  // Not supported
  // test('tinycolor2', (measure) => {
  //   measure(() => tinycolor2(0xab_cd_ef));
  // });

  test('chroma.js', measure => {
    measure(() => chromaJs(0xab_cd_ef));
  });

  test('paint-bucket', measure => {
    measure(() => clr(0xab_cd_ef));
  });
});

// Parse color from 32-bit integer
describe('clr().rgb32(0xab_cd_ef_ff)', () => {
  // Not supported
  // test('tinycolor2', (measure) => {
  //   measure(() => tinycolor2(0xab_cd_ef_ff));
  // });

  // Not supported
  // test('chroma.js', (measure) => {
  //   measure(() => chromaJs(0xab_cd_ef_ff));
  // });

  test('paint-bucket', measure => {
    measure(() => clr().rgb32(0xab_cd_ef_ff));
  });
});

// Parse color from RGBa
describe("clr('rgba(128, 128, 128, 0.5)')", () => {
  test('tinycolor2', measure => {
    measure(() => tinycolor2('rgba(128,128,128,0.5)'));
  });

  test('chroma.js', measure => {
    measure(() => chromaJs('rgba(128,128,128,0.5)'));
  });

  test('paint-bucket', measure => {
    measure(() => clr('rgba(128,128,128,0.5)'));
  });
});

// Desaturate color
describe('clr().saturation(50).rgb()', () => {
  test('tinycolor2', measure => {
    const rgb = { r: 0xab, g: 0xcd, b: 0xef };
    let c;

    beforeIteration(() => {
      c = tinycolor2(rgb);
    });
    measure(() => c.desaturate().toRgb());
  });

  test('chroma.js', measure => {
    const rgb = [0xab, 0xcd, 0xef];
    let c;

    beforeIteration(() => {
      c = chromaJs(rgb);
    });
    measure(() => c.desaturate().rgb());
  });

  test('paint-bucket', measure => {
    const rgb = [0xab, 0xcd, 0xef];
    let c;

    beforeIteration(() => {
      c = clr(rgb);
    });
    measure(() => c.saturation(50).rgb());
  });
});

// Spin + lighten color
describe('clr().hue(90).lightness(10).rgb()', () => {
  test('tinycolor2', measure => {
    const rgb = { r: 0xab, g: 0xcd, b: 0xef };
    let c;

    beforeIteration(() => {
      c = tinycolor2(rgb);
    });
    measure(() => c.spin(90).lighten().toRgb());
  });

  test('paint-bucket', measure => {
    const rgb = [0xab, 0xcd, 0xef];
    let c;

    beforeIteration(() => {
      c = clr(rgb);
    });
    measure(() => c.hue(90).lightness(10).rgb());
  });
});

// Create gradient from HEX
describe('new Gradient().stop(…).stop(…)', () => {
  test('chroma.js', measure => {
    const colors = ['#fff', '#000'];

    measure(() => chromaJs.scale(colors));
  });

  test('paint-bucket', measure => {
    measure(() => new Gradient().stop(0, '#fff').stop(1, '#000'));
  });
});

// Interpolate linear RGB gradient
describe('new Gradient().at(0.5, RGB, lerp)', () => {
  test('chroma.js', measure => {
    const colors = ['#fff', '#000'];
    const gradient = chromaJs.scale(colors).mode('lrgb');

    measure(() => gradient(0.7));
  });

  test('paint-bucket', measure => {
    const gradient = new Gradient().stop(0, '#fff').stop(1, '#000');

    measure(() => gradient.at(0.7, RGB, lerp));
  });
});

// Interpolate spline LAB gradient
describe('new Gradient().at(0.5, LAB, csplineMonot)', () => {
  test('chroma.js', measure => {
    const colors = ['#fff', '#000'];
    const gradient = chromaJs.scale(colors).mode('lab');

    measure(() => gradient(0.7));
  });

  test('paint-bucket', measure => {
    const gradient = new Gradient().stop(0, '#fff').stop(1, '#000');

    measure(() => gradient.at(0.7, LAB, csplineMonot));
  });
});
