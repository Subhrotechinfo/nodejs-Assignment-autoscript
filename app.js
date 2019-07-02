const express =require('express');
const mongoose  = require('mongoose');
const MongoClient = require('mongodb');
const http = require('http');
const bodyParser = require('body-parser')
const randomize  = require('randomatic');
const  { port , dbStrng }  = require('./config');
const routers = require('./router');
let client = null;

//create an instance of express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//using the route
app.use('/', routers);

// Test API
app.get('/hello',(req, res)=>{
    // console.log('-->',randomize('0', 4));
    res.send('OK');
});

let server =  http.createServer(app);
server.listen(port, ()=>{
    mongoose.connect(dbStrng, {useNewUrlParser: true})
    .then((result)=>{
        if(result){
            console.log('Connected to Atlas Mongodb');
        }
    }).catch((err)=>console.log(err));
    console.log(`Express App listening on port ${port}`);
    
})



