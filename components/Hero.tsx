'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, FileText } from 'lucide-react'
import { useRef } from 'react'
import ColorBends from './ColorBends'
import { TextAnimate } from './ui/text-animate'

const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}

const TITLE_CHAR_DURATION = 0.03
const HERO_LINE1 = "Hey there,"
const HERO_IM = "I'm"
const HERO_NAME = "Arsh Jafri"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const metadataVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springConfig,
      delay: 0.3,
    },
  },
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springConfig,
      delay: 0.5,
    },
  },
}

const socialVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springConfig,
      delay: 0.7,
    },
  },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} className="min-h-screen w-full relative flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden bg-[#0B0C10]">
      {/* ColorBends Background */}
      <div className="absolute inset-0 w-full h-full">
        <ColorBends
          colors={["#18499b"]}
          rotation={0}
          autoRotate={2}
          speed={.15}
          scale={.6}
          frequency={1}
          warpStrength={0}
          mouseInfluence={.5}
          parallax={1}
          noise={0}
          transparent
          trackContainerRef={sectionRef}
        />
      </div>
      
      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-[#0B0C10] to-transparent pointer-events-none z-10" />
      
      {/* Content */}
      <div className="w-full max-w-4xl mx-auto text-center relative z-10">
        {/* Typography */}
        <motion.div
          className="flex flex-col space-y-6 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.div
            className="text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-[#F0F6FC] leading-tight tracking-tight"
            variants={itemVariants}
          >
            {/** compute per-segment durations from character counts */}
            {(() => {
              const baseDelay = 0.15
              const line1Duration = HERO_LINE1.length * TITLE_CHAR_DURATION
              const imDuration = HERO_IM.length * TITLE_CHAR_DURATION
              const nameDuration = HERO_NAME.length * TITLE_CHAR_DURATION

              const imDelay = baseDelay + line1Duration
              const nameDelay = imDelay + imDuration

              return (
                <>
                  <TextAnimate
                    animation="blurInUp"
                    by="character"
                    once
                    startOnView={false}
                    as="h1"
                    delay={baseDelay}
                    duration={line1Duration}
                    className="inline"
                  >
                    {HERO_LINE1}
                  </TextAnimate>
                  <br />
                  <span className="whitespace-nowrap">
                    <TextAnimate
                      animation="blurInUp"
                      by="character"
                      once
                      startOnView={false}
                      as="span"
                      delay={imDelay}
                      duration={imDuration}
                      className="inline"
                    >
                      {HERO_IM}
                    </TextAnimate>{' '}
                    <TextAnimate
                      animation="blurInUp"
                      by="character"
                      once
                      startOnView={false}
                      as="span"
                      delay={nameDelay}
                      duration={nameDuration}
                      className="inline font-serif italic font-normal"
                    >
                      {HERO_NAME}
                    </TextAnimate>
                  </span>
                </>
              )
            })()}
          </motion.div>

          {/* Metadata Lines */}
          <motion.div
            className="flex flex-col space-y-1 text-sm md:text-base text-[#8B949E]"
            variants={metadataVariants}
          >
            <motion.p variants={itemVariants}>CS + Econ @ Northeastern University</motion.p>
            <motion.p variants={itemVariants}>Incoming SWE Intern @ Ripple</motion.p>
            <motion.p variants={itemVariants}>Software Lead @ Disrupt</motion.p>
          </motion.div>

          {/* 3D Pill Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
            variants={buttonVariants}
          >
            <motion.button
              className="pill-button px-8 py-4 bg-accent text-white font-medium text-base relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={springConfig}
              onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in touch
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-[#0B0C10]/20 backdrop-blur-xl border border-[#30363D]/50 text-white font-medium text-base rounded-full shadow-2xl hover:bg-[#0B0C10]/30 transition-colors"
              whileHover={{ scale: 1.02 }}
              transition={springConfig}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See my work
            </motion.button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex gap-4 mt-6 justify-center"
            variants={socialVariants}
          >
            <motion.a
              href="https://linkedin.com/in/arshjafri"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={springConfig}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://github.com/arsh-jafri"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={springConfig}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:jafri.ar@northeastern.edu"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={springConfig}
            >
              <Mail className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="/Arsh%20Jafri%20-%20Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={springConfig}
            >
              <FileText className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

