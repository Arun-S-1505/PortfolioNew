"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Eye } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform built with React.js, featuring API fetched items from Fake Store API, user authentication, and a seamless shopping experience.",
    image: "/modern-ecommerce-interface.png",
    technologies: ["React.js", "TypeScript", "Node.js", "MongoDB"],
    liveUrl: "https://ecommerce-frontend-ps6h8rbd2-arun-saravanans-projects.vercel.app/",
    githubUrl: "https://github.com/Arun-S-1505/Ecommerce.git",
    featured: true,
  },
  {
    id: 2,
    title: "Healthcare Booking System",
    description:
      "A comprehensive healthcare booking system with user authentication with JWT, appointment scheduling, and real-time notifications.",
    image: "/Healthcare-Bookings.png",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://innomaticsproject4.netlify.app/",
    githubUrl: "https://github.com/Arun-S-1505/InnomaticsProject4.git",
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio Page",
    description:
      "Showcase of my work, skills, and projects with a clean and modern design, highlighting my journey as a developer through interactive layouts.",
    image: "/Portfolio.png",
    technologies: ["React.js", "Tailwind CSS", "EmailJS"],
    liveUrl: "https://arunportfoliopage.netlify.app/",
    githubUrl: "https://github.com/Arun-S-1505/Portfolio.git",
    featured: false,
  },
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-4" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 ${
            isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent leading-relaxed pb-2">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0 pb-1">
            A showcase of my recent work and creative solutions
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${project.featured ? "md:col-span-2 lg:col-span-1" : ""} ${
                isVisible
                  ? "animate-fade-in-up opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ animationDelay: isVisible ? `${index * 0.1}s` : "0s" }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-250 glass">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-250 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                      hoveredProject === project.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="secondary" className="glass">
                        <Eye size={16} className="mr-2" />
                        Preview
                      </Button>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="secondary" className="glass">
                        <Github size={16} className="mr-2" />
                        Code
                      </Button>
                    </a>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 sm:mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 sm:py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2 sm:space-x-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button size="sm" variant="outline" className="w-full bg-transparent text-xs sm:text-sm px-2 sm:px-3">
                        <ExternalLink size={12} className="mr-1 sm:mr-2 sm:w-3.5 sm:h-3.5" />
                        <span className="hidden xs:inline">Live Demo</span>
                        <span className="xs:hidden">Demo</span>
                      </Button>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button size="sm" variant="outline" className="w-full bg-transparent text-xs sm:text-sm px-2 sm:px-3">
                        <Github size={12} className="mr-1 sm:mr-2 sm:w-3.5 sm:h-3.5" />
                        <span className="hidden xs:inline">Source</span>
                        <span className="xs:hidden">Code</span>
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
