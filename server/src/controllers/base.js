const Pilot = require('./pilot');

const Extends = {
    pilot: new Pilot()
}

module.exports = class Base {
    constructor(data) {
    }
    action(data) {
        console.log('base', data);
        return Extends[data.entity].action(data)
    }
}