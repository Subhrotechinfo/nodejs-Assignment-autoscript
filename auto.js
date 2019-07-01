const prompts = require('prompts');

// let script = ()=> {
//     // var arg = process.argv[2];
//     // console.log('-->',arg);

// }
// script();

(async () => {
    const resp = await prompts({
        type: 'number',
        name:'userInput',
        message: 'Please enter the number of times you want to hit the Signup API',
        validate: userInput => userInput < 1 ? 'Please enter a number': true
    });
    let apiHitTimes = resp.userInput;
    // console.log( typeof  apiHitTimes);
    for(let hits = 0 ;hits< apiHitTimes; hits++){
        
    }
    





})();

