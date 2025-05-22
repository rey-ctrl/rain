import React, { useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom";
import TiltCard from "./tiltcard";
import { FiTarget, FiSmile, FiLock, FiLink } from "react-icons/fi";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion"

import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle
} from "flowbite-react";


const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0])

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    })
  }, [])

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`
  const border = useMotionTemplate`1px solid ${color}`
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl md:text-7xl">
          SENTINOVA
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg">
          Meringkas ulasan dan menganalisis sentimen dengan hasil yang akurat. Platform AI untuk memahami review pelanggan Anda dengan mudah dan cepat.
        </p>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  )
}

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-black border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <a href="/src/index.html" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/image/Sentinova.png" className="h-9" alt="Sentinova Logo" />
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:mt-0">
              <li>
                <Link
                  to="/login"
                  className="text-white font-poppins text-sm px-5 py-2.5 me-2 mb-2 transition inline-block text-center"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/Register" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-poppins rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition inline-block text-center"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Aurora Hero Section */}
      <AuroraHero />

      {/* Accordion FAQ Section */}
        <div className="bg-black mt-12 py-12 px-4">
          <div className="max-w-screen-xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-left mb-6">Pertanyaan Umum</h2>
            <Accordion collapseAll>
              <AccordionPanel>
                <AccordionTitle>Apa itu sentinova?</AccordionTitle>
                <AccordionContent>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Flowbite is an open-source library of interactive components built on top of Tailwind CSS...
                  </p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle>Seberapa akurat Sentinova?</AccordionTitle>
                <AccordionContent>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Flowbite is first conceptualized and designed using the Figma software...
                  </p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel>
                <AccordionTitle>Apa Fungsi Sentinova?</AccordionTitle>
                <AccordionContent>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    The main difference is that the core components from Flowbite are open source...
                  </p>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </div>
        </div>

      {/* Card Grid Section */}
        <div className="bg-black py-16">
            <div className="max-w-screen-xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-white text-center mb-10">
                Fitur Utama
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
                <TiltCard
                    icon={<FiTarget />}
                    title="Akurasi Tinggi"
                    description="Didukung AI mutakhir untuk analisis sentimen dan ringkasan ulasan yang presisi."
                />
                <TiltCard
                    icon={<FiSmile />}
                    title="Mudah Digunakan"
                    description="Antarmuka sederhana, hasil instan tanpa perlu keahlian teknis."
                />
                <TiltCard
                    icon={<FiLock />}
                    title="Privasi Terjamin"
                    description="Data Anda aman dan tidak dibagikan ke pihak ketiga."
                />
                <TiltCard
                    icon={<FiLink />}
                    title="Integrasi Mudah"
                    description="Anda dapat terhubung dengan sistem hanya dalam beberapa langkah."
                />
                </div>
            </div>
        </div>

        {/* Footer */}
        <footer className="bg-black text-white text-center py-6 mt-12">
            <p className="text-sm">&copy; 2025 Sentinova. All rights reserved.</p>
        </footer>
    </>
  )
}
