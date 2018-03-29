var webpack = require("webpack");

module.exports = {
    entry:"./app/js/index.js",
    output:{
        path:__dirname + "/dist",
        filename:"bundle.js",
    },
    devServer:{
        inline:true,
        contentBase:"./dist",
        port:3000
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                loader:"babel-loader",
                query:{
                    presets:["env", "react"]
                }
            },
            {
                test:/\.css/,
                exclude:/(node_modules)/,
                loader:"style-loader!css-loader"
            }
        ]
    }
};