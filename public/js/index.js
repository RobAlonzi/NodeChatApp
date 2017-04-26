var socket = io();
socket.on("connect", function() {
	console.log("Connected to server");

	socket.emit("createMessage", {
		from: "Steve",
		text: "I'm not going to work today"
	});
});

socket.on("disconnect", function() {
	console.log("Disconnected from server");
});


socket.on("newMessage", function(message){
	console.log("Got New Message", message);
});
