import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IInvoice, IInvoiceItems } from 'libs/typings/src/model';
import { InvoiceItems } from './InvoiceItems';
@Table({
  timestamps: true,
})
export class Invoice extends Model<IInvoice> {
  @ForeignKey(() => Invoice)
  @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataTypes.INTEGER })
  prefix: number;

  @Column({ type: DataTypes.INTEGER })
  number: number;

  @Column({ type: DataTypes.INTEGER })
  contractor_id: number;

  @Column({ type: DataTypes.DATE })
  issue_date: Date;

  @Column({ type: DataTypes.DATE })
  event_date: Date;

  @Column({ type: DataTypes.STRING })
  receiver: string;

  @Column({ type: DataTypes.INTEGER })
  payment_method: number;

  @Column({ type: DataTypes.INTEGER })
  vat: number;

  @Column({ type: DataTypes.STRING })
  novatreason: string;

  @Column({ type: DataTypes.JSON })
  currency: number;

  @Column({ type: DataTypes.INTEGER })
  type: number;

  @Column({ type: DataTypes.INTEGER })
  related_invoice_id: number;

  @Column({ type: DataTypes.STRING })
  c_name: string;

  @Column({ type: DataTypes.STRING })
  c_city: string;

  @Column({ type: DataTypes.STRING })
  c_address: string;

  @Column({ type: DataTypes.STRING })
  c_eik: string;

  @Column({ type: DataTypes.STRING })
  c_ddsnumber: string;

  @Column({ type: DataTypes.STRING })
  c_mol: string;

  @Column({ type: DataTypes.TINYINT })
  c_person: boolean;

  @Column({ type: DataTypes.STRING })
  c_egn: string;

  @Column({ type: DataTypes.STRING })
  p_name: string;

  @Column({ type: DataTypes.STRING })
  p_city: string;

  @Column({ type: DataTypes.STRING })
  p_address: string;

  @Column({ type: DataTypes.STRING })
  p_eik: string;

  @Column({ type: DataTypes.STRING })
  p_ddsnumber: string;

  @Column({ type: DataTypes.STRING })
  p_mol: string;

  @Column({ type: DataTypes.STRING })
  p_bank: string;

  @Column({ type: DataTypes.STRING })
  p_iban: string;

  @Column({ type: DataTypes.STRING })
  p_bic: string;

  @Column({ type: DataTypes.STRING })
  author: string;

  @Column({ type: DataTypes.STRING })
  author_sign: string;
  @HasMany(() => InvoiceItems)
  items: IInvoiceItems[];
}
