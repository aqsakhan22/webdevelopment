// const http =require('http');
import http from 'http';
// const url = require('url');
// import path from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
// const url=require('url');
const port =8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
console.log("file name is ",__filename,"directory name is",__dirname);
//url.fileURLtoPath(import.meta.url);
// console.log(url.fileURLToPat(import.meta.url));
const server = http.createServer( async (req,res)  => {
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

try {

    if(req.method == 'GET'){
        let filePath; 
        if(req.url === '/'){
        filePath=path.join(__dirname,'public','index.html');
            // res.writeHead(200,{'Content-Type':'text/html'});
            // res.end('<h1>Home Page</h1>');
        }
       else if(req.url === '/aboutus'){
            filePath=path.join(__dirname,'public','aboutus.html');
            // res.writeHead(200,{'Content-Type':'text/html'});
            // res.end('<h1>About Us</h1>');
        }
        else if(req.url === '/userinfo'){
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({'name':"aaa khan"}))
        }
        else{
            throw new Error("Not Found");
        }
        
        console.log("file path is ",filePath);
        const data= await fs.readFileSync(filePath);
       // res.writeHead(200, {'Content-Type': 'text/html'});
         res.setHeader('Content-Type','text/html');
         res.write(data);
         res.end();      
        
    }


    else{
        throw new Error("Method Not Allowed");

    }

}
catch(e){
    console.log("catch error is",e );
    res.writeHead(500,{'Content-Type':'text/Plain'})
    res.end('Server Error');
}

});

 
server.listen(port,() => {
    console.log("port started",port);
})