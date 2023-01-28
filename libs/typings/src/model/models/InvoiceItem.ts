import { Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { DataTypes} from 'sequelize';
import { IInvoiceItems } from '../index'
@Table({
  timestamps: true,
})
export class InvoiceItems extends Model<IInvoiceItems>{
    @ForeignKey(() => InvoiceItems)
    @Column({ type: DataTypes.NUMBER })
    id: number;

    @Column({ type: DataTypes.NUMBER })
    invoice: number;

    @Column({ type: DataTypes.STRING })
    name: string;

    @Column({ type: DataTypes.NUMBER })
    quantity: number;

    @Column({ type: DataTypes.STRING })
    measurement: string;

    @Column({ type: DataTypes.NUMBER })
    price: number;
    
    
}