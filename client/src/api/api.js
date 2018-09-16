import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:8000");

function subscribeToTimer(cb) {

    const INTERVAL = 1000;

    socket.on("timer", timestamp => cb(timestamp));

    socket.emit("subscribeToTimer", INTERVAL);
}

export {subscribeToTimer};