import { useForm } from '@inertiajs/react'
import { Button } from '~/ui/button'
import { Card } from '~/ui/card'
import { TextField } from '~/ui/text_field'
import PageLayout from '~/page/layout'

export default function TodoListCreatePage() {
  const { data, setData, post, processing } = useForm({
    title: '',
  })

  const updateField = (field: keyof typeof data, value: string) => {
    setData(field, value)
  }

  return (
    <PageLayout title="Create Todo List">
      <div className="flex justify-center items-center w-full h-full">
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
                  Create Todo List
                </Button>
              </div>
            </form>
          }
        />
      </div>
    </PageLayout>
  )
}
