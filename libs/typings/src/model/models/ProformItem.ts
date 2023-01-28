import { Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { DataTypes} from 'sequelize';
import { IProformItem } from '../index'

@Table({
    timestamps: true,
  })
  
  export class ProformItem extends Model<IProformItem>{
    @ForeignKey(() => ProformItem)
    @Column({ type: DataTypes.NUMBER })
    id: number;
  
    @Column({ type: DataTypes.NUMBER })
    proform: number;

    @Column({ type: DataTypes.STRING })
    name: string;
  
    @Column({ type: DataTypes.NUMBER })
    quantity: number;

    @Column({ type: DataTypes.STRING })
    measurement: string;

    @Column({ type: DataTypes.NUMBER })
    price: number;
  }
