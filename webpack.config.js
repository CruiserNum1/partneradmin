const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const NODE_ENV  = process.env.NODE_ENV;
const API_LINK  = process.env.API_LINK;
const BASE_PATH = process.env.BASE_PATH || "/";

module.exports = {
    entry: ['babel-polyfill', "./src/index.js"],
    output: {
        filename: "./static/index_bundle-[name].[hash].js",
        path: path.join(__dirname, './dist'),
        publicPath: BASE_PATH
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: '[path]-[local]',
                            },
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash].[ext]',
                    publicPath: `${BASE_PATH}static/images`,
                    outputPath: 'static/images',
                }
            },
            {
                test: /\.(ttf|eot|woff(2)?|otf)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[hash].[ext]',
                    publicPath: `${BASE_PATH}static/fonts`,
                    outputPath: 'static/fonts',
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./static/[name].[contenthash].css",
            chunkFilename: "[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            title: "INDACOIN",
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
        }),
        new webpack.DefinePlugin({
            "env.NODE_ENV": JSON.stringify(NODE_ENV),
            "env.API_LINK": JSON.stringify(API_LINK),
            "env.BASE_PATH": JSON.stringify(BASE_PATH),
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["node_modules"],
        alias: {
            "@assets": path.join(__dirname, "src", "assets"),
            "@images": path.join(__dirname, 'src', 'assets/images'),
            "@fonts": path.join(__dirname, 'src', 'assets/fonts'),
            "@styles": path.join(__dirname, "src", "styles"),
            "@requests": path.join(__dirname, "src", "requests"),
            "@redux": path.join(__dirname, "src", "redux"),
            "@components": path.join(__dirname, "src", "components"),
            "@containers": path.join(__dirname, "src", "containers"),
            "@constants": path.join(__dirname, 'src', 'constants.js'),
            "@tools": path.join(__dirname, 'src', 'tools'),
            "@config": path.join(__dirname, "src", "config"),
            "@languages": path.join(__dirname, "src", "languages"),
            "@pages": path.join(__dirname, "src", "pages"),
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true
    },
}