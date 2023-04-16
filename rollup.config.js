
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

// To handle css files
import postcss from "rollup-plugin-postcss";

import terser from '@rollup/plugin-terser';
import babel from "@rollup/plugin-babel";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';


export default [
  // ES Modules
  {
    input: 'src/components/index.js',
    output: [
      {
        file: 'dist/esm/index.js',
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      postcss(),
      // Compile the library's code into a format that is consumable by a wider set of browsers. The library's code lives inside `.js`, `.jsx`, `.ts` and `.tsx` files. Do not compile any files from `node_modules`. The `runtime` helper makes Babel's injected helper code reusable for all modules, which greatly reduces bundle size.
      babel({
        babelHelpers: "runtime",
        exclude: "**/node_modules/**",
        extensions: [".js", ".jsx"],
      }),
    ],
  },
]