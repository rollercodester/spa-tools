import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/**/*@(ts|tsx)', '!src/**/*.test.@(ts|tsx)'],
  format: ['esm', 'cjs'],
  minify: true,
  outDir: 'dist',
  sourcemap: false,
  treeshake: true,
});
