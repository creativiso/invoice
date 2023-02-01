import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { ICurrency } from 'libs/typings/src/model';
@Table({
  timestamps: true,
})
export class Currency extends Model<ICurrency>{
    @ForeignKey(() => Currency)
    @Column({ type: DataTypes.INTEGER, primaryKey: true})
    id: number;

    @Column({ type: DataTypes.STRING })
    name: string;

    @Column({ type: DataTypes.INTEGER  })
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