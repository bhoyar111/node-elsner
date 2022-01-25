'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			first_name: {
				type: Sequelize.STRING(191),
				allowNull: false,
			},
			middle_name: {
				type: Sequelize.STRING(191),
				allowNull: true,
			},
			last_name: {
				type: Sequelize.STRING(191),
				allowNull: false,
			},
			email_id: {
				type: Sequelize.STRING(191),
				allowNull: false,
				// unique: true
			},
			mobile_no: {
				type: Sequelize.STRING(30),
				allowNull: false
			},
			profile_img: {
				type: Sequelize.STRING(666),
				allowNull: true,
			},
			password: {
				type: Sequelize.STRING(666),
				allowNull: false,
			},
			role_id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
			},
			status: {
				type: Sequelize.BOOLEAN(true),
				allowNull: true,
				defaultValue: '1'
			},
			created_by: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
			updated_by: {
				type: Sequelize.INTEGER(11),
				allowNull: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	down: queryInterface /* , Sequelize */ => queryInterface.dropTable('users')
};