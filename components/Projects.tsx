'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Github, ExternalLink, Download } from 'lucide-react'
import { SiGooglechrome } from 'react-icons/si'

const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}


// Project data matching the design
const projects = [
  {
    id: 1,
    title: 'Rover',
    description: 'An AI price adjustment agent that monitors your Gmail for receipts, tracks prices via web scraping, and contacts support to claim refunds when prices drop within return windows.',
    tags: ['Python', 'AI Agent', 'Fintech', 'Web Scraping', 'Redis'],
    githubUrl: 'https://github.com/arsh-jafri/rover',
    buttons: [
      { type: 'github', url: 'https://github.com/arsh-jafri/rover' },
      { type: 'visit', url: 'https://tryrover.app' },
    ],
  },
  {
    id: 2,
    title: 'Clearview',
    description: 'An open-source Chrome extension (500+ installs) that analyzes news articles for political bias and highlights flagged sections using NLP and sentiment analysis.',
    tags: ['JavaScript', 'NLP', 'Sentiment Analysis', 'Web Scraping'],
    githubUrl: 'https://github.com/arsh-jafri/clearview',
    buttons: [
      { type: 'github', url: 'https://github.com/arsh-jafri/clearview' },
      { type: 'install', url: 'https://chromewebstore.google.com/detail/clearview-ai-powered-poli/eaaojgnnhjbcmggeepkpkemopfnjcpnb?hl=en&authuser=0' },
    ],
  },
  {
    id: 2,
    title: 'Econostats',
    description: 'A real-time economic data visualization platform. Features FRED API integration, custom data uploading, and interactive charts.',
    tags: ['Python', 'Flask', 'FRED API', 'Data Visualization', 'NumPy/Pandas'],
    githubUrl: 'https://github.com/arsh-jafri/econostats',
    buttons: [
      { type: 'github', url: 'https://github.com/arsh-jafri/econostats' },
      { type: 'visit', url: 'http://econostats.co' },
    ],
  },
  {
    id: 3,
    title: 'StarkBot',
    description: 'RAG chatbot that answers Iron Man lore questions using official Marvel sources. Leverages PgVector for semantic search.',
    tags: ['Python', 'PgVector', 'RAG', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/Arsh-Jafri/Iron-Man-RAG-Chatbot',
    buttons: [
      { type: 'github', url: 'https://github.com/Arsh-Jafri/Iron-Man-RAG-Chatbot' },
    ],
  },
  {
    id: 4,
    title: 'Tripful',
    description: 'An AI-powered travel planner that uses live data (Google Places and Amadeus APIs) to generate personalized itineraries from user preferences.',
    tags: ['REST APIs', 'Node.js', 'TypeScript', 'LLM Orchestration'],
    githubUrl: 'https://github.com/arsh-jafri/tripful',
    buttons: [
      { type: 'github', url: 'https://github.com/arsh-jafri/tripful' },
    ],
  },
  {
    id: 5,
    title: 'Nexcap',
    description: 'Prototyped and pitched a crowdfunding app that allows retail investors access to private securities. Secured $1.5k in seed funding. ',
    tags: ['Fintech', 'React', 'TypeScript', 'Web3', 'Blockchain'],
    buttons: [
      { type: 'pitchdeck', url: '/Nexcap-Pitch.pdf' },
      { type: 'readmore', url: '/Nexcap-One-Pager.pdf' },
    ],
  },
  {
    id: 6,
    title: "Dijkstra's Snake Game",
    description: 'A modern take on the classic Snake game featuring an AI opponent that uses Dijkstra\'s algorithm for intelligent pathfinding.',
    tags: ['Game Development', 'Dijkstra Algorithm', 'Pathfinding', 'Java'],
    githubUrl: 'https://github.com/Arsh-Jafri/dijkstra-snake-game',
    buttons: [
      { type: 'github', url: 'https://github.com/Arsh-Jafri/dijkstra-snake-game' },
    ],
  },
  {
    id: 7,
    title: 'PlateMate',
    description: 'A dish and restaurant recommendation app that uses taste, portion, and price preferences to provide hyper-personalized recommendations via an embedding-based algorithm.',
    tags: ['Python', 'Go', 'React Native', 'Recommender Systems', 'MongoDB'],
    buttons: [
      { type: 'download', url: '#', icon: 'apple' },
    ],
  },
]

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Sync scroll position when currentIndex changes (from indicators, not from native scroll)
  useEffect(() => {
    if (containerRef.current && !isScrolling) {
      const container = containerRef.current
      const innerContainer = container.firstElementChild as HTMLElement
      if (innerContainer) {
        const cards = innerContainer.children
        if (cards[currentIndex]) {
          const targetCard = cards[currentIndex] as HTMLElement
          const cardLeft = targetCard.offsetLeft
          const cardWidth = targetCard.offsetWidth
          const containerWidth = container.clientWidth
          const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2)
          
          container.scrollTo({
            left: Math.max(0, targetScroll),
            behavior: 'smooth',
          })
        }
      }
    }
  }, [currentIndex, isScrolling])

  // Cleanup scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const handleIndicatorClick = (index: number) => {
    setIsScrolling(false)
    setCurrentIndex(index)
  }

  const getActualIndex = () => {
    return Math.max(0, Math.min(currentIndex, projects.length - 1))
  }

  return (
    <section className="w-full bg-[#0B0C10] py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-32 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ ...springConfig, delay: 0.1 }}
        >
          <p className="text-sm uppercase tracking-wider text-[#8B949E] mb-2">
            What I&apos;ve built
          </p>
        </motion.div>
        
        <motion.div
          className="flex flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ ...springConfig, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#F0F6FC]">
            My{' '}
            <span className="font-serif italic font-normal">Projects</span>
          </h2>
          <motion.a
            href="https://github.com/arsh-jafri"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button px-4 py-2 md:px-8 md:py-4 bg-accent text-white font-light text-xs md:text-base relative overflow-hidden whitespace-nowrap flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={springConfig}
          >
            View All
          </motion.a>
        </motion.div>
      </div>

      <div 
        ref={containerRef} 
        className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
        onScroll={(e) => {
          if (isScrolling) {
            const target = e.currentTarget
            const scrollLeft = target.scrollLeft
            const containerWidth = target.clientWidth
            const centerPoint = scrollLeft + containerWidth / 2
            
            // Find which project card is closest to center
            const innerContainer = target.firstElementChild as HTMLElement
            if (innerContainer) {
              let closestIndex = 0
              let closestDistance = Infinity
              
              const cards = innerContainer.children
              for (let i = 0; i < cards.length; i++) {
                const card = cards[i] as HTMLElement
                const cardLeft = card.offsetLeft
                const cardWidth = card.offsetWidth
                const cardCenter = cardLeft + cardWidth / 2
                const distance = Math.abs(centerPoint - cardCenter)
                
                if (distance < closestDistance) {
                  closestDistance = distance
                  closestIndex = i
                }
              }
              
              if (closestIndex !== currentIndex && closestIndex >= 0 && closestIndex < projects.length) {
                setCurrentIndex(closestIndex)
              }
            }
            
            // Clear existing timeout
            if (scrollTimeoutRef.current) {
              clearTimeout(scrollTimeoutRef.current)
            }
            
            // Set isScrolling to false after scroll ends
            scrollTimeoutRef.current = setTimeout(() => {
              setIsScrolling(false)
            }, 150)
          }
        }}
        onWheel={() => {
          // Enable scrolling on wheel events (trackpad)
          setIsScrolling(true)
        }}
        onTouchStart={() => {
          setIsScrolling(true)
        }}
      >
        <div
          className="flex gap-3 md:gap-4 pl-8 md:pl-[max(4rem,calc((100vw-80rem)/2+4rem))] lg:pl-[max(8rem,calc((100vw-80rem)/2+8rem))] pr-8 md:pr-[max(4rem,calc((100vw-80rem)/2+4rem))] lg:pr-[max(8rem,calc((100vw-80rem)/2+8rem))]"
          style={{
            width: 'max-content',
            paddingTop: '20px',
            marginTop: '-20px',
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={`${project.id}-${index}`}
              className="flex-shrink-0 w-[85vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] max-w-[700px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ ...springConfig, delay: 0.1 }}
            >
              <div className="bg-[#161B22] rounded-2xl md:rounded-3xl h-auto flex flex-col overflow-hidden mr-2 md:mr-4 border border-[#30363D]">
                {/* Project Info */}
                <div className="p-5 md:p-8 flex flex-col justify-start">
                  <h3 className="text-xl md:text-2xl font-light text-[#F0F6FC] mb-2 md:mb-3">{project.title}</h3>
                  <p className="text-[#8B949E] text-xs md:text-sm mb-3 md:mb-4 line-clamp-5 md:line-clamp-6">{project.description}</p>
                  
                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 md:gap-1.5 mb-4 md:mb-6">
                      {project.tags.slice(0, 8).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-white/10 border border-[#30363D]/50 text-[#8B949E] text-[10px] md:text-xs font-light"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 8 && (
                        <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-white/10 border border-[#30363D]/50 text-[#8B949E] text-[10px] md:text-xs font-light">
                          +{project.tags.length - 8}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Buttons */}
                  <div className="flex gap-2 md:gap-3 flex-wrap mt-auto">
                    {project.buttons?.map((button, btnIndex) => {
                      const isFirstButton = btnIndex === 0
                      const primaryButtonClass = "pill-button flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 bg-accent text-white font-light text-xs md:text-sm"
                      const secondaryButtonClass = "flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/10 border border-[#30363D]/50 text-[#F0F6FC] hover:bg-accent hover:text-white transition-colors text-xs md:text-sm font-light"
                      const buttonClass = isFirstButton ? primaryButtonClass : secondaryButtonClass

                      if (button.type === 'github') {
                        return (
                          <motion.a
                            key={btnIndex}
                            href={button.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonClass}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={springConfig}
                          >
                            {isFirstButton && <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                            GitHub
                          </motion.a>
                        )
                      }
                      if (button.type === 'install') {
                        return (
                          <motion.a
                            key={btnIndex}
                            href={button.url}
                            className={buttonClass}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={springConfig}
                          >
                            <SiGooglechrome className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            Add to Chrome
                          </motion.a>
                        )
                      }
                      if (button.type === 'visit') {
                        return (
                          <motion.a
                            key={btnIndex}
                            href={button.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonClass}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={springConfig}
                          >
                            {isFirstButton && <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                            Visit Site
                          </motion.a>
                        )
                      }
                      if (button.type === 'download' && 'icon' in button && button.icon === 'apple') {
                        return (
                          <motion.a
                            key={btnIndex}
                            href={button.url}
                            className={buttonClass}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={springConfig}
                          >
                            {isFirstButton && (
                              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                              </svg>
                            )}
                            Download
                          </motion.a>
                        )
                      }
                      if (button.type === 'pitchdeck') {
                        return (
                          <motion.a
                            key={btnIndex}
                            href={button.url}
                            className={buttonClass}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={springConfig}
                          >
                            Pitchdeck
                          </motion.a>
                        )
                      }
                      if (button.type === 'readmore') {
                        return (
                          <motion.a
                            key={btnIndex}
                            href={button.url}
                            className={buttonClass}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={springConfig}
                          >
                            Read More
                          </motion.a>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-32 flex justify-center gap-2 mt-6 md:mt-8">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === getActualIndex() ? 'bg-[#1E6EF4] w-8' : 'bg-[#30363D] w-2'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
