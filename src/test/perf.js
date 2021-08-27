const {test} = require('@smikhalevski/perf-test');
const chalk = require('chalk');
const {left} = require('../../lib/index-cjs');

// console.log(chalk.inverse(' abs ') + '\n');


test('1 ', () => left(0xFF, 16));
test('1 ', () => left(0xFF, 16));
test('1 ', () => left(0xFF, 16));
test('1 ', () => left(0xFF, 16));
