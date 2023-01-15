// import { Request, Response } from 'express';
// //import ContractorService from '..//apps/backend/services/contractor.service';

// class ContractorController {
//   static async createContractor(req: Request, res: Response) {
//     try {
//       const contractor = await ContractorService.createContractor(req.body);
//       res.status(201).json(contractor);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   static async getAllContractors(req: Request, res: Response) {
//     try {
//       const contractors = await ContractorService.getAllContractors();
//       res.json(contractors);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   static async getContractorById(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const contractor = await ContractorService.getContractorById(+id);
//       if (!contractor) {
//         res.status(404).json({ message: 'Contractor not found' });
//         return;
//       }
//       res.json(contractor);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }

//   static async updateContractor(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const contractor = await ContractorService.updateContractor(
//         +id,
//         req.body
//       );
//       if (!contractor) {
//         res.status(404).json({ message: 'Contractor not found' });
//         return;
//       }
//       res.json(contractor);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// }
