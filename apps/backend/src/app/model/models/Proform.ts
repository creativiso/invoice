import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IProform } from 'libs/typings/src/model';
@Table({
  timestamps: true,
})
export class Proform extends Model<IProform>{
    @ForeignKey(() => Proform)
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataTypes.INTEGER  })
    contractor: number;
  
    @Column({ type: DataTypes.DATE })
    issue_date: Date;

    @Column({ type: DataTypes.INTEGER  })
    bank_payment: number;

    @Column({ type: DataTypes.INTEGER })
    vat: number;

    @Column({ type: DataTypes.STRING })
    novatreason: string;
  
    @Column({ type: DataTypes.INTEGER  })
    currency: number;

    @Column({ type: DataTypes.INTEGER  })
    rate: number;

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

    @Column({ type: DataTypes.STRING })
    c_person: string;

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

    @Column({ type: DataTypes.BOOLEAN })
    p_zdds: boolean;

    @Column({ type: DataTypes.STRING })
    author: string;

    @Column({ type: DataTypes.INTEGER })
    author_user: number;

    @Column({ type: DataTypes.STRING })
    author_sign: string;
    
  }

