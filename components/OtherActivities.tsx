'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springConfig,
  },
}

// Google Developer Logo Component
const GoogleDeveloperLogo = () => (
  <div className="flex items-center gap-2">
    <svg viewBox="0 0 48 48" className="w-24 h-24">
      {/* Blue */}
      <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      {/* Red */}
      <path fill="#EA4335" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      {/* Yellow */}
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      {/* Green */}
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
    <svg viewBox="0 0 48 48" className="w-20 h-20">
      {/* Google-style multicolor shape */}
      <path fill="#EA4335" d="M24 4L4 24l8 8 20-20z"/>
      <path fill="#4285F4" d="M44 24L24 44l-8-8 20-20z"/>
      <path fill="#FBBC05" d="M4 24l20 20 8-8-20-20z"/>
      <path fill="#34A853" d="M24 4l20 20-8 8-20-20z"/>
    </svg>
  </div>
)

// Business Chart Icon
const BusinessChartIcon = () => (
  <svg viewBox="0 0 100 100" className="w-32 h-32">
    {/* Chart bars */}
    <rect x="15" y="50" width="15" height="35" rx="4" fill="#9CA3AF" />
    <rect x="42" y="30" width="15" height="55" rx="4" fill="#10B981" />
    <rect x="69" y="40" width="15" height="45" rx="4" fill="#9CA3AF" />
    {/* Dollar sign */}
    <circle cx="70" cy="20" r="12" fill="#10B981" />
    <text x="70" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">$</text>
    {/* Arrow */}
    <path d="M75 15 L82 8 L82 14 L88 14 L88 22 L82 22 L82 28 L75 21" fill="#10B981" />
  </svg>
)

const activities = [
  {
    id: 1,
    title: "Co-Director @ Northeastern's Largest Fintech Accelerator",
    description: 'Scaling student-led fintech startups by bridging the gap between VC frameworks and technical execution.',
    image: '/Finnovate.png',
    imagePosition: 'left',
  },
  {
    id: 2,
    title: 'President @ Disrupt',
    description: 'Leading the organization across pro-bono software initiatives and fintech strategy for high-growth startups.',
    image: '/disrupt-consulting.jpg',
    imagePosition: 'right',
  },
  {
    id: 3,
    title: 'UI/UX Designer @ Sandbox',
    description: 'Shaping the visual identity and user experience for high-fidelity, student-led software products.',
    image: '/Sandbox.png',
    imagePosition: 'left',
  },
]

export default function OtherActivities() {
  return (
    <section className="w-full bg-[#0B0C10] py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ ...springConfig, delay: 0.1 }}
        >
          <p className="text-sm uppercase tracking-wider text-[#8B949E] mb-2">
            What else I do
          </p>
        </motion.div>

        <motion.div
          className="text-4xl md:text-5xl lg:text-6xl font-light text-[#F0F6FC] mb-10 md:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ ...springConfig, delay: 0.2 }}
        >
          <h2>
            Beyond the{' '}
            <span className="font-serif italic font-normal">IDE</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              className="bg-[#161B22] rounded-2xl md:rounded-3xl p-5 md:p-10 border border-[#30363D] h-auto md:h-[280px]"
              variants={itemVariants}
            >
              <div className={`flex flex-col ${activity.imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 md:gap-8 items-center h-full`}>
                {/* Image/Icon Area - Shows first on mobile */}
                <div className="flex-shrink-0 order-first md:order-none">
                  <div className="w-24 h-24 md:w-48 md:h-48 bg-[#0B0C10] rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Text Content */}
                <div className={`flex-1 ${activity.imagePosition === 'right' ? 'md:text-left' : 'md:text-right'} text-center flex flex-col justify-center`}>
                  <h3 className="text-lg md:text-2xl font-light text-[#F0F6FC] mb-2 md:mb-3">{activity.title}</h3>
                  <p className="text-sm md:text-base text-[#8B949E]">{activity.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
