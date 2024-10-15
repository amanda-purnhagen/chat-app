// Imports the necessary Express modules/packages to the project
const express = require('express');
// Creates a function handler
const app = express();
// Imports the necessary HTTP modules/packages to the project
const http = require('http');
// Supplies the function handler, "app", to this HTTP server, "server"
const server = http.createServer(app);
const { Server } = require("socket.io");
// Initializes a new instance of socket.io with parameter "server"
const io = new Server(server);

// Defines a route handler that is called when we navigate to the landing page
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// Listen on the "connection" event for incoming sockets
io.on('connection', (socket) => {
	
	// Logs incoming sockets to the console
	console.log('a user connected');
	
	// Create server's broadcast message
	socket.broadcast.emit('chat message', 'The server has booted. Welcome!');
	
	// Prints messages to the console
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
	
	// Logs user disconnects to the console
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

// Tells the HTTP server to listen on port 3000
server.listen(3000, () => {
	console.log('Listening on *:3000');
});