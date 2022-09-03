import { Model, UUIDV4 } from 'sequelize';

import { ProfileAttributes } from '../interfaces/models';

/**
 * @description Profile Model
 * @class
 * @public
 * @author Md. Safayet Latif
 */
module.exports = (sequelize: any, DataTypes: any): any => {
    class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
        id!: string

        email!: string

        password!: string
        
        name!: string

        static associate (_models: any) {
            // associate is described here
        }
    }

    Profile.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Profile',
            tableName: 'profile',
            underscored: true,
            freezeTableName: true,
        }
    )

    return Profile
};
