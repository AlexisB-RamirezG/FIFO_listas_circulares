import Generator from "./generator.js";
import Queue from "./queue.js";

class Main {
    constructor() {
        this._generator = new Generator();
        this._newQueue = new Queue(this._generator);
    }

    initializeQueue() {
        this._newQueue.startQueue();
        this._printAtributes();
    }

    _printAtributes() {
        console.log(this._newQueue.atributesString);
    }
}

let m = new Main();
m.initializeQueue();

