var socket = io();
socket.on("connect", function() {
	console.log("Connected to server");
});

socket.on("disconnect", function() {
	console.log("Disconnected from server");
});


socket.on("newMessage", function(message){
	let formattedTime = moment(message.createdAt).format("h:mm a");
	let li = document.createElement("li");
	li.innerHTML = `${message.from} ${formattedTime}: ${message.text}`;
	document.getElementById("messages").appendChild(li);
});

socket.on("newLocationMessage", function(message){
	let a = document.createElement("a");
	a.setAttribute("target", "_blank");
	a.setAttribute("href", message.url);
	a.text = "My Current Location";


	let li = document.createElement("li");
	let formattedTime = moment(message.createdAt).format("h:mm a");
	li.innerHTML = `${message.from} ${formattedTime}: `;
	li.appendChild(a);

	document.getElementById("messages").appendChild(li);
});


let messageForm = document.getElementById("message-form");
messageForm.addEventListener("submit", function(e){
	e.preventDefault();

	let messageTextbox = messageForm.querySelector('input[name="message"]');

	socket.emit("createMessage", {
		from:"User",
		text: messageTextbox.value
	}, function() {
		messageTextbox.value = "";
	});
});


let locationButton = document.getElementById("send-location");
locationButton.addEventListener("click", function(e){
	e.preventDefault();
	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser.");
	}

	locationButton.disabled = true;
	locationButton.textContent = "Sending location...";

	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.disabled = false;
		locationButton.textContent = "Send location";
		socket.emit("createLocationMessage", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function(){
		locationButton.disabled = false;
		locationButton.textContent = "Send location";
		alert("Unable to fetch location");
	});
});