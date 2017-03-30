const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
	entry: "./js/main.js",
	output: {
		path: path.resolve(__dirname, "dist"), // `dist` is the destination
		filename: "bundle.js",
		publicPath: 'dist/'
	},
	module: {
		rules: [
			{
				test: /\.js$/, //Check for all js files
				use: [{
					loader: "babel-loader",
					options: { presets: ["es2015"] }
				}]
			},
			{
				loader: ExtractTextPlugin.extract({
					loader: 'css-loader'
				}),
				test: /\.css$/
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: { limit: 40000 }
					},
					"image-webpack-loader"
				]
			},
			{
				test: /\.styl$/,
				use: [{
					loader: "style-loader"
				}, {
					loader:"css-loader",
					options: {
						sourceMap:true
					}
				}, {
					loader:"stylus-loader",
					options: {
						sourceMap:true
					}
				}]
			},
			{
				test: /\.svg$/,
				loader: "svg-inline-loader"
			},
			{
				test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader : "file-loader"}
			
		]
	},

	plugins: [
		new ExtractTextPlugin('style.css')
	],

	devServer: {
		open: true, // to open the local server in browser
		contentBase: __dirname,
	}


};

module.exports = config;