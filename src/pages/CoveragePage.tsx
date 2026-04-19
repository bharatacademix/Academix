import { Card } from '../components/shared/Card'
import { PageHeader } from '../components/shared/PageHeader'

function WorldGlobeVideo() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--muted)]">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
        <video
          className="h-full w-full object-cover"
          src="/videos/video1.mp4"
          title="Global Globe Video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
      
    </div>
  )
}

export function CoveragePage() {
  return (
    <div>
      <PageHeader
        title="Global Coverage"
        subtitle="A global footprint built on trusted delivery, fast response, and consistent academic support."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden p-0">
          <div className="relative rounded-3xl bg-[var(--muted)] p-8">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
            <div className="relative h-full">
              <div className="text-sm font-semibold text-[var(--emerald)]">
                Global coverage, local confidence
              </div>
              <div className="mt-3 text-3xl font-black tracking-tight text-[var(--navy)] dark:text-[var(--text)]">
                More than a video — a global academic support story
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--subtext)]">
                Our coverage is built on trusted delivery, responsive communication, and academic expertise for students, scholars, and faculty worldwide.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[var(--border)] bg-white/30 p-5">
                  <div className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">
                    Secure & confidential
                  </div>
                  <div className="mt-2 text-sm text-[var(--subtext)]">
                    NDA support, secure delivery, and private communication for every academic journey.
                  </div>
                </div>
                <div className="rounded-3xl border border-[var(--border)] bg-white/30 p-5">
                  <div className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">
                    Deadline-aware support
                  </div>
                  <div className="mt-2 text-sm text-[var(--subtext)]">
                    Fast, reliable help that aligns with your submission dates and review cycles.
                  </div>
                </div>
                <div className="rounded-3xl border border-[var(--border)] bg-white/30 p-5">
                  <div className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">
                    Academic system expertise
                  </div>
                  <div className="mt-2 text-sm text-[var(--subtext)]">
                    Tailored assistance for Indian and overseas university requirements.
                  </div>
                </div>
                <div className="rounded-3xl border border-[var(--border)] bg-white/30 p-5">
                  <div className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">
                    Clear, practical outcomes
                  </div>
                  <div className="mt-2 text-sm text-[var(--subtext)]">
                    From guidance to delivery, every step is oriented toward strong academic results.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
              <video
                className="h-full w-full object-cover"
                src="/videos/video1.mp4"
                title="Global Globe Video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                Live global support in action
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-semibold text-[var(--subtext)]">
              What our coverage means to you
            </div>
            <ul className="mt-4 space-y-3 text-sm text-[var(--subtext)]">
              <li className="rounded-2xl border border-[var(--border)] bg-white/30 p-4">
                <span className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">Global availability</span> — support across time zones so you get help when you need it.
              </li>
              <li className="rounded-2xl border border-[var(--border)] bg-white/30 p-4">
                <span className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">In-country relevance</span> — academic advice that understands your university rules and grading expectations.
              </li>
              <li className="rounded-2xl border border-[var(--border)] bg-white/30 p-4">
                <span className="font-semibold text-[var(--navy)] dark:text-[var(--text)]">Fast response</span> — quick replies and clear next steps, even during deadline pressure.
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          {
            k: '5000+',
            v: 'Projects Completed',
            description: 'Thesis, projects, papers, presentations, and practical assignments.',
          },
          {
            k: '500+',
            v: 'Universities Served',
            description: 'Supporting students from both Indian and international campuses.',
          },
          {
            k: '150+',
            v: 'Countries Covered',
            description: 'Global reach spanning every major academic time zone.',
          },
          {
            k: '1hr',
            v: 'Average Response',
            description: 'Rapid WhatsApp and email replies when deadlines matter most.',
          },
        ].map((s) => (
          <Card key={s.v} className="p-6">
            <div className="text-3xl font-black tracking-tight text-[var(--navy)] dark:text-[var(--text)]">
              {s.k}
            </div>
            <div className="mt-1 text-sm font-semibold text-[var(--subtext)]">
              {s.v}
            </div>
            <div className="mt-2 text-sm text-[var(--subtext)]/90">
              {s.description}
            </div>
          </Card>
        ))}
      </div>


        </div>
    
    
  )
}

