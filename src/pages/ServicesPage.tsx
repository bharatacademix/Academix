import { useMemo, useState } from 'react'
import { Card } from '../components/shared/Card'
import { PageHeader } from '../components/shared/PageHeader'
import { Tabs } from '../components/shared/Tabs'
import { SupportAreasSection } from '../components/sections/SupportAreasSection'
import { AdSense } from '../components/shared/AdSense'

type TabId = 'students' | 'research' | 'professional'

const TAB_DEFS = [
  { id: 'students', label: '🎓 Students' },
  { id: 'research', label: '🔬 Research Scholars' },
  { id: 'professional', label: '💼 Professional & Faculty' },
] as const

const DATA: Record<
  TabId,
  {
    title: string
    items: { service: string; details: string; image: string }[]
  }
> = {
  students: {
    title: 'Support for Indian and international students',
    items: [
      {
        service: 'Major Projects',
        details: 'Complete design, implementation, report, and viva-ready support for every branch.',
        image: '/images/services/student/studentmajorproject.jpg',
      },

      {
        service: 'Minor Projects',
        details: 'End-to-end semester project delivery with practical guidance and polished output.',
        image: '/images/services/student/studentminorproject.png',
      },
      {
        service: 'Assignments',
        details: 'Original answers, clear structure, and fast turnaround for any subject.',
        image: '/images/services/student/studentassisgnment.webp',
      },
      {
        service: 'Project Reports',
        details: 'Professional report formatting, editing, and presentation-ready documentation.',
        image: '/images/services/student/studentprojectreport.webp',
      },
            {
        service: 'Research Papers',
        details: 'Journal-style paper support with references, formatting, and academic polish.',
        image: '/images/services/student/studentresearch.avif',
      },
            {
        service: 'Software Projects',
        details: 'Project implementation, code review, and technical documentation support.',
        image: '/images/services/student/studentsoftwareproject.webp',
      },



      {
        service: 'Literature Reviews',
        details: 'Insightful syntheses with citation mapping, gap analysis, and structure.',
        image: '/images/services/student/studentLiteratureReviews.jpg',
      },
      {
        service: 'Thesis/Dissertation',
        details: 'Guidance from proposal to final submission with chapter-level mentoring.',
        image: '/images/services/student/studentthesis1.webp',
      },
      {
        service: 'Proofreading & Editing',
        details: 'Polished language, flow, and academic tone for high-quality submissions.',
        image: '/images/services/student/studentProofreadingEditing.avif',
      },
      {
        service: 'Similarity Reduction',
        details: 'Smart rewriting and citation cleanup to lower similarity scores safely.',
        image: '/images/services/student/studentSimilarityReduction.webp',
      },

      {
        service: 'Presentation Decks',
        details: 'Viva-ready slides with visuals, summaries, and presentation flow.',
        image: '/images/services/student/studentppt.avif',
      },
      {
        service: 'Academic Writing Support',
        details: 'Task-focused coaching for essays, reports, case studies and term work.',
        image: '/images/services/student/studentAcademicWritingSupport.jpg',
      },
    ],
  },
  research: {
    title: 'For UG/PG/PhD/Post-doc researchers',
    items: [
      {
        service: 'Original Research Paper',
        details: 'Publishable research manuscripts with strong novelty, rigorous analysis, and journal-ready structure.',
        image: '/images/services/scholar/ScholarOriginalResearchPaper.png',
      },
      {
        service: 'Review Paper',
        details: 'Critical literature synthesis crafted for narrative, systematic, or meta-analysis review journals.',
        image: '/images/services/scholar/scholarReviewPaper.jpg',
      },
      {
        service: 'Survey Paper',
        details: 'Comprehensive field surveys with comparative insights and future research direction.',
        image: '/images/services/scholar/scholarSurveyPaper.jpg',
      },
      {
        service: 'Case Study Paper',
        details: 'Evidence-based case analysis with practical conclusions and academic polish.',
        image: '/images/services/scholar/scholarCaseStudyPaper.jpg',
      },
      {
        service: 'Experimental Research Paper',
        details: 'Lab or simulation papers with clear methodology, results, and performance storytelling.',
        image: '/images/services/scholar/scholarExperimentalResearchPaper.jpg',
      },
      {
        service: 'Conceptual Paper',
        details: 'Idea-driven papers with strong theoretical grounding and original conceptual framing.',
        image: '/images/services/scholar/scholarConceptualPaper.png',
      },
      {
        service: 'Theoretical Paper',
        details: 'Formal analysis, proofs, and rigorous argumentation for high-impact journals.',
        image: '/images/services/scholar/scholarTheoreticalPaper.jpg',
      },
      {
        service: 'Methodology Paper',
        details: 'Robust method design, validation approach, and reproducible process documentation.',
        image: '/images/services/scholar/scholarMethodologyPaper.jpg',
      },
      {
        service: 'Data Paper',
        details: 'Dataset publication support with annotation, metadata, and reproducible usage notes.',
        image: '/images/services/scholar/scholarDataPaper.webp',
      },
      {
        service: 'Technical Paper',
        details: 'System architecture and implementation reports tailored for IEEE/CS conference standards.',
        image: '/images/services/scholar/scholarTechnicalPaper.jpg',
      },
      {
        service: 'Conference Paper',
        details: 'High-impact short submissions prepared for fast review and acceptance.',
        image: '/images/services/scholar/scholarConferencePaper.jpg',
      },
      {
        service: 'Journal Paper',
        details: 'Extended research articles polished for top-tier journal review and citation impact.',
        image: '/images/services/scholar/scholarJournalPaper.webp',
      },
      {
        service: 'Short Communication Paper',
        details: 'Concise research notes with crisp presentation of key findings.',
        image: '/images/services/scholar/scholarShort Communication Paper.jpg',
      },
      {
        service: 'Letter Paper',
        details: 'Rapid idea briefs and short discovery notes with publication-ready clarity.',
        image: '/images/services/scholar/scholarLetterPaper.jpg',
      },
      {
        service: 'Applied Research Paper',
        details: 'Impactful applied studies with real-world examples from healthcare, agriculture, and tech.',
        image: '/images/services/scholar/scholarAppliedResearchPaper.jpg',
      },
      {
        service: 'Comparative Study Paper',
        details: 'Side-by-side evaluation of methods, metrics, and performance trends.',
        image: '/images/services/scholar/scholarComparativeStudyPaper.jpg',
      },
      {
        service: 'Replication Study',
        details: 'Reproducibility support with validation, comparison, and result verification.',
        image: '/images/services/scholar/scholarReplicationStudy.jpg',
      },
      {
        service: 'Thesis/Dissertation Paper',
        details: 'Full thesis guidance from literature review to defense-ready submission.',
        image: '/images/services/scholar/scholarthesis.jpg',
      },
      {
        service: 'Book Chapter',
        details: 'Publisher-ready chapter writing, editing, and formatting support.',
        image: '/images/services/scholar/scholarBookChapter.png',
      },
      {
        service: 'Student Research Paper',
        details: 'Student-focused research support with academic rigor and clear presentation.',
        image: '/images/services/scholar/studentresearchpaper.png',
      },
    ],
  },
  professional: {
    title: 'For working professionals & faculty',
    items: [
            {
        service: 'Research Papers',
        details: 'Professional papers with advanced referencing, peer-ready polish, and publication focus.',
        image: '/images/services/faculty/facultyresearchpaper.webp',
      },
            {
        service: 'Thesis/Dissertation Paper',
        details: 'Full thesis support for faculty and research leaders, from concept to defense.',
        image: '/images/services/faculty/facultythesis.jpg',
      },
      {
        service: 'Book Chapter',
        details: 'Chapter development, editorial review, and publisher-ready formatting.',
        image: '/images/services/faculty/facultybookchapter.jpeg',
      },
      {
        service: 'Patent Drafting',
        details: 'Drafting, claims support, and filing-ready documentation for India/US/PCT.',
        image: '/images/patentdraft.jpg',
      },
      {
        service: 'Project Reports',
        details: 'Structured reports for funded projects, audit-ready and compliance-focused.',
        image: '/images/project report faculty.jpg',
      },
      {
        service: 'Research Proposals',
        details: 'Competitive grant proposals tailored to DST, CSIR, ICMR, NSF and similar calls.',
        image: '/images/research proposalsfaculty.png',
      },
      {
        service: 'Book Publication',
        details: 'Support for ISBN, layout, and publication-ready manuscript preparation.',
        image: '/images/isbn faculty.jpg',
      },
      {
        service: 'Faculty Assignments',
        details: 'Curriculum-ready academic materials and teaching resource development.',
        image: '/images/assignment faculty.webp',
      },
    ],
  },
}

export function ServicesPage() {
  const [tab, setTab] = useState<TabId>('students')
  const active = useMemo(() => DATA[tab], [tab])

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Discover the academic support that empowers you to finish stronger."
      />

      <div className="mb-6">
        <Tabs tabs={TAB_DEFS} value={tab} onChange={setTab} />
      </div>

      <Card>
        <div className="text-sm font-semibold text-[var(--subtext)]">
          {active.title}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {active.items.map((x) => (
            <div
              key={x.service}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white/30"
            >
              <img
                src={x.image}
                alt={x.service}
                loading="lazy"
                className="h-36 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/student-1.jpg'
                }}
              />
              <div className="p-4">
                <div className="font-extrabold text-[var(--navy)] dark:text-[var(--text)]">
                  {x.service}
                </div>
                <div className="mt-1 text-sm text-[var(--subtext)]">
                  {x.details}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[color:var(--gold)]/20 p-4 text-sm text-[var(--navy)] dark:text-[var(--text)]">
          <span className="font-extrabold">Note:</span> We provide guidance,
          editing, formatting, and mentoring. Final submissions should always
          reflect your own understanding and follow your university policies.
        </div>
      </Card>

      {/* Advertisement Section */}
      {import.meta.env.VITE_ADSENSE_AD_UNIT_SIDEBAR && (
        <AdSense 
          adSlot={import.meta.env.VITE_ADSENSE_AD_UNIT_SIDEBAR}
          adFormat="auto"
          className="my-8"
          style={{ minHeight: '300px' }}
        />
      )}

      <div className="mt-10">
        <SupportAreasSection
          title="Excellence Across Every Academic Service"
          subtitle="Turn ambition into achievement with support designed for every academic milestone."
        />
      </div>
    </div>
  )
}


