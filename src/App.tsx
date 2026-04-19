import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { AuthProvider } from './state/auth'
import { PreferencesProvider } from './state/preferences'

export default function App() {
  return (
    <PreferencesProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PreferencesProvider>
  )
}
