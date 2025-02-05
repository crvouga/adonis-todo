import { Head, useForm } from '@inertiajs/react'
import { Card } from '~/ui/card'
import { TextField } from '~/ui/text_field'
import { Button } from '~/ui/button'

export default function TodoListCreatePage() {
  const { data, setData, post, processing } = useForm({
    title: '',
  })

  const updateField = (field: keyof typeof data, value: string) => {
    setData(field, value)
  }

  return (
    <>
      <Head title="Create Todo List" />

      <div className="min-h-screen flex items-center justify-center bg-sand-2">
        <Card
          title="Create New Todo List"
          body={
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                post('/todo-lists/create')
              }}
            >
              <TextField
                label="Title"
                type="text"
                placeholder="Enter todo list title"
                value={data.title}
                onChange={(value) => updateField('title', value)}
              />

              <div className="flex justify-end w-full pt-6">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Creating...' : 'Create Todo List'}
                </Button>
              </div>
            </form>
          }
        />
      </div>
    </>
  )
}
