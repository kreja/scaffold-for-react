/**
 * webpack 配置
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var globby = require('globby');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var fs = require('fs-extra');

var DEV = process.env.DEV;
var LIVELOAD = process.env.LIVELOAD;
var cwd = process.cwd();
var SINGLE_PAGE = process.env.SINGLE_PAGE;

var entry = {};

// get entry
if (SINGLE_PAGE) { //如果需要单个的start或者build
  entry['pages/' + SINGLE_PAGE + '/index'] = ['./src/pages/' + SINGLE_PAGE + '/index.js'];
}else{
  globby.sync(['**/pages/*'], {
    cwd: cwd + '/src'
  }).forEach(item => {
    entry[item + '/index'] = ['./src/' + item + '/index.js'];
  });
}

var config = {
  context: cwd,
  entry: entry,
  output: {
    path: 'build',
    publicPath: '/build/', // 注意这里的斜杠，漏掉斜杠会导致 hmr full reload
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    // 有了下面这些 alias 就可以直接用绝对路径写了
    alias: {
      components: path.join(__dirname, 'src/components'),
      utils: path.join(__dirname, 'src/utils'),
      styles: path.join(__dirname, 'src/styles'),
      pages: path.join(__dirname, 'src/pages')
    }
  },
  module: {
    loaders: [{ // todo::babel
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['react', 'es2015', 'stage-0'],
        plugins: [
          'add-module-exports',
          'transform-object-assign',
          'transform-react-display-name',
          //'transform-class-properties',
          //IE9 不支持 super bug
          //http://work.taobao.net/issues/50131
          'transform-es3-member-expression-literals', ['transform-es2015-classes', {
            loose: true
          }],
          'transform-proto-to-assign'
        ]
      }
    }, {
      test: /\.js/,
      exclude: /node_modules/,
      loaders: [
        'webpack-module-hot-accept' // add this last 
      ]
    },{
      test: /\.scss/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract('style', 'raw!postcss!sass-loader')
    }]
  },
  // https://github.com/postcss/postcss-loader
  postcss: function() {
    return [precss, autoprefixer];
  },
  // externals 可以避免重复打包，下面列出的就不会在进行打包了
  // 减少了打包时间，又减小了最终包的 size
  externals: {
    'react': "React",
    'react-dom': "ReactDOM",
    'react/lib/ReactTransitionGroup': 'var window.React.addons.TransitionGroup',
    'react/lib/ReactCSSTransitionGroup': 'var window.React.addons.CSSTransitionGroup',
    // todo2::为什么加了下面这句，直接使用 Component 打包后包还是会增大呢？
    // 'react/lib/ReactComponent': 'var window.React.Component'
  },
  plugins: [
    // todo2::
    // new webpack.ProvidePlugin({
    //     Component: 'react/lib/ReactComponent'
    // }),
    new ExtractTextPlugin('[name].bundle.css', {
      allChunks: true
    }),
    // 允许错误不打断程序
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    //进度插件
    new webpack.ProgressPlugin((percentage, msg) => {
      const stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(`📦   ${msg}`);
        stream.clearLine(1);
      }
    }),
    // 定义变量，可以在项目中直接使用变量如 __DEV__
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(DEV ? 'development' : 'production')
      },
      "__DEV__": JSON.stringify(JSON.parse(DEV ? 'true' : 'false'))
    })
  ]
};

// if (LIVELOAD) {
// }
//发布状态
if (!DEV) {
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,
      dead_code: true,
      warnings: false
    },
    mangle: {
      except: ['$', 'exports', 'require']
    },
    output: {
      ascii_only: true
    }
  }));
  //将lib copy 到 build 目录
  globby([
    "node_modules/babel-polyfill/dist/*",
    "node_modules/react/dist/*",
    "node_modules/react-dom/dist/*"
  ]).then(paths => {

    fs.mkdirsSync('build/lib/');
    paths.forEach((item) => {
      var filename = path.basename(item)
      fs.copy(item, 'build/lib/' + filename, function(err) {
        if (err) return console.error(err)
      });
    });
  });
} else {
  config.devServer = {
    headers: { "Access-Control-Allow-Origin": "*" },
    "Access-Control-Allow-Credentials": "true"
  };
  config.plugins.push(new webpack.SourceMapDevToolPlugin({}));
}

module.exports = config;
