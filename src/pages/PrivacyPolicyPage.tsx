import { Card } from '../components/shared/Card'
import { PageHeader } from '../components/shared/PageHeader'
import { BRAND } from '../lib/constants'

export function PrivacyPolicyPage() {
  return (
    <div>
      <PageHeader
        title="Privacy Policy"
        subtitle="Your trust matters. We protect your data like it's our own."
      />

      <Card className="prose prose-slate max-w-none bg-white/30 dark:prose-invert">
        
        {/* Last Updated */}
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-0">
            📅 Last Updated: 18th April 2026 | ✅ Effective from: 18th April 2026
          </p>
        </div>

        {/* Introduction */}
        <h2>Welcome to {BRAND.name}</h2>
        <p>
          Your privacy is not just a legal obligation for us – it is a promise. 
          {BRAND.name} ("we", "us", "our") respects your confidentiality and is committed 
          to protecting your personal data. This Privacy Policy explains:
        </p>
        <ul>
          <li>What information we collect from you</li>
          <li>How we use, store, and protect your data</li>
          <li>Your rights regarding your information</li>
          <li>How we keep your academic work confidential</li>
        </ul>
        <p>
          By using our services, you trust us with your information. We take that trust seriously.
        </p>

        <hr className="my-6" />

        {/* Section 1: Information We Collect */}
        <h2>1. What Information We Collect</h2>
        <p>
          We collect only the information necessary to provide you with the best academic support.
        </p>

        <h3>1.1 Personal Information You Provide</h3>
        <ul>
          <li><strong>Contact Details:</strong> Name, email address, WhatsApp number, phone number</li>
          <li><strong>Academic Information:</strong> University/college name, course, semester, subject area</li>
          <li><strong>Project Details:</strong> Topic, requirements, deadline, guidelines, rubrics</li>
          <li><strong>Documents:</strong> Drafts, research papers, assignments, thesis chapters you share with us</li>
          <li><strong>Payment Information:</strong> Transaction ID, payment method (we do not store full card details)</li>
        </ul>

        <h3>1.2 Information Automatically Collected</h3>
        <ul>
          <li><strong>Usage Data:</strong> Pages visited, time spent, links clicked</li>
          <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
          <li><strong>IP Address:</strong> Approximate location (country/city level only)</li>
          <li><strong>Referral Source:</strong> How you found us (Google, WhatsApp, referral, etc.)</li>
        </ul>

        <h3>1.3 Information from Third Parties</h3>
        <ul>
          <li>WhatsApp (message history if you contact us)</li>
          <li>Google Analytics (website traffic analysis)</li>
          <li>Payment gateways (transaction confirmation only)</li>
        </ul>

        <hr className="my-6" />

        {/* Section 2: How We Use Your Information */}
        <h2>2. How We Use Your Information</h2>
        <p>
          We use your information only for legitimate purposes related to our service.
        </p>

        <h3>2.1 To Provide Our Services</h3>
        <ul>
          <li>Respond to your inquiries and provide quotes</li>
          <li>Understand your academic requirements</li>
          <li>Deliver completed work within deadlines</li>
          <li>Send updates about your project status</li>
          <li>Process payments and send receipts</li>
        </ul>

        <h3>2.2 To Improve Our Services</h3>
        <ul>
          <li>Analyze how students use our website</li>
          <li>Identify areas for improvement in our support</li>
          <li>Train our team to serve you better</li>
        </ul>

        <h3>2.3 To Communicate With You</h3>
        <ul>
          <li>Respond to your messages on WhatsApp/email</li>
          <li>Send important service updates</li>
          <li>Ask for feedback and testimonials (with your permission)</li>
        </ul>

        <h3>2.4 Legal & Security Purposes</h3>
        <ul>
          <li>Comply with applicable laws and regulations</li>
          <li>Prevent fraud and unauthorized access</li>
          <li>Resolve disputes and enforce our terms</li>
        </ul>

        <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg my-6">
          <p className="text-green-800 dark:text-green-300 mb-0">
            ✅ <strong>We NEVER:</strong> Sell your data | Share your work publicly | Use your information for marketing without consent | Reveal your identity to third parties
          </p>
        </div>

        <hr className="my-6" />

        {/* Section 3: Confidentiality – Most Important for Your Business */}
        <h2>3. Confidentiality – Our Core Promise</h2>
        <p>
          As an academic support service, confidentiality is our foundation. Here is how we protect you:
        </p>

        <h3>3.1 Your Documents Are Safe</h3>
        <ul>
          <li>All project files, research papers, thesis chapters, and assignments are stored on encrypted systems</li>
          <li>Only assigned team members working on your project can access your documents</li>
          <li>Files are automatically deleted from our systems 30 days after final delivery</li>
          <li>We never reuse, republish, or share your work with any other client</li>
        </ul>

        <h3>3.2 Non-Disclosure Agreement (NDA)</h3>
        <p>
          We provide a formal NDA on request. This legally binds us to complete confidentiality 
          regarding your identity, project details, and all shared materials.
        </p>

        <h3>3.3 Anonymity Guarantee</h3>
        <ul>
          <li>We never ask for your university login credentials</li>
          <li>We never contact your professors or university</li>
          <li>Your name never appears on any document shared externally</li>
          <li>Testimonials are published only with your explicit consent and can be anonymous</li>
        </ul>

        <h3>3.4 No Resale or Redistribution</h3>
        <p>
          Your completed work is yours alone. We never sell, share, or upload your work to any 
          repository, database, or website. What you submit is exclusively yours.
        </p>

        <hr className="my-6" />

        {/* Section 4: Data Storage & Security */}
        <h2>4. How We Store & Protect Your Data</h2>

        <h3>4.1 Data Storage Location</h3>
        <ul>
          <li>Your data is stored on secure servers with industry-standard encryption</li>
          <li>Backups are encrypted and access is restricted to authorized personnel only</li>
          <li>We do not use public cloud storage for client documents</li>
        </ul>

        <h3>4.2 Security Measures</h3>
        <ul>
          <li>Two-factor authentication for all team accounts</li>
          <li>End-to-end encryption for all communication channels</li>
          <li>Regular security audits and vulnerability scans</li>
          <li>Secure file transfer protocols for document exchange</li>
          <li>Employee confidentiality agreements signed by every team member</li>
        </ul>

        <h3>4.3 Data Breach Protocol</h3>
        <p>
          In the unlikely event of a data breach, we will notify affected users within 72 hours 
          as required by law and take immediate corrective actions.
        </p>

        <hr className="my-6" />

        {/* Section 5: Data Retention */}
        <h2>5. How Long We Keep Your Data</h2>

        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Type of Data</th>
              <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Retention Period</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 p-2">Chat/WhatsApp conversations</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">Until project completion + 30 days</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 p-2">Project files & documents</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">30 days after final delivery, then deleted</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 p-2">Contact information</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">As long as you are a client + 1 year</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 p-2">Payment records</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">5 years (legal requirement)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-700 p-2">Website analytics</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">26 months (Google Analytics standard)</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-4">
          You may request early deletion of your data at any time, subject to legal obligations.
        </p>

        <hr className="my-6" />

        {/* Section 6: Your Rights */}
        <h2>6. Your Legal Rights</h2>
        <p>
          Depending on your location, you may have the following rights:
        </p>

        <ul>
          <li><strong>Right to Access:</strong> Request a copy of all data we hold about you</li>
          <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete information</li>
          <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your data</li>
          <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
          <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
          <li><strong>Right to Object:</strong> Object to certain data processing activities</li>
          <li><strong>Right to Withdraw Consent:</strong> Withdraw permission at any time</li>
        </ul>

        <p>
          To exercise any of these rights, contact us at <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>. 
          We will respond within 30 days as required by law.
        </p>

        <hr className="my-6" />

        {/* Section 7: International Users (GDPR, CCPA, etc.) */}
        <h2>7. International Users – GDPR & CCPA Compliance</h2>

        <h3>7.1 For Users in the European Union (EU/EEA/UK)</h3>
        <p>
          If you are located in the EU/UK, we comply with the General Data Protection Regulation (GDPR).
        </p>
        <ul>
          <li><strong>Legal Basis:</strong> We process your data based on contract fulfillment, legitimate interests, and your consent</li>
          <li><strong>Data Transfer:</strong> Your data may be transferred to India. We ensure adequate safeguards are in place</li>
          <li><strong>Supervisory Authority:</strong> You have the right to lodge a complaint with your local data protection authority</li>
        </ul>

        <h3>7.2 For Users in California (USA) – CCPA</h3>
        <p>
          If you are a California resident, the California Consumer Privacy Act (CCPA) gives you additional rights:
        </p>
        <ul>
          <li>Right to know what personal information we collect</li>
          <li>Right to delete personal information</li>
          <li>Right to opt-out of data selling (we do not sell data)</li>
          <li>Right to non-discrimination for exercising your rights</li>
        </ul>

        <h3>7.3 For Users in India</h3>
        <p>
          We comply with the Information Technology Act, 2000 and the upcoming Digital Personal Data Protection Act, 2023. 
          Your data is processed lawfully and fairly.
        </p>

        <hr className="my-6" />

        {/* Section 8: Cookies & Tracking */}
        <h2>8. Cookies & Tracking Technologies</h2>
        <p>
          Our website uses cookies to improve your experience.
        </p>

        <h3>8.1 What Are Cookies?</h3>
        <p>
          Cookies are small text files stored on your device that help us remember your preferences and understand how you use our website.
        </p>

        <h3>8.2 Types of Cookies We Use</h3>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for website functionality (no consent needed)</li>
          <li><strong>Analytics Cookies:</strong> Google Analytics to understand traffic (consent required)</li>
          <li><strong>Preference Cookies:</strong> Remember your language and region settings</li>
        </ul>

        <h3>8.3 Managing Cookies</h3>
        <p>
          You can control cookies through your browser settings. Disabling cookies may affect website functionality.
        </p>

        <hr className="my-6" />

        {/* Section 9: Third-Party Services */}
        <h2>9. Third-Party Services We Use</h2>
        <p>
          We use trusted third-party services to operate our business. Each has its own privacy policy:
        </p>

        <ul>
          <li><strong>WhatsApp (Meta):</strong> For communication – <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">WhatsApp Privacy Policy</a></li>
          <li><strong>Google Analytics:</strong> For website analytics – <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
          <li><strong>Payment Gateways:</strong> Razorpay, PayPal, etc. – respective privacy policies apply</li>
          <li><strong>Hosting Provider:</strong> Secure server hosting with data protection guarantees</li>
        </ul>

        <hr className="my-6" />

        {/* Section 10: Children's Privacy */}
        <h2>10. Children's Privacy</h2>
        <p>
          Our services are for college/university students and researchers aged 18 years or older. 
          We do not knowingly collect data from individuals under 18. If you believe a minor has provided 
          us with data, please contact us immediately.
        </p>

        <hr className="my-6" />

        {/* Section 11: Changes to This Policy */}
        <h2>11. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with 
          an updated "Last Updated" date. For significant changes, we will notify you via WhatsApp or email.
        </p>
        <p>
          We encourage you to review this policy periodically to stay informed about how we protect your data.
        </p>

        <hr className="my-6" />

        {/* Section 12: Contact Information */}
        <h2>12. Contact Us – Your Privacy Matters</h2>
        <p>
          If you have any questions about this Privacy Policy, wish to exercise your rights, or want to request an NDA:
        </p>

        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <p className="mb-2"><strong>📧 Email:</strong> <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
          <p className="mb-2"><strong>💬 WhatsApp:</strong> <a href={`https://wa.me/${BRAND.whatsappDigits}`}>{BRAND.whatsappE164}</a></p>
          <p className="mb-0"><strong>📮 Address:</strong> Bharat Academix, India</p>
        </div>

        <hr className="my-6" />

        {/* Grievance Officer (Required for India) */}
        <h2>13. Grievance Officer (India Compliance)</h2>
        <p>
          In compliance with the Information Technology Act, 2000 and rules made thereunder, 
          the Grievance Officer for {BRAND.name} is:
        </p>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
          <p className="mb-1"><strong>Name:</strong> Grievance Officer, Bharat Academix</p>
          <p className="mb-1"><strong>Email:</strong> <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
          <p className="mb-0"><strong>Response Time:</strong> Within 48 hours</p>
        </div>

        <hr className="my-6" />

        {/* Acceptance of Policy */}
        <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg text-center">
          <p className="text-yellow-800 dark:text-yellow-300 mb-0">
            📌 By using {BRAND.name} services, you acknowledge that you have read and understood this Privacy Policy 
            and agree to its terms. Thank you for trusting us with your academic journey.
          </p>
        </div>

      </Card>
    </div>
  )
}