const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const VENDOR_LIBS = [
	"lodash", "jquery", "pace"
];


module.exports = {
	entry:  {
		bundle: "./js/main.js",
		vendor: VENDOR_LIBS
	},

	output: {
		path: path.join(__dirname, "dist"), // `dist` is the destination
		filename: "[name].[chunkhash].js",
	},
	module: {
		rules: [
			{
				test: /\.js$/, //Check for all js files
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.(styl|css)$/i,
				use:[
					"style-loader",
					"css-loader"
					// "stylus-relative-loader"
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
				loader: "url-loader?limit=8192"
			}

		]
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ["vendor", "manifest"]
		}),

		new HtmlWebpackPlugin({
			template: "js/index.html"
		}),
		// new ExtractTextPlugin({
		// 	filename:"style.css",
		// 	disable:false,
		// 	allChucks:true
		// }),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		}),
		new ManifestPlugin({
			fileName: "manifest.json",
			basePath: "/js/"
		})
	],

	devServer: {
		open: true, // to open the local server in browser
		contentBase: __dirname
	},

};
