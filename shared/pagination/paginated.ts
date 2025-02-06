import vine from '@vinejs/vine'

export const createPaginated = (itemSchema: ReturnType<typeof vine.object>) =>
  vine.object({
    items: vine.array(itemSchema),
    total: vine.number(),
    page: vine.number(),
    perPage: vine.number(),
    lastPage: vine.number(),
  })

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  perPage: number
  lastPage: number
}
