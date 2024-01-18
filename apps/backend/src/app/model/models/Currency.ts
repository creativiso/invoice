import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { ICurrency } from 'libs/typings/src/model';
@Table({
  timestamps: true,
})
export class Currency extends Model<ICurrency> {
  @ForeignKey(() => Currency)
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataTypes.INTEGER })
  rate: number;

  @Column({ type: DataTypes.STRING })
  code: number;
}
