const common = require('./webpack.common.js');
const {merge} = require('webpack-merge');

module.exports = merge(common, {
    mode : 'development',
    devServer : {
        watchFiles : ['./src/template.html']
    },
    devtool : 'inline-source-map',
})