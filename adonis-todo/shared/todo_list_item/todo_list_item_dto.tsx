import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const TodoListItemDTO = vine.object({
  id: vine.union([
    vine.union.if((x) => typeof x === 'string', vine.string()),
    vine.union.if((x) => typeof x === 'number', vine.number()),
  ]),
  title: vine.string(),
  completed: vine.boolean(),
  todoListId: vine.number(),
  createdByUserId: vine.number(),
  updatedByUserId: vine.union([
    vine.union.if((x) => x === null, vine.literal(null)),
    vine.union.if((x) => typeof x === 'number', vine.number()),
  ]),
  createdAt: vine.string(),
  updatedAt: vine.union([
    vine.union.if((x) => x === null, vine.literal(null)),
    vine.union.if((x) => typeof x === 'string', vine.string()),
  ]),
})

export type TodoListItemDTO = Infer<typeof TodoListItemDTO>
