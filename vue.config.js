module.exports = {
        lintOnSave: false,
        chainWebpack: config => {
                // GraphQL Loader
                config.module
                    .rule('svg-inline')
                    .test(/\.svg$/)
                    .use('svg-inline-loader')
                    .loader('svg-inline-loader')
                    .end()
        }
};