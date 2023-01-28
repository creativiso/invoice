import { Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { DataTypes} from 'sequelize';
import { IPaymentMethod } from '../index'
@Table({
  timestamps: true,
})
export class PaymentMethod extends Model<IPaymentMethod>{
    @ForeignKey(() => PaymentMethod)
    @Column({ type: DataTypes.NUMBER })
    id: number;

    @Column({ type: DataTypes.STRING })
    name: string;
    
}