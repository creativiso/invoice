import { DataTypes, Model, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { Contractor } from './model/models/Contractor';
import { Currency } from './model/models/Currency';
import { Invoice } from './model/models/Invoice';
import { InvoiceItems } from './model/models/InvoiceItem';
import { PaymentMethod } from './model/models/PaymentMethod';
import { Proform } from './model/models/Proform';
import { ProformItem } from './model/models/ProformItem';
import { Role } from './model/models/Role';
import { User } from './model/models/User';
import { UserRoles } from './model/models/UserRoles';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});

const contractor = Contractor.sequelize;
const currency = Currency.sequelize;
const invoice = Invoice.sequelize;
const invoiceItem = InvoiceItems.sequelize;
const paymentMethod = PaymentMethod.sequelize;
const proform = Proform.sequelize;
const proformItem = ProformItem.sequelize;
const role = Role.sequelize;
const user = User.sequelize;
const userRole = UserRoles.sequelize;

export const DbInit = () => {

  class Contractor extends Model {};
  Contractor.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dds: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    ddsnumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    person: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    egn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { sequelize, modelName: 'contractor' });

  class Currency extends Model {};
  Currency.init({
  }, { sequelize, modelName: 'currency' });

//   class Invoice extends Model {};
//   Invoice.init({
//   }, { sequelize, modelName: 'invoice' });

//   class InvoiceItems extends Model {};
//   InvoiceItems.init({
//   }, { sequelize, modelName: 'invoiceItems' });

//   class PaymentMethod extends Model {};
//   PaymentMethod.init({
//   }, { sequelize, modelName: 'paymentMethod' });

//   class Proform extends Model {};
//   Proform.init({
//   }, { sequelize, modelName: 'proform' });

//   class ProformItem extends Model {};
//   ProformItem.init({
//   }, { sequelize, modelName: 'proformItem' });

//   class User extends Model {};
//   User.init({
//   }, { sequelize, modelName: 'user' });

//   class UserRole extends Model {};
//   UserRole.init({
//   }, { sequelize, modelName: 'userRole' });


 sequelize.sync( { force: true } );
 };

export const models = {
    contractor,
    currency
    // invoice,
    // invoiceItem,
    // paymentMethod,
    // proform,
    // proformItem,
    // role,
    // user,
    // userRole
};