import { Proform } from '../model/models/Proform';
import { ProformItem } from '../model/models/ProformItem';
export class ProformService {
  async getAllProforms() {
    return Proform.findAll({});
  }

  async getProformById(id: number) {
    const proform = await Proform.findByPk(id, {});
    if (!proform) {
      throw new Error('Proform not found');
    }
    return proform;
  }

  async createProform(
    contractor: number,
    issue_date: Date,
    bank_payment: number,
    vat: number,
    novatreason: string,
    currency: number,
    rate: number,
    c_name: string,
    c_city: string,
    c_address: string,
    c_eik: string,
    c_ddsnumber: string,
    c_mol: string,
    c_person: string,
    c_egn: string,
    p_name: string,
    p_city: string,
    p_address: string,
    p_eik: string,
    p_ddsnumber: string,
    p_mol: string,
    p_bank: string,
    p_iban: string,
    p_bic: string,
    p_zdds: boolean,
    author: string,
    author_user: number,
    author_sign: string
  ) {
    return Proform.create({
      contractor,
      issue_date,
      bank_payment,
      vat,
      novatreason,
      currency,
      rate,
      c_name,
      c_city,
      c_address,
      c_eik,
      c_ddsnumber,
      c_mol,
      c_person,
      c_egn,
      p_name,
      p_city,
      p_address,
      p_eik,
      p_ddsnumber,
      p_mol,
      p_bank,
      p_iban,
      p_bic,
      p_zdds,
      author,
      author_user,
      author_sign,
    });
  }

  async updateProform(
    id: number,
    contractor: number,
    issue_date: Date,
    bank_payment: number,
    vat: number,
    novatreason: string,
    currency: number,
    rate: number,
    c_name: string,
    c_city: string,
    c_address: string,
    c_eik: string,
    c_ddsnumber: string,
    c_mol: string,
    c_person: string,
    c_egn: string,
    p_name: string,
    p_city: string,
    p_address: string,
    p_eik: string,
    p_ddsnumber: string,
    p_mol: string,
    p_bank: string,
    p_iban: string,
    p_bic: string,
    p_zdds: boolean,
    author: string,
    author_user: number,
    author_sign: string
  ) {
    const proform = await Proform.findByPk(id);
    if (!proform) {
      throw new Error('Proform not found');
    }
    await proform.update({
      contractor,
      issue_date,
      bank_payment,
      vat,
      novatreason,
      currency,
      rate,
      c_name,
      c_city,
      c_address,
      c_eik,
      c_ddsnumber,
      c_mol,
      c_person,
      c_egn,
      p_name,
      p_city,
      p_address,
      p_eik,
      p_ddsnumber,
      p_mol,
      p_bank,
      p_iban,
      p_bic,
      p_zdds,
      author,
      author_user,
      author_sign,
    });
  }
  async getAllProformItems() {
    return ProformItem.findAll({});
  }
  async getProformItemsById(proformId: number): Promise<ProformItem[]> {
    const items = await ProformItem.findAll({ where: { proform: proformId } });
    return items;
  }
  async createProformItems(
    proform: number,
    name: string,
    quantity: number,
    measurement: string,
    price: number
  ) {
    return ProformItem.create({
      proform,
      name,
      quantity,
      measurement,
      price,
    });
  }
  async updateProformItems(
    id: number,
    proform: number,
    name: string,
    quantity: number,
    measurement: string,
    price: number
  ) {
    const proformItems = await ProformItem.findByPk(id);
    if (!proformItems) {
      throw new Error('Proform not found');
    }
    await ProformItem.update(
      {
        proform,
        name,
        quantity,
        measurement,
        price,
      },
      { where: { id } }
    );
  }
}
