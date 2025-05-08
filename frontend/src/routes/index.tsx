import { createFileRoute } from '@tanstack/react-router'
import LoginButton from "@/components/auth/loginButton"

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <LoginButton />
  )
}
