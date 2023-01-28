import { Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { DataTypes} from 'sequelize';
import { IUserRoles } from '../index'
@Table({
  timestamps: true,
})

export class UserRoles extends Model<IUserRoles>{
  @ForeignKey(() => UserRoles)
  @Column({ type: DataTypes.NUMBER })
  id: number;

  @Column({ type: DataTypes.NUMBER })
  user_id: number;

  @Column({ type: DataTypes.NUMBER })
  role_id: number;
  
}
