const io = require("socket.io")();

const r = require("rethinkdb");

const PORT = process.env.PORT || 8000;
const RETHINK_PORT = process.env.RETHINK || 28015;

//TODO: Sockets will depend on connecting to the database

r
    .connect({host: 'localhost', port: RETHINK_PORT, db: 'awesome_whiteboard'})
    .then((connection) => {

        //*Connection, passback a callback with that client
        io.on("connection", (client) => {

            /*
function : client.on("subscribeToTimer")
@desc: Will fire once a subscribeToTimer is fired from the client
    */

            client.on("subscribeToTimer", (interval) => {

                console.log("Client is subscriming to timer with interval", interval);

                r
                    .table('timers')
                    .changes()
                    .run(connection)
                    .then((cursor) => {
                        cursor.each((err, timerRow) => {

                            client.emit("timer", timerRow.new_val.timestamp);

                        });
                    });
                //     setInterval(() => {         client.emit("timer", new Date());     },
                // interval) });

            });

        });
    });
    
io.listen(PORT);

console.log("Listening on port", PORT);
