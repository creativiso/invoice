import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { ICurrency } from 'libs/typings/src';
@Table({
  timestamps: true,
})
export class Currency extends Model<ICurrency> {
  @ForeignKey(() => Currency)
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataTypes.DOUBLE })
  rate: number;

  @Column({ type: DataTypes.STRING })
  code: string;
}
