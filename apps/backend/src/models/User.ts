import { Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { DataTypes} from 'sequelize';
import { IUser } from 'libs/typings'
@Table({
  timestamps: true,
})

export class User extends Model<IUser>{
  @ForeignKey(() => User)
  @Column({ type: DataTypes.NUMBER })
  id: number;

  @Column({ type: DataTypes.STRING })
  username: string;

  @Column({ type: DataTypes.STRING })
  password: string;

  @Column({ type: DataTypes.STRING })
  realname: string;

  @Column({ type: DataTypes.DATE })
  date_created: Date;

  @Column({ type: DataTypes.STRING })
  email: string;

  @Column({ type: DataTypes.NUMBER })
  profile: number;

  @Column({ type: DataTypes.NUMBER })
  status: number;

  @Column({ type: DataTypes.DATE })
  last_login: Date;

  @Column({ type: DataTypes.STRING })
  creation_session: string;

  @Column({ type: DataTypes.STRING })
  sign_prefix: string;
}


