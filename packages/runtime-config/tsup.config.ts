import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    cli: 'src/obfuscator/obfuscator-cli.ts',
    index: 'src/index.ts',
  },
  format: ['esm', 'cjs'],
  minify: true,
  outDir: 'dist',
  sourcemap: true,
});
