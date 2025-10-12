"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Briefcase, Zap } from "lucide-react"

const timelineData = [
  {
    year: "2025",
    title: "Full stack Developer Intern - Current",
    company: "Zeex AI",
    description: "Contributing to the development of AI-driven web platforms using React, Next.js, and TypeScript to deliver high-performance user experiences.",
    icon: Award,
    color: "from-green-500 to-emerald-600"
  },
  {
    year: "2025",
    title: "Club Member - Current",
    company: "Codezilla",
    description: "Collaborating with peers in Mozilla's Codezilla tech community to build innovative web projects and enhance open-source development skills.",
    icon: Zap,
    color: "from-blue-500 to-cyan-600"
  },
  {
    year: "2025",
    title: "Full stack Developer Intern",
    company: "Innomatics Research Labs",
    description:
      "Kickstarted my web development career by designing responsive interfaces and learning the fundamentals of full-stack development.",
    icon: Briefcase,
    color: "from-purple-500 to-pink-600"
  },
]

export default function AboutSection() {
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
      { threshold: 0.01, rootMargin: "-150px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section id="about" className="py-8 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-balance px-4 sm:px-0">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Profile Card */}
          <div
            className={`${
              isVisible
                ? "animate-fade-in-left"
                : "opacity-0"
            }`}
            style={{ animationDelay: isVisible ? "0.2s" : "0s" }}
          >
            <Card className="glass border-0 shadow-2xl">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold text-primary-foreground mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                    AS
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold">Arun Saravanan S</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">Web Developer & Tech Enthusiast</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  I&apos;m a passionate web developer and a pre-final year Computer Science engineering student who loves crafting modern,
                   responsive, and user-friendly websites. I enjoy transforming creative ideas into interactive digital experiences and constantly
                    explore new technologies to enhance my skills and bring ideas to life.
                </p>
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"].map((tech, idx) => (
                    <span 
                      key={tech} 
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium hover:scale-110 hover:border-primary/40 transition-all duration-200 cursor-default"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div
            className={`space-y-4 sm:space-y-6 ${
              isVisible
                ? "animate-fade-in-right"
                : "opacity-0"
            }`}
            style={{ animationDelay: isVisible ? "0.4s" : "0s" }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">My Journey</span>
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-blue-600 to-purple-600"></div>
              
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start space-x-4 mb-8 sm:mb-10 group ${
                    isVisible
                      ? "animate-fade-in-up opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ animationDelay: isVisible ? `${0.6 + index * 0.2}s` : "0s" }}
                >
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative z-10 ring-4 ring-background`}>
                    <item.icon size={18} className="text-white sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0 glass p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center mb-1 sm:mb-2">
                      <span className="text-xs sm:text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 sm:py-1 rounded border border-primary/20">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2 font-medium">{item.company}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
