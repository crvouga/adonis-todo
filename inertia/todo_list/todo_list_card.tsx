import { TodoListDTO } from '#shared/todo_list/todo_list_dto'
import { FC } from 'react'

interface TodoListCardProps {
  todoList: TodoListDTO
}

export const TodoListCard: FC<TodoListCardProps> = ({ todoList }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">{todoList.title}</h3>
        <div className="text-sm text-gray-500">
          <p>Created: {new Date(todoList.createdAt).toLocaleDateString()}</p>
          {todoList.updatedAt && (
            <p>Last updated: {new Date(todoList.updatedAt).toLocaleDateString()}</p>
          )}
        </div>
      </div>
    </div>
  )
}
