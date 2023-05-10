import { IContractor } from 'libs/typings/src/model';
import { Contractor } from '../model/models/Contractor';

export class ContractorService {
  async getAllContractors() {
    return Contractor.findAll();
  }

  async getContractorById(id: number) {
    const contractor = await Contractor.findByPk(id);
    if (!contractor) {
      throw new Error('Contractor not found');
    }
    return contractor;
  }

  async createContractor(
    name: string,
    city: string,
    address: string,
    eik: string,
    dds: boolean,
    ddsnumber: string,
    mol: string,
    person: boolean,
    egn: string
  ) {
    return Contractor.create({
      name,
      city,
      address,
      eik,
      dds,
      ddsnumber,
      mol,
      person,
      egn,
    });
  }

  async updateContractor(contractor: IContractor) {
    const existingContractor = await Contractor.findByPk(contractor.id);
    if (!existingContractor) {
      throw new Error('Contractor not found');
    }
    await existingContractor.update(contractor);
  }
  async deleteContractor(id: number) {
    const contractor = await Contractor.findByPk(id);
    if (!contractor) {
      throw new Error('Contractor not found');
    }
    await contractor.destroy();
  }
}
