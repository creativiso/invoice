 const ProformItem = (sequelize, DataTypes) => {
        sequelize.define('ProformItem', {
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
            type: DataTypes.DECIMAL(13, 4),
            allowNull: false
        }
    });
    return ProformItem;
  };

  module.exports = ProformItem;