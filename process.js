export default class Process {
    constructor(number, cycles) {
        this._number = number;
        this._cycles = cycles;
        this._next = null;
    }

    get number() {
        return this._number;
    }

    get cycles() {
        return this._cycles;
    }

    set cycles(newVal) {
        this._cycles = newVal;
    }

    get next() {
        return this._next;
    }

    set next(newNext) {
        this._next = newNext;
    }
}
