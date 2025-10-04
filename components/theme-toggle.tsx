"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (theme === "dark" || (!theme && systemPrefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: isScrolled ? 0.85 : 1,
        y: isScrolled ? 0 : 0,
        x: isScrolled ? 0 : 0
      }}
      transition={{ 
        duration: 0.4, 
        delay: isScrolled ? 0 : 1,
        type: "spring",
        stiffness: 120,
        damping: 20
      }}
      className={`fixed z-50 transition-all duration-400 ${
        isScrolled 
          ? 'top-[1.25rem] right-16 md:top-[1.25rem] md:right-12' 
          : 'top-8 right-20 md:top-8 md:right-8'
      }`}
    >
      <Button
        onClick={toggleTheme}
        size="icon"
        variant="outline"
        className={`${
          isScrolled ? 'w-9 h-9 md:w-9 md:h-9' : 'w-12 h-12'
        } rounded-full border-primary/20 hover:border-primary transition-all duration-400 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-md border-border/40' 
            : 'glass bg-transparent'
        }`}
      >
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Moon size={isScrolled ? 14 : 20} className={isScrolled ? "md:w-4 md:h-4" : ""} />
          ) : (
            <Sun size={isScrolled ? 14 : 20} className={isScrolled ? "md:w-4 md:h-4" : ""} />
          )}
        </motion.div>
      </Button>
    </motion.div>
  )
}
