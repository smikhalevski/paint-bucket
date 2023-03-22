import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import path from 'path';

const pkg = await import(path.resolve('package.json'), {assert: {type: 'json'}});

const external = Object.keys(Object.assign({}, pkg.default.dependencies, pkg.default.peerDependencies));

export default [
  {
    input: './src/main/index.ts',
    output: [
      {file: './lib/index.js', format: 'cjs'},
      {file: './lib/index.mjs', format: 'es'},
    ],
    external,
    plugins: [nodeResolve(), typescript({tsconfig: '../../tsconfig.json'})],
  },
  {
    input: './src/main/index.ts',
    output: {file: './lib/index.d.ts', format: 'es'},
    external,
    plugins: [dts()],
  },
];
