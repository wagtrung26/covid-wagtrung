const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
 
  devServer: {
    proxy: 'http://disease.sh'
  }
},
)
