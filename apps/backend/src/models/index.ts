import { DataTypes, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import  * as Contractor from './Contractor';
import * as Currency from './Currency'
import * as Invoice from './Invoice';
import * as InvoiceItem from './InvoiceItem';
import * as PaymentMethod from './PaymentMethod';
import * as Proform from './Proform';
import * as ProformItem from './ProformItem';
import * as Role from './Role';
import * as User from './User';
import * as UserRole from './UserRoles'

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});

const contractor = Contractor.default(sequelize, DataTypes);
const currency = Currency.default(sequelize, DataTypes);
const invoice = Invoice.default(sequelize, DataTypes);
const invoiceItem = InvoiceItem.default(sequelize, DataTypes);
const paymentMethod = PaymentMethod.default(sequelize, DataTypes);
const proform = Proform.default(sequelize, DataTypes);
const proformItem = ProformItem.default(sequelize, DataTypes);
const role = Role.default(sequelize, DataTypes);
const user = User.default(sequelize, DataTypes);
const userRole = UserRole.default(sequelize, DataTypes);

export const DbInit = () => {

userRole.removeAttribute('id');

user.belongsToMany(role, {
    through: userRole,
    foreignKey: 'user_id'
});
role.belongsToMany(user, {
    through: userRole,
    foreignKey: 'role_id'
});

invoice.hasOne(invoiceItem, {
    foreignKey: 'invoice'
});
invoiceItem.belongsTo(invoice, {
    foreignKey: 'invoice'
});

proform.hasOne(proformItem, {
    foreignKey: 'proform'
});
proformItem.belongsTo(proform, {
    foreignKey: 'proform'
});

currency.hasOne(proform, {
    foreignKey: 'currency'
});
proform.belongsTo(currency, {
    foreignKey: 'currency'
});

currency.hasOne(invoice, {
    foreignKey: 'currency'
});
invoice.belongsTo(currency, {
    foreignKey: 'currency'
});

contractor.hasOne(proform, {
    foreignKey: 'contractor'
});
proform.belongsTo(contractor, {
    foreignKey: 'contractor'
});

contractor.hasOne(invoice, {
    foreignKey: 'contractor'
});
invoice.belongsTo(contractor, {
    foreignKey: 'contractor'
});

user.hasOne(invoice, {
    foreignKey: 'author_user'
});
invoice.belongsTo(user, {
    foreignKey: 'author_user'
});

user.hasOne(proform, {
    foreignKey: 'author_user'
});
proform.belongsTo(user, {
    foreignKey: 'author_user'
});

sequelize.sync( { force: true } );

};

export const models = {
    contractor,
    currency,
    invoice,
    invoiceItem,
    paymentMethod,
    proform,
    proformItem,
    role,
    user,
    userRole
};