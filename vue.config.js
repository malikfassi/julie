const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = defineConfig({
  publicPath: '/julie/',
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'vue$': 'vue/dist/vue.runtime.esm-bundler.js'
      },
      extensions: ['.js', '.vue', '.json']
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              onError: (err) => {
                console.error('Vue Loader Error:', err);
              }
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'ts', 'vue'],
        exclude: 'node_modules'
      })
    ]
  }
});
