import {
    DECIMAL,
    Model,
    Optional
  } from 'sequelize';

  type ProformItemAttributes = {
    id: number;
    proform: number;
    name: string;
    quantity: number;
    measurement: string;
    price: number;
  }

  type ProformItemCreationAttributes = Optional<ProformItemAttributes, 'id'>;
  export default (sequelize, DataTypes) => {
    class ProformItem extends Model<ProformItemAttributes, ProformItemCreationAttributes>{
        declare id: number;
        declare proform: number;
        declare name: string;
        declare quantity: number;
        declare measurement: string;
        declare price: number;
    }
    ProformItem.init({
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        proform: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        quantity: {
            type: DataTypes.DECIMAL(12, 4),
            allowNull: false
        },
        measurement: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        price: {
            type: DECIMAL(13, 4),
            allowNull: false
        }
    },
    {
      sequelize,
      modelName: 'ProformItem',
      timestamps: false,
      underscored: true
    });
    return ProformItem;
  }; 