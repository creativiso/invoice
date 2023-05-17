import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IInvoiceItems } from 'libs/typings/src/model';
import { Invoice } from './Invoice';
@Table({
  timestamps: true,
})
export class InvoiceItems extends Model<IInvoiceItems> {
  @BelongsTo(() => Invoice)
  invoiceItems: Invoice;
  @ForeignKey(() => Invoice)
  @Column({ type: DataTypes.INTEGER })
  invoice: number;

  @Column({ type: DataTypes.STRING })
  name: string;

  @Column({ type: DataTypes.INTEGER })
  quantity: number;

  @Column({ type: DataTypes.STRING })
  measurement: string;

  @Column({ type: DataTypes.INTEGER })
  price: number;
}
