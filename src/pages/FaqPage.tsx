import { Accordion } from '../components/shared/Accordion'
import { PageHeader } from '../components/shared/PageHeader'

export function FaqPage() {
  const items = [
    {
      q: 'Is this legal for my university submission?',
      a: 'We provide guidance, reference material, editing, and coaching. Always follow your university policies and submit work that reflects your own understanding.',
    },
    {
      q: 'Do you serve international students?',
      a: 'Yes. We support students in USA, UK, Canada, Australia, UAE, Singapore, Malaysia, Germany, and more.',
    },
    {
      q: "How do I know you won't leak my work?",
      a: 'We can sign a confidentiality agreement (NDA) on request. Your work is not shared or resold.',
    },
    {
      q: 'What if my professor asks for changes?',
      a: 'We provide revision support based on feedback (revision limits depend on the package).',
    },
    {
      q: 'Do you provide plagiarism/similarity reports?',
      a: 'On request, we can share similarity reports and AI-writing indicator reports when applicable.',
    },
    {
      q: 'Can I pay in my local currency?',
      a: 'Yes. INR, USD, GBP, CAD, AUD, EUR, SGD, AED — supported depending on payment method.',
    },
    {
      q: "What's your turnaround time?",
      a: 'Urgent tasks can be handled quickly (subject to scope). Standard turnarounds vary by project type; we confirm timelines before starting.',
    },
    {
      q: 'Do you do live meetings?',
      a: 'Yes. We can explain via Zoom/Google Meet (additional charge may apply).',
    },
  ]

  return (
    <div>
      <PageHeader
        title="FAQ"
        subtitle="Quick answers to the most common questions."
      />
      <Accordion items={items} />
    </div>
  )
}

