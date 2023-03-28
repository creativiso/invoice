// import { Proform } from '../model/models/Proform';

// export class ProformService {
//   async getAllContractors() {
//     return Proform.findAll();
//   }

//   async getContractorById(id: number) {
//     const proform = await Proform.findByPk(id);
//     if (!proform) {
//       throw new Error('Proform not found');
//     }
//     return proform;
//   }

//   async createProform(
//     contractor: number,
//     issue_date: Date,
//     payment_method: number,
//     vat: number,
//     novatreason: string,
//     currency:{ 
//       exchangeRate: number,
//       currencyCode: string,
//     },
//     c_name: string,
//     c_city: string,
//     c_address: string,
//     c_eik: string,
//     c_ddsnumber: string,
//     c_mol: string,
//     c_person: boolean,
//     c_egn: string,
//     p_name: string,
//     p_city: string,
//     p_address: string,
//     p_eik: string,
//     p_ddsnumber: string,
//     p_mol: string,
//     p_bank: string,
//     p_iban: string,
//     p_bic: string,
//     p_zdds: boolean,
//     author: string,
//     author_user: number,
//     author_sign: string
//   ) {
//     return Proform.create({
//       contractor,
//       issue_date,
//       payment_method,
//       vat,
//       novatreason,
//       currency,
//       c_name,
//       c_city,
//       c_address,
//       c_eik,
//       c_ddsnumber,
//       c_mol,
//       c_person,
//       c_egn,
//       p_name,
//       p_city,
//       p_address,
//       p_eik,
//       p_ddsnumber,
//       p_mol,
//       p_bank,
//       p_iban,
//       p_bic,
//       p_zdds,
//       author,
//       author_user,
//       author_sign,
//     });
//   }

//   async updateProform(
//     id: number,
//     contractor: number,
//     issue_date: Date,
//     payment_method: number,
//     vat: number,
//     novatreason: string,
//     currency:{ 
//       exchangeRate: number,
//       currencyCode: string,
//     },
//     c_name: string,
//     c_city: string,
//     c_address: string,
//     c_eik: string,
//     c_ddsnumber: string,
//     c_mol: string,
//     c_person: boolean,
//     c_egn: string,
//     p_name: string,
//     p_city: string,
//     p_address: string,
//     p_eik: string,
//     p_ddsnumber: string,
//     p_mol: string,
//     p_bank: string,
//     p_iban: string,
//     p_bic: string,
//     p_zdds: boolean,
//     author: string,
//     author_user: number,
//     author_sign: string
//   ) {
//     const proform = await Proform.findByPk(id);
//     if (!proform) {
//       throw new Error('Proform not found');
//     }
//     await proform.update({
//       contractor,
//       issue_date,
//       payment_method,
//       vat,
//       novatreason,
//       currency,
//       c_name,
//       c_city,
//       c_address,
//       c_eik,
//       c_ddsnumber,
//       c_mol,
//       c_person,
//       c_egn,
//       p_name,
//       p_city,
//       p_address,
//       p_eik,
//       p_ddsnumber,
//       p_mol,
//       p_bank,
//       p_iban,
//       p_bic,
//       p_zdds,
//       author,
//       author_user,
//       author_sign,
//     });
//   }
// }
