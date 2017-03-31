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
				use: "babel-loader",
				exclude: /node_modules/
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
			},
            {
            	test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192'
            }

        ]
	},

	plugins: [
		new ExtractTextPlugin({
			filename:'style.css',
			disable:false,
			allChucks:true
		}),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
	],

	devServer: {
		open: true, // to open the local server in browser
		contentBase: __dirname,
	}

};

module.exports = config;