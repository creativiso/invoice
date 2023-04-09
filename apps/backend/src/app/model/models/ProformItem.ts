import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IProformItem } from 'libs/typings/src/model';
import { Proform } from './Proform';

@Table({
  timestamps: true,
})
export class ProformItem extends Model<IProformItem> {
  @BelongsTo(() => Proform)
  proformItem: Proform;

  @ForeignKey(() => Proform)
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
