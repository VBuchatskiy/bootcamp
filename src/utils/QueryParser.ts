import { LIMIT, PAGE } from '../controllers/constants'

export const parseSortParams = (query: string): string[][] => {
  return query.replace(/asc/g, '1').replace(/desc/g, '-1').split(' ').map(item => item.split('%'))
}

export const parseSelectParams = (query: string): string[] => {
  return query.split(' ');
}

export const parsePagination = (query: any, count: number): any => {
  const page: number = query.page ? parseInt(query.page as string, 10) : PAGE
  const limit: number = query.limit ? parseInt(query.limit as string, 10) : LIMIT
  const offset: number = (page - 1) * limit;
  const pageCount: number = count ? Math.floor(count / limit) ? Math.floor(count / limit) : 1 : 0

  return {
    limit,
    offset,
    pageCount
  }
}
