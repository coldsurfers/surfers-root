import StyleDictionary from 'style-dictionary'
import { Dictionary } from 'style-dictionary/types/Dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format';
import {parseOCJSON} from './utils/open-color'
import fs from 'fs'
import path from 'path'

type Format = 'css/variables' | 'json/flat' | 'javascript/module'

if (!fs.existsSync(path.resolve(__dirname, './dist'))) {
    fs.mkdirSync('dist')
}

parseOCJSON()


function darkColorFormat(dictionary: Dictionary) {
    return dictionary.allTokens.map((token) => {
      const { darkValue } = token;
      return { ...token, value: darkValue }
    })
}

function darkColorWrapper(format: Format) {
    return (args: FormatterArguments) => {
        const dictionary = { ...args.dictionary };
        dictionary.allTokens = darkColorFormat(dictionary)
        const formatted = StyleDictionary.format[format]({
            ...args,
            dictionary,
        });
        return formatted
    };
}

StyleDictionary.registerFormat({
    name: 'darkColorCss',
    formatter: darkColorWrapper(`css/variables`),
});

StyleDictionary.registerFormat({
    name: 'darkColorJSON',
    formatter: darkColorWrapper(`json/flat`),
});

StyleDictionary.registerFormat({
    name: 'darkColorJsModule',
    formatter: darkColorWrapper(`javascript/module`),
});

StyleDictionary.registerFilter({
    name: 'ocColorFilter',
    matcher(token) {
        return token.attributes?.category === `oc`;
    },
});

StyleDictionary.registerFilter({
    name: 'darkColorFilter',
    matcher(token) {
        return (
            (token.darkValue) &&
            (token.attributes?.category === `color` || token.attributes?.category === `elevation`)
        );
    },
});

StyleDictionary.extend('config.json').buildAllPlatforms();