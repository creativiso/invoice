import {
    Model,
    Optional
  } from 'sequelize';
  
    type InvoiceAttributes = {
        id: number;
        prefix: number;
        number: number;
        contractor: number;
        issue_date: Date;
        event_date: Date;
        receiver: string;
        bank_payment: number;
        vat: number;
        novatreason: string;
        currency: number;
        rate: number;
        type: number;
        related_invoice: string;
        related_date: Date;
        c_name: string;
        c_city: string;
        c_address: string;
        c_eik: string;
        c_ddsnumber: string;
        c_mol: string;
        c_person: string;
        c_egn: string;
        p_name: string;
        p_city: string;
        p_address: string;
        p_eik: string;
        p_ddsnumber: string;
        p_mol: string;
        p_bank: string;
        p_iban: string;
        p_bic: string;
        p_zdds: boolean;
        author: string;
        author_user: number;
        author_sign: string;
    }
  
    type InvoiceCreationAttributes = Optional<InvoiceAttributes, 'id'>;
  
    module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model<InvoiceAttributes, InvoiceCreationAttributes>{
        declare id: number;
        declare prefix: number;
        declare number: number;
        declare contractor: number;
        declare issue_date: Date;
        declare event_date: Date;
        declare receiver: string;
        declare bank_payment: number;
        declare vat: number;
        declare novatreason: string;
        declare currency: number;
        declare rate: number;
        declare type: number;
        declare related_invoice: string;
        declare related_date: Date;
        declare c_name: string;
        declare c_city: string;
        declare c_address: string;
        declare c_eik: string;
        declare c_ddsnumber: string;
        declare c_mol: string;
        declare c_person: string;
        declare c_egn: string;
        declare p_name: string;
        declare p_city: string;
        declare p_address: string;
        declare p_eik: string;
        declare p_ddsnumber: string;
        declare p_mol: string;
        declare p_bank: string;
        declare p_iban: string;
        declare p_bic: string;
        declare p_zdds: boolean;
        declare author: string;
        declare author_user: number;
        declare author_sign: string;
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
        },
        number: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            defaultValue: 0
        },
        contractor: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        issue_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        event_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        receiver: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        bank_payment: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        vat: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false
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
        type: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 0
        },
        related_invoice: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        related_date: {
            type: DataTypes.DATE,
            defaultValue: null
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
    },
    {
      sequelize,
      modelName: 'Invoice',
    });
    return Invoice;
  };