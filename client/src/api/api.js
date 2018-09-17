import openSocket from 'socket.io-client';

const PORT_URL = process.env.PORT_URL || "http://localhost"
const PORT = process.env.PORT || 8000;
const socket = openSocket(`${PORT_URL}:${PORT}`);

function subscribeToTimer(cb) {

    const INTERVAL = 1000;

    // NOTE: Get timestamp, use callback(setState) with timestamp and update
    // clientSide time
    socket.on("timer", timestamp => cb(timestamp));

    //NOTE: emit a subscribeToTimer event pass interval to be used
    socket.emit("subscribeToTimer", INTERVAL);
}

const createDrawing = name => {
    socket.emit('createDrawing', {name});
}

export {subscribeToTimer};