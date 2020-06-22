let express = require('express')

let app = express()

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