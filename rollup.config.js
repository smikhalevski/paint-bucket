import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: path.resolve('./lib/index.js'),
  output: {
    file: path.resolve('./lib/index-cjs.js'),
    format: 'cjs',
  },
  external: /^[@\w]/,
  plugins: [
    nodeResolve(),
  ],
};
