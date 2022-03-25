const path = require('path')
const webpack = require("webpack")

// To use styleguide with new next js version(10+) and webpack 5 was added resolutions for "react-dev-utils": "12.0.0-next.47"
// https://github.com/styleguidist/react-styleguidist/issues/1864#issuecomment-984730440
// Later after react version update these resolutions could be removed

module.exports = {
  assetsDir: 'public',
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/theming/Provider.js'),
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  styles: {
    Playground: {
      preview: {
        background: '#f9f9f9',
        fontSize: 14,
      },
    },
  },
  template: {
    head: {
      links: [],
    },
  },
  mountPointId: '__next',
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      alias: {
        'next-auth/react': path.join(__dirname, 'styleguide/auth.js'),
        'next/link': path.join(__dirname, 'styleguide/link.js'),
        'next/router': path.join(__dirname, 'styleguide/router.js'),
        components: path.join(__dirname, 'src/components'),
        'styled-is': path.join(__dirname, 'src/styled-is'),
      },
    },
    plugins: [
       new webpack.DefinePlugin({
          process: {
             env: {}
          }
       })
    ],
  },
}
