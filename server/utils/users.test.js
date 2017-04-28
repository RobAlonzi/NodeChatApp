const expect = require("expect");
const {Users} = require("./users");

describe("Users", () => {
	let users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: 1,
			name: "Mike",
			room: "Node Course"
		},{
			id: 2,
			name: "Jen",
			room: "React Course"
		},{
			id: 3,
			name: "Rob",
			room: "Node Course"
		}];
	});


	it("should add new User", () => {
		let users = new Users();
		let user = {id: "/1213" , name: "Rob", room: "The Office Fans"};
		let resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it("should return names for node course", () => {
		let userList = users.getUserList("Node Course");

		expect(userList).toEqual(["Mike", "Rob"]);
	});

	it("should return names for react course", () => {
		let userList = users.getUserList("React Course");

		expect(userList).toEqual(["Jen"]);
	});

	it("should remove a user", () => {
		let removedUser = users.removeUser(2);

		expect(removedUser).toEqual({
			id: 2,
			name: "Jen",
			room: "React Course"
		});

		expect(users.users.length).toBe(2);
	});

	it("should not remove a user", () => {
		let removedUser = users.removeUser(20);
		expect(removedUser).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it("should find a user", () => {
		let foundUser = users.getUser(3);

		expect(foundUser).toEqual({
			id: 3,
			name: "Rob",
			room: "Node Course"
		});
	});

	it("should not find a user", () => {
		let foundUser = users.getUser(20);
		expect(foundUser).toNotExist();
	});
});