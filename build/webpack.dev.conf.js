const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf.js');

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: [
            path.join(__dirname, '../src/main.js')
        ]
    },
    output: {
        path: __dirname + 'devDist',
        publicPath: "/",
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
				test: /\.js$/,
				loader: "babel-loader",
				exclude: [
		          path.resolve(__dirname, '../src/static/font/iconfont.js'),
		          path.resolve(__dirname, '../node_modules'),
		        ],
      		},
			{
				test: /\.css$/,
                loader: "style-loader!css-loader",
        
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    
    mode: "development",
    devtool: "#cheap-module-eval-source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('develop'),
                API_ENV: JSON.stringify('devalop'),
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html', 
            inject: true
        })
    ],

    devServer: {
        port: 3008,
        hot: true,
        // 编译出错的时候，在浏览器页面上显示错误
        overlay: {
            errors: true,
        },
        proxy: {
            "/api": {
                target: "http://localhost:7000",
				changeOrigin: true,
				pathRewrite: {
					"^/api": ""
				}
            }
        },

        // 解决history模式下刷新页面， 路由挂了
        historyApiFallback: true,
    },
    
})