const InvoiceItem = (sequelize, DataTypes) => {
    sequelize.define('InvoiceItem', {
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
    });
    return InvoiceItem;
  };

  module.exports = InvoiceItem;