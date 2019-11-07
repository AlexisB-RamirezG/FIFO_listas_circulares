export default class Queue {
    constructor(generator) {
        this._generator = generator;
        this._start = null;
        this._end = null;
        this._emptyQueueCycles = 0;
        this._completedProcesses = 0;
        this._cyclesLeft = 0;
        this._processesLeft = 0;
        this._totalCycles = 0;
        this._atributesString = "";
    }

    get atributesString() {
        return this._atributesString;
    }

    startQueue() {
        this._startQueue();
    }

    _startQueue() {
        let pointer = null;
        for (let i = 1; i <= 300; i++) {
            let newProcess = this._generator.checkForNewProcesses();
            if(newProcess != null) {
                this._totalCycles++;
                this._positionateInQueue(newProcess);
                if(pointer == null) {
                    pointer = this._start;
                }
            }
            if(this._start != null) {
                pointer.cycles = pointer.cycles-1;
                console.log(`No. de ciclo: ${i}. No. de proceso: ${pointer.number}. Ciclos restantes: ${pointer.cycles}`);
                if(pointer.cycles == 0) {
                    this._completedProcesses++;
                    this._deleteFinishedProcess(pointer);
                }
                pointer = pointer.next;
            } else {
                console.log(`No. de ciclo: ${i}. Ciclo sin procesos.`);
                this._emptyQueueCycles++;
            }
            /*console.log("NUEVO");
            console.log(newProcess);
            console.log("Inicio");
            console.log(this._start);
            console.log("---------------------");*/ 
        }
        console.log(this._start);
        this._getAtributesAsString();
    }

    _getAtributesAsString() {
        this._getCyclesAndProcessesLeft();
        this._atributesString = 
        `Ciclos con lista vacía: ${this._emptyQueueCycles}` + "\n" + 
        `Procesos totales: ${this._totalCycles}` + "\n" +
        `Procesos pendientes: ${this._processesLeft}` + "\n" +
        `Ciclos pendientes: ${this._cyclesLeft}` + "\n" + 
        `Procesos atendidos: ${this._completedProcesses}`;
    }

    _getCyclesAndProcessesLeft() {
        let start = this._start;
        do {
            this._processesLeft++;
            this._cyclesLeft += start.cycles;
            start = start.next;
        } while(start != this._start);
    }

    _positionateInQueue(newProcess) {
        if(this._start == null) {
            this._start = newProcess;
            this._start.next = this._start;
        } else if (this._end == null) {
            this._end = newProcess;
            this._start.next = this._end;
            this._end.next = this._start;
        } else {
            this._end.next = newProcess;
            this._end = newProcess;
            this._end.next = this._start;
        }
    }

    _deleteFinishedProcess(pointer) {
        if((pointer == this._start) && (this._start.next == this._start)) {
            this._start = null;
        } else if ((pointer == this._end) && (this._start.next == this._end)) {
            this._end == null;
            this._start.next = this._start;
        } else if (pointer == this._start) {
            this._start = this._start.next;
            this._end.next = this._start;
        } else if (pointer == this._end) {
            let p = this._getPreviousEnd(this._start);
            this._end = p;
            this._end.next = this._start;
        } else {
            let p = this._getPrevious(this._start, pointer);
            p.next = pointer.next;
        }
    }

    _getPreviousEnd(start) {
        do {
            if(start.next == this._end) {
                return start;
            }
            start = start.next;
        } while(start != this._end);
    }

    _getPrevious(start, pointer) {
        do {
            if(start.next == pointer) {
                return start;
            }
            start = start.next;
        } while(start != pointer);
    }
}