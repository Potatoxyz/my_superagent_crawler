var Crawler = require("crawler");
var path = require('path');
var fs = require('fs');
//测试导入的函数
// var autoRun =require("../lib/test_autoRun");
// var a=autoRun.test_autoRun;
var handleJson=require('../lib/handleJson');

//将当前路径转化为绝对路径
var mockPath=path.resolve(__dirname,'../mock');

var c = new Crawler({
    // 在每个请求处理完毕后将调用此回调函数
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ 默认为 Cheerio 解析器
            // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
            // console.log($('p').text());
            console.log('爬取');
        }
        done();
    }
});

// 将一个URL加入请求队列，并使用默认回调函数
// c.queue('http://www.amazon.com');

// 将多个URL加入请求队列
// c.queue(['http://www.google.com/','http://www.yahoo.com']);

// 对单个URL使用特定的处理参数并指定单独的回调函数
c.queue([{
    uri: 'http://hktools.eccang.com/sale/top-hundred/list',

    jQuery: true,

    // The global callback won't be called
    callback: function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // console.log($('.dd-handle').text());
            var content=res.toString();
            console.log(res.body);
            var cPath=mockPath+'/test.txt';
            // fs.writeFile(cPath,content,function(err){
            //     if(err){
            //         console.error(err);
            //     }
            //     console.log('------文本写入成功-----------');
            // });
            var path=mockPath+'/test.json';
            // handleJson.writeJson(path,{id:'1',data:"asdasd"});
        }
        done();
    }
}]);

// 将一段HTML代码加入请求队列，即不通过抓取，直接交由回调函数处理（可用于单元测试）
// c.queue([{
//     html: '<p>This is a <strong>test</strong></p>'
// }]);