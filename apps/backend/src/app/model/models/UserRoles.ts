import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IUserRoles } from 'libs/typings/src/model';
@Table({
  timestamps: true,
})

export class UserRoles extends Model<IUserRoles>{
  @ForeignKey(() => UserRoles)
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataTypes.INTEGER })
  user_id: number;

  @Column({ type: DataTypes.INTEGER })
  role_id: number;
  
}
