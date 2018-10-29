const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => ({
	// argv.mode = production / development  

	entry: {
		app: [
			'./src/main.js',
			'./src/main.scss',   // instead of importing in js
		],
		vendor: ['jquery']
	},
	output: {
		path: path.join(__dirname, "./dist"),
		//publicPath:"./public",     														// urls that webpack encounters will be re-written to begin with "/public/".
		filename: argv.mode === 'development' ? '[name].js' : '[name].[contenthash].js'   	// [name] = placeholder, referring to entry point name (app)
																					   	    // Webpack 4 prebuilt functionality for caching via contenthash (production)
	},
	module:{
		rules:[
			{
				test: /\.scss$/,
				exclude: /node_modules/,
	            use: [
					'style-loader', // creates style nodes from JS strings, acts as a fallback here
	                MiniCssExtractPlugin.loader, // extract css into separate file
	                "css-loader", // translates CSS into CommonJS
	                "sass-loader" // compiles Sass to CSS, using Node Sass by default
	            ]
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
						'style-loader',   	
						'css-loader'
				]
			},
		 	{
				test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: argv.mode === 'development' ? "images/[name].[ext]" : "images/[name].[hash].[ext]",
					limit: 25000
				}
      		},
			{ 
				test: /\.js$/, 	
				exclude: /node_modules/, 
				loader: "babel-loader" 
			}
		]
	},
	optimization: {
		// Setting optimization.minimizer overrides the defaults provided by webpack, 
		// so make sure to also specify a JS minimizer:
	    minimizer: [
			new UglifyJsPlugin({
				cache: true,
        		parallel: true,
			}),
			new OptimizeCSSAssetsPlugin({}),
			new HtmlWebpackPlugin({
				inject: false,
				hash: true,
				template: './index.html',
				filename: 'index.html'
		    })
	    ]
  	},
	plugins: [
        new MiniCssExtractPlugin({
		    filename: argv.mode === 'development' ? '[name].css' : '[name].[contenthash].css',   // minicss plugin hash (production)
		    chunkFilename: argv.mode === 'development' ? '[id].css' : '[id].[contenthash].css',
        })
    ]
});