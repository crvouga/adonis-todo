import { Head, useForm } from '@inertiajs/react'
import { Alert } from '~/ui/alert'
import { Button } from '~/ui/button'
import { TextField } from '~/ui/text_field'
import { RegisterErrorCode } from '#shared/auth/register_error_code'
import type { RegisterPageProps } from '#shared/auth/register_page_props'
import { Card } from '~/ui/card'

export default function Register(props: RegisterPageProps) {
  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const errorMessage = props.errorCode ? RegisterErrorCode.toMessage(props.errorCode) : null

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/register')
  }

  return (
    <>
      <Head title="Register" />

      <div className="min-h-screen flex items-center justify-center bg-sand-2">
        <Card
          title="Register"
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

                <TextField
                  label="Confirm Password"
                  type="password"
                  name="passwordConfirmation"
                  placeholder="••••••••"
                  value={data.passwordConfirmation}
                  onChange={(value) => setData('passwordConfirmation', value)}
                />

                {errorMessage && <Alert variant="error" message={errorMessage} />}

                <div className="flex justify-end w-full pt-6">
                  <Button type="submit" disabled={processing}>
                    Register
                  </Button>
                </div>
              </form>

              <div className="text-center mt-4">
                <span className="text-base-content/70">Already have an account? </span>
                <a href="/login" className="link link-primary">
                  Login
                </a>
              </div>
            </>
          }
        />
      </div>
    </>
  )
}
