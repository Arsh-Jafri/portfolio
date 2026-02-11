'use client'

import SpotlightCard from './SpotlightCard';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Dumbbell, BookOpen, Palette, CircleDotDashed, Utensils, Film, Music, Database, Github } from 'lucide-react';
import type { SVGProps } from 'react';
import React from 'react';

const springConfig = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
};

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('./ui/map').then((m) => m.Map), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#161B22] rounded-full" />
});

// Premium ripple animation styles
const rippleStyles = `
  @keyframes ripple {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

// Icon Components (matching TechStack)
const GoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 207 78">
    <g fill="#00add7" fillRule="evenodd">
      <path d="m16.2 24.1c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6z" />
      <path d="m1.1 33.3c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6z" />
      <path d="m25.3 42.5c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7z" />
      <g transform="translate(55)">
        <path d="m74.1 22.3c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7-3.6 0-8.1 0-19.3 0-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.9-6.6-7.4-5.6-11.6-13-12.7-22.2-1.3-10.9 1.9-20.7 8.5-29.3 7.1-9.3 16.5-15.2 28-17.3 9.4-1.7 18.4-.6 26.5 4.9 5.3 3.5 9.1 8.3 11.6 14.1.6.9.2 1.4-1 1.7z" />
        <path
          d="m107.2 77.6c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.2 7.3-9.6 16.1-14.6 28-16.7 10.2-1.8 19.8-.8 28.5 5.1 7.9 5.4 12.8 12.7 14.1 22.3 1.7 13.5-2.2 24.5-11.5 33.9-6.6 6.7-14.7 10.9-24 12.8-2.7.5-5.4.6-8 .9zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z"
          fillRule="nonzero"
        />
      </g>
    </g>
  </svg>
)

const LangChainIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>LangChain</title>
    <path d="M6.0988 5.9175C2.7359 5.9175 0 8.6462 0 12s2.736 6.0825 6.0988 6.0825h11.8024C21.2641 18.0825 24 15.3538 24 12s-2.736-6.0825-6.0988-6.0825ZM5.9774 7.851c.493.0124 1.02.2496 1.273.6228.3673.4592.4778 1.0668.8944 1.4932.5604.6118 1.199 1.1505 1.7161 1.802.4892.5954.8386 1.2937 1.1436 1.9975.1244.2335.1257.5202.31.7197.0908.1204.5346.4483.4383.5645.0555.1204.4702.286.3263.4027-.1944.04-.4129.0476-.5616-.1074-.0549.126-.183.0596-.2819.0432a4 4 0 0 0-.025.0736c-.3288.0219-.5754-.3126-.732-.565-.3111-.168-.6642-.2702-.982-.446-.0182.2895.0452.6485-.231.8353-.014.5565.8436.0656.9222.4804-.061.0067-.1286-.0095-.1774.0373-.2239.2172-.4805-.1645-.7385-.007-.3464.174-.3808.3161-.8096.352-.0237-.0359-.0143-.0592.0059-.0811.1207-.1399.1295-.3046.3356-.3643-.2122-.0334-.3899.0833-.5686.1757-.2323.095-.2304-.2141-.5878.0164-.0396-.0322-.0208-.0615.0018-.0864.0908-.1107.2102-.127.345-.1208-.663-.3686-.9751.4507-1.2813.0432-.092.0243-.1265.1068-.1845.1652-.05-.0548-.0123-.1212-.0099-.1857-.0598-.028-.1356-.041-.1179-.1366-.1171-.0395-.1988.0295-.286.0952-.0787-.0608.0532-.1492.0776-.2125.0702-.1216.23-.025.3111-.1126.2306-.1308.552.0814.8155.0455.203.0255.4544-.1825.3526-.39-.2171-.2767-.179-.6386-.1839-.9695-.0268-.1929-.491-.4382-.6252-.6462-.1659-.1873-.295-.4047-.4243-.6182-.4666-.9008-.3198-2.0584-.9077-2.8947-.266.1466-.6125.0774-.8418-.119-.1238.1125-.1292.2598-.139.4161-.297-.2962-.2593-.8559-.022-1.1855.0969-.1302.2127-.2373.342-.3316.0292-.0213.0391-.0419.0385-.0747.1174-.5267.5764-.7391 1.0694-.7267m12.4071.46c.5575 0 1.0806.2159 1.474.6082s.61.9145.61 1.4704c0 .556-.2167 1.078-.61 1.4698v.0006l-.902.8995a2.08 2.08 0 0 1-.8597.5166l-.0164.0047-.0058.0164a2.05 2.05 0 0 1-.474.7308l-.9018.8995c-.3934.3924-.917.6083-1.4745.6083s-1.0806-.216-1.474-.6083c-.813-.8107-.813-2.1294 0-2.9402l.9019-.8995a2.056 2.056 0 0 1 .858-.5143l.017-.0053.0058-.0158a2.07 2.07 0 0 1 .4752-.7337l.9018-.8995c.3934-.3924.9171-.6083 1.4745-.6083zm0 .8965a1.18 1.18 0 0 0-.8388.3462l-.9018.8995a1.181 1.181 0 0 0-.3427.9252l.0053.0572c.0323.2652.149.5044.3374.6917.13.1296.2733.2114.4471.2686a.9.9 0 0 1 .014.1582.884.884 0 0 1-.2609.6304l-.0554.0554c-.3013-.1028-.5525-.253-.7794-.4792a2.06 2.06 0 0 1-.5761-1.0968l-.0099-.0578-.0461.0368a1.1 1.1 0 0 0-.0876.0794l-.9024.8995c-.4623.461-.4623 1.212 0 1.673.2311.2305.535.346.8394.3461.3043 0 .6077-.1156.8388-.3462l.9019-.8995c.4623-.461.4623-1.2113 0-1.673a1.17 1.17 0 0 0-.4367-.2749 1 1 0 0 1-.014-.1611c0-.2591.1023-.505.2901-.6923.3019.1028.57.2694.7962.495.3007.2999.4994.679.5756 1.0968l.0105.0578.0455-.0373a1.1 1.1 0 0 0 .0887-.0794l.902-.8996c.4622-.461.4628-1.2124 0-1.6735a1.18 1.18 0 0 0-.8395-.3462Zm-9.973 5.1567-.0006.0006c-.0793.3078-.1048.8318-.506.847-.033.1776.1228.2445.2655.1874.141-.0645.2081.0508.2557.1657.2177.0317.5394-.0725.5516-.3298-.325-.1867-.4253-.5418-.5662-.8709" fill="#fff"/>
  </svg>
)

const FastAPIIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
    <path
      d="M128 0C57.33 0 0 57.33 0 128s57.33 128 128 128 128-57.33 128-128S198.67 0 128 0Zm-6.67 230.605v-80.288H76.699l64.128-124.922v80.288h42.966L121.33 230.605Z"
      fill="#009688"
    />
  </svg>
)

const JavaIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 346">
    <path
      d="M83 267s-14 8 9 11c27 3 41 2 71-3 0 0 8 5 19 9-67 29-153-2-99-17M74 230s-15 11 8 13c29 3 52 3 92-4 0 0 6 5 15 8-82 24-173 2-115-17"
      fill="#5382A1"
    />
    <path
      d="M144 166c17 19-4 36-4 36s42-22 22-49c-18-26-32-38 44-82 0 0-119 29-62 95"
      fill="#E76F00"
    />
    <path
      d="M233 295s10 8-10 15c-39 12-163 15-197 0-12-5 11-13 18-14l12-2c-14-9-89 19-38 28 138 22 251-10 215-27M89 190s-63 15-22 21c17 2 51 2 83-1 26-2 52-7 52-7l-16 9c-64 16-187 8-151-9 30-14 54-13 54-13M202 253c64-33 34-66 13-61l-7 2s2-3 6-5c41-14 73 43-14 66l2-2"
      fill="#5382A1"
    />
    <path
      d="M162 0s36 36-34 91c-56 45-12 70 0 99-32-30-56-56-40-80 23-35 89-53 74-110"
      fill="#E76F00"
    />
    <path
      d="M95 345c62 4 158-3 160-32 0 0-4 11-51 20-53 10-119 9-158 2 0 0 8 7 49 10"
      fill="#5382A1"
    />
  </svg>
)

const DockerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="#008fe2">
    <path d="M13.98 11.08h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.08.18.18.18m-2.95-5.43h2.12a.19.19 0 0 0 .18-.19V3.57a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m0 2.71h2.12a.19.19 0 0 0 .18-.18V6.29a.19.19 0 0 0-.18-.18h-2.12a.18.18 0 0 0-.19.18v1.89c0 .1.09.18.19.18m-2.93 0h2.12a.19.19 0 0 0 .18-.18V6.29a.18.18 0 0 0-.18-.18H8.1a.18.18 0 0 0-.18.18v1.89c0 .1.08.18.18.18m-2.96 0h2.11a.19.19 0 0 0 .19-.18V6.29a.18.18 0 0 0-.19-.18H5.14a.19.19 0 0 0-.19.18v1.89c0 .1.08.18.19.18m5.89 2.72h2.12a.19.19 0 0 0 .18-.19V9.01a.19.19 0 0 0-.18-.19h-2.12a.18.18 0 0 0-.19.18v1.9c0 .1.09.18.19.18m-2.93 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H8.1a.18.18 0 0 0-.18.18v1.9c0 .1.08.18.18.18m-2.96 0h2.11a.18.18 0 0 0 .19-.19V9.01a.18.18 0 0 0-.18-.19H5.14a.19.19 0 0 0-.19.19v1.88c0 .1.08.19.19.19m-2.92 0h2.12a.18.18 0 0 0 .18-.19V9.01a.18.18 0 0 0-.18-.19H2.22a.18.18 0 0 0-.19.18v1.9c0 .1.08.18.19.18m21.54-1.19c-.06-.05-.67-.51-1.95-.51-.34 0-.68.03-1.01.09a3.77 3.77 0 0 0-1.72-2.57l-.34-.2-.23.33a4.6 4.6 0 0 0-.6 1.43c-.24.97-.1 1.88.4 2.66a4.7 4.7 0 0 1-1.75.42H.76a.75.75 0 0 0-.76.75 11.38 11.38 0 0 0 .7 4.06 6.03 6.03 0 0 0 2.4 3.12c1.18.73 3.1 1.14 5.28 1.14.98 0 1.96-.08 2.93-.26a12.25 12.25 0 0 0 3.82-1.4 10.5 10.5 0 0 0 2.61-2.13c1.25-1.42 2-3 2.55-4.4h.23c1.37 0 2.21-.55 2.68-1 .3-.3.55-.66.7-1.06l.1-.28Z" />
  </svg>
)

const AmazonWebServicesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlSpace="preserve" viewBox="0 0 304 182">
    <path
      fill="#ffffff"
      d="m86 66 2 9c0 3 1 5 3 8v2l-1 3-7 4-2 1-3-1-4-5-3-6c-8 9-18 14-29 14-9 0-16-3-20-8-5-4-8-11-8-19s3-15 9-20c6-6 14-8 25-8a79 79 0 0 1 22 3v-7c0-8-2-13-5-16-3-4-8-5-16-5l-11 1a80 80 0 0 0-14 5h-2c-1 0-2-1-2-3v-5l1-3c0-1 1-2 3-2l12-5 16-2c12 0 20 3 26 8 5 6 8 14 8 25v32zM46 82l10-2c4-1 7-4 10-7l3-6 1-9v-4a84 84 0 0 0-19-2c-6 0-11 1-15 4-3 2-4 6-4 11s1 8 3 11c3 2 6 4 11 4zm80 10-4-1-2-3-23-78-1-4 2-2h10l4 1 2 4 17 66 15-66 2-4 4-1h8l4 1 2 4 16 67 17-67 2-4 4-1h9c2 0 3 1 3 2v2l-1 2-24 78-2 4-4 1h-9l-4-1-1-4-16-65-15 64-2 4-4 1h-9zm129 3a66 66 0 0 1-27-6l-3-3-1-2v-5c0-2 1-3 2-3h2l3 1a54 54 0 0 0 23 5c6 0 11-2 14-4 4-2 5-5 5-9l-2-7-10-5-15-5c-7-2-13-6-16-10a24 24 0 0 1 5-34l10-5a44 44 0 0 1 20-2 110 110 0 0 1 12 3l4 2 3 2 1 4v4c0 3-1 4-2 4l-4-2c-6-2-12-3-19-3-6 0-11 0-14 2s-4 5-4 9c0 3 1 5 3 7s5 4 11 6l14 4c7 3 12 6 15 10s5 9 5 14l-3 12-7 8c-3 3-7 5-11 6l-14 2z"
    />
    <path
      d="M274 144A220 220 0 0 1 4 124c-4-3-1-6 2-4a300 300 0 0 0 263 16c5-2 10 4 5 8z"
      fill="#f90"
    />
    <path
      d="M287 128c-4-5-28-3-38-1-4 0-4-3-1-5 19-13 50-9 53-5 4 5-1 36-18 51-3 2-6 1-5-2 5-10 13-33 9-38z"
      fill="#f90"
    />
  </svg>
)

// Tech icons for carousel - matching TechStack
const techIcons = [
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', component: null },
  { name: 'Go', src: null, component: GoIcon },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', component: null },
  { name: 'Java', src: null, component: JavaIcon },
  { name: 'FastAPI', src: null, component: FastAPIIcon },
  { name: 'LangChain', src: null, component: LangChainIcon },
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', component: null },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', component: null },
  { name: 'AWS', src: null, component: AmazonWebServicesIcon },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', component: null },
  { name: 'GCP', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', component: null },
  { name: 'PgVector', src: null, component: Database },
  { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', component: null },
  { name: 'Docker', src: null, component: DockerIcon },
  { name: 'Git & GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', component: null },
  { name: 'Redis', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', component: null },
];

// Boston coordinates: [longitude, latitude]
const BOSTON_COORDINATES: [number, number] = [-71.0589, 42.3601];

// Interests to cycle through
const interests = [
  { text: 'Working out', icon: Dumbbell },
  { text: 'Reading research', icon: BookOpen },
  { text: 'Graphic design', icon: Palette },
  { text: 'Ping-pong', icon: CircleDotDashed },
  { text: 'Eating pho', icon: Utensils },
  { text: 'Rewatching movies', icon: Film },
  { text: 'Listening to music', icon: Music },
];

const experiences = [
  { role: 'Software Engineer Intern', company: 'Ripple', date: 'Incoming May 2026', logo: null, isCurrent: true },
  { role: 'AI Engineer Co-op', company: 'PwC', date: 'Sept 2025 – Jan 2026', logo: '/pwc_logo.png', isCurrent: false },
  { role: 'Software Engineer Intern', company: 'PlateMate', date: 'Apr 2025 – Sept 2025', logo: '/platemate_logo.png', isCurrent: false },
  { role: 'Software Lead', company: 'Disrupt Consulting', date: 'Dec 2024 – Present', logo: '/disrupt_logo.png', isCurrent: false },
];

export default function BentoGrid() {
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInterestIndex((prev) => (prev + 1) % interests.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-150px' }}
      transition={{ ...springConfig, delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-10 gap-3 md:gap-4 max-w-6xl mx-auto auto-rows-auto md:auto-rows-[260px]"
      style={{ gridTemplateRows: undefined }}
    >
      {/* Box A: Experience Timeline */}
      <SpotlightCard className="custom-spotlight-card col-span-1 md:col-span-5 md:row-span-2 min-h-[320px] md:min-h-0" spotlightColor="rgba(255, 255, 255, 0.08)">
        <div className="h-full flex flex-col px-4 md:px-5 py-4">
          <h3 className="text-sm uppercase tracking-widest text-[#8B949E] mb-4">My Experience</h3>
          <div className="relative flex-1">
            {/* Vertical timeline line - starts and ends at circle centers */}
            <div className="absolute left-[7px] top-[24px] bottom-[24px] w-[2px] bg-[#30363D]" />
            
            {/* Timeline items */}
            <div className="flex flex-col justify-between h-full gap-4 md:gap-0">
              {experiences.map((exp, index) => (
                <div key={index} className="flex items-center gap-4 md:gap-8 relative">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0">
                    {exp.isCurrent ? (
                      <div className="relative flex items-center justify-center">
                        <style>{rippleStyles}</style>
                        {/* Solid background to hide the line */}
                        <div className="absolute w-4 h-4 rounded-full bg-[#161B22]" />
                        {/* First ripple - slower */}
                        <div 
                          className="absolute w-4 h-4 rounded-full bg-[#22C55E]"
                          style={{ animation: 'ripple 3s ease-out infinite' }}
                        />
                        {/* Second ripple - delayed */}
                        <div 
                          className="absolute w-4 h-4 rounded-full bg-[#22C55E]"
                          style={{ animation: 'ripple 3s ease-out infinite 1.5s' }}
                        />
                        {/* Core dot - solid */}
                        <div className="relative w-4 h-4 rounded-full bg-[#22C55E]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-[#30363D]" />
                    )}
                  </div>
                  
                  {/* Experience text */}
                  <div className="flex flex-col justify-center">
                    <span className="text-sm md:text-base font-light text-[#F0F6FC]">{exp.role}</span>
                    <span className="text-xs md:text-sm text-[#8B949E]">{exp.company}</span>
                    <span className="text-[10px] md:text-[11px] text-[#6E7681] mt-0.5">{exp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Location Card */}
      <SpotlightCard className="custom-spotlight-card col-span-1 md:col-span-5 !overflow-hidden relative min-h-[140px] md:min-h-0" spotlightColor="rgba(255, 255, 255, 0.08)">
        {/* Text content */}
        <div className="h-full flex flex-col px-4 md:px-5 py-4 relative z-10">
          {/* Top left: "Based In" label */}
          <div className="text-sm uppercase tracking-widest text-[#8B949E]">
            Based In
          </div>
          
          {/* Main text: "Boston, MA" - positioned below label */}
          <div className="text-xl md:text-2xl font-light text-[#F0F6FC] mt-2">
            Boston, MA
          </div>
        </div>
        
        {/* Top right: Map with Boston marker - positioned relative to card, clipped by card */}
        <div 
          className="absolute -top-12 -right-12 md:-top-16 md:-right-16 w-[200px] h-[200px] md:w-[300px] md:h-[300px] pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <div 
            className="w-full h-full rounded-full overflow-hidden pointer-events-none"
            style={{
              clipPath: 'circle(50% at center)',
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 70%)',
            }}
          >
            <Map 
              center={BOSTON_COORDINATES}
              zoom={12}
              marker={BOSTON_COORDINATES}
              markerColor="#1E6EF4"
            />
          </div>
        </div>
      </SpotlightCard>

      {/* Passion Card */}
      <SpotlightCard className="custom-spotlight-card col-span-1 md:col-span-5 min-h-[180px] md:min-h-0" spotlightColor="rgba(255, 255, 255, 0.08)">
        <div className="h-full flex flex-col px-4 md:px-5 py-4 justify-center">
          <h3 className="text-sm uppercase tracking-widest text-[#8B949E] mb-3 md:mb-4">My passion</h3>
          <p className="text-2xl md:text-3xl font-light text-[#F0F6FC] leading-tight">
            I like building cool stuff to help people do less boring stuff.
          </p>
        </div>
      </SpotlightCard>

      {/* Interests Card */}
      <SpotlightCard className="custom-spotlight-card col-span-1 md:col-span-6 min-h-[180px] md:min-h-0" spotlightColor="rgba(255, 255, 255, 0.08)">
        <div className="h-full flex flex-col px-4 md:px-5 py-4 justify-end md:justify-start">
          <div className="hidden md:block md:flex-1" />
          <h3 className="text-sm uppercase tracking-widest text-[#8B949E] mb-3 md:mb-4 flex-shrink-0">I also like...</h3>
          <div className="relative h-16 md:h-20 overflow-hidden mb-2 md:mb-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentInterestIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-4xl font-light text-[#F0F6FC] flex items-center gap-2 md:gap-3 flex-wrap"
              >
                {(() => {
                  const Icon = interests[currentInterestIndex].icon;
                  return <Icon className="w-7 h-7 md:w-10 md:h-10 flex-shrink-0" />;
                })()}
                <span className="leading-tight">{interests[currentInterestIndex].text}</span>
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </SpotlightCard>

      {/* Tech Card */}
      <SpotlightCard className="custom-spotlight-card col-span-1 md:col-span-4 min-h-[200px] md:min-h-0" spotlightColor="rgba(255, 255, 255, 0.08)">
        <div className="h-full flex flex-col px-4 md:px-5 py-4">
          <style>{rippleStyles}</style>
          {/* Tech Icons Carousel */}
          <div 
            className="overflow-hidden relative -mx-4 md:-mx-5"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 32px, black calc(100% - 32px), transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 32px, black calc(100% - 32px), transparent 100%)',
            }}
          >
            <div 
              className="flex gap-2"
              style={{
                animation: 'scroll 10s linear infinite',
                width: 'fit-content',
              }}
            >
              {/* Duplicate icons for seamless loop */}
              {[...techIcons, ...techIcons].map((icon, index) => {
                const IconComponent = icon.component;
                return (
                  <div 
                    key={index}
                    className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-[#161B22] flex items-center justify-center border border-[#30363D] flex-shrink-0"
                  >
                    {IconComponent ? (
                      <IconComponent 
                        className="w-5 h-5 md:w-7 md:h-7" 
                        style={icon.name === 'PgVector' ? { color: '#249cee' } : undefined}
                      />
                    ) : icon.src ? (
                      <Image
                        src={icon.src}
                        alt={icon.name}
                        width={28}
                        height={28}
                        className={`w-5 h-5 md:w-7 md:h-7 object-contain ${icon.name === 'Git & GitHub' ? 'brightness-0 invert' : ''}`}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-1 min-h-[24px] md:min-h-0" />
          {/* Text */}
          <p className="text-xl md:text-2xl font-light text-[#F0F6FC] text-left mt-4 md:mt-0">
            Focused on making fast, reliable software
          </p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
