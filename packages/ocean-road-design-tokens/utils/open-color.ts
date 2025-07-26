/* eslint-disable @typescript-eslint/no-var-requires */
const ocJSON = require('open-color/open-color.json');
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const fs = require('fs');
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const path = require('path');

const ocDesignTokenJSONFilePath = path.resolve(__dirname, '../tokens/color/oc.json');

/**
 * generate design token json file from open color json
 */
export function parseOCJSON() {
  function isHashColorValue(value: string) {
    return value.startsWith('#');
  }
  const ocDesignTokenObj: { [key: string]: { value: string } } = {};
  Object.keys(ocJSON).forEach((ocJSONKey) => {
    const value = ocJSON[ocJSONKey];
    if (Array.isArray(value)) {
      const hashColorValueArr = value;
      ocDesignTokenObj[ocJSONKey] = hashColorValueArr.reduce((prev, curr, index) => {
        const next = prev;
        prev[index] = {
          value: curr,
        };
        return next;
      }, {});
    } else if (isHashColorValue(value)) {
      ocDesignTokenObj[ocJSONKey] = {
        value,
      };
    }
  });

  fs.writeFileSync(ocDesignTokenJSONFilePath, JSON.stringify({ oc: ocDesignTokenObj }, null, 4));
}
