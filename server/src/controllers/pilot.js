module.exports = class Pilot {
    constructor() {
        this.number = 3
    }
    action(data) {
        return this[data.method](data)
    }
    test(data) {
        this.number += data.number
        console.log('pilot-number', this.number)
        return this.number
    }
}