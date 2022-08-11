const db = require("../config/connection");
const { faker } = require("@faker-js/faker");
const { User, Project } = require("../models");

db.once("open", async () => {
	await Project.deleteMany({});
	await User.deleteMany({});

	// create user data
	const userData = [];

	for (let i = 0; i < 10; i += 1) {
		const fakeUser = {
			full_name: faker.name.findName(),
			email: faker.internet.email(),
			password: faker.internet.password(8),
		};
		// const full_name = faker.name.findName();
		// const email = faker.internet.email();
		// const password = faker.internet.password(8);

		userData.push(fakeUser);
	}
	
	const seededUsers = await User.create(userData);
	// console.log(seededUsers)
	

	// create projects
	let createdProjects = [];
	for (let i = 0; i < 5; i += 1) {

		const fakeProject = {
			title: faker.lorem.words(3),
			description: faker.lorem.sentences(3),
		};

		// createdProjects.push(fakeProject)
		const seedProject = await Project.create(fakeProject);
		createdProjects.push(seedProject)
// assign 4 users to each project
		for (let i = 0; i < 4; i += 1) {
			const randomNum = Math.floor(Math.random() * userData.length)
			// console.log(randomNum)
			const { _id: projectId } = seedProject;
			// console.log(seedProject)
			await Project.updateOne(
				{ _id: projectId },
				{ $addToSet: { assigned_users: seededUsers[randomNum]._id } }
			);

// Update user with project as well

			const { _id: userId } = seededUsers[randomNum]._id;
			await User.updateOne(
				{ _id: userId },
				{ $addToSet: { projects: seedProject._id } }
			)
			
		}
		// const title = faker.lorem.words(3);
		// const description = faker.lorem.sentences(3);

		// const randomUserIndex = Math.floor(Math.random() * userData.length);
		// const { _id: userId } = userData[randomUserIndex];

		// const createdProject = await Project.create({ title, description });

		// await User.updateOne(
		// 	{ _id: userId },
		// 	{ $push: { projects: createdProject._id } }
		// );

		// createdProjects.push(fakeProject);
	}

	

	// for (let i = 0; i < userData.length; i += 1) {
		
	// 	const { _id: userId } = seededUsers[i]._id;
		
	// 	// console.log(createdProjects)

	// 	for (let i = 0; i < 2; i += 1) {
	// 		await User.updateOne(
	// 			{ _id: userId },
	// 			{ $addToSet: {projects: createdProjects[Math.floor(Math.random() * createdProjects.length)]._id} }
	// 		);
	// 	}

			
		
		
	// }

	// create Tickets
	// let createdTickets = [];
	// for (let i = 0; i < 15; i += 1) {
	// 	const title = faker.lorem.words(3);
	// 	const description = faker.lorem.sentences(3);

	// 	const randomUserIndex = Math.floor(Math.random() * userData.length);
	// 	const { _id: userId } = userData[randomUserIndex];

	// 	const createdTicket = await Ticket.create({ title, description });

	// 	await User.updateOne(
	// 		{ _id: userId },
	// 		{ $push: { Tickets: createdTicket._id } }
	// 	);

	// 	createdTickets.push(createdTicket);
	// }

	console.log("all done!");

	process.exit();
});
