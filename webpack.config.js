var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry:  __dirname + "/app/index.js",//入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: __dirname + "/app/index.tmpl.html"
    // }),
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ],
  devServer: {
    // colors: true,
    // historyApiFallback: true,
    // contentBase: "./",//本地服务器所加载的页面所在的目录
    // colors: true,//终端中输出结果为彩色
    // historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    hot: true,
    compress: true,
    port:8081,
    // proxy:{
    //   "/index":"http://localhost:8081/decodeMorse.html"
    // }
  }
}