   export const ContractorInit = (sequelize, DataTypes) => {   
        sequelize.define('Contractor', {
        id: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        eik: {
            type: DataTypes.CHAR(12),
            defaultValue: null
        },
        dds: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        ddsnumber: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        mol: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        person: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        egn: {
            type: DataTypes.CHAR(12),
            defaultValue: null
        }
    });
    return ContractorInit
  };

  module.exports = ContractorInit;