const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
    port:8081, //设置项目端口号这是vue项目端口
    host: "127.0.0.1", //允许所有的主机访问当前项目
    proxy: {
      '/api': {//匹配所有以'/api'开头的请求路径
        target: 'http://localhost:8080',//代理目标基础路径
        ws: true,//用于支持websocket
        changeOrigin: true,//用于控制请求域中的host值
        pathRewrite:{'^/api':''},//发送给服务器的路径中去除前缀的/api
      },
    }
}
}

