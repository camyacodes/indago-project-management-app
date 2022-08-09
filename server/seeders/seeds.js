const db = require("../config/connection");
const { faker } = require("@faker-js/faker");
const { User, Project } = require("../models");

db.once("open", async () => {
	await Project.deleteMany({});
	await User.deleteMany({});

	

	// create user data
	const userData = [];

	for (let i = 0; i < 10; i += 1) {
		const full_name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password(8);

		userData.push({ full_name, email, password });
	}

	// await User.collection.insertMany(userData);

	// create thoughts
	let createdProjects = [];
	for (let i = 0; i < 15; i += 1) {
		const title = faker.lorem.words(3);
		const description = faker.lorem.sentences(3);

		const randomUserIndex = Math.floor(Math.random() * userData.length);
		const { _id: userId } = userData[randomUserIndex];

		const createdProject = await Project.create({ title, description });

		await User.updateOne(
			{ _id: userId },
			{ $push: { projects: createdProject._id } }
		);

		createdProjects.push(createdProject);
	}

	console.log("all done!");

	process.exit();
});
