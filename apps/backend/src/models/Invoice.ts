import {
    Model,
    Optional
  } from 'sequelize';
  
    type InvoiceAttributes = {
        id: number;
        prefix: number;
    }
  
    type InvoiceCreationAttributes = Optional<InvoiceAttributes, 'id'>;
  
    module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model<InvoiceAttributes, InvoiceCreationAttributes>{
        declare id: number;
        declare prefix: number;
    }
    Invoice.init({
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        prefix: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            defaultValue: 0
        }
    },
    {
      sequelize,
      modelName: 'Invoice',
    });
    return Invoice;
  };