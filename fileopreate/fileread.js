let fs = require('fs')

exports.readEveryLine = function(filename,callback){
    fs.readFile(filename,callback)
}