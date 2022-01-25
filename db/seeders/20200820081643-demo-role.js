'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("roles", [
			{
				role_name: "Admin",
				description: "System Admin",
				permission: JSON.stringify([{"name":"Users","method":[{"route_name":"users","display_name":"List","checked":true},{"route_name":"user-add","display_name":"Add","checked":true},{"route_name":"user-update","display_name":"Edit","checked":true},{"route_name":"user-delete","display_name":"Delete","checked":true}]},{"name":"Roles","method":[{"route_name":"roles","display_name":"List","checked":true},{"route_name":"role-add","display_name":"Add","checked":true},{"route_name":"role-update","display_name":"Edit","checked":true},{"route_name":"role-delete","display_name":"Delete","checked":true}]}]),
				status: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("roles", null, {});
	}
};
