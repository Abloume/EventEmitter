class EventEmitter {
    constructor() {
        this.messageBox = {};
    }

    on(eventName, func) {
        const callbacks = this.messageBox[eventName] || [];
        callbacks.push(func);
        this.messageBox[eventName] = callbacks;
    }

    emit(eventName, ...args) {
        const callbacks = this.messageBox[eventName];
        if (callbacks.length > 0) {
            callbacks.forEach((callback) => {
                callback(...args);
            })
        }
    }

    off(eventName, func) {
        const callbacks = this.messageBox[eventName];
        const index = callbacks.indexOf(func);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    }
}

// --测试案例
const emitter = new EventEmitter();
const sayHi = (name) => console.log(`Hello ${name}`);
const sayHi2 = (name) => console.log(`Good night, ${name}`);

emitter.on('hi', sayHi);
emitter.on('hi', sayHi2);
emitter.emit('hi', 'JScript');

console.log('-----------');
emitter.off('hi', sayHi);
emitter.emit('hi', 'JScript');

console.log('------------');
const emitter2 = new EventEmitter();
emitter2.on('hi', (name, age) => {
    console.log(`I am ${name}, and I am ${age} years old`);
});
emitter2.emit('hi', 'Jerry', 12);
