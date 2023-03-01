import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IProformItem } from 'libs/typings/src/model';

@Table({
  timestamps: true,
})
export class ProformItem extends Model<IProformItem> {
  @ForeignKey(() => ProformItem)
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataTypes.INTEGER })
  proform: number;

  @Column({ type: DataTypes.STRING })
  name: string;

  @Column({ type: DataTypes.INTEGER })
  quantity: number;

  @Column({ type: DataTypes.STRING })
  measurement: string;

  @Column({ type: DataTypes.INTEGER })
  price: number;
}
