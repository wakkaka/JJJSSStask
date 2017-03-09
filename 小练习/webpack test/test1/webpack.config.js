var webpack = require('webpack');

module.exports = {
	entry: './entry.js',
	output: {
		path:__dirname,
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{test: /\.css$/,loader:'style!css'}//以.css结尾的
		]
	}
}                                                                                                                                                                                                                                