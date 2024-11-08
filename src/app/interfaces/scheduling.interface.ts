export interface IScheduling {
  id?: number;
  idClient: number;
  idCompany: number;
  idBarber: number;
  idService: number;
  date: string;
  status?: string;
}


export interface IListScheduling {
  id: number
  client: Client
  barber: Barber
  company: Company
  serviceEntity: ServiceEntity
  reminder: any[]
  date: string
  status: string
}

export interface Client {
  id: number
  name: string
  phone: string
  email: string
  gender: string
  address: Address
}

export interface Address {
  id: number
  city: string
  street: string
  state: string
  zipCode: string
}

export interface Barber {
  id: number
  name: string
  phone: string
  email: string
  openingHours: any[]
  gender: string
}

export interface Company {
  id: number
  name: string
  email: string
  phone: string
  openingHours: string
  address: Address2
}

export interface Address2 {
  id: number
  city: string
  street: string
  state: string
  zipCode: string
}

export interface ServiceEntity {
  id: number
  name: string
  price: number
  description: string
}

