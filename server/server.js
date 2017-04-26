const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.use(express.static(publicPath));


io.on("connection", (socket) => {
	console.log("New user connected");

	socket.emit("newMessage", {
		from: "Rob",
		text: "Hey what is going on?",
		createdAt: 100129102
	});

	socket.on("createMessage", (message) => {
		console.log("Message was created", message);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

});

server.listen(port, () => {
	console.log(`Started on port ${port}`);
});

