import {
    Model,
    Optional
  } from 'sequelize';
  
  type CurrencyAttributes = {
    id: number;
    currency: string;
    rate: number;
    sign: string;
    longsign: string;
    subsign: string;
    default_c: boolean;
    updated: Date;
    g: string;
  }
  
  type CurrencyCreationAttributes = Optional<CurrencyAttributes, 'id'>;
  
  module.exports = (sequelize, DataTypes) => {
    class Currency extends Model<CurrencyAttributes, CurrencyCreationAttributes>{
        declare id: number;
        declare currency: string;
        declare rate: number;
        declare sign: string;
        declare longsign: string;
        declare subsign: string;
        declare default_c: boolean;
        declare updated: Date;
        declare g: string;
    }
    Currency.init({
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
            allowNull: false,
            defaultValue: Date(),
            onUpdate: Date()
        },
        g: {
            type: DataTypes.CHAR(5),
            allowNull: false
        }
    },
    {
      sequelize,
      modelName: 'Currency',
    });
    return Currency;
  };