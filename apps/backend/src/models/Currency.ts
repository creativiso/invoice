import { Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { DataTypes} from 'sequelize';
import { ICurrency } from 'libs/typings'
@Table({
  timestamps: true,
})
export class Currency extends Model<ICurrency>{
    @ForeignKey(() => Currency)
    @Column({ type: DataTypes.NUMBER })
    id: number;

    @Column({ type: DataTypes.STRING })
    name: string;

    @Column({ type: DataTypes.NUMBER })
    rate: number;

    @Column({ type: DataTypes.STRING })
    sign: string;

    @Column({ type: DataTypes.STRING })
    longsign: string;

    @Column({ type: DataTypes.STRING })
    subsign: string;

    @Column({ type: DataTypes.BOOLEAN })
    default_c: boolean;

    @Column({ type: DataTypes.DATE })
    updated: Date;

    @Column({ type: DataTypes.STRING })
    g: string;
}