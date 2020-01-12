import { rollup } from 'rollup';
import resolvePlugin from '@rollup/plugin-node-resolve';
import replacePlugin from '@rollup/plugin-replace';
import { terser as terserPlugin } from 'rollup-plugin-terser';

type GenerateOption = {
  inputFile: string;
  outputFile: string;
  format: 'cjs' | 'es' | 'umd';
  name: string;
  production?: boolean;
};

const generateBundledModules = async ({
  inputFile,
  outputFile,
  format,
  name,
  production = true,
}: GenerateOption) => {
  console.log(`Generating bundle:\n-> ${outputFile}`);
  const plugins = [resolvePlugin()];
  if (production) {
    plugins.push(
      replacePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terserPlugin()
    );
  }
  try {
    const bundle = await rollup({
      input: inputFile,
      plugins,
    });
    const isUmd = format === 'umd';
    await bundle.write({
      file: outputFile,
      format,
      exports: 'named',
      name: isUmd ? name : undefined,
    });
    console.log(`Succeed to generate ${outputFile} bundle.\n`);
  } catch (e) {
    console.error(`Failed to generate ${outputFile} bundle.\n`);
  }
};

export { generateBundledModules };
