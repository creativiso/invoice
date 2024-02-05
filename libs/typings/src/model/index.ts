export interface IContractor {
  id: number;
  name: string;
  city: string;
  address: string;
  eik: string;
  ddsnumber: string;
  mol: string;
  person: boolean;
  egn: string;
  createAt: Date;
  updatedAt: Date;
}
export interface ICurrency {
  id: number;
  code: string;
  rate: number;
  createAt: Date;
  updatedAt: Date;
}
export interface IInvoice {
  id?: number;
  prefix: number;
  number: number;
  contractor_id: number;
  issue_date: Date;
  event_date: Date;
  receiver: string;
  payment_method: number;
  vat: number;
  novatreason: string;
  currency: number;
  type: number;
  related_invoice_id: number;
  c_name: string;
  c_city: string;
  c_address: string;
  c_eik: string;
  c_ddsnumber: string;
  c_mol: string;
  c_person: boolean;
  c_egn: string;
  p_name: string;
  p_city: string;
  p_address: string;
  p_eik: string;
  p_ddsnumber: string;
  p_mol: string;
  p_bank: string;
  p_iban: string;
  p_bic: string;
  author: string;
  author_sign: string;
  createAt?: Date;
  updatedAt?: Date;
  items: IInvoiceItems[];
}

export interface IInvoiceItems {
  id?: number;
  invoice?: number;
  name: string;
  quantity: number;
  measurement: string;
  price: number;
  createAt?: Date;
  updatedAt?: Date;
}

export interface IPaymentMethod {
  id: number;
  name: string;
  createAt: Date;
  updatedAt: Date;
}

export interface IProform {
  id?: number;
  contractor_id: number;
  issue_date: Date;
  payment_method: number;
  vat: number;
  novatreason: string;
  currency: number;
  c_name: string;
  c_city: string;
  c_address: string;
  c_eik: string;
  c_ddsnumber: string;
  c_mol: string;
  c_person: boolean;
  c_egn: string;
  p_name: string;
  p_city: string;
  p_address: string;
  p_eik: string;
  p_ddsnumber: string;
  p_mol: string;
  p_bank: string;
  p_iban: string;
  p_bic: string;
  author: string;
  author_sign: string;
  createAt?: Date;
  updatedAt?: Date;
  items: IProformItem[];
}

export interface IProformItem {
  id?: number;
  proform?: number;
  name: string;
  quantity: number;
  measurement: string;
  price: number;
  createAt?: Date;
  updatedAt?: Date;
}

export interface IRole {
  id: number;
  role: string;
  role_name: string;
  createAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  realname: string;
  date_created: Date;
  email: string;
  profile: number;
  status: number;
  last_login: Date;
  creation_session: string;
  sign_prefix: string;
  createAt: Date;
  updatedAt: Date;
}

export interface IUserRoles {
  id: number;
  user_id: number;
  role_id: number;
  createAt: Date;
  updatedAt: Date;
}

export interface ISettings {
  id: number;
  supplierName: string;
  supplierVatNumber: string;
  supplierCity: string;
  supplierAddress: string;
  iban: string;
  bicSwift: string;
  bank: string;
  dds: number;
  paymentMethod: number;
  priceInputWithVat: boolean;
  quantityNumber: number;
  singlePriceNumber: number;
  totalPriceNumber: number;
  supplierEik: string;
  supplierManager: string;
  units: string[];
  createAt?: Date;
  updatedAt?: Date;
}
