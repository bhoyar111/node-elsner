'use strict';
export default (sequelize, DataTypes) => {
	const UserRefreshToken = sequelize.define('UserRefreshToken', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email_id: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		refresh_token: {
			type: DataTypes.TEXT,
			allowNull: false,
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
		tableName: 'user_refresh_tokens'
	});

	UserRefreshToken.associate = function(models) {
		// associations can be defined here
	};

	// queries and other functions
	UserRefreshToken.saveUserAndTokenData = async (userData, tokenData) => {
		try {
            return await UserRefreshToken.create({
                email_id: userData.email_id,
                refresh_token: tokenData.refresh_token
            });
        } catch (e) {
            return false;
        }
	}

	UserRefreshToken.removeUserToken = async (reqData) => {
		try {
			const {refresh_token, user_refresh_token_id} = reqData;
            return await UserRefreshToken.destroy({
                where: {
                    id : user_refresh_token_id,
                    refresh_token: refresh_token
                }
            });
        } catch (e) {
            return false;
        }
	}

	return UserRefreshToken;
};