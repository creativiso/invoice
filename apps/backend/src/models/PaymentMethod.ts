import {
    Model,
    Optional
  } from 'sequelize';
  
  type PaymentMethodAttributes = {
    id: number;
    name: string;
  }
  
  type PaymentMethodCreationAttributes = Optional<PaymentMethodAttributes, 'id'>;
  
  module.exports = (sequelize, DataTypes) => {
    class PaymentMethod extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes>{
        declare id: number;
        declare name: string;
    }
    PaymentMethod.init({
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
      sequelize,
      modelName: 'PaymentMethod',
    });
    return PaymentMethod;
  };