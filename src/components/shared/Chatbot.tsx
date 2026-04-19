import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Button } from './Button'

type Message = {
  role: 'user' | 'assistant'
  text: string
}

const SUGGESTION_QUERIES = [
  'What services do you offer?',
  'How do I start?',
  'Do you provide NDA?',
  'How fast can you respond?',
  'What are your pricing options?',
  'Do you help with thesis writing?',
  'Can you assist with research papers?',
  'Do you offer project guidance?',
  'What subjects do you cover?',
  'Do you provide editing services?',
  'Can you help with presentations?',
  'Do you assist international students?',
  'What is your refund policy?',
  'How do I track my project progress?',
  'Do you offer urgent services?',
  'Can you help with patent drafting?',
  'Do you provide code review?',
  'What are your payment terms?',
  'How do I contact support?',
  'Do you offer free consultations?'
]

const getChatbotResponse = (question: string) => {
  const normalized = question.trim().toLowerCase()

  if (!normalized) {
    return 'Please type your question and I’ll do my best to help.'
  }

  if (normalized.includes('service') || normalized.includes('offer') || normalized.includes('support')) {
    return 'We provide end-to-end academic assistance: final year projects, research papers, thesis and dissertation editing, patent documents, presentations, assignments, and more. You can message us directly on WhatsApp for a custom plan.'
  }

  if (normalized.includes('how do i start') || normalized.includes('get started') || normalized.includes('start')) {
    return 'Start with a quick message on WhatsApp or ask your question here. We will review your needs, recommend the best package, and begin work once you approve the plan.'
  }

  if (normalized.includes('nda') || normalized.includes('confidential')) {
    return 'Yes, we can work under NDA and maintain full confidentiality for your project, thesis, patent, and research support.'
  }

  if (normalized.includes('price') || normalized.includes('cost') || normalized.includes('quote')) {
    return 'Pricing depends on the service and complexity. Send us your details on WhatsApp for a tailored quote and fast estimate.'
  }

  if (normalized.includes('time') || normalized.includes('response') || normalized.includes('speed') || normalized.includes('turnaround')) {
    return 'Our average response time is 24 hours. For urgent needs, we can often accelerate delivery depending on your timeline.'
  }

  if (normalized.includes('international') || normalized.includes('country') || normalized.includes('india') || normalized.includes('global') || normalized.includes('university')) {
    return 'We support students across India and international universities, including the US, UK, Canada, Australia, Singapore, UAE and more.'
  }

  if (normalized.includes('project') || normalized.includes('research') || normalized.includes('thesis') || normalized.includes('dissertation') || normalized.includes('patent')) {
    return 'Yes, we can support your project or research from idea creation through final review, editing, formatting, and submission-ready delivery.'
  }

  if (normalized.includes('subject') || normalized.includes('cover') || normalized.includes('field')) {
    return 'We cover all major academic disciplines including Engineering, Computer Science, Management, Medicine, Law, Arts, and Sciences across undergraduate and postgraduate levels.'
  }

  if (normalized.includes('editing') || normalized.includes('edit')) {
    return 'Yes, we provide comprehensive editing services for research papers, theses, dissertations, and academic documents including grammar, formatting, and content review.'
  }

  if (normalized.includes('presentation') || normalized.includes('ppt') || normalized.includes('powerpoint')) {
    return 'We create professional presentations, including PPTs, with custom designs, data visualization, and content tailored to your academic requirements.'
  }

  if (normalized.includes('assist international') || normalized.includes('international student')) {
    return 'Absolutely! We assist international students worldwide with timezone-friendly communication, currency options (INR/USD/GBP/AUD/CAD), and understanding of global academic standards.'
  }

  if (normalized.includes('refund') || normalized.includes('policy')) {
    return 'We offer a satisfaction guarantee. If you\'re not happy with our work, we\'ll revise it until you are. Refund terms are discussed on a case-by-case basis.'
  }

  if (normalized.includes('track') || normalized.includes('progress') || normalized.includes('status')) {
    return 'You can track your project progress through regular updates via WhatsApp/email. We provide milestone-based reporting and keep you informed throughout the process.'
  }

  if (normalized.includes('urgent') || normalized.includes('rush') || normalized.includes('emergency')) {
    return 'Yes, we handle urgent projects with priority processing. Additional charges may apply for rush orders. Contact us immediately to discuss timelines.'
  }

  if (normalized.includes('patent') || normalized.includes('drafting')) {
    return 'We provide patent drafting support, including technical writing, claims drafting, and documentation assistance for patent applications.'
  }

  if (normalized.includes('code') || normalized.includes('review') || normalized.includes('programming')) {
    return 'Yes, we offer code review, debugging, optimization, and development support for software projects across various programming languages and frameworks.'
  }

  if (normalized.includes('payment') || normalized.includes('terms') || normalized.includes('pay')) {
    return 'We accept payments via bank transfer, UPI, PayPal, and other secure methods. 50% advance payment is required, with balance due upon completion.'
  }

  if (normalized.includes('contact') || normalized.includes('support') || normalized.includes('help')) {
    return 'You can contact us 24/7 via WhatsApp, email, or our website. Our average response time is under 24 hours. We\'re here to help!'
  }

  if (normalized.includes('free') || normalized.includes('consultation') || normalized.includes('consult')) {
    return 'Yes, we offer free initial consultations to understand your requirements and provide guidance. Contact us on WhatsApp to schedule a free consultation call.'
  }

  return 'Great question! We can help with that. Please share a few details on WhatsApp or ask for a quick call so we can give you the best answer.'
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Hello! I’m Asha, your Academic Assistant. Ask me about projects, research, timelines, NDA, pricing, or how to get started.',
    },
  ])
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const response = getChatbotResponse(text)
    setMessages((current) => [
      ...current,
      { role: 'user', text },
      { role: 'assistant', text: response },
    ])
    setQuery('')
    // Move to next suggestion after user sends a message
    if (currentSuggestionIndex < SUGGESTION_QUERIES.length - 1) {
      setCurrentSuggestionIndex(currentSuggestionIndex + 1)
    }
  }

  return (
    <div className="fixed right-5 bottom-10 z-50 flex flex-col items-end gap-3">
      <div className="w-[360px] max-w-[calc(50vw-2rem)] rounded-3xl border border-[var(--border)] bg-white/95 shadow-2xl shadow-black/15 backdrop-blur-sm transition-all duration-200" style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] p-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--subtext)]">
              Chat with Asha
            </p>
            
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--navy)] shadow-sm transition hover:bg-[var(--muted)]"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-3 overflow-y-auto rounded-b-3xl bg-[var(--bg)] p-4 text-sm" style={{ maxHeight: '320px' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'rounded-3xl p-3',
                message.role === 'assistant'
                  ? 'bg-white text-[var(--text)]'
                  : 'bg-[color:var(--emerald)]/20 text-[var(--navy)]',
              )}
            >
              <div className="font-semibold text-xs uppercase tracking-[0.2em] text-[var(--subtext)]">
                {message.role === 'assistant' ? 'Asha' : 'You'}
              </div>
              <div className="mt-2 whitespace-pre-wrap text-sm leading-6">
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--border)] p-4">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleSend(query)
                }
              }}
              className="min-h-[46px] w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[color:var(--emerald)] focus:ring-2 focus:ring-[color:var(--emerald)]/20"
              placeholder="Type your question here…"
              aria-label="Chat question"
            />
            <Button className="whitespace-nowrap" onClick={() => handleSend(query)}>
              Send
            </Button>
          </div>

          <div className="mt-4 space-y-2 text-sm text-[var(--subtext)]">
            <div className="font-semibold">Try this:</div>
            {currentSuggestionIndex < SUGGESTION_QUERIES.length && (
              <button
                type="button"
                className="rounded-2xl border border-[var(--border)] bg-white/90 px-3 py-2 text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--emerald)]/10"
                onClick={() => handleSend(SUGGESTION_QUERIES[currentSuggestionIndex])}
              >
                {SUGGESTION_QUERIES[currentSuggestionIndex]}
              </button>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-[color:var(--emerald)] px-4 py-3 text-sm font-extrabold text-[color:var(--navy)] shadow-lg shadow-black/10 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[color:var(--emerald)]/60"
        onClick={() => {
          setIsOpen((open) => !open)
          if (!isOpen) {
            setCurrentSuggestionIndex(0) // Reset to first suggestion when opening
          }
        }}
        aria-label="Open chat"
      >
        <MessageCircle className="size-5" />
        Asha
      </button>
    </div>
  )
}
