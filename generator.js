import Process from "./process.js";

export default class Generator {
    constructor() {
        this._cycleNumber = 0;
    }

    checkForNewProcesses() {
        if(this._getNewProcessProbability() < 40) {
            this._cycleNumber++;
            let newProcess = new Process(this._cycleNumber, this._getCyclesQuantity());
            return newProcess;
        } else {
            return null;
        }
    }

    _getNewProcessProbability() {
        return Math.floor((Math.random() * 100 + 1));
    }

    _getCyclesQuantity() {
        return Math.floor((Math.random() * 11 + 4));
    }
}