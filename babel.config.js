const moduleResolver = [
  require.resolve('babel-plugin-module-resolver'),
  {
    cwd: 'babelrc',
    root: ['./'],
    alias: {
      '~': '.',
      '@': '.'
    },
  },
]

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [moduleResolver],
  };
};
