const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  mode: 'development',
  entry: { //入口，多页应用 / 单页应用
    'index': './src/index.js',
    'login': './src/js/login.js',
  },
  output: { //出口
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].[hash:8].chunk.js',
  },
  module: { //loaders，处理不同类型模块的编译
    rules: [
      // {
      //   test: /\.vue$/,
      //   use: ['vue-loader']
      // },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: ExtractTextPlugin.extract({ //插件提取css文件
          use: ['css-loader', 'postcss-loader'],
          publicPath: '../'
        })
      },
      {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader', 'less-loader']
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        ],
        // loader: "babel-loader",
        // query: {
        //   presets: ["es2015"]
        // }
      },
      { //图片资源处理
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,    // 小于10k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/'   // 图片打包后存放的目录
            }
          }
        ]
      },
      { //字体资源处理
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader',
      },
      { //页面中的img标签
        test: /\.(htm|html)$/,  
        use: 'html-withimg-loader'
      }
    ]
  },
  plugins: [ // 功能性插件
    new CleanWebpackPlugin(['dist']),              //清空dist目录
    new ExtractTextPlugin("[name].[hash:8].css"),  //提取css文件
    new HtmlWebpackPlugin({                        //编译到html
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['vender', 'common', 'index'],
      // title: 'xxxxxxxxxxxxxxx',         // <%= htmlWebpackPlugin.options.title %>
    }),
    new HtmlWebpackPlugin({                        //编译到html
      template: './src/pages/login.html',
      filename: 'login.html',
      chunks: ['vender', 'common', 'login'],
    }),
    // new HtmlWebpackPlugin({                        //编译到html
    //   template: './src/pages/list.html',
    //   filename: 'list.html',
    //   chunks: ['vender', 'common', 'list'],
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {              // 本地服务器
    contentBase: './dist',
    host: 'localhost',      // 默认是localhost
    port: 3000,             // 端口
    open: true,             // 自动打开浏览器
    hot: true,              // 开启热更新 HMR
    // hotOnly: true, //没实现
    inline: true,           
    compress: true,
  },
  resolve: {
    alias: {
      // $: './src/jquery.js'             // 别名
    },
    extensions: ['.js', '.json', '.css']  // 省略后缀
  },
  optimization: {           // 提取公共引入
    splitChunks: { 
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          priority: 1,
          test: /.js/,
        },
        vender: {
          name: 'vender',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: false,
          priority: -10,
        }
      }
    }
  }
}

module.exports = config;