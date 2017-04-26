const expect = require("expect");
const {generateMessage} = require("./message");

describe("generateMessage", () => {
	it("should generate correct message object", () => {
		let message = { from: "TestUser", text: "Hello from testing!"};
		let res = generateMessage(message.from, message.text);

		expect(res).toInclude({from: message.from, text: message.text});
		expect(res.createdAt).toBeA("number");

	});
});