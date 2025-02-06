import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'todo_list_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('title').notNullable()
      table.boolean('completed').notNullable().defaultTo(false)
      table.integer('todo_list_id').unsigned().notNullable().references('id').inTable('todo_lists')
      table.integer('created_by_user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('updated_by_user_id').unsigned().nullable().references('id').inTable('users')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
