const {test} = require('@smikhalevski/perf-test');
const chalk = require('chalk');
const tinycolor2 = require('tinycolor2');
const chroma = require('chroma-js');
const {color} = require('../../lib/index-cjs');

const rgb = [111, 222, 333];

console.log(chalk.inverse(' Create '));
gc();
test('tinycolor2  ', () => tinycolor2(rgb), {timeout: 10000});
gc();
test('chroma      ', () => chroma(rgb), {timeout: 10000});
gc();
test('paint-bucket', () => color(rgb), {timeout: 10000});

console.log('\n' + chalk.inverse(' Desaturate '));
gc();
test('tinycolor2  ', () => tinycolor2(rgb).desaturate().toRgb(), {timeout: 10000});
gc();
test('chroma      ', () => chroma(rgb).desaturate().rgb(), {timeout: 10000});
gc();
test('paint-bucket', () => color(rgb).saturation((S) => S * 0.5).rgb(), {timeout: 10000});

console.log('\n' + chalk.inverse(' Spin + Lighten '));
gc();
test('tinycolor2  ', () => tinycolor2(rgb).spin(90).lighten().toRgb(), {timeout: 10000});
gc();
test('paint-bucket', () => color(rgb).hue((H) => H + 90).lightness((L) => L + 10).rgb(), {timeout: 10000});
