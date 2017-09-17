import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import butternut from 'rollup-plugin-butternut';

export default {
  input: 'src/viewport.js',
  output: [
    {
      file: 'dist/viewport.min.js',
      name: 'Viewport',
      format: 'umd',
      sourcemap: true,
      globals: {
        'function-batcher': 'FunctionBatcher'
      }
    }
  ],
  plugins: [
    resolve(),
    butternut(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
