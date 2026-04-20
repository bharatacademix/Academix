import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Card } from '../components/shared/Card'
import { PageHeader } from '../components/shared/PageHeader'
import { supabase } from '../lib/supabase'

type Testimonial = {
  id: string
  who: string
  stars: number
  text: string
}

type FeedbackFormState = {
  name: string
  institution: string
  stars: number
  feedback: string
}

const initialTestimonials: Testimonial[] = [
  { id: 'seed-1', who: 'Rahul K., VIT Vellore', stars: 5, text: '"I was stuck on my final year project. They helped me structure the work, review my code, and finish documentation in 2 weeks. Got an A grade."' },
  { id: 'seed-2', who: 'Priya S., Australia', stars: 5, text: '"My master's thesis was stuck. Their editor helped me restructure chapters, improve citations, and tighten the discussion. Submitted and passed with distinction."' },
  { id: 'seed-3', who: 'Dr. Anil M., IIT Delhi', stars: 5, text: '"They helped polish my review paper and improve methodology clarity. Genuine support, good turnaround, and professional communication."' },
  { id: 'seed-4', who: 'Ananya R., SRM University', stars: 5, text: '"The project mentoring was excellent. They guided me through experiments, analysis, and final submission with prompt follow-up."' },
  { id: 'seed-5', who: 'Vivek P., NIT Warangal', stars: 5, text: '"I received clear guidance on my robotics project, and the code review helped me avoid mistakes before the demo."' },
  { id: 'seed-6', who: 'Aarav M., University of Melbourne', stars: 5, text: '"Their research paper support made my journal submission much stronger. The citations and structure were spot on."' },
  { id: 'seed-7', who: 'Savita K., JNTU Hyderabad', stars: 5, text: '"I needed help with thesis formatting and reference management. They delivered exactly what I needed within the deadline."' },
  { id: 'seed-8', who: 'Emily J., University of Toronto', stars: 5, text: '"Fantastic support for my final report and presentation slides. The feedback was precise and very professional."' },
  { id: 'seed-9', who: 'Nikhil S., BITS Pilani', stars: 5, text: '"The team supported my machine learning project from data cleaning to deployment notes. Very trustworthy and responsive."' },
  { id: 'seed-10', who: 'Maya L., London School of Economics', stars: 5, text: '"They helped refine my literature review and polish the writing. I felt confident submitting after their thorough edit."' },
  { id: 'seed-11', who: 'Priya N., Amity University', stars: 5, text: '"Excellent support for my project documentation and viva prep. They helped me feel prepared and organized."' },
  { id: 'seed-12', who: 'Luca R., ETH Zurich', stars: 5, text: '"The response time was fast and the technical review was strong. I was very happy with the final research summary."' },
  { id: 'seed-13', who: 'Dr. Rakesh S., Delhi University', stars: 5, text: '"Academic editing and referencing were handled very well. They understood the university requirements clearly."' },
  { id: 'seed-14', who: 'Chen W., National University of Singapore', stars: 5, text: '"Their support on my project report and poster design was excellent. Delivered clean work ahead of schedule."' },
  { id: 'seed-15', who: 'Aarohi D., Manipal Academy of Higher Education', stars: 5, text: '"I got valuable help with my biotechnology assignment and draft submission. Very professional and patient."' },
  { id: 'seed-16', who: 'Carlos R., Imperial College London', stars: 5, text: '"They helped me finalize my research proposal with strong methodology and structure. Great communication throughout."' },
  { id: 'seed-17', who: 'Rajesh K., Anna University', stars: 5, text: '"Strong support for my engineering report, especially the diagrams and formatting. I got very good feedback from my professor."' },
  { id: 'seed-18', who: 'Fatima A., University of California', stars: 5, text: '"I needed quick help before my submission deadline. The team delivered a polished paper with helpful revisions."' },
]

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [form, setForm] = useState<FeedbackFormState>({ name: '', institution: '', stars: 5, feedback: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')

  // Fetch approved testimonials from Supabase and prepend to the hardcoded list
  useEffect(() => {
    supabase
      .from('testimonials')
      .select('id, who, stars, text')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setTestimonials([...data, ...initialTestimonials])
        }
      })
  }, [])

  const handleChange = <K extends keyof FeedbackFormState>(field: K, value: FeedbackFormState[K]) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.name.trim() || !form.institution.trim() || !form.feedback.trim()) return

    setSubmitting(true)
    setSubmitStatus('idle')
    setSubmitError('')

    const { error } = await supabase.from('testimonials').insert({
      who: `${form.name.trim()}, ${form.institution.trim()}`,
      stars: form.stars,
      text: `"${form.feedback.trim()}"`,
      approved: false,
    })

    setSubmitting(false)

    if (error) {
      setSubmitStatus('error')
      setSubmitError(error.message)
    } else {
      setSubmitStatus('success')
      setForm({ name: '', institution: '', stars: 5, feedback: '' })
    }
  }

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle="What our students say about us."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.id}>
            <div className="text-sm font-semibold text-[var(--subtext)]">
              {'⭐'.repeat(t.stars)}
            </div>
            <div className="mt-3 text-sm text-[var(--subtext)]">{t.text}</div>
            <div className="mt-4 font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
              — {t.who}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card className="h-full flex flex-col justify-between">
          <div>
            <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
              Trust badges
            </div>
          </div>
          <div className="mt-3 grid gap-2 text-sm text-[var(--subtext)]">
            <div className="rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3">
              Verified by TrustPilot — 4.8/5 (230+ reviews)
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3">
              Google Reviews — 4.7/5 (180+ reviews)
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3">
              1000+ students supported from Indian and global universities
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3">
              Confidential workflow with NDA available on request
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3">
              24/7 response support through WhatsApp and email
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--emerald)]/5 p-4 text-sm text-[var(--navy)] dark:text-[var(--text)]">
            <div className="font-semibold">More reasons students choose us</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--subtext)]">
              <li>Fast turnaround for urgent project and assignment deadlines</li>
              <li>Clear communication via WhatsApp, email, and live chat</li>
              <li>Flexible payment options for Indian and international students</li>
              <li>Detailed review notes and one free revision for every order</li>
              <li>Support across STEM, arts, business, and professional disciplines</li>
            </ul>
          </div>
        </Card>

        <Card className="h-full flex flex-col">
          <div>
            <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
              Submit your feedback
            </div>
            <p className="mt-3 text-sm text-[var(--subtext)]">
              Share your experience. Your testimonial will appear on this page after review.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-semibold text-[var(--subtext)]">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--emerald)] focus:ring-2 focus:ring-[var(--emerald)]/20"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--subtext)]">Institution / College</label>
              <input
                type="text"
                value={form.institution}
                onChange={(e) => handleChange('institution', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--emerald)] focus:ring-2 focus:ring-[var(--emerald)]/20"
                placeholder="College, university or location"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--subtext)]">Rating</label>
              <select
                value={form.stars}
                onChange={(e) => handleChange('stars', Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--emerald)] focus:ring-2 focus:ring-[var(--emerald)]/20"
              >
                {[5, 4, 3, 2, 1].map((v) => (
                  <option key={v} value={v}>{v} star{v > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--subtext)]">Feedback</label>
              <textarea
                value={form.feedback}
                onChange={(e) => handleChange('feedback', e.target.value)}
                className="mt-2 h-28 w-full rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--emerald)] focus:ring-2 focus:ring-[var(--emerald)]/20"
                placeholder="Share your experience in 1–2 sentences"
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--emerald)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--emerald)]/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit feedback'}
            </button>

            {submitStatus === 'success' && (
              <div className="rounded-2xl border border-[var(--emerald)] bg-[var(--emerald)]/10 px-4 py-3 text-sm font-semibold text-[var(--navy)] dark:text-[var(--text)]">
                ✅ Thank you! Your testimonial has been submitted and will appear after review.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-900/20 dark:text-red-400">
                ❌ Failed to submit: {submitError}
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  )
}
