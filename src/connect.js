const firebase_coffee = exports;
const process = require('node:process')
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const EventEmitter = require('node:events');
const w = require('node:timers/promises').setTimeout

firebase_coffee.events = new EventEmitter();

/**
 * @param {*} config You must enter the connection data to the database, currently the database is only configured for firebase cloud databases
 * @param {*} option Use >alert< command that hides the appearance of connection success in console
 * @returns more https://firebase.google.com/docs/firestore/quickstart
 */
firebase_coffee.connect = async function(config, type_data='firebase', option = []) {
    try {
        if(!config ) throw 'config data must be added to connect to the database in file json';

        initializeApp({ credential: cert(config) });

        firebase_coffee.run = getFirestore();

        if(option.alert == false) return

        await w(100)

        firebase_coffee.events.emit('connect');


    } catch (err) {

        await w(100)

        firebase_coffee.events.emit('error', err)

        process.exit()

    }
};