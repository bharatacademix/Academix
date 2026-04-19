import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Card } from '../components/shared/Card'
import { PageHeader } from '../components/shared/PageHeader'

type Testimonial = {
  who: string
  stars: number
  text: string
}

const TESTIMONIALS_STORAGE_KEY = 'globalAcademicAssistTestimonials'

type FeedbackFormState = {
  name: string
  institution: string
  stars: number
  feedback: string
}

export function TestimonialsPage() {
  const initialTestimonials: Testimonial[] = [
    {
      who: 'Rahul K., VIT Vellore',
      stars: 5,
      text: '“I was stuck on my final year project. They helped me structure the work, review my code, and finish documentation in 2 weeks. Got an A grade.”',
    },
    {
      who: 'Priya S., Australia',
      stars: 5,
      text: '“My master’s thesis was stuck. Their editor helped me restructure chapters, improve citations, and tighten the discussion. Submitted and passed with distinction.”',
    },
    {
      who: 'Dr. Anil M., IIT Delhi',
      stars: 5,
      text: '“They helped polish my review paper and improve methodology clarity. Genuine support, good turnaround, and professional communication.”',
    },
    {
      who: 'Ananya R., SRM University',
      stars: 5,
      text: '“The project mentoring was excellent. They guided me through experiments, analysis, and final submission with prompt follow-up.”',
    },
    {
      who: 'Vivek P., NIT Warangal',
      stars: 5,
      text: '“I received clear guidance on my robotics project, and the code review helped me avoid mistakes before the demo.”',
    },
    {
      who: 'Aarav M., University of Melbourne',
      stars: 5,
      text: '“Their research paper support made my journal submission much stronger. The citations and structure were spot on.”',
    },
    {
      who: 'Savita K., JNTU Hyderabad',
      stars: 5,
      text: '“I needed help with thesis formatting and reference management. They delivered exactly what I needed within the deadline.”',
    },
    {
      who: 'Emily J., University of Toronto',
      stars: 5,
      text: '“Fantastic support for my final report and presentation slides. The feedback was precise and very professional.”',
    },
    {
      who: 'Nikhil S., BITS Pilani',
      stars: 5,
      text: '“The team supported my machine learning project from data cleaning to deployment notes. Very trustworthy and responsive.”',
    },
    {
      who: 'Maya L., London School of Economics',
      stars: 5,
      text: '“They helped refine my literature review and polish the writing. I felt confident submitting after their thorough edit.”',
    },
    {
      who: 'Priya N., Amity University',
      stars: 5,
      text: '“Excellent support for my project documentation and viva prep. They helped me feel prepared and organized.”',
    },
    {
      who: 'Luca R., ETH Zurich',
      stars: 5,
      text: '“The response time was fast and the technical review was strong. I was very happy with the final research summary.”',
    },
    {
      who: 'Dr. Rakesh S., Delhi University',
      stars: 5,
      text: '“Academic editing and referencing were handled very well. They understood the university requirements clearly.”',
    },
    {
      who: 'Chen W., National University of Singapore',
      stars: 5,
      text: '“Their support on my project report and poster design was excellent. Delivered clean work ahead of schedule.”',
    },
    {
      who: 'Aarohi D., Manipal Academy of Higher Education',
      stars: 5,
      text: '“I got valuable help with my biotechnology assignment and draft submission. Very professional and patient.”',
    },
    {
      who: 'Carlos R., Imperial College London',
      stars: 5,
      text: '“They helped me finalize my research proposal with strong methodology and structure. Great communication throughout.”',
    },
    {
      who: 'Rajesh K., Anna University',
      stars: 5,
      text: '“Strong support for my engineering report, especially the diagrams and formatting. I got very good feedback from my professor.”',
    },
    {
      who: 'Fatima A., University of California',
      stars: 5,
      text: '“I needed quick help before my submission deadline. The team delivered a polished paper with helpful revisions.”',
    },
  ]

  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [form, setForm] = useState<FeedbackFormState>({
    name: '',
    institution: '',
    stars: 5,
    feedback: '',
  })
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      const stored = window.localStorage.getItem(TESTIMONIALS_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.every((item) => item && typeof item.who === 'string')) {
          setTestimonials(parsed)
        }
      }
    } catch {
      // ignore invalid stored data
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials))
  }, [testimonials])

  const handleChange = <K extends keyof FeedbackFormState>(field: K, value: FeedbackFormState[K]) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.name.trim() || !form.institution.trim() || !form.feedback.trim()) {
      return
    }

    const newTestimonial: Testimonial = {
      who: `${form.name.trim()}, ${form.institution.trim()}`,
      stars: form.stars,
      text: `“${form.feedback.trim()}”`,
    }

    setTestimonials((prev) => [newTestimonial, ...prev])
    setForm({ name: '', institution: '', stars: 5, feedback: '' })
    setSuccessMessage('Thank you! Your testimonial has been submitted.')
  }

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle="Anonymized but realistic examples. For live review widgets we can embed Trustpilot/Google Reviews."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.who}>
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
              Write your testimonial below and it will appear instantly on this page.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-semibold text-[var(--subtext)]">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(event) => handleChange('name', event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--emerald)] focus:ring-2 focus:ring-[var(--emerald)]/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--subtext)]">
                Institution / College
              </label>
              <input
                type="text"
                value={form.institution}
                onChange={(event) => handleChange('institution', event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--emerald)] focus:ring-2 focus:ring-[var(--emerald)]/20"
                placeholder="College, university or location"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--subtext)]">
                Rating
              </label>
              <select
                value={form.stars}
                onChange={(event) => handleChange('stars', Number(event.target.value))}
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--emerald)] focus:ring-2 focus:ring-[var(--emerald)]/20"
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value} star{value > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-[var(--subtext)]">
                Feedback
              </label>
              <textarea
                value={form.feedback}
                onChange={(event) => handleChange('feedback', event.target.value)}
                className="mt-2 h-28 w-full rounded-2xl border border-[var(--border)] bg-white/30 px-4 py-3 text-sm text-[var(--text)] outline-none focus:border-[var(--emerald)] focus:ring-2 focus:ring-[var(--emerald)]/20"
                placeholder="Share your experience in 1–2 sentences"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--emerald)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--emerald)]/90"
            >
              Submit feedback
            </button>
            {successMessage ? (
              <div className="rounded-2xl border border-[var(--emerald)] bg-[var(--emerald)]/10 px-4 py-3 text-sm font-semibold text-[var(--navy)]">
                {successMessage}
              </div>
            ) : null}
          </form>
        </Card>
      </div>
    </div>
  )
}

