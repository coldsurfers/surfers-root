import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import StyleDictionary from 'style-dictionary';
import type { Dictionary } from 'style-dictionary/types/Dictionary';
import type { FormatterArguments } from 'style-dictionary/types/Format';
import { parseOCJSON } from './utils/open-color';

type Format = 'css/variables' | 'json/flat' | 'javascript/module';

if (!fs.existsSync(path.resolve(__dirname, './dist'))) {
  fs.mkdirSync('dist');
}

parseOCJSON();

function darkColorFormat(dictionary: Dictionary) {
  return dictionary.allTokens.map((token) => {
    const { darkValue } = token;
    return { ...token, value: darkValue };
  });
}

function darkColorWrapper(format: Format) {
  return (args: FormatterArguments) => {
    const dictionary = { ...args.dictionary };
    dictionary.allTokens = darkColorFormat(dictionary);
    const formatted = StyleDictionary.format[format]({
      ...args,
      dictionary,
    });
    return formatted;
  };
}

StyleDictionary.registerFormat({
  name: 'darkColorCss',
  formatter: darkColorWrapper('css/variables'),
});

StyleDictionary.registerFormat({
  name: 'darkColorJSON',
  formatter: darkColorWrapper('json/flat'),
});

StyleDictionary.registerFormat({
  name: 'darkColorJsModule',
  formatter: darkColorWrapper('javascript/module'),
});

StyleDictionary.registerFormat({
  name: 'semanticColorCssVars',
  formatter: (args) => {
    const { dictionary } = args;
    // Convert the tokens into a nested structure with CSS variable references
    const tokens = JSON.stringify(
      dictionary.tokens,
      (_, value) => {
        if (value?.value) {
          return `var(--${value.path.join('-')})`; // CSS variable reference format
        }
        return value;
      },
      2 // Indentation for pretty-printing
    );

    // Wrap in JavaScript module syntax
    return `const variables = ${tokens} as const;\n\nexport default variables`;
  },
});

StyleDictionary.registerFormat({
  name: 'semanticColorThemeVariables',
  formatter: (args) => {
    const { dictionary } = args;

    const lightColors = JSON.stringify(
      dictionary.tokens,
      (_, value) => {
        if (value?.value) {
          return value.value;
        }
        return value;
      },
      2 // Indentation for pretty-printing
    );

    const darkColors = JSON.stringify(
      dictionary.tokens,
      (_, value) => {
        if (value?.darkValue) {
          // console.log(value.value, value.darkValue, value.path)
          return value.darkValue;
        }
        return value;
      },
      2 // Indentation for pretty-printing
    );

    const tokens = JSON.stringify(
      {
        light: JSON.parse(lightColors),
        dark: JSON.parse(darkColors),
      },
      null,
      2
    );

    // Wrap in JavaScript module syntax
    return `const variables = ${tokens} as const;\n\nexport default variables`;
  },
});

StyleDictionary.registerFilter({
  name: 'ocColorFilter',
  matcher(token) {
    return token.attributes?.category === 'oc';
  },
});

StyleDictionary.registerFilter({
  name: 'darkColorFilter',
  matcher(token) {
    return (
      token.darkValue &&
      (token.attributes?.category === 'color' || token.attributes?.category === 'elevation')
    );
  },
});

StyleDictionary.extend('config.json').buildAllPlatforms();

function runTsc() {
  const cmds = [
    'pnpm tsc ./dist/js/semantic/theme-variables.ts --declaration',
    'pnpm tsc ./dist/js/semantic/variables.ts --declaration',
    'rm -rf ./dist/js/semantic/theme-variables.ts',
    'rm -rf ./dist/js/semantic/variables.ts',
  ];

  for (const cmd of cmds) {
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (e) {
      console.error(`⚠️ Failed: ${cmd}`);
      console.error(e);
      // 계속 다음 명령 실행
    }
  }
}

runTsc();
