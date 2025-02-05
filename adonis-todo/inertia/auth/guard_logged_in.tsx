import Redirect from '~/ui/redirect'
import { useCurrentUser } from './use_current_user'

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
