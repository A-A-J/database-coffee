const { firebaseConfig } = require('./config.json')
const { red } = require('colors')
const { db } = require('../index')

db.connect(firebaseConfig)

db.events.on('connect', () => {
    console.log('connect')
})

db.events.on('error', (er) => {
    console.error(red(er))
})


const Guild = require('./schemas/guild')

(async () => {
    let getData = await Guild.findOne('1024041353933508719', true);
    if(!getData){
       getData =  await Guild.set({
            guild_id:1394803,
            guild_name:'test sertver',
            guild_owner:098029089,
        }, '1024041353933508719')
    }

    await Guild.update(getData._id, {
        _premium_date:true
    })

    await Guild.delete('1024041353933508719')
})()