const prompts = require('prompts');
const axios = require('axios');
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
         
    axios.create()
    axios.get('localhost:8080/hello')
        .then((resp)=>{
            console.log(resp);
        })
        .catch((err)=>{
            console.log(err);
        })
    // axios.post('localhost:8080/signin', formData)
    //     .then((resp)=>{
    //         console.log(resp)
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //         // var errorStatus = null;
            // if (!err.response) {
            //     // network error
            //     errorStatus = 'Error: Network Error';
            //     console.log('here',errorStatus);
            // } else {
            //     errorStatus = err.response.data.message;
            //     console.log('here 2',errorStatus);
            // }   
        // })
})();

