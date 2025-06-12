
export interface UserInterface {
  tfa: boolean,
  uid: string,
  bio: string,
  ref: string,
  type: string,
  auth: {
    tfa: string
  },
  main?: string,
  active: boolean,
  fresh?: boolean,
  token?: string,
  email: string,
  phone: string,
  photo: string,
  device: string,
  username: string,
  currency: string,
  verified: boolean,
  lastname: string,
  firstname: string,
  slack: {
    bot: string
    classic: string
  },
  messenger: {
    url: string
  },
  location: {
    iso: string,
    dial: string,
  },
  messages: number,
  notifications: number,
}