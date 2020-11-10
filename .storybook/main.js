const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const defaultWebpack = require('../webpack.config.js');


module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx)"
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        sourceLoaderOptions: null,
      }
    },
    '@storybook/addon-a11y',
  ],
  webpackFinal: (config) => {
    config.module.rules = [
      {
        test: /\.(stories|story)\.jsx?$/,
        loaders: [require.resolve('@storybook/source-loader')],
        enforce: 'pre',
      },
      ...defaultWebpack.module.rules
    ];

    config.plugins.push(new MiniCssExtractPlugin());

    // __dirname points to .storybook directory
    config.resolve.modules.push(path.resolve(__dirname, '../src'));
    config.resolve.modules.push(path.resolve(__dirname, '../node_modules'));

    return config;
  },
}
