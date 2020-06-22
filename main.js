let express = require('express')
var bodyp=require('body-parser');
//post中间件接收数据

let app = express()

app.use(bodyp.urlencoded({ extended: false,limit:20*1024})); //extended 拓展模式  limit 最大接收数据

app.use('/',(request,response,next)=>{
    console.log(request.url)
    response.setHeader('Access-Control-Allow-Origin', '*');
    next()
})

app.use('/public',express.static('../public'))

app.post('/order/submit',(request,response,next)=>{
    console.log(request.body)
    next()
})

app.listen(80,()=>{
    console.log("服务启动成功")
})