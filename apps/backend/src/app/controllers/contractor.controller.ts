import { Router, Request, Response } from 'express';
import { ContractorService } from '../services/contractor.service';
import { HttpClient } from '@angular/common/http';

const router = Router();
const http = new HttpClient(null);
const contractorService = new ContractorService(http);

export class ContractorController {
  constructor(private contractorService: ContractorService) {}

  async getContractors(req: Request, res: Response) {
    try {
      const contractors = await this.contractorService.getContractors();
      res.status(200).json(contractors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getContractor(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contractorId = Number(id);
      const contractor = await this.contractorService.getContractor(
        contractorId
      );
      res.status(200).json(contractor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async createContractor(req: Request, res: Response) {
    try {
      const contractor = req.body;
      const newContractor = await this.contractorService.createContractor(
        contractor
      );
      res.status(201).json(newContractor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateContractor(req: Request, res: Response) {
    try {
      const contractor = req.body;
      const updatedContractor = await this.contractorService.updateContractor(
        contractor
      );
      res.status(200).json(updatedContractor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteContractor(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contractorId = parseInt(id, 10);
      const deletedContractor = await this.contractorService.deleteContractor(
        contractorId
      );
      res.status(200).json(deletedContractor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

const contractorController = new ContractorController(contractorService);

router.get('/', (req: Request, res: Response) =>
  contractorController.getContractors(req, res)
);

router.get('/:id', (req: Request, res: Response) =>
  contractorController.getContractor(req, res)
);

router.post('/', (req: Request, res: Response) =>
  contractorController.createContractor(req, res)
);

router.put('/', (req: Request, res: Response) =>
  contractorController.updateContractor(req, res)
);
router.delete('/:id', (req: Request, res: Response) =>
  contractorController.deleteContractor(req, res)
);
