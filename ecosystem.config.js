module.exports = {
    apps: [
       {
        name:'CMS-handyman-server' ,
        script: './src/index.js',
        instances:'max',
        env_production: {
            NODE_ENV:'production'
        }
       }    
    ]
};