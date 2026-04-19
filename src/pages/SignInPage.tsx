import { SignIn } from '../components/auth/SignIn'

export function SignInPage() {
  return (
    <div className="min-h-screen bg-[var(--muted)] py-12">
      <div className="container mx-auto px-4">
        <SignIn />
      </div>
    </div>
  )
}