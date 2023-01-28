import { Table, Column, Model, ForeignKey} from 'sequelize-typescript';
import { DataTypes} from 'sequelize';
import { IInvoice } from '../index'
@Table({
  timestamps: true,
})
export class Invoice extends Model<IInvoice>{
    @ForeignKey(() => Invoice)
    @Column({ type: DataTypes.NUMBER })
    id: number;

    @Column({ type: DataTypes.NUMBER })
    prefix: number;

    @Column({ type: DataTypes.NUMBER })
    number: number;

    @Column({ type: DataTypes.NUMBER })
    contractor: number;

    @Column({ type: DataTypes.DATE})
    issue_date: Date;

    @Column({ type: DataTypes.DATE})
    event_date: Date;

    @Column({ type: DataTypes.STRING })
    receiver: string;

    @Column({ type: DataTypes.NUMBER })
    bank_payment: number;

    @Column({ type: DataTypes.NUMBER })
    vat: number;

    @Column({ type: DataTypes.STRING })
    novatreason: string;

    @Column({ type: DataTypes.NUMBER })
    currency: number;

    @Column({ type: DataTypes.NUMBER })
    rate: number;

    @Column({ type: DataTypes.NUMBER })
    type: number;

    @Column({ type: DataTypes.STRING })
    related_invoice: string;

    @Column({ type: DataTypes.DATE})
    related_date: Date;

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

    @Column({ type: DataTypes.NUMBER})
    author_user: number;

    @Column({ type: DataTypes.STRING })
    author_sign: string;
}