let express = require('express')

let app = express()

app.use('/',(request,response,to)=>{
    console.log(request.url)
    response.setHeader('Access-Control-Allow-Origin', '*');
    to()
})

app.use('/public',express.static('./public'))

app.listen(8077,()=>{
    console.log("服务启动成功")
})