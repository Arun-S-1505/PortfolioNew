"use client"

import { useRef, useState, useEffect } from "react"
import { Heart } from "lucide-react"

export default function Footer() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer className="py-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center transition-all duration-600 ${
            isVisible ? "animate-fade-in-up opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-muted-foreground flex items-center justify-center">
            Made with{" "}
            <span className="mx-2 text-red-500">
              <Heart size={16} fill="currentColor" />
            </span>
            by Arun Saravanan S
          </p>
          <p className="text-sm text-muted-foreground mt-2">© 2025 All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
