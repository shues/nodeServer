const http = require('http');

http.createServer((req, res)=>{
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var parseString = require('xml2js').parseString;
    var resHtml = '';
    let xhr = new XMLHttpRequest();
    let url = 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en';
    xhr.open('GET',url,false);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            let xml = xhr.responseText;
            //console.dir(xml);
//            console.log(xhr.responseText);
            parseString(xml, function (err, result) {
                console.log( typeof result.rss.channel);
                //console.dir();
                let massItem = result.rss.channel[0].item;
                resHtml = massItem.map(el => '<h4>' + el.title[0] + '</h4>').join('');
                
                console.dir(resHtml);
            });
        }
    }
    xhr.send(null);
    
    res.writeHead(200,{ 'Content-Type':'text/html'});
    res.end(`
            <!doctype>
            <html>
                <head>
                    <title>
                        News
                    </title>
                </head>
                <body>
                    titles` + resHtml + `
                </body>
            </html>
            `);
}).listen(3000, ()=>console.log('server started'));
