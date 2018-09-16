const io = require("socket.io")();

const PORT = process.env.PORT || 8000;

//*Connection, passback a callback with that client
io.on("connection", (client) => {

    /*
function : client.on("subscribeToTimer")
@desc: Will fire once a subscribeToTimer is fired from the client
    */
   
    client.on("subscribeToTimer", (interval) => {

        console.log("Client is subscriming to timer with interval", interval);

        setInterval(() => {

            client.emit("timer", new Date());

        }, interval)
    });

});

io.listen(PORT);

console.log("Listening on port", PORT);
