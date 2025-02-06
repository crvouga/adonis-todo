import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import TodoList from '#models/todo_list'
import User from '#models/user'

export default class TodoListItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare completed: boolean

  @column()
  declare todoListId: number

  @column()
  declare createdByUserId: number

  @column()
  declare updatedByUserId: number | null

  @belongsTo(() => TodoList)
  declare todoList: BelongsTo<typeof TodoList>

  @belongsTo(() => User)
  declare createdByUser: BelongsTo<typeof User>

  @belongsTo(() => User)
  declare updatedByUser: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
