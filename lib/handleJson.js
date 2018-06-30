//新增文件时 的 params 是数组形式，文件存在新增数据时 params 是json格式

var fs = require('fs');
var path = require('path');
var mockPath=path.resolve(__dirname,'../mock/');
function writeJson(filename,params){
    var path=mockPath+'/'+filename;
    //现将json文件读出来
    if(checkPath(path)){
        fs.readFile(path,function(err,data){
            if(err){
                console.error("文件不存在");
            }
            var person = data.toString();//将二进制的数据转换为字符串
            person = JSON.parse(person);//将字符串转换为json对象
            person.data.push(params);//将传来的对象push进数组对象中
            person.total = person.data.length;//定义一下总条数，为以后的分页打基础
            console.log(person.data);
            var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            fs.writeFile(path,str,function(err){
                if(err){
                    console.error(err);
                }
                console.log('----------新增成功-------------');
            })
        });
    }
    else{
        var d={total:params.length,data:params};
        var str=JSON.stringify(d);
        fs.writeFile(path,str,function(err){
            if(err){
                console.error(err);
            }
            console.log('新建文件------新增成功-----------');
        })
    }
}
function checkPath(path) {
    return  fs.existsSync(path);
}
module.exports= {writeJson:writeJson};