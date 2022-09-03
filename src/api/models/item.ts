import { Model, UUIDV4 } from 'sequelize';

import { ItemAttributes } from '../interfaces/models';

/**
 * @description Item Model
 * @class
 * @public
 * @author Md. Safayet Latif
 */
module.exports = (sequelize: any, DataTypes: any): any => {
    class Item extends Model<ItemAttributes> implements ItemAttributes {
        id!: string

        item!: string

        vaultNumber!: String

        static associate (_models: any) {
        }
    }

    Item.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            item: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            vaultNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            
        },
        {
            sequelize,
            modelName: 'Item',
            tableName: 'item',
            underscored: true,
            freezeTableName: true,
        }
    )

    return Item
};
