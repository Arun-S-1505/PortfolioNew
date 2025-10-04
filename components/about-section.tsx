"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Award } from "lucide-react"

const timelineData = [
  {
    year: "2025",
    title: "Full stack Developer Intern - Current",
    company: "Zeex AI",
    description: "Contributing to the development of AI-driven web platforms using React, Next.js, and TypeScript to deliver high-performance user experiences.",
    icon: Award,
  },
  {
    year: "2025",
    title: "Club Member - Current",
    company: "Codezilla",
    description: "Collaborating with peers in Mozilla’s Codezilla tech community to build innovative web projects and enhance open-source development skills.",
    icon: Calendar,
  },
  {
    year: "2025",
    title: "Full stack Developer Intern",
    company: "Innomatics Research Labs",
    description:
      "Kickstarted my web development career by designing responsive interfaces and learning the fundamentals of full-stack development.",
    icon: MapPin,
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-16 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-balance px-4 sm:px-0">
            Passionate about creating digital experiences that make a difference
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
                  I’m a passionate web developer and a pre-final year Computer Science engineering student who loves crafting modern,
                   responsive, and user-friendly websites. I enjoy transforming creative ideas into interactive digital experiences and constantly
                    explore new technologies to enhance my skills and bring ideas to life.
                </p>
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"].map((tech) => (
                    <span key={tech} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">My Journey</h3>
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                className="flex items-start space-x-4 group"
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={18} className="text-primary-foreground sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-1 sm:mb-2">
                    <span className="text-xs sm:text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 sm:py-1 rounded">
                      {item.year}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold mb-0.5 sm:mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">{item.company}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
