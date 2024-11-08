export interface IRegister {
  id?: number
  name: string
  phone: string
  email: string
  gender: string
  address?: Address
}

export interface Address {
  id: number
  city: string
  street: string
  state: string
  zipCode: string
}
