import Redirect from '~/ui/redirect'
import { useCurrentUser } from './current_user_loader'

export default function GuardLoggedIn(props: { children: React.ReactNode }) {
  const { currentUser, isLoading } = useCurrentUser()

  if (currentUser) {
    return props.children
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <Redirect href="/login" />
}
