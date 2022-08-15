const Proform = (sequelize, DataTypes) => {
    sequelize.define('Proform', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        contractor: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        issue_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        bank_payment: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        vat: {
            type: DataTypes.DECIMAL(4, 2),
            defaultValue: null
        },
        novatreason: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        currency: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        rate: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false
        },
        c_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        c_city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        c_address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        c_eik: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        c_ddsnumber: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        c_mol: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        c_person: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        c_egn: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        p_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        p_city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        p_address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        p_eik: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        p_ddsnumber: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        p_mol: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        p_bank: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        p_iban: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        p_bic: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        p_zdds: {
            type: DataTypes.BOOLEAN,
            defaultValue: null
        },
        author: {
            type: DataTypes.STRING(255),
           allowNull: false
        },
        author_user: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        author_sign: {
            type: DataTypes.CHAR(5),
            allowNull: false
        }
    });
    return Proform;
  };

  module.exports = Proform;