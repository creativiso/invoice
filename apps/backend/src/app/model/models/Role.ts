import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IRole } from 'libs/typings/src/model';
@Table({
  timestamps: true,
})

export class Role extends Model<IRole>{
  @ForeignKey(() => Role)
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataTypes.STRING })
  role: string;

  @Column({ type: DataTypes.STRING })
  role_name: string;
  
}
