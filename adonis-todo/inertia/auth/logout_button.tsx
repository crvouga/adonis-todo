import { useForm } from '@inertiajs/react'
import { Button } from '~/ui/button'

export function LogoutButton() {
  const { post, processing } = useForm()
  return (
    <form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault()
        post('/logout')
      }}
    >
      <Button color="ghost" type="submit" disabled={processing}>
        Logout
      </Button>
    </form>
  )
}
