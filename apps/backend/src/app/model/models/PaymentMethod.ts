import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IPaymentMethod } from 'libs/typings/src/model';
@Table({
  timestamps: true,
})
export class PaymentMethod extends Model<IPaymentMethod>{
    @ForeignKey(() => PaymentMethod)
    @Column({ type: DataTypes.INTEGER, primaryKey: true })
    id: number;

    @Column({ type: DataTypes.STRING })
    name: string;
    
}