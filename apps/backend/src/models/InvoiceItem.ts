import {
    Model,
    Optional
  } from 'sequelize';
  
  type InvoiceItemAttributes = {
    id: number;
    invoice: number;
    name: string;
    quantity: number;
    measurement: string;
    price: number;
  }
  
  type InvoiceItemCreationAttributes = Optional<InvoiceItemAttributes, 'id'>;
  
  export default (sequelize, DataTypes) => {
    class InvoiceItem extends Model<InvoiceItemAttributes, InvoiceItemCreationAttributes>{
        declare id: number;
        declare invoice: number;
        declare name: string;
        declare quantity: number;
        declare measurement: string;
        declare price: number;
    }
    InvoiceItem.init({
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        invoice: {
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
            type: DataTypes.DECIMAL(13, 4),
            allowNull: false
        }
    },
    {
      sequelize,
      modelName: 'InvoiceItem',
      timestamps: false,
      underscored: true
    });
    return InvoiceItem;
  };