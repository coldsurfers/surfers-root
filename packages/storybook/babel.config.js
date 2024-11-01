const path = require('path')

module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  "plugins": [
    ["module-resolver", {
      "root": ["."],
      "alias": {
        "@coldsurfers/ocean-road": path.resolve(__dirname, '../ocean-road/src/index.ts')
      }
    }],
    ["babel-plugin-react-docgen-typescript", { exclude: "node_modules" }],
  ]
};
