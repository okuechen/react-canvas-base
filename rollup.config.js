import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        },
        {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'react-canvas-base',
            sourcemap: true,
            globals: {
                react: 'React'
            }
        }
    ],
    external: ['react', 'react-dom'],
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json'
        }),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        }),
        terser()
    ]
};