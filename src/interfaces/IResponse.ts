import { AxiosResponse } from 'axios'

export interface IPaginateRoot<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

interface IPaginate<T> {
  [key: string]: IPaginateRoot<T>
}

interface IResponseBase<T = unknown> extends AxiosResponse {
  data: {
    status: string
    code: number
    success: boolean
    message?: string
    data?: T
  }
}

interface ILabelAndValue<T> {
  label: string
  value: T
}

type ILabelsAndValues<T> = ILabelAndValue<T>[]

type IErrorForm<T> = { [Key in keyof T]?: string }

type IResponseError = Pick<IResponseBase['data'], 'code' | 'message' | 'data'>

export type {
  IResponseBase,
  IPaginate,
  IResponseError,
  ILabelAndValue,
  ILabelsAndValues,
  IErrorForm
}
