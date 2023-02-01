import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IContractor } from 'libs/typings/src/model';

@Table({
  timestamps: true,
})

export class Contractor extends Model<IContractor >{
    @ForeignKey(() => Contractor)
    @Column({ type: DataTypes.INTEGER, primaryKey: true  })
    id: number;

    @Column({ type: DataTypes.STRING })
    name: string;

    @Column({ type: DataTypes.STRING })
    city: string;

    @Column({ type: DataTypes.STRING })
    address: string;

    @Column({ type: DataTypes.STRING })
    eik: string;

    @Column({ type: DataTypes.BOOLEAN })
    dds: boolean;

    @Column({ type: DataTypes.STRING })
    ddsnumber: string;

    @Column({ type: DataTypes.STRING })
    mol: string;

    @Column({ type: DataTypes.BOOLEAN })
    person: boolean;

    @Column({ type: DataTypes.STRING })
    egn: string;
}