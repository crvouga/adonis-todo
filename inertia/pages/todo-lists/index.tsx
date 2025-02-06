import { TodoListDTO } from '#shared/todo_list/todo_list_dto'
import PageLayout from '~/page/layout'

export default function TodoListPage(props: { todoList: TodoListDTO }) {
  return (
    <PageLayout title={props.todoList.title ?? 'Todo List'}>
      <div>
        <h1>{props.todoList.title}</h1>
      </div>
    </PageLayout>
  )
}
