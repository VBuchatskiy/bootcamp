import { LIMIT, PAGE } from '../controllers/constants'

const paramsDelimiter: string = ' '
const optionsDelimiter: string = '%'

export const parseSortParams = (query: string): string[][] => {
  return query.replace(/asc/g, '1').replace(/desc/g, '-1').split(paramsDelimiter).map(item => item.split(optionsDelimiter))
}

export const parseSelectParams = (query: string): string[] => {
  return query.split(paramsDelimiter);
}

export const parseFilterParams = (query: string): any => {
  return query.replace(/\b(gte|lte )\b/g, (match: string) => `$${match}`).split('');
}

export const parsePagination = (query: { page?: string, limit?: string }, count: number): { limit: number, offset: number, pageCount: number } => {
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
