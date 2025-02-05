import { router } from '@inertiajs/react'
import { useEffect } from 'react'

export type RedirectProps = {
  href: string
}

export default function Redirect({ href }: RedirectProps) {
  useEffect(() => {
    router.visit(href)
  }, [href])
  return null
}
