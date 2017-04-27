const expect = require("expect");
const {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
	it("should generate correct message object", () => {
		let message = { from: "TestUser", text: "Hello from testing!"};
		let res = generateMessage(message.from, message.text);

		expect(res).toInclude({from: message.from, text: message.text});
		expect(res.createdAt).toBeA("number");

	});

	it("should generate correct location message object", () => {
		let message = { from: "TestUser", latitude: 43, longitude: 79};
		let url = `http://www.google.com/maps?q=${message.latitude},${message.longitude}`;
		let res = generateLocationMessage(message.from, message.latitude, message.longitude);

		expect(res).toInclude({from: message.from, url});
		expect(res.createdAt).toBeA("number");

	});
});