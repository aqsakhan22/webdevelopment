// const http =require('http');
import http from 'http';
// const url = require('url');
// import path from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// const url=require('url');
const port =8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
console.log("file name is ",__filename,"directory name is",__dirname);
//url.fileURLtoPath(import.meta.url);
// console.log(url.fileURLToPat(import.meta.url));
const server = http.createServer((req,res) =>{
    // part1
    // res.setHeader('Content-Type','text/html')
    // res.end("<h1>hello world</h1>");
    // part 2
   // res.end("hello worls");
//    res.writeHead(200,{'Content-Type':'application/json'});
//    res.end(JSON.stringify({'message':'successfully rendered'}));

// console.log("req",req.url ,"method",req.method)
// res.writeHead(200,{'Content-Type':'text/html'});
// res.end('<h1>Hello World</h1>');



try{

    if(req.method == 'GET'){

        if(req.url == '/'){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end('<h1>Home Page</h1>');
        }
        if(req.url == '/aboutus'){
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end('<h1>About Us</h1>');
        }
        if(req.url == '/userinfo'){
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({'name':"aaa khan"}))
        }
        
    }
    

}
catch(e){

    res.writeHead(500,)
}

});

 
server.listen(port,() => {
    console.log("port started",port);
})