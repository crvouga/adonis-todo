import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const UserDTO = vine.object({
  id: vine.union([
    vine.union.if((x) => typeof x === 'string', vine.string()),
    vine.union.if((x) => typeof x === 'number', vine.number()),
  ]),
  email: vine.string(),
})

export type UserDTO = Infer<typeof UserDTO>
