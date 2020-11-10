const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nodeDir = path.resolve(__dirname, 'node_modules');
const srcDir  = path.resolve(__dirname, 'src');
const styleDir  = path.resolve(__dirname, 'src/styles');

module.exports = {
  module: {
    rules: [
      // Scripts Loader
      // - babel: Transform JSX and ES6+ to plain Javascript.
      {
        test: /\.(m?js|jsx)$/,
        // no need to transpile node_modules
        exclude: (resource) => {
          // ...except for those that only come in ES6
          // anything added here must also be added to esModules in jest.config.js
          if (
            resource.includes(path.join(nodeDir, 'ky')) ||
            resource.includes(path.join(nodeDir, 'strip-ansi'))
          ) {
            return false;
          }
          return resource.includes(nodeDir);
        },
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      // Styles Loader
      // - sass: Transform Sass to plain CSS.
      // - postcss: Apply PostCSS transformations like autoprefixer.
      // - css: Resolve @import and url(...) statements.
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              esModule: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [srcDir, styleDir],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    modules: [
      srcDir,
      nodeDir,
    ],
  },
};
