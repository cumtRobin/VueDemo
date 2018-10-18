export class Validator {

    constructor() {
    }

    isEmail(value) {
        return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/.test(value)
    }
}