let listeners = {};

function on(event, handler) {
    listeners[event] = listeners[event] || [];
    listeners[event].push(handler);
}

function trigger(event, data) {
    if (listeners[event]) {
        listeners[event].forEach(handler => handler(data));
    }
}

module.exports = {
    on,
    trigger
};