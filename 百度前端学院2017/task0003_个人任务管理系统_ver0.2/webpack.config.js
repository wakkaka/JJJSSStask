var webpack = require('webpack');
var path = require('path');
module.exports = {
	entry: './js/entry.js',
	output:{
		path : path.resolve(__dirname, '/js'),
		filename : 'bundle.js'
	},
	module : {
		loaders:[
			{test: /\.css$/,loader:'style-loader!css-loader'},//以.css结尾的
			{test: /\.js$/,loaders: 'babel-loader'}
		]
	}
}
