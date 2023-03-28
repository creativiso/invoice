import {
  Table,
  Column,
  Model,
  BeforeCreate,
  ForeignKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IUser } from 'libs/typings/src/model';
import bcrypt from 'bcrypt';

@Table({
  timestamps: true,
})
export class User extends Model<IUser> {
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
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

  @Column({ type: DataTypes.INTEGER })
  profile: number;

  @Column({ type: DataTypes.INTEGER })
  status: number;

  @Column({ type: DataTypes.DATE })
  last_login: Date;

  @Column({ type: DataTypes.STRING })
  creation_session: string;

  @Column({ type: DataTypes.STRING })
  sign_prefix: string;

  // Before creating a new user, hash the password
  @BeforeCreate
  static async hashPassword(user: User) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  }

  static async comparePassword(
    username: string,
    candidatePassword: string
  ): Promise<User | null> {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    return isMatch ? user : null;
  }
}
