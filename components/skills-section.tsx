"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

const skills = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "📘" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Node.js", icon: "🟢" },
  //{ name: "Python", icon: "🐍" },
  { name: "SQL", icon: "🗄️" },
  { name: "UI/UX Design", icon: "🎯" },
]

const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind", icon: "🌊" },
  { name: "Node.js", icon: "🟢" },
  //{ name: "Python", icon: "🐍" },
  { name: "SQL", icon: "🗄️" },
  { name: "MongoDB", icon: "🍃" },
  //{ name: "PostgreSQL", icon: "🐘" },
]


function SkillItem({ skill, index, isInView }: { skill: any; index: number; isInView: boolean }) {
  return (
    <div
      className={`p-3 sm:p-4 rounded-xl glass text-center cursor-pointer group border border-primary/10 hover:border-primary/30 transition-all duration-250 ${
        isInView
          ? "animate-fade-in-scale"
          : "opacity-0"
      } hover:scale-105 hover:-translate-y-1`}
      style={{ animationDelay: isInView ? `${index * 0.1}s` : "0s" }}
    >
      <div className="text-xl sm:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">{skill.icon}</div>
      <div className="font-semibold text-xs sm:text-sm">{skill.name}</div>
    </div>
  )
}

export default function SkillsSection() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "-50px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section id="skills" className="py-8 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent leading-relaxed pb-2">
            Skills & Technologies
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0 pb-1">
            The tools and technologies I use to bring ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Skills Progress Bars */}
          <div
            className={`${
              isVisible
                ? "animate-fade-in-left opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
            style={{ animationDelay: isVisible ? "0.2s" : "0s" }}
          >
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6">Core Skills</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {skills.map((skill, index) => (
                    <SkillItem key={skill.name} skill={skill} index={index} isInView={isVisible} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technology Icons */}
          <div
            className={`${
              isVisible
                ? "animate-fade-in-right"
                : "opacity-0"
            }`}
            style={{ animationDelay: isVisible ? "0.4s" : "0s" }}
          >
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6">Technologies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {technologies.map((tech, index) => (
                    <div
                      key={tech.name}
                      className={`p-3 sm:p-4 rounded-xl glass text-center cursor-pointer group border border-primary/10 hover:border-primary/30 transition-all duration-250 ${
                        isVisible
                          ? "animate-fade-in-scale"
                          : "opacity-0"
                      } hover:scale-105 hover:-translate-y-1`}
                      style={{ animationDelay: isVisible ? `${0.6 + index * 0.1}s` : "0s" }}
                    >
                      <div className="text-xl sm:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">{tech.icon}</div>
                      <div className="font-semibold text-xs sm:text-sm">{tech.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
