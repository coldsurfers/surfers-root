module.exports = {
  stories: ["../components/**/*.web.stories.?(ts|tsx|js|jsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-react-native-web",
  ],
  framework: "@storybook/react",
  core: {
    builder: 'webpack5',
  },
};
