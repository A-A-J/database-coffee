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

    //If the ID exists, add the new updates!
    if(getData){

        //Add updates!
        await Guild.update(getData._id, {
            _premium_date:true
        })

    }else{
        
        //If the ID is not found in the database, the following message will appear.
        console.log('The database does not exist!')
    }

})();