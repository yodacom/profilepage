const webpack = require("webpack");
const path = require("path");

const config = {
	context: __dirname + "/js", // `__dirname` is root of project and `src` is source
	entry: {
		app: "./main.js",
	},
	output: {
		path: __dirname + "/dist", // `dist` is the destination
		filename: "[name].bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/, //Check for all js files
				use: [{
					loader: "babel-loader",
					options: { presets: ["es2015"] }
				}
                ]
			},

            {
                test: /\.styl$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
		]
	},

	devServer: {
		open: true, // to open the local server in browser
		contentBase: __dirname,
	},


};

module.exports = config;