'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("users", [
			{
				first_name: "Akash",
				middle_name: "K",
				last_name: "Bhoyar",
				email_id: "akashbhoyar49@gmail.com",
				mobile_no: "8698273854",
				password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
				profile_img: null,
				role_id: 1,
				created_by: 1,
				updated_by: 1,
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
  	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("users", null, {});
	}
};
