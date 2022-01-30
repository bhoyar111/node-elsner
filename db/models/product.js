'use strict';
export default (sequelize, DataTypes) => {
	const Product = sequelize.define('Product', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        product_name: {
            type: DataTypes.STRING(191),
            allowNull: false,
        },
		price: {
            type: DataTypes.STRING(191),
            allowNull: true,
        },
		weight: {
            type: DataTypes.STRING(191),
            allowNull: true,
        },
		description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
		doc_url: {
            type: DataTypes.STRING(666),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN(true),
            allowNull: true,
            defaultValue: '1'
        },
        created_by: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
        },
        updated_by: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'products',
    });

    Product.associate = function(models) {
        // associations can be defined here
    };

    // queries and other function starts
	Product.getDS = async () => { 
		try {
			return await Product.findAll({
				where:{
					status: true
				},
				attributes: ['id', 'product_name']
			});
		} catch (e) {
			return [];
		}
	};

	Product.getList = async (curPage, pgSize) => {
		try {
			return await Product.findAndCountAll({
				where:{
					status: true,
				},
				distinct: true,
                order: [['product_name', 'ASC']],
                offset: (curPage-1)*pgSize,
				limit: pgSize,
				attributes: ['id', 'product_name', 'price', 'weight', 'description', 'doc_url' ]
			});
		} catch (e) {
			return [];
		}
	};

	Product.saveRecord = async (reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const saveObj = {
					...reqData,
					createdAt: new Date(),
					updatedAt: new Date()
				};
				return await Product.create(saveObj, { transaction: t });
			});
			// return result from saved record
			return result;
		} catch (e) {
			return false;
		}
	};

	Product.getRecordById = async (id) => {
		try {
			const searchRecord = await Product.findByPk(id, {
				attributes: ['id', 'product_name', 'price', 'weight', 'description', 'doc_url', 'status']
			});
			if(!searchRecord || !searchRecord.status) return false;
			return searchRecord;
		} catch (e) {
			return false;
		}
	};

	Product.updateRecord = async (record, reqData) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				const updateObj = {
					...reqData,
					updatedAt: new Date()
				};
				return await record.update(updateObj, { transaction: t });
			});
			// return result from updated record
			return result;
		} catch (e) {
			return false;
		}
	};

	Product.deleteRecord = async (record) => {
		try {
			const result = await sequelize.transaction(async (t) => {
				return await record.update({
					status: false,
					updatedAt: new Date()
				}, { transaction: t });
			});
			// return result from updated record
			return result;
		} catch (e) {
			return false;
		}
	};

    return Product;
};