import { ParsedUrlQuery } from 'querystring'

export function paginationObject(query?: ParsedUrlQuery) {
  const limit = Number(query?.pageSize || 10)
  const page = Number(query?.page || 0)
  const start = page * limit
  return { start, limit, page }
}
