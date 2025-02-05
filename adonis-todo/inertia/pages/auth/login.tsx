import { Head, useForm } from '@inertiajs/react'
import { Alert } from '~/ui/alert'
import { Button } from '~/ui/button'
import { TextField } from '~/ui/text_field'
import { Card } from '~/ui/card'

export default function Login(props: { error?: string | null }) {
  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Login" />

      <div className="min-h-screen flex items-center justify-center bg-sand-2">
        <Card
          title="Login"
          body={
            <>
              <form className="space-y-4" onSubmit={onSubmit}>
                <TextField
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={data.email}
                  onChange={(value) => setData('email', value)}
                />

                <TextField
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={(value) => setData('password', value)}
                />

                {props.error && <Alert variant="error" message={props.error} />}

                <div className="flex justify-end w-full pt-6">
                  <Button type="submit" disabled={processing}>
                    Login
                  </Button>
                </div>
              </form>

              <div className="text-center mt-4">
                <span className="text-base-content/70">Don't have an account? </span>
                <a href="/register" className="link link-primary">
                  Register
                </a>
              </div>
            </>
          }
        />
      </div>
    </>
  )
}
