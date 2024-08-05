import { createServer } from "http";
const port =8000;
const users=[
    {
        id:1,name:"Aqsa khan",

    },
      {
        id:2,name:"Sania khan",
        
    },
    {
        id:3,name:"Umer khan",
        
    },
    {
        id:4,name:"Hamza khan",
    }
];

const logger=((req,res,next) => {
    console.log(`api endpoints ${req.url} api methids ${req.method}`);
    next();
});

const jsonMiddleware=((req,res,next) => {
    res.setHeader('Content-Type','application/json');
    next();
});

const getUserHandler= (req,res) => {
    res.statusCode=200;
    res.write(JSON.stringify(users));
    res.end();
};

const getUserHandlerById= (req,res) => {

    const id=req.url.split("/")[3];
    let getUser=  users.find((users) => users['id'] == parseInt(id) );
    if(getUser){
        res.statusCode=200;
        res.write(JSON.stringify(getUser));
        res.end();

    }   
    else{
        res.statusCode=404;
        res.write(JSON.stringify({'message':'User Not Found'}));
        res.end();
    }
    res.end();
};


const UserNotFound= (req,res) => {
    res.statusCode=404;
    res.write(JSON.stringify({'message':'Not Found'}));
   res.end();
};

const createHandlerUser =(req,res) => {
     let body="";
     req.on('data',(chunk) => {
        console.log("chunk is",chunk);
        body+=chunk.toString();
     });
     req.on('end',() => {
        const newUser=JSON.parse(body);
        console.log("json new user is ",newUser);
        users.push(newUser);
        res.statusCode=201;
        res.write(JSON.stringify({'message':"User Added Succesfully"}));
        res.end();

     });

};
const server=createServer((req,res) => {

    logger(req,res,() => {

     jsonMiddleware(req,res , () => {
        if(req.url === "/api/users/" && req.method === 'POST'){
            createHandlerUser(req,res);
       }
      
    else  if(req.url === "/api/users/" && req.method === 'GET'){
        getUserHandler(req,res);
   }

       else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
           // res.statusCode=200;
    getUserHandlerById(req,res);
       
       }

       else{
       UserNotFound(req,res);
    }
     });
    } );



});

server.listen(port,() => {
    console.log("server is running");
});