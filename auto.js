const prompts = require('prompts');
const axios = require('axios');
const request = require('request');

(async () => {
    const resp = await prompts({
        type: 'number',
        name:'userInput',
        message: 'Please enter the number of times you want to hit the Signup API',
        validate: userInput => userInput < 1 ? 'Please enter a number': true
    });
    let apiHitTimes = resp.userInput;
    // console.log( typeof  apiHitTimes);
    // for(let hits = 0 ;hits< apiHitTimes; hits++){
    //     // make api call apiHitTimes
    // }
    let formData = {
        emailId:'subhro74@gmail.com',
        password:'Subhro1990'
    }
    console.log(JSON.stringify(formData))
    axios.get('http://ec2-13-235-32-210.ap-south-1.compute.amazonaws.com:8080/hello')
        .then((resp)=>{
            console.log(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        });

        request.post({url:'http://ec2-13-235-32-210.ap-south-1.compute.amazonaws.com:8080/signin',form:{
            emailId:'subhro74@gmail.com',
            password:'Subhro1990'
        }}, function(err,resp,body){
            console.log('--GET');
            console.log('err', err);
            console.log('Resp----> ', resp);
            console.log('Body ----> ', body);
        })
        // request.post({url: 'http://ec2-13-235-32-210.ap-south-1.compute.amazonaws.com:8080/signin', 
        // form: {emailId:'subhro74@gmail.com', password:'Subhro1990'}}, function(err, resp, body){
        //     console.log('error--->',err);
        //     console.log('Resp ---->',resp);
        //     console.log(body)
        // })
    // axios({
    //     method: 'post',
    //     url:'http://ec2-13-235-32-210.ap-south-1.compute.amazonaws.com:8080/signin',
    //     data:{
    //         emailId:'subhro74@gmail.com',
    //         password:'Subhro1990'
    //         }
    //     })
    //     .then((resp)=>{
    //         console.log(resp.data);
    //     }).catch((err)=>{
    //         console.log(err);
    //     });

})();

