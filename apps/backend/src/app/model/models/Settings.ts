import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { ISettings } from 'libs/typings/src/model';
import { type } from 'os';

@Table({
  timestamps: true,
})
export class Settings extends Model<ISettings> {

    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataTypes.STRING })
    supplierName: string;
  
    @Column({ type: DataTypes.STRING })
    supplierVatNumber: string;
  
    @Column({ type: DataTypes.STRING })
    supplierCity: string;
  
    @Column({ type: DataTypes.STRING })
    supplierAddress: string;
  
    @Column({ type: DataTypes.STRING })
    iban: string;
  
    @Column({ type: DataTypes.STRING })
    bicSwift: string;
  
    @Column({ type: DataTypes.STRING })
    bank: string;
  
    @Column({ type: DataTypes.BOOLEAN })
    dds: boolean;
  
    @Column({ type: DataTypes.STRING })
    paymentMethod: string;
  
    @Column({ type: DataTypes.BOOLEAN })
    individualPerson: boolean;
  
    @Column({ type: DataTypes.INTEGER })
    quantityNumber: number;
  
    @Column({ type: DataTypes.INTEGER })
    singlePriceNumber: number;
  
    @Column({ type: DataTypes.INTEGER })
    totalPriceNumber: number;
  
    @Column({ type: DataTypes.STRING })
    supplierEik: string;
  
    @Column({ type: DataTypes.STRING })
    supplierManager: string;

    @Column({ type: DataTypes.STRING})
    tags: string;
  }
