const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
// const MiniCssTractPlugin = require("mini-css-extract-plugin");
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ScssExtract = new ExtractTextWebpackPlugin('css/scss.css');
const CssExtract = new ExtractTextWebpackPlugin('css/css.css');
const purifycssWebpack = require('purify-css');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// mini-css-extract-plugin
module.exports = {
  entry: "./src/index.js", // 入口文件
  // entry: ['./src/index.js', './src/b.js'], // 两个没有互相引用的文件打包到一起
  // entry: { // 多入口配置
  //   index: './src/index.js',
  //   b: './src/b.js'
  // },
  output: {
    filename: "bundle.[hash:8].js", // 打包后文件名称 hash为随机值
    // filename: '[name].[hash:8].js', // 针对entry多入口的配置
    path: path.resolve(__dirname, "./dist") // 打包后文件的存放目录，需要是绝对路径
  },
  devServer: {
    // webpack-dev-server配置
    contentBase: "./build", // 运行的基础目录
    port: 3000, // 端口
    compress: true, // 是否压缩
    open: true, // 是否自动打开浏览器
    hot: true // 需配合 new webpack.HotModuleReplacementPlugin() 和页面module.hot.accept();
  },
  module: {
    // loader执行顺序是从最后一个开始的
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssTractPlugin.loader,
      //     // { loader: "style-loader" },
      //     { loader: "css-loader" }
      //   ]
      // },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     MiniCssTractPlugin.loader,
      //     // { loader: "style-loader" },
      //     { loader: "css-loader" },
      //     { loader: "sass-loader" }
      //   ]
      // }
      {test: /\.css$/, use: CssExtract.extract({ // 使样式为link形式
        use: [
          {loader: 'css-loader'},
          {loader: 'postcss-loader'}
        ]
      })},
      {test: /\.scss$/, use: ScssExtract.extract({
        use: [
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      })}
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ // copy插件
      from: './src/doc',
      to: 'public'
    }]),
    ScssExtract,
    CssExtract,
    // new MiniCssTractPlugin({ // webpack4 用来替换 ExtractTextWebpackPlugin
    //   filename: 'css/css.css'
    // }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new CleanWebpackPlugin(), // 清理之前打包的文件
    new HtmlWebpackPlugin({
      // 模板文件配置
      template: "./src/index.html", // 模板文件
      title: "hello world", // 网页title，需在模板文件中引用
      minify: {
        removeAttributeQuotes: true, // 删除打包后文件的引号
        collapseWhitespace: true, // 清除打包后文件的空行
        hash: true // 为文件名带上hash
      }
      // chunks: ['index'] // 使用对应的js模块
    }),
    // new purifycssWebpack({ // 清楚无用的css 一定要放在htmlwebpackplugin后面
    //   paths: glob.sync(path.resolve('src/*.html'))
    // })
    // new HtmlWebpackPlugin({ // 针对多出口，不同的html应用其对应的js
    //   filename: 'b.html',
    //   template: './src/index.html', // 模板文件
    //   title: '这是b', // 网页title，需在模板文件中引用
    //   chunks: ['b']
    // })
  ],
  mode: "development", // 运行模式
  resolve: {}
};
