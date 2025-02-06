import Redirect from '~/ui/redirect'
import { useCurrentUser } from './current_user_loader'

export default function MustBeLoggedIn(props: { children: React.ReactNode }) {
  const { currentUser, isLoading } = useCurrentUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (currentUser) {
    return props.children
  }

  return <Redirect href="/login" />
}
