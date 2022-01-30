'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        product_name: {
            type: Sequelize.STRING(191),
            allowNull: false,
        },
		price: {
            type: Sequelize.STRING(191),
            allowNull: true,
        },
		weight: {
            type: Sequelize.STRING(191),
            allowNull: true,
        },
		description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
		doc_url: {
            type: Sequelize.STRING(666),
            allowNull: true,
        },
        status: {
            type: Sequelize.BOOLEAN(true),
            allowNull: true,
            defaultValue: '1'
        },
        created_by: {
            type: Sequelize.INTEGER(10),
            allowNull: true,
        },
        updated_by: {
            type: Sequelize.INTEGER(10),
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

  down: queryInterface /* , Sequelize */ => queryInterface.dropTable('products')
};