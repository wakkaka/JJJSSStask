module.exports = {
	entry: './js/entry.js',
	output:{
		filename : 'bundle.js',
		path : './js'
	},
	module : {
		loaders:[
			{test: /\.css$/,loader:'style-loader!css-loader'}//以.css结尾的
		]
	}
}