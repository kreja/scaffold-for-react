const os = require('os');
const path = require('path');
// const HappyPack = require('happypack');
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const rootDir = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    index: './src/pages/index/index.jsx',
    redux: './src/pages/redux/index.jsx',
  },
  output: {
    filename: './[name].js',
    publicPath: 'dist' // 输出到这个目录
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  // plugins: [
  //   new HappyPack({
  //     debug: true,
  //     id: 'js',
  //     loaders: [{
  //       path: 'babel-loader',
  //       query: {
  //         cacheDirectory: true,
  //       },
  //     }],
  //     threadPool: happyThreadPool,
  //   })
  // ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    redux: 'Redux',
    'react-redux': 'ReactRedux'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.join(rootDir, 'src/components'),
      styles: path.join(rootDir, 'src/styles'),
      utils: path.join(rootDir, 'src/utils'),
      pages: path.join(rootDir, 'src/pages'),
    }
  },
  devServer: {
    // contentBase: './src', // 起静态服务的目录，默认根目录
    // publicPath: '/xx/' // 生成的 bundle 的对外路径。覆盖 webpack.output.publicPath
  }
};