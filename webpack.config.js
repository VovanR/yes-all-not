var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV);

module.exports = {
	entry: {
		index: './src/app.js'
	},
	output: {
		path: './dist',
		filename: '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/app.pug'
		}),
	],
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'pug-loader',
					},
				]
			},
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					'css-loader',
					'stylus-loader',
				],
			},
		]
	},
}
