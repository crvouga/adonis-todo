import { RegisterErrorCode } from '#shared/auth/register_error_code'
import type { RegisterPageProps } from '#shared/auth/register_page_props'
import { Head, useForm } from '@inertiajs/react'
import MustBeLoggedOut from '~/auth/must_be_logged_out'
import { Alert } from '~/ui/alert'
import { Button } from '~/ui/button'
import { Card } from '~/ui/card'
import { TextField } from '~/ui/text_field'

export default function Register(props: RegisterPageProps) {
  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const updateField = (field: keyof typeof data, value: string) => {
    setData(field, value)
  }

  const errorMessage = props.errorCode ? RegisterErrorCode.toMessage(props.errorCode) : null

  return (
    <MustBeLoggedOut>
      <Head title="Register" />

      <div className="min-h-screen flex items-center justify-center bg-sand-2">
        <Card
          title="Register"
          body={
            <>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  post('/register')
                }}
              >
                <TextField
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={data.email}
                  onChange={(value) => updateField('email', value)}
                />

                <TextField
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={(value) => updateField('password', value)}
                />

                <TextField
                  label="Confirm Password"
                  type="password"
                  name="passwordConfirmation"
                  placeholder="••••••••"
                  value={data.passwordConfirmation}
                  onChange={(value) => updateField('passwordConfirmation', value)}
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
    </MustBeLoggedOut>
  )
}
