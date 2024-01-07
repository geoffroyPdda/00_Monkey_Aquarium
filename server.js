
let express = require('express');

let app = express();
let server = app.listen(3000);

app.use(express.static('public'));

console.log("My server socket is running");
console.log("localhost:3000");

let socket = require('socket.io');

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('New connection: ' + socket.id);
}