import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IPaginate, IResponseBase } from '../interfaces/IResponse'

export class ErrInternetDisconnected extends Error {
  name = 'ERR_INTERNET_DISCONNECTED'
  message = 'ERR_INTERNET_DISCONNECTED'
}

export class ConnectionFailed extends Error {
  name = 'CONNECTION_FAILED'
  message = 'CONNECTION_FAILED'
}

export class RouteNotFound extends Error {
  name = 'NOT_FOUND'
  message = 'NOT_FOUND'
}

export class ProductIdNotFound extends Error {
  name = 'PRODUCT_NOT_FOUND'
  message = 'PRODUCT_NOT_FOUND'
}

export interface IRepository {
  api: AxiosInstance
  path: string
}

export class Repository<Type = unknown> {
  protected api: AxiosInstance
  protected path: string

  constructor({ api, path }: IRepository) {
    this.api = api
    this.path = path
  }

  async handle<T>(
    request: () => Promise<AxiosResponse>
  ): Promise<IResponseBase<T>> {
    try {
      const response: AxiosResponse = await request()
      return response
    } catch (err) {
      if (axios.isCancel(err)) throw err
      if (err.name === 'ERR_INTERNET_DISCONNECTED')
        throw new ErrInternetDisconnected()
      if (!err.response) throw new ConnectionFailed()
      throw err.response.data
    }
  }

  async getAll<T = Type>(
    config?: AxiosRequestConfig
  ): Promise<IResponseBase<IPaginate<T>>> {
    return this.handle<IPaginate<T>>(() => this.api.get(this.path, config))
  }

  async find(
    id: string,
    config?: AxiosRequestConfig
  ): Promise<IResponseBase<{ [key: string]: Type }>> {
    return this.handle<{ [key: string]: Type }>(() =>
      this.api.get(`${this.path}/${id}`, config)
    )
  }

  async create(
    data: Type | FormData,
    config?: AxiosRequestConfig
  ): Promise<IResponseBase> {
    return this.handle(() => this.api.post(`${this.path}`, data, config))
  }

  async update(
    id: string,
    data: Type | FormData,
    config?: AxiosRequestConfig
  ): Promise<IResponseBase> {
    return this.handle(() => this.api.patch(`${this.path}/${id}`, data, config))
  }

  async block(id: string, config?: AxiosRequestConfig): Promise<IResponseBase> {
    return this.handle(() =>
      this.api.patch(`${this.path}/${id}/blocked`, {}, config)
    )
  }
}
