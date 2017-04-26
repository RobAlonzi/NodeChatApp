var socket = io();
socket.on("connect", function() {
	console.log("Connected to server");
});

socket.on("disconnect", function() {
	console.log("Disconnected from server");
});


socket.on("newMessage", function(message){
	console.log("Got New Message", message);
	let li = document.createElement("li");
	li.innerHTML = `${message.from}: ${message.text}`;
	document.getElementById("messages").appendChild(li);
});


socket.emit("createMessage", {
	from: "Frank",
	text: "Hi"
}, function(data) {
	console.log("Got it", data);
});

document.getElementById("message-form").addEventListener("submit", function(e){
	e.preventDefault();
	socket.emit("createMessage", {
		from:"User",
		text: document.getElementById("message-form").querySelector('input[name="message"]').value
	}, function(data) {
	console.log("Got it", data);
	});
});