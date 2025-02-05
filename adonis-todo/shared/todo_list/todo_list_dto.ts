import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const TodoListDTO = vine.object({
  id: vine.union([
    vine.union.if((x) => typeof x === 'string', vine.string()),
    vine.union.if((x) => typeof x === 'number', vine.number()),
    vine.union.if((x) => x === null, vine.literal(null)),
  ]),
  title: vine.union([
    vine.union.if((x) => typeof x === 'string', vine.string()),
    vine.union.if((x) => x === null, vine.literal(null)),
  ]),
  ownerUserId: vine.union([
    vine.union.if((x) => typeof x === 'number', vine.number()),
    vine.union.if((x) => x === null, vine.literal(null)),
  ]),
  createdAt: vine.union([
    vine.union.if((x) => typeof x === 'string', vine.string()),
    vine.union.if((x) => x === null, vine.literal(null)),
  ]),
  updatedAt: vine.union([
    vine.union.if((x) => x === null, vine.literal(null)),
    vine.union.if((x) => typeof x === 'string', vine.string()),
  ]),
})

export type TodoListDTO = Infer<typeof TodoListDTO>
