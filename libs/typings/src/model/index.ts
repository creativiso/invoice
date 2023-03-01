export interface IContractor {
  id: number;
  name: string;
  city: string;
  address: string;
  eik: string;
  dds: boolean;
  ddsnumber: string;
  mol: string;
  person: boolean;
  egn: string;
  createAt: Date;
  updatedAt: Date;
}
export interface ICurrency {
  id: number;
  currency: string;
  rate: number;
  sign: string;
  longsign: string;
  subsign: string;
  default_c: boolean;
  updated: Date;
  g: string;
  createAt: Date;
  updatedAt: Date;
}
export interface IInvoice {
  id: number;
  prefix: number;
  number: number;
  contractor: number;
  issue_date: Date;
  event_date: Date;
  receiver: string;
  bank_payment: number;
  vat: number;
  novatreason: string;
  currency: number;
  rate: number;
  type: number;
  related_invoice: string;
  related_date: Date;
  c_name: string;
  c_city: string;
  c_address: string;
  c_eik: string;
  c_ddsnumber: string;
  c_mol: string;
  c_person: string;
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
  p_zdds: boolean;
  author: string;
  author_user: number;
  author_sign: string;
  createAt: Date;
  updatedAt: Date;
}

export interface IInvoiceItems {
  id: number;
  invoice: number;
  name: string;
  quantity: number;
  measurement: string;
  price: number;
  createAt: Date;
  updatedAt: Date;
}

export interface IPaymentMethod {
  id: number;
  name: string;
  createAt: Date;
  updatedAt: Date;
}

export interface IProform {
  id?: number;
  contractor: number;
  issue_date: Date;
  bank_payment: number;
  vat: number;
  novatreason: string;
  currency: number;
  rate: number;
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
  p_zdds: boolean;
  author: string;
  author_user: number;
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
