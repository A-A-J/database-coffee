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
    let getData = await Guild.findOne('1024041353933508719', true);

    //If data is found, apply the following
    if(getData){

        // delete
        await Guild.delete('1024041353933508719')

    }else{
        
        //Data does not exist
        console.log('The data was not found in the database!')
    }

})();