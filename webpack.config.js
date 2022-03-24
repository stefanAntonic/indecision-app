const path = require('path');


module.exports ={
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
         rules: [{
             loader:'babel-loader',
             test: /\.(js||jsx)$/,
             exclude: /node_modules/
         },
        {
          test: /\.(css||scss)$/,
          use: ['style-loader',
                'css-loader',
                'sass-loader'
                
              
        ]
        }]     
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        
      },
      devtool: 'eval-cheap-source-map' 
}