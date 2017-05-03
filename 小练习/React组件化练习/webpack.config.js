var path = require('path')

module.exports = {
	entry: {
		app: path.join(__dirname, './js/index.js')
	},

	output: {
		path: path.join(__dirname, './js/bundle.js'),
		publicPath: "./js/",
		filename: "bundle.js"
	},

	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				include: path.join(__dirname, '/js')
			}
		]
	}
}