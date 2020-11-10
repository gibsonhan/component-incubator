module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3',
        // minimum target; only seems to be required when running web-dev-server
        // in real build/deploy, targets in package.json is used
        targets: {
          ie: '11',
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'lodash',
  ];
  if (process.env.NODE_ENV === 'local') {
    plugins.push('react-docgen');
  }

  // node-only plugins
  if (process.env.BABEL_ENV === 'node') {
    plugins.push('dynamic-import-node');
  }

  return {
    presets,
    plugins,
  };
};
