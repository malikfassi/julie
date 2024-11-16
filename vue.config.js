const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = defineConfig({
  publicPath: '/julie/',
  configureWebpack: {
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve('path-browserify')
      }
    },
    plugins: [
      new NodePolyfillPlugin()
    ]
  }
});
