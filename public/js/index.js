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

socket.on("newLocationMessage", function(message){
	let a = document.createElement("a");
	a.setAttribute("target", "_blank");
	a.setAttribute("href", message.url);
	a.text = "My Current Location";


	let li = document.createElement("li");
	li.innerHTML = `${message.from}: `;
	li.appendChild(a);

	document.getElementById("messages").appendChild(li);
});


let messageForm = document.getElementById("message-form");
messageForm.addEventListener("submit", function(e){
	e.preventDefault();
	socket.emit("createMessage", {
		from:"User",
		text: messageForm.querySelector('input[name="message"]').value
	}, function(data) {
	console.log("Got it", data);
	});
});


let locationButton = document.getElementById("send-location");
locationButton.addEventListener("click", function(e){
	e.preventDefault();
	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser.");
	}

	navigator.geolocation.getCurrentPosition(function(position){

		socket.emit("createLocationMessage", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function(){
		alert("Unable to fetch location");
	});
});