import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes, Optional } from 'sequelize';

@Table({
  timestamps: true,
})

export class User extends Model{
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  id: number;

  @Column({ type: DataTypes.STRING })
  username: number;


}
// import {
//   Model,
//   Optional
// } from 'sequelize';

// type UserAttributes = {
//   id: number;
//   username: string;
//   password: string;
//   realname: string;
//   date_created: Date;
//   email: string;
//   profile: number;
//   status: number;
//   last_login: Date;
//   creation_session: string;
//   sign_prefix: string
// }

// type UserCreationAttributes = Optional<UserAttributes, 'id'>;

// export default (sequelize, DataTypes) => {
//   class User extends Model<UserAttributes, UserCreationAttributes>{
//     declare id: number;
//     declare username: string;
//     declare password: string;
//     declare realname: string;
//     declare date_created: Date;
//     declare email: string;
//     declare profile: number;
//     declare status: number;
//     declare last_login: Date;
//     declare creation_session: string;
//     declare sign_prefix: string

//     static associate(models) {
//       User.belongsToMany(models.Role, {
//         through: 'UserRoles'
//       });
//     }
//   }
//   User.init({
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     username: {
//       type: DataTypes.STRING(50),
//       unique: true,
//       defaultValue: ''
//     },
//     password: { 
//       type: DataTypes.STRING(45),
//       defaultValue: null
//     },
//     realname: { 
//       type: DataTypes.STRING(255),
//       defaultValue: null
//     },
//     date_created:{
//       type: DataTypes.DATE,
//       defaultValue: null
//     },
//     email: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//       unique: true
//     },
//     profile: {
//       type: DataTypes.INTEGER(11),
//       allowNull: false
//     },
//     status: {
//       type: DataTypes.INTEGER(11),
//       allowNull: false
//     },
//     last_login: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     creation_session: {
//       type: DataTypes.STRING(255),
//       allowNull: false
//     },
//     sign_prefix: {
//       type: DataTypes.CHAR(5),
//       allowNull: false
//     },
//   }, {
//     sequelize,
//     modelName: 'User',
//     timestamps: false
//   });
//   return User;
// }; 