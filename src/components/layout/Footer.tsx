import { NavLink } from 'react-router-dom'
import { BRAND } from '../../lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--navy)] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <div className="text-lg font-semibold">{BRAND.name}</div>
          <div className="mt-1 text-sm text-white/80">{BRAND.tagline}</div>
          <div className="mt-4 space-y-1 text-sm text-white/80">
            <div>
              <span className="font-semibold text-white">WhatsApp:</span>{' '}
              <a
                className="underline decoration-white/30 underline-offset-4 hover:decoration-white/80"
                href={`https://wa.me/${BRAND.whatsappDigits}?text=${encodeURIComponent(
                  'HELP',
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                {BRAND.whatsappE164}
              </a>
            </div>
            <div>
              <span className="font-semibold text-white">Email:</span>{' '}
              <a
                className="underline decoration-white/30 underline-offset-4 hover:decoration-white/80"
                href={`mailto:${BRAND.email}`}
              >
                {BRAND.email}
              </a>
            </div>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold">Site</div>
          <div className="mt-3 grid gap-2 text-white/80">
            <NavLink className="hover:text-white" to="/services">
              Services
            </NavLink>
            <NavLink className="hover:text-white" to="/pricing">
              Pricing
            </NavLink>
            <NavLink className="hover:text-white" to="/faq">
              FAQ
            </NavLink>
            <NavLink className="hover:text-white" to="/contact">
              Contact
            </NavLink>
            <NavLink className="hover:text-white" to="/privacy-policy">
              Privacy Policy
            </NavLink>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold">Important</div>
          <p className="mt-3 text-white/80">
            We provide academic guidance, editing, formatting, and mentoring. We
            do not encourage academic misconduct. Always follow your university
            policies.
          </p>
          <p className="mt-3 text-white/60">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

