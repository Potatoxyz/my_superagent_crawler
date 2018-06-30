var fs = require('fs');
var path = require('path');
var mockPath=path.resolve(__dirname,'../mock/');
function writeText(filename,content) {
    var targetPath=mockPath+'/'+filename;
    fs.writeFile(targetPath,content,function(err){
        if(err){
            console.error(err);
        }
        console.log('------文本写入成功-----------');
    });
}
module.exports=writeText;