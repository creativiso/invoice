const PaymentMethod = (sequelize, DataTypes) => {
  sequelize.define('PaymentMethod', {
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
    });
    return PaymentMethod;
  };

  module.exports = PaymentMethod;