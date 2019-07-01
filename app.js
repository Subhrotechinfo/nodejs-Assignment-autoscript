const express =require('express');
const mongoose  = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser')
const randomize  = require('randomatic')
const  { port , dbStrng }  = require('./config');
const routers = require('./router');

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
    console.log(`Express App listening on port ${port}`);
    let db = mongoose.connect(dbStrng, {useNewUrlParser: true});
    console.log('Connected to Mongodb');
})

mongoose.connection.on('error', (err)=>{
    console.log('Database Connection Error');
    console.log(err);
});

mongoose.connection.on('open', (err)=>{
    if(err){
        console.log('Mongoose connection error');
    }else {
        console.log('Database Connection open');
    }
});

