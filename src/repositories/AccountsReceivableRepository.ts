import { IAccountsReceivable } from '../pages/AccountsReceivable/AccountsReceivable'
import api from '../services/api'
import { Repository } from './Repository'

class AccountsReceivableRepository extends Repository {
  async createAccountReceivable(data: IAccountsReceivable) {
    return this.handle(() => this.api.post(`${this.path}/create`, data))
  }

  async getAccountsReceivable() {
    return this.handle(() => this.api.get(`${this.path}/list`))
  }

  async deleteAccountReceivable(id: number) {
    return this.handle(() => this.api.delete(`${this.path}/delete/${id}`))
  }
}

export default new AccountsReceivableRepository({
  path: '/auth/accounts-receivable',
  api
})

export const AccountsReceivableRepositoryImp = new AccountsReceivableRepository(
  {
    path: '/auth/accounts-receivable',
    api
  }
)
