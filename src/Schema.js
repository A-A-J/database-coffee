class Schema {
    constructor(...args) {
        this.data = args;
    }
    getAll() {
        let schemaData = {};
        for (let opp of this.data) {
            for (let key of Object.keys(opp)) {
                let object = this.data[0][key];
                if(object.default != false){
                    if (object.type !== typeof object.default){
                        schemaData[key] = '';
                    }else{
                        schemaData[key] = object.default;
                    }
                }else{
                    schemaData[key] = object.default;
                }
            }
            return schemaData;
        }
    }
    
    get() {
        const data = this.getAll();
        return data;
    }
}

module.exports = Schema;