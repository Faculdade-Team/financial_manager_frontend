import { IAccountsPayable } from '../pages/AccountsPayable/AccountsPayable'
import api from '../services/api'
import { Repository } from './Repository'

class AccountsPayableRepository extends Repository {
  async createAccountPayable(data: IAccountsPayable) {
    return this.handle(() => this.api.post(`${this.path}/create`, data))
  }

  async getAccountsPayable() {
    return this.handle(() => this.api.get(`${this.path}/list`))
  }

  async deleteAccountPayable(id: number) {
    return this.handle(() => this.api.delete(`${this.path}/delete/${id}`))
  }
}

export default new AccountsPayableRepository({ path: '/auth/users', api })

export const AccountsPayableRepositoryImp = new AccountsPayableRepository({
  path: '/auth/accounts-payable',
  api
})
