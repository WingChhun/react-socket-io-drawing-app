const io = require("socket.io")();

const r = require("rethinkdb");

const PORT = process.env.PORT || 8000;
const RETHINK_PORT = process.env.RETHINK || 28015;

const createDrawing = ({connection, name}) => {
    r
        .table('drawings')
        .insert({name, timestamp: new Date()})
        .run(connection)
        .then(() => console.log("created drawing in table drawings"));
}

const subscribeToDrawings = ({client, connection}) => {
    r
        .table("drawings")
        .changes({include_initial: true})
        .run(connection)
        .then((cursor) => {
            cursor.each((err, drawingRow) => {
                client.emit("drawing", drawingRow.new_val);
            })
        })
}

//TODO: Sockets will depend on connecting to the database
r
    .connect({host: 'localhost', port: RETHINK_PORT, db: 'awesome_whiteboard'})
    .then((connection) => {

        /*
@purpose: On 'connection', when client calls socket, then we have established a connection and now have access to the client(socket)
        */
        io.on("connection", (client) => {

            client.on("createDrawing", ({name}) => {
                createDrawing({connection, name});
            })

            client.on('subscribeToDrawings', () => {
                subscribeToDrawings({client,connection});
            })

        }); //End subscribe tot imer
    });

io.listen(PORT);

console.log("Listening on port", PORT);