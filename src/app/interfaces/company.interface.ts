export interface ICompany {
  id: number
  name: string
  email: string
  phone: string
  openingHours: string
  barbers: any[]
  scheduling: any[]
  services: any[]
  address: Address
  user: User
}

export interface Address {
  id: number
  city: string
  street: string
  state: string
  zipCode: string
}

export interface User {
  id: number
  username: string
  role: string
}
