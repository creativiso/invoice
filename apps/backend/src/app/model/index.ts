import { Sequelize } from 'sequelize-typescript';
import { env } from 'process';
import path from 'path';
import { Contractor } from './models/Contractor';
import { Currency } from './models/Currency';
import { Invoice } from './models/Invoice';
import { PaymentMethod } from './models/PaymentMethod';
import { Proform } from './models/Proform';
import { ProformItem } from './models/ProformItem';
import { Role } from './models/Role';
import { User } from './models/User';
import { UserRoles } from './models/UserRoles';

console.log(path.resolve(path.join('apps','backend','src','app','model','models')))
export const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: 'mariadb',
  models: [Contractor,Currency,Invoice,PaymentMethod,Proform,ProformItem,Role,User,UserRoles],
});

export * from './models/Contractor';
export * from './models/Currency';
export * from './models/Invoice';
export * from './models/InvoiceItem';
export * from './models/PaymentMethod';
export * from './models/Proform';
export * from './models/ProformItem';
export * from './models/Role';
export * from './models/User';
export * from './models/UserRoles';