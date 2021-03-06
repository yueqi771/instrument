const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {

    },
    resolve: {
        extensions: ['.js', '.json', '.ts'],
        alias: {
            "@core": path.resolve(__dirname, '../src/core'),
            "@components": path.resolve(__dirname, '../src/components'),
			"@utils": path.resolve(__dirname, '../src/utils'),
			"@interface": path.resolve(__dirname, '../src/interface')

        }
    },
    module: {
        rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
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
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'img/[hash:12].[ext]'
				}
      		},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'media/[hash:12].[ext]'
				}
      		},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'fonts/[hash:12].[ext]'
				}
	        }
        ]
    }, 
    devServer: {
        
    }
}