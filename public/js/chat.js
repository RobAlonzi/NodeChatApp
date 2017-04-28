var socket = io();

function scrollToBottom(){
	//Selectors
	let messages = document.getElementById("messages");
	let newMessage = messages.querySelector("li:last-child");
	//Heights
	let clientHeight = messages.clientHeight;
	let scrollTop = messages.scrollTop;
	let scrollHeight = messages.scrollHeight;
	let newMessageHeight = newMessage.clientHeight;
	let lastMessageHeight = newMessage.previousElementSibling ? newMessage.previousElementSibling.clientHeight : 0;


	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop = scrollHeight;
	}
	
};


socket.on("connect", function() {
	let params = deparam(window.location.search);
	socket.emit("join", params, function(err){
		if(err){
			alert(err);
			window.location.href = "/";
		}else{
			console.log("no error");
		}
	});
});

socket.on("disconnect", function() {
	console.log("Disconnected from server");
});

socket.on("updateUserList", function(users) {
	let usersEl = document.getElementById("users");
	let ol = document.createElement("ol");

	users.forEach(function(user){
		let li = document.createElement("li");
		li.innerHTML = user;
		ol.appendChild(li);
	});

	if(usersEl.firstChild)
		usersEl.removeChild(usersEl.firstChild);
		
	usersEl.appendChild(ol);
});

socket.on("newMessage", function(message){
	let formattedTime = moment(message.createdAt).format("h:mm a");
	let template = document.getElementById("message-template").innerHTML;
	let html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formattedTime
	});
	document.getElementById("messages").insertAdjacentHTML("beforeend", html);
	scrollToBottom();

});

socket.on("newLocationMessage", function(message){
	let formattedTime = moment(message.createdAt).format("h:mm a");
	let template = document.getElementById("location-message-template").innerHTML;
	let html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});
	document.getElementById("messages").insertAdjacentHTML("beforeend", html);
	scrollToBottom();
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