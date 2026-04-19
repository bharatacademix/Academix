import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { CoveragePage } from '../pages/CoveragePage'
import { FaqPage } from '../pages/FaqPage'
import { HomePage } from '../pages/HomePage'
import { HowItWorksPage } from '../pages/HowItWorksPage'
import { PricingPage } from '../pages/PricingPage'
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage'
import { QualityPage } from '../pages/QualityPage'
import { ServicesPage } from '../pages/ServicesPage'
import { SignInPage } from '../pages/SignInPage'
import { SignUpPage } from '../pages/SignUpPage'
import { GoogleCallbackPage } from '../pages/GoogleCallbackPage'
import { TestimonialsPage } from '../pages/TestimonialsPage'
import { ContactPage } from '../pages/ContactPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/coverage', element: <CoveragePage /> },
      { path: '/services', element: <ServicesPage /> },
      { path: '/quality', element: <QualityPage /> },
      { path: '/how-it-works', element: <HowItWorksPage /> },
      { path: '/pricing', element: <PricingPage /> },
      { path: '/testimonials', element: <TestimonialsPage /> },
      { path: '/faq', element: <FaqPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/auth/google/callback', element: <GoogleCallbackPage /> },
    ],
  },
])

