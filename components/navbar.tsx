"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Download } from "lucide-react"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "GitHub", href: "#stats" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const navbarHeight = 64 // h-16 = 64px
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      setIsOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto pl-4 sm:pl-6 lg:pl-8 pr-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("#hero")}
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              {"Arun Saravanan S"
                .split(" ")
                .filter((_, index, arr) => index === 0 || index === arr.length - 1)
                .map((name: string) => name[0])
                .join("")}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-base font-medium transition-colors"
              >
                {item.name}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium w-full text-left transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="mt-4 ml-3"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
