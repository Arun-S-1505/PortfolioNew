"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import StatsSection from "@/components/stats-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-16" style={{ width: '100vw', overflowX: 'hidden', position: 'relative' }}>
        <main>
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <StatsSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  )
}
