import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, BookOpen } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Module {
  weeks: string;
  title: string;
  focus: string;
  description: string;
  topics: string[];
  preview: string; // Short excerpt shown in pop-over
}

const modules: Module[] = [
  {
    weeks: 'Weeks 1–2',
    title: 'The Body Anchor',
    focus: 'Safety',
    description: 'Establishing foundational safety in your body and skin.',
    topics: [
      'Understanding narcissist and trauma responses in the body',
      'Creating your personal safety toolkit for intimacy',
      'Grounding techniques to settle the nervous system',
      "Recognising your body's survival signals without judgment",
    ],
    preview: '"Safety is not just the absence of danger — it is the presence of connection. In this module, we build the foundation: a body that begins to believe it is allowed to feel safe being seen and touched."',
  },
  {
    weeks: 'Weeks 3–4',
    title: 'The Sensory Bridge',
    focus: 'Awakening',
    description: 'Slowly reconnecting with the language of sensation.',
    topics: [
      'Somatic practices for gentle sensory awakening',
      'Moving through physical numbness with compassion',
      'Building capacity for touch at your own pace',
      'Creating sustainable self-care rituals for the body',
    ],
    preview: '"Your body has spent years protecting you by turning down the volume of sensation. We use this bridge — slowly, gently — to begin to restore the natural dialogue between your heart and your hands."',
  },
  {
    weeks: 'Weeks 5–6',
    title: 'The Body Story',
    focus: 'Awareness',
    description: 'Listening to how your body holds past intimacy.',
    topics: [
      'Identifying where control and shame are stored',
      'Understanding the "sexual freeze" response',
      'Gentle movement for uncoupling fear from intimacy',
      "Honouring your body's unique timeline for trust",
    ],
    preview: '"Intimacy after abuse is not a logic problem — it is a body problem. This module is an invitation to listen to the whispers of your skin, not to relive the past. It\'s time to let your body tell its story, on its terms."',
  },
  {
    weeks: 'Weeks 7–8',
    title: 'The Sacred Boundary',
    focus: 'Boundaries',
    description: 'Reclaiming your "No" to find your "Yes".',
    topics: [
      'Identifying boundary violations and "fawn" responses',
      'Somatic practices for felt, physical boundaries',
      'Communicating needs and limits without guilt',
      'Reclaiming sovereignty over your personal space',
    ],
    preview: '"Boundaries are the birthplace of intimacy. Until you know you can say "no" and be safe, you cannot truly say "yes." In this module, we explore the physical sensation of a protected, sovereign self."',
  },
  {
    weeks: 'Weeks 9–10',
    title: 'The Return to Desire',
    focus: 'Desire',
    description: 'Rebuilding desire from a place of agency.',
    topics: [
      'Releasing sexual shame and performance pressure',
      'Re-parenting the sexual self with compassion',
      'Reclaiming pleasure as a birthright, not a debt',
      'Somatic tools for navigating intimacy triggers',
    ],
    preview: '"Shame lives in the shadow of intimacy, making us small and quiet. You cannot think your way into desire — but you can feel your way back. This module is designed to help you reclaim your inherent right to pleasure."',
  },
  {
    weeks: 'Weeks 11–12',
    title: 'The Future Self',
    focus: 'Intimacy',
    description: 'Stepping into a future of conscious connection.',
    topics: [
      'Creating a somatic practice for long-term desire',
      'Navigating relationship dynamics with awareness',
      'Building your ecosystem of support and pleasure',
      'Celebrating your new embodied sovereignty',
    ],
    preview: '"Healing is not about going back to who you were — it is about becoming someone who is truly free. In these final weeks, we weave together your new language of the body to support a lifetime of deep, safe, and joyful intimacy."',
  },
];

export function Syllabus() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  // Close pop-over when clicking outside
  useEffect(() => {
    if (previewIndex === null) return;
    const handler = (e: MouseEvent) => {
      const ref = previewRefs.current[previewIndex];
      if (ref && !ref.contains(e.target as Node)) {
        setPreviewIndex(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [previewIndex]);

  // Escape closes pop-over
  useEffect(() => {
    if (previewIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewIndex(null);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [previewIndex]);

  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      id="syllabus"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        background: 'linear-gradient(160deg, rgba(141,170,145,0.06) 0%, rgba(253,253,248,1) 60%)',
      }}
      aria-labelledby="syllabus-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-sage mb-3">
            The Programme
          </p>
          <h2
            id="syllabus-heading"
            className="font-display font-bold text-slate mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.2' }}
          >
            Your 12-Week Journey
          </h2>
          <p className="text-lg text-slate/60 max-w-xl mx-auto" style={{ lineHeight: '1.8' }}>
            A carefully designed progression from safety to sovereignty —
            at a pace that respects your nervous system.
          </p>
        </motion.div>

        {/* Accordion stack */}
        <div className="space-y-3">
          {modules.map((module, index) => {
            const isOpen = openIndex === index;
            const isPreviewOpen = previewIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.07 }}
                className="relative bg-white border border-sage/20 rounded-3xl overflow-visible shadow-card"
              >
                {/* Accordion header button */}
                <button
                  id={`module-btn-${index}`}
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 md:py-6 flex justify-between items-center text-left transition-colors duration-200 hover:bg-sage/4 focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-inset rounded-3xl"
                  style={{ minHeight: '64px' }}
                  aria-expanded={isOpen}
                  aria-controls={`module-panel-${index}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      {/* Week badge */}
                      <span
                        className="text-xs font-semibold px-3 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'rgba(141,170,145,0.15)', color: '#6B8A6F' }}
                      >
                        {module.weeks}
                      </span>
                      {/* Focus tag */}
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'rgba(74,78,105,0.08)', color: '#6B6F8A' }}
                      >
                        {module.focus}
                      </span>

                      {/* Preview chip — Feature 6 */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setPreviewIndex(prev => prev === index ? null : index);
                        }}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-lg border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-1"
                        style={{
                          borderColor: 'rgba(141,170,145,0.4)',
                          color: isPreviewOpen ? '#FDFDF8' : '#6B8A6F',
                          backgroundColor: isPreviewOpen ? '#8DAA91' : 'transparent',
                        }}
                        aria-expanded={isPreviewOpen}
                        aria-controls={`preview-${index}`}
                        title="Preview this module"
                      >
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" aria-hidden="true" />
                          Preview
                        </span>
                      </button>
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-semibold text-slate leading-snug">
                      {module.title}
                    </h3>
                    <p className="text-sm text-slate/55 mt-0.5">{module.description}</p>
                  </div>

                  {/* Chevron — rotates 180° on open */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="ml-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-5 h-5 text-sage" />
                  </motion.div>
                </button>

                {/* ── Module Preview Pop-over (Feature 6) ── */}
                <AnimatePresence>
                  {isPreviewOpen && (
                    <motion.div
                      id={`preview-${index}`}
                      ref={el => { previewRefs.current[index] = el; }}
                      role="region"
                      aria-label={`Preview of ${module.title}`}
                      initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute left-0 right-0 md:left-auto md:right-auto md:w-[400px] z-20"
                      style={{
                        top: 'calc(100% + 8px)',
                        right: 0,
                        backgroundColor: 'rgba(253,253,248,0.96)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(141,170,145,0.3)',
                        borderRadius: '20px',
                        boxShadow: '0 20px 60px rgba(74,78,105,0.18)',
                        padding: '24px',
                      }}
                    >
                      {/* Pop-over close */}
                      <button
                        onClick={() => setPreviewIndex(null)}
                        aria-label="Close module preview"
                        className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sage"
                        style={{ backgroundColor: 'rgba(74,78,105,0.08)', color: '#4A4E69' }}
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>

                      {/* Pop-over header */}
                      <div className="flex items-center gap-2 mb-4 pr-8">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(141,170,145,0.15)', color: '#6B8A6F' }}>
                          {module.weeks}
                        </span>
                        <span className="font-display font-semibold text-slate text-sm">{module.title}</span>
                      </div>

                      {/* Excerpt */}
                      <p
                        className="font-display italic text-slate/70"
                        style={{ fontSize: '0.95rem', lineHeight: '1.75' }}
                      >
                        {module.preview}
                      </p>

                      <p className="mt-4 text-xs text-slate/40 italic">
                        This gives you a sense of the tone — the full module goes much deeper.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Accordion panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`module-panel-${index}`}
                      role="region"
                      aria-labelledby={`module-btn-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-sage/10">
                        <ul className="space-y-3 mt-4" role="list">
                          {module.topics.map((topic, ti) => (
                            <li
                              key={ti}
                              className="flex items-start gap-3 text-slate/70 text-sm md:text-base"
                              style={{ lineHeight: '1.7' }}
                            >
                              <span
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: 'rgba(141,170,145,0.18)' }}
                                aria-hidden="true"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                              </span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
