const HtmlWebPack           = require('html-webpack-plugin');
const MiniCssExtrac         = require("mini-css-extract-plugin");
const CopyPlugin            = require("copy-webpack-plugin");
const { LibManifestPlugin } = require('webpack');


const CssMinimizer   = require("css-minimizer-webpack-plugin");

const Terser         = require("terser-webpack-plugin");
 
 
module.exports = {
 
    mode: "production",

    output: {
       clean: true,
       filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
              test: /\.html$/i,
              loader: 'html-loader',
              options: {
                // Disables attributes processing
                sources: false,
                minimize: false, // true minimiza o comprime el codigo del HTMl index.html
           
              }, 
            },
            {
              test: /\.css$/i,
              exclude: /styles.css$/,
              use: [ 'style-loader' , 'css-loader']
            },

            {
             
              test: /styles.css$/,
              use: [ MiniCssExtrac.loader, 'css-loader' ]

            },

            {
              test: /\.(png|jpe?g|gif)$/i,
              loader: 'file-loader'
            },

            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            },

          ],
    },

    optimization: {
      
      minimize:    true,
      minimizer: [

        new CssMinimizer (),
        new Terser (),
      ]


    },  

    plugins: [
        new HtmlWebPack({
            title: 'Mi webPack app',
            filename: './index.html',
            template: './src/index.html', // es el archivo del cual se basa para construir, es el origen
           
        }),

        new MiniCssExtrac ({

          filename: '[name].[fullhash].css',
          ignoreOrder: false
        }),

        new CopyPlugin({
          patterns: [
            { from: 'src/assets/', to: "assets/" },
          ],
        })
    ]
  
}; 