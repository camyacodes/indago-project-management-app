const { faker } = require('@faker-js/faker');

const db = require("../config/connection");
const { User } = require("../models");

db.once("open", async () => {
	//   await Thought.deleteMany({});
	await User.deleteMany({});
	

	// create user data
	const userData = [];

	for (let i = 0; i < 15; i += 1) {
		let full_name = faker.name.findName();
		let email = faker.internet.email();
		let password = faker.internet.password(8);
	

		userData.push({full_name, email, password});
	}

	await User.collection.insertMany(userData);

	// create friends
	//   for (let i = 0; i < 100; i += 1) {
	//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
	//     const { _id: userId } = createdUsers.ops[randomUserIndex];

	//     let friendId = userId;

	//     while (friendId === userId) {
	//       const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
	//       friendId = createdUsers.ops[randomUserIndex];
	//     }

	//     await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
	//   }

	// create thoughts
	//   let createdThoughts = [];
	//   for (let i = 0; i < 100; i += 1) {
	//     const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

	//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
	//     const { username, _id: userId } = createdUsers.ops[randomUserIndex];

	//     const createdThought = await Thought.create({ thoughtText, username });

	//     const updatedUser = await User.updateOne(
	//       { _id: userId },
	//       { $push: { thoughts: createdThought._id } }
	//     );

	//     createdThoughts.push(createdThought);
	//   }

	//   // create reactions
	//   for (let i = 0; i < 100; i += 1) {
	//     const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

	//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
	//     const { username } = createdUsers.ops[randomUserIndex];

	//     const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
	//     const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

	//     await Thought.updateOne(
	//       { _id: thoughtId },
	//       { $push: { reactions: { reactionBody, username } } },
	//       { runValidators: true }
	//     );
	//   }

	console.log("all done!");
	process.exit(0);
});
