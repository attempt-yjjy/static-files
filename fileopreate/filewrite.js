let fs = require('fs')

exports.fileAppend = function(filename,datastring,callback){
    fs.appendFile(filename,datastring,callback)
}