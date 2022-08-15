
/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

require('dotenv').config();
import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});

const Contractor = require(`./models/Contractor`)(sequelize, DataTypes);
const Currency = require(`./models/Currency`)(sequelize, DataTypes);
const Invoice = require(`./models/Invoice`)(sequelize, DataTypes);
const InvoiceItem = require(`./models/InvoiceItem`)(sequelize, DataTypes);
const PaymentMethod = require(`./models/PaymentMethod`)(sequelize, DataTypes);
const Proform = require(`./models/Proform`)(sequelize, DataTypes);
const ProformItem = require(`./models/ProformItem`)(sequelize, DataTypes);
const Role = require(`./models/Role`)(sequelize, DataTypes);
const User = require(`./models/User`)(sequelize, DataTypes);
const UserRoles = require(`./models/UserRoles`)(sequelize, DataTypes, User, Role);

sequelize.sync();

