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

    //If the data is not found, apply the following
    if(!getData){

        //Save data in a database
        getData =  await Guild.set({
            guild_id:1394803,
            guild_name:'test sertver',
            guild_owner:098029089,
        }, '1024041353933508719')
    }

})();