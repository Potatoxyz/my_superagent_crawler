var superagent=require('superagent');
var browserMsg={
    "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
    'Content-Type':'application/x-www-form-urlencoded'
};
(function () {
    superagent.get('file:///C:/Users/Administrator/Desktop/html/level1.html')
        .set(browserMsg)
        .on('error',handleError)
        .end(function (res) {
            console.log(res);
        })
})();
function handleError(e) {
   console.log(e.status)
}