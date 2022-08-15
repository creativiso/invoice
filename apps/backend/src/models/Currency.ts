  const Currency = (sequelize, DataTypes) => {
     sequelize.define('Currency', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        currency: {
            type: DataTypes.CHAR(3),
            allowNull: false
        },
        rate: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false
        },
        sign: {
            type: DataTypes.CHAR(5),
            allowNull: false
        },
        longsign: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        subsign: {
            type: DataTypes.CHAR(5),
            allowNull: false
        },
        default_c: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        updated: {
            type: DataTypes.TIME,
            allowNull: false
        },
        g: {
            type: DataTypes.CHAR(5),
            allowNull: false
        }
    });
  }

  module.exports = Currency;