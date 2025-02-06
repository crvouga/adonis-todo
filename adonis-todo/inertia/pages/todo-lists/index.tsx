import { TodoListDTO } from '#shared/todo_list/todo_list_dto'
import { Head } from '@inertiajs/react'
import MustBeLoggedIn from '~/auth/must_be_logged_in'

export default function TodoListPage(props: { todoList: TodoListDTO }) {
  return (
    <MustBeLoggedIn>
      <Head title={props.todoList.title ?? 'Todo List'} />
      <div>
        <h1>{props.todoList.title}</h1>
      </div>
    </MustBeLoggedIn>
  )
}
