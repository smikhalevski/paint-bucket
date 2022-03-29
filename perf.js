const tinycolor2 = require('tinycolor2');
const chromaJs = require('chroma-js');
const {color, Rgb, Lab} = require('paint-bucket');
const {csplineMonot, lerp} = require('algomatic');

// Create color from components
describe('color([255, 255, 255])', () => {

  test('tinycolor2', (measure) => {
    const rgb = {r: 0xAB, g: 0xCD, b: 0xEF};
    measure(() => tinycolor2(rgb));
  });

  test('chroma.js', (measure) => {
    const rgb = [0xAB, 0xCD, 0xEF];
    measure(() => chromaJs(rgb));
  });

  test('paint-bucket', (measure) => {
    const rgb = [0xAB, 0xCD, 0xEF];
    measure(() => color(rgb));
  });
}, {targetRme: 0.005});

// Parse color from short HEX
describe('color(\'#abc\')', () => {

  test('tinycolor2', (measure) => {
    measure(() => tinycolor2('#abc'));
  });

  test('chroma.js', (measure) => {
    measure(() => chromaJs('#abc'));
  });

  test('paint-bucket', (measure) => {
    measure(() => color('#abc'));
  });
}, {targetRme: 0.005});

// Parse color from 24-bit HEX
describe('color(\'#abcdef\')', () => {

  test('tinycolor2', (measure) => {
    measure(() => tinycolor2('#abcdef'));
  });

  test('chroma.js', (measure) => {
    measure(() => chromaJs('#abcdef'));
  });

  test('paint-bucket', (measure) => {
    measure(() => color('#abcdef'));
  });
}, {targetRme: 0.005});

// Parse color from 32-bit HEX
describe('color(\'#abcdefff\')', () => {

  test('tinycolor2', (measure) => {
    measure(() => tinycolor2('#abcdefff'));
  });

  test('chroma.js', (measure) => {
    measure(() => chromaJs('#abcdefff'));
  });

  test('paint-bucket', (measure) => {
    measure(() => color('#abcdefff'));
  });
}, {targetRme: 0.005});

// Parse color from 24-bit integer
describe('color(0xAB_CD_EF)', () => {

  // Not supported
  // test('tinycolor2', (measure) => {
  //   measure(() => tinycolor2(0xAB_CD_EF));
  // });

  test('chroma.js', (measure) => {
    measure(() => chromaJs(0xAB_CD_EF));
  });

  test('paint-bucket', (measure) => {
    measure(() => color(0xAB_CD_EF));
  });
}, {targetRme: 0.005});

// Parse color from 32-bit integer
describe('color.rgb32(0xAB_CD_EF_FF)', () => {

  // Not supported
  // test('tinycolor2', (measure) => {
  //   measure(() => tinycolor2(0xAB_CD_EF_FF));
  // });

  // Not supported
  // test('chroma.js', (measure) => {
  //   measure(() => chromaJs(0xAB_CD_EF_FF));
  // });

  test('paint-bucket', (measure) => {
    measure(() => color.rgb32(0xAB_CD_EF_FF));
  });
}, {targetRme: 0.005});

// Parse color from RGBa
describe('color(\'rgba(128, 128, 128, 0.5)\')', () => {

  test('tinycolor2', (measure) => {
    measure(() => tinycolor2('rgba(128,128,128,0.5)'));
  });

  test('chroma.js', (measure) => {
    measure(() => chromaJs('rgba(128,128,128,0.5)'));
  });

  test('paint-bucket', (measure) => {
    measure(() => color('rgba(128,128,128,0.5)'));
  });
}, {targetRme: 0.005});

// Desaturate color
describe('c.saturation(50).rgb()', () => {

  test('tinycolor2', (measure) => {
    const rgb = {r: 0xAB, g: 0xCD, b: 0xEF};
    let c;
    measure(() => c.desaturate().toRgb(), {
      beforeIteration() {
        c = tinycolor2(rgb);
      },
    });
  });

  test('chroma.js', (measure) => {
    const rgb = [0xAB, 0xCD, 0xEF];
    let c;
    measure(() => c.desaturate().rgb(), {
      beforeIteration() {
        c = chromaJs(rgb);
      },
    });
  });

  test('paint-bucket', (measure) => {
    const rgb = [0xAB, 0xCD, 0xEF];
    let c;
    measure(() => c.saturation(50).rgb(), {
      beforeIteration() {
        c = color(rgb);
      },
    });
  });
}, {targetRme: 0.005});

// Spin + lighten color
describe('c.hue(90).lightness(10).rgb()', () => {

  test('tinycolor2', (measure) => {
    const rgb = {r: 0xAB, g: 0xCD, b: 0xEF};
    let c;
    measure(() => c.spin(90).lighten().toRgb(), {
      beforeIteration() {
        c = tinycolor2(rgb);
      },
    });
  });

  test('paint-bucket', (measure) => {
    const rgb = [0xAB, 0xCD, 0xEF];
    let c;
    measure(() => c.hue(90).lightness(10).rgb(), {
      beforeIteration() {
        c = color(rgb);
      },
    });
  });
}, {targetRme: 0.005});

// Create gradient from HEX
describe('color.gradient([\'#fff\', \'#000\'])', () => {

  const hexColors = ['#fff', '#000'];

  test('chroma.js', (measure) => {
    measure(() => chromaJs.scale(hexColors));
  });

  test('paint-bucket', (measure) => {
    measure(() => color.gradient(hexColors));
  });
}, {targetRme: 0.005});


// Interpolate linear RGB gradient
describe('g.at(0.5, Rgb, lerp)', () => {

  const hexColors = ['#fff', '#000'];

  test('chroma.js', (measure) => {
    const g = chromaJs.scale(hexColors).mode('lrgb');
    measure(() => g(0.7));
  });

  test('paint-bucket', (measure) => {
    const g = color.gradient(hexColors);
    measure(() => g.at(0.7, Rgb, lerp));
  });
}, {targetRme: 0.005});

// Interpolate spline LAB gradient
describe('g.at(0.5, Lab, csplineMonot)', () => {

  const hexColors = ['#fff', '#000'];

  test('chroma.js', (measure) => {
    const g = chromaJs.scale(hexColors).mode('lab');
    measure(() => g(0.7));
  });

  test('paint-bucket', (measure) => {
    const g = color.gradient(hexColors);
    measure(() => g.at(0.7, Lab, csplineMonot));
  });
}, {targetRme: 0.005});
