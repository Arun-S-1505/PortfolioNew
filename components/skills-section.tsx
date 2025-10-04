"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
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
  { name: "React", icon: "⚛️", color: "from-blue-400 to-blue-600" },
  { name: "Next.js", icon: "▲", color: "from-gray-700 to-gray-900" },
  { name: "TypeScript", icon: "TS", color: "from-blue-500 to-blue-700" },
  { name: "Tailwind", icon: "🌊", color: "from-teal-400 to-teal-600" },
  { name: "Node.js", icon: "🟢", color: "from-green-400 to-green-600" },
  //{ name: "Python", icon: "🐍", color: "from-yellow-400 to-yellow-600" },
  { name: "SQL", icon: "🗄️", color: "from-orange-400 to-orange-600" },
  { name: "MongoDB", icon: "🍃", color: "from-green-500 to-green-700" },
  //{ name: "PostgreSQL", icon: "🐘", color: "from-blue-600 to-blue-800" },
]

function SkillItem({ skill, index, isInView }: { skill: any; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`p-3 sm:p-4 rounded-xl bg-gradient-to-r from-primary/10 to-blue-600/10 text-center cursor-pointer group border border-primary/20`}
    >
      <div className="text-xl sm:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">{skill.icon}</div>
      <div className="font-semibold text-xs sm:text-sm">{skill.name}</div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-16 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent leading-relaxed pb-2">
            Skills & Technologies
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0 pb-1">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Skills Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6">Core Skills</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {skills.map((skill, index) => (
                    <SkillItem key={skill.name} skill={skill} index={index} isInView={isInView} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Technology Icons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass border-0 shadow-xl">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6">Technologies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`p-3 sm:p-4 rounded-xl bg-gradient-to-r ${tech.color} text-white text-center cursor-pointer group`}
                    >
                      <div className="text-xl sm:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform">{tech.icon}</div>
                      <div className="font-semibold text-xs sm:text-sm">{tech.name}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
