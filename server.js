const io = require("socket.io")();

const r = require("rethinkdb");

const PORT = process.env.PORT || 8000;
const RETHINK_PORT = process.env.RETHINK || 28015;

//TODO: Sockets will depend on connecting to the database
r
    .connect({host: 'localhost', port: RETHINK_PORT, db: 'awesome_whiteboard'})
    .then((connection) => {

        /*
@purpose: On 'connection', when client calls socket, then we have established a connection and now have access to the client(socket)
        */
        io.on("connection", (client) => {
            /*
@route 'subscribeToTimer'
@desc: Client emits 'subscribeToTimer' event and passes interval data, afterwards connect to database using the interval
*/

            client.on("subscribeToTimer", (interval) => {

                console.log("Client is subscriming to timer with interval", interval);

                r
                    .table('timers')
                    .changes()
                    .run(connection)
                    .then((cursor) => {
                        cursor.each((err, timerRow) => {

                            //@desc: When the rethinkDB table changes, client
                            client.emit("timer", timerRow.new_val.timestamp);

                        });
                    });
            }); //End subscribe tot imer
        });
    });

io.listen(PORT);

console.log("Listening on port", PORT);