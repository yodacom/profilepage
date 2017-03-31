const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const stylus_plugin = require("stylus_plugin");

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
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use:[
					"style-loader",
					"css-loader"
					]
				
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:["css-loader","stylus-loader"]
				}),
				
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
				test: /\.styl$/i,
				use: [
					"style-loader",
					"css-loader",
					"stylus-relative-loader"
				]
			},
			{
				test: /\.svg$/,
				use: "svg-inline-loader"
			},
			{
				test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				use : "file-loader"
			}
			
		]
	},

	plugins: [
		new ExtractTextPlugin({
			filename:'style.css',
			disable:false,
			allChucks:true
		})
	],

	devServer: {
		open: true, // to open the local server in browser
		contentBase: __dirname,
	}

};

module.exports = config;