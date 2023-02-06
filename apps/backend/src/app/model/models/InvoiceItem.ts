import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IInvoiceItems } from 'libs/typings/src/model';
@Table({
  timestamps: true,
})
export class InvoiceItems extends Model<IInvoiceItems>{
    @ForeignKey(() => InvoiceItems)
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataTypes.INTEGER  })
    invoice: number;

    @Column({ type: DataTypes.STRING })
    name: string;

    @Column({ type: DataTypes.INTEGER  })
    quantity: number;

    @Column({ type: DataTypes.STRING })
    measurement: string;

    @Column({ type: DataTypes.INTEGER  })
    price: number;
    
    
}