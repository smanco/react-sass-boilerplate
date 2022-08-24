const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDirectory = 'dist';
module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, buildDirectory),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@styles': path.resolve(process.cwd(), './src/sass'),
            '@ui': path.resolve(process.cwd(), './src/ui'),
            '@pages': path.resolve(process.cwd(), './src/layout/pages'),
            '@components': path.resolve(process.cwd(), './src/layout/components'),
            '@store': path.resolve(process.cwd(), './src/state/store'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            { test: /\.(ts|tsx)?$/, exclude: ['/node_modules/'], loader: 'ts-loader' },
            ,
            {
                test: /\.(s(a|c)ss)$/,
                exclude: ['/node_modules/'],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)],
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
