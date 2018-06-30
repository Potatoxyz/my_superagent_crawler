var superagent=require('superagent');
var cheerio=require('cheerio');
var fs=require('fs');
var path = require('path');
var writeText=require('../lib/writeText');
var handleJson=require('../lib/handleJson');
var browserMsg={
    "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    'Content-Type':'application/x-www-form-urlencoded'
};
var mockPath=path.resolve(__dirname,'../mock');
//访问登录接口获取cookie
function getLoginCookie(userid, pwd) {
    return new Promise(function(resolve, reject) {
        // setTimeout(function (args) {
        //     resolve('done');
        // },1000)
        superagent.post('http://hktools.eccang.com/').set(browserMsg).send({
            userName: '512006634@qq.com',
            userPass: 'Yc123456',
            gotourl: ''
        }).redirects(0).end(function (err, response) {
            //获取cookie
            var cookie = response.headers["set-cookie"];
            resolve(cookie);
        });
    });
}
function getData(cookie) {
    return new Promise(function(resolve, reject) {
        //传入cookie
        superagent.post('http://hktools.eccang.com/sale/top-hundred/get-nestable').set("Cookie",'PHPSESSID=jjj0cker6s046jck2e069msdr0; LANGUAGE=zh_CN; currentPage=0%7B%7C%7D%2Fsystem%2Fhome%7B%7C%7D%E9%A6%96%E9%A1%B5').set(browserMsg)
            .send({
                bas_code: 'DE'
            })
            .end(function(err,res) {
               // resolve(JSON.parse(res.text).data);
            var $ = cheerio.load(JSON.parse(res.text).data);
            resolve({
                cookie: cookie,
                doc: $
            });
        });
    });
}
function start() {
    // getLoginCookie().then(function (cookie) {
    //     console.log(cookie);
    //     getData(cookie).then(function (data) {
    //         var $=data.doc;
    //         console.log($('dd-handle').text());
    //     })
    // });
    getData(1).then(function (data) {
        var $=data.doc;
        var jsonData=handleDom($);
        handleJson.writeJson('dataDE.json',jsonData);

        // console.log(data);
        // console.log($('.dd-handle').text());
        // var total=$('.dd-handle').text();
        // writeText('test.txt',text);
        // writeText('test1.txt',total);
    })
}
function handleDom($) {
    var parentOl=$('.nestable').children('.dd-list');
    var levelLi1=$(parentOl).children('li');
//        console.log($(levelLi1).length);  //37   一级列表
    var level1=[];
    $(levelLi1).each(function(index,value){
        var ol=$(this).children('ol');
        var levelLi2=$(ol).children('li');
//           console.log($(levelLi2).length);//二级列表

        //得到一级列表的值
        var text=$(value).children('.dd-handle').text();
        level1.push({index:index,value:text,children:null});


        var level2=[];
        $(levelLi2).each(function(index1,value1){
            var ol=$(this).children('ol');
            var levelLi3=$(ol).children('li');
//              console.log($(levelLi3).length);//三级级列表


            //得到二级列表的值
            var text=$(value1).children('.dd-handle').text();
            level2.push({index:index,value:text,children:null});

            //得到三级列表的值
            var level3=[];
            $(levelLi3).each(function(index2,value2){
                var text=$(value2).children('.dd-handle').text();
//                    console.log(text);
                level3.push({index:index2,value:text,children:null});
            });
            level2[index1]['children']=level3;

        });

        level1[index]['children']=level2;
    });
    return level1;
}

start();