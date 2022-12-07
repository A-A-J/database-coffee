//require
const { firebaseConfig } = require('../config.json');
const { db } = require('../../index');
const Guild = require('../schemas/guild');

//Connect to databases
db.connect(firebaseConfig);

//Read logs
db.events.on('connect', () => console.log('connect') );
db.events.on('error', (er) =>  console.error(er) );

//Application of operations
(async () => {

    //Check if the ID exists in the database
    let getDataAll = await Guild.findAll('_premium', true, '==');

    //If the data is not found by search, show the following
    if(!getDataAll){


        console.log('No enabled Premium servers found')

    }else{

        //If found, fetch the data
        console.log(getDataAll)
    }

})();