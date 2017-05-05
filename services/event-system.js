const events  = require('events'),
      emitter = new events.EventEmitter();

class Emitter {
    constructor(name) {
        this.name = name;
    }

    emit() {
        emitter.emit.apply(emitter.emit, [this.name].concat([].slice.call(arguments)));
        return this;
    }

    subscribe(listener) {
        // TODO: ensure listener is not already in the list of listeners
        emitter.addListener(this.name, listener);
        return this;
    }

    unsubscribe(listener) {
        emitter.removeListener(this.name, listener);
        return this;
    }
}

const system = module.exports = {
    commands: {

    },

    events: {
        onDatabaseConnected: new Emitter('ondatabaseconnected')
    }
};