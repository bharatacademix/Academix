import { SignUp } from '../components/auth/SignUp'

export function SignUpPage() {
  return (
    <div className="min-h-screen bg-[var(--muted)] py-12">
      <div className="container mx-auto px-4">
        <SignUp />
      </div>
    </div>
  )
}