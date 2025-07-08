import { BodyRegisterProps } from '../pages/Register/BodyRegister/BodyRegister'
import { ISignInProps } from '../pages/SignIn/BodySignIn/BodySignIn'
import api from '../services/api'
import { Repository } from './Repository'

export interface IDepositOrWithDraw {
  value: number
  userId: number
  type: 'deposito' | 'saque'
}

class UserRepository extends Repository {
  async getUserByEmail(email: string) {
    return this.handle(() => this.api.get(`${this.path}/email/${email}`))
  }

  async getProfile() {
    return this.handle(() => this.api.get(`${this.path}/profile`))
  }

  async deposit(data: IDepositOrWithDraw) {
    return this.handle(() => this.api.patch(`${this.path}/deposit`, data))
  }

  async withdraw(data: IDepositOrWithDraw) {
    return this.handle(() => this.api.patch(`${this.path}/withdraw`, data))
  }
}

class UnauthUserRepository extends UserRepository {
  async signIn(data: ISignInProps) {
    return this.handle(() => this.api.post(`${this.path}/login`, data))
  }

  async createUser(data: BodyRegisterProps) {
    return this.handle(() => this.api.post(`${this.path}/create`, data))
  }
}

export default new UserRepository({ path: '/auth/users', api })
export const UnauthUserRepositoryImp = new UnauthUserRepository({
  path: '/unauth/users',
  api
})

export const AuthUserRepositoryImp = new UserRepository({
  path: '/auth/users',
  api
})
