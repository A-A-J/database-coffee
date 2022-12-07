require('colors');
const database = require('./connect')

class modal{
    constructor(collection, data){
        try {
            if (!collection) throw "You must enter the name of the table!";

            if (!data) throw "You must enter the scheme!";

            if(!database.run) throw "An error occurred connecting to databases";

            this.db = database.run;

            this.Schema = data;

            this.collection_name = collection;
            this.collection = this.db.collection(collection);

            this.Schema.data = this.Schema.get()
        
        } catch (err) {
        
            database.events.emit('error', err)

            process.exit()

        }
    }

    async filters(data, updata=false){
        try {
            if (!data) throw "You must enter array data!";
            this.boxData = []

            Object.keys(data).filter((g) => {
                if(Number(g) == true) throw `The following identifiers (${Object.keys(this.Schema.data).join(', ')}) should be added followed by the value!`;
                if(Object.keys(this.Schema.data).includes(g) == false) throw `Column >${g}< is not default in table >${this.collection_name}<`
            });

            if(updata == true){
                Object.keys(data).forEach((d) => {
                    if(!Object.keys(this.Schema.data).includes(d)) throw `Column ${d} is not default in table ${this.collection_name}`
                })
                return data
            }

            for (const [k,v] of Object.entries(this.Schema.data)){
                if(!data[k] && typeof v != 'boolean'){
                    if(!v) throw `Column ${k} is not default! You must add to it in table ${this.collection_name}`
                    this.Schema.data[k] = v
                }else{

                    this.Schema.data[k] = data[k] ?? v
                }
                
            }
            return this.Schema.data;
        } catch (err) {
            database.events.emit('error', err)
            // process.exit(1)
        }
    }

    /**
     * 
     * @param {*} search enter id 
     * @param {*} check show msg in console.error [show.default] == false | [hide] == true
     * @returns 
     */
    async findOne(search, check=false){
        try {
            if(!search) throw "That document ( id ) is invalid!";
            const doc = await this.collection.doc(search).get();
            if(!doc.exists && check == true) return
            if(!doc.exists && check == false) throw `id ${search} is not in database`
            return doc.data()
        } catch (error) {
            database.events.emit('error', error)
        }
    }

    /**
     * https://firebase.google.com/docs/firestore/query-data/queries
     * @param {*} field Column Name
     * @param {*} value ID of the required value
     * @param {*} typeWhere operator
     * @param {*} checkMsg show msg in console.error [show.default] == false | [hide] == true
     * @returns 
     */
    async findAll(field, value, typeWhere='==', checkMsg=false){
        try {
            this.getf = []
            const check = await this.collection.where(field, typeWhere, value);
            const getData = await check.get();
            if(getData.empty && checkMsg == true) return
            if (getData.empty) throw 'No matching documents.';
            getData.forEach((e) => {
                this.getf.push(e.data())
            })
            return this.getf;
        } catch (error) {
            database.events.emit('error', error)
            // process.exit(1)
        }
    }

    async set(data, id){
        try {
            if (!data) throw `You must enter array data! ${id}`;
            if(typeof id != 'string' ) throw `The value of id must be a String ${id}`
            const check = await this.findOne(id, true);
            data = await this.filters(data);
            const set_in_database = await this.collection.doc(id)
            if(!check){
                data['_id'] = set_in_database.id;
                set_in_database.set(data)
            }
            const get = await set_in_database.get()
            if(!get.exists) return
            return get.data()
        } catch (err) {
            database.events.emit('error', err)
        }
    }

    async get(table, guild_id){
        try {
            const getData = await this.db.collection(table).doc(guild_id).get();
            if (!getData.exists) throw `There is no table [${guild_id}]`;
            return getData.data()
        } catch (error) {
            database.events.emit('error', error)
        }
    }
    
    async delete(guild_id){
        try {
            return await this.collection.doc(guild_id).delete();
        } catch (er) {
            database.events.emit('error', er)
        }
    }

    async update(id, data){
        try {
            const up = this.collection.doc(id);
            const get = await up.get();
            if(!get.exists) throw `id ${id} not is in database!`;
            const datad = await this.filters(data, true);
            return await up.update(data)
        } catch (er) {
            database.events.emit('error', er)
        }
    }
}

module.exports = modal;