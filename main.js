let express = require('express')
var bodyp=require('body-parser');

let filewrite = require('./fileopreate/filewrite.js')
let fileread = require('./fileopreate/fileread.js')
//post中间件接收数据

let app = express()

app.use(bodyp.urlencoded({ extended: false,limit:20*1024})); //extended 拓展模式  limit 最大接收数据

app.use('/',(request,response,next)=>{
    console.log(request.originalUrl)
    response.setHeader('Access-Control-Allow-Origin', '*');
    next()
})

app.use('/public',express.static('../public'))

app.post('/order/submit',(request,response,next)=>{
    let tempOrder = {
        JuiceList:JSON.parse(request.body.data),
        OrderId:new Date().getTime()
    }
    new Promise((resolve,rejected)=>{
        filewrite.fileAppend('./database/orderhistory.txt',JSON.stringify(tempOrder) + '\n',(error)=>{
            if(!error){
                resolve({
                    success:true,
                    OrderId:tempOrder.OrderId
                })
            }
            else{
                resolve({
                    success:false,
                    OrderId:tempOrder.OrderId
                })
            }
        })
    }).then(result=>{
        response.send(result)
    })

})

app.get('/order/getall',function(request,response){
    new Promise((resolve,rejected)=>{
        fileread.readEveryLine('./database/orderhistory.txt',(err,data)=>{
            if(err){
                resolve({
                    success:false,
                    err
                })
            }
            else{
                resolve({
                    success:true,
                    data
                })
            }
        })
    }).then(result=>{
        if(result.success){
            let orderstrArray = result.data.split('\n')
            let orderArray = orderstrArray.map(item=>{
                return JSON.parse(item)
            })
            response.send({
                success:true,
                orderArray
            })
        }
        else{
            response.send({
                success:false,
                error:result.err
            })
        }
    })
})

app.listen(8011,()=>{
    console.log("服务启动成功")
})