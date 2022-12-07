const firebase_coffee = exports;
require('colors')
const process = require('node:process')
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const EventEmitter = require('node:events');

firebase_coffee.events = new EventEmitter();

firebase_coffee.connect = async function(config, option = []) {
    try {
        
        if(!config || !config.credential || !config.databaseURL) throw 'config data must be added to connect to the database\n [credential], [databaseURL] in config.json';
        
        initializeApp({ credential: cert(config.credential), databaseURL: config.databaseURL });
        
        firebase_coffee.run = getFirestore();

        if(option.alert == false) return


        setTimeout(() => firebase_coffee.events.emit('connect') , 100);


    } catch (err) {
        firebase_coffee.events.emit('error', err)

        process.exit()

    }
};