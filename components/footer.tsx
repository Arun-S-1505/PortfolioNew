"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-muted-foreground flex items-center justify-center">
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="mx-2 text-red-500"
            >
              <Heart size={16} fill="currentColor" />
            </motion.span>
            by Arun Saravanan S
          </p>
          <p className="text-sm text-muted-foreground mt-2">© 2025 All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
