"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import GitHubCalendar from "react-github-calendar"
import { motion } from "framer-motion"
import {
  Github,
  GitFork,
  Star,
  GitPullRequest,
  Users,
  GitCommit,
  BookOpen,
  Code2,
  TrendingUp,
  Calendar,
  Loader2
} from "lucide-react"

interface GitHubStats {
  username: string
  primaryStats: {
    repositories: number
    stars: number
    commits: number
    followers: number
  }
  additionalStats: {
    pullRequests: number
    forks: number
    codeReviews: number
    contributions: number
  }
  contributionData: {
    totalContributions: number
    currentStreak: number
    longestStreak: number
    weeklyActivity: Array<{ day: string; commits: number }>
  }
}

// Fallback data in case API fails
const fallbackStats: GitHubStats = {
  username: "Arun-S-1505",
  primaryStats: {
    repositories: 25,
    stars: 50,
    commits: 500,
    followers: 20
  },
  additionalStats: {
    pullRequests: 120,
    forks: 15,
    codeReviews: 80,
    contributions: 450
  },
  contributionData: {
    totalContributions: 450,
    currentStreak: 12,
    longestStreak: 45,
    weeklyActivity: [
      { day: "Mon", commits: 8 },
      { day: "Tue", commits: 12 },
      { day: "Wed", commits: 15 },
      { day: "Thu", commits: 10 },
      { day: "Fri", commits: 18 },
      { day: "Sat", commits: 5 },
      { day: "Sun", commits: 7 }
    ]
  }
}

const primaryStatsConfig = [
  { label: "Repositories", key: "repositories" as keyof GitHubStats["primaryStats"], icon: BookOpen, description: "Public repos" },
  { label: "Stars", key: "stars" as keyof GitHubStats["primaryStats"], icon: Star, description: "Total stars earned" },
  { label: "Commits", key: "commits" as keyof GitHubStats["primaryStats"], icon: GitCommit, description: "This year" },
  { label: "Followers", key: "followers" as keyof GitHubStats["primaryStats"], icon: Users, description: "Developers" },
]

const additionalStatsConfig = [
  { label: "Pull Requests", key: "pullRequests" as keyof GitHubStats["additionalStats"], icon: GitPullRequest },
  { label: "Forks", key: "forks" as keyof GitHubStats["additionalStats"], icon: GitFork },
  { label: "Code Reviews", key: "codeReviews" as keyof GitHubStats["additionalStats"], icon: Code2 },
  { label: "Contributions", key: "contributions" as keyof GitHubStats["additionalStats"], icon: TrendingUp },
]

export default function StatsSection() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  // Fetch GitHub stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/github-stats')
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats')
        }

        const data = await response.json()
        setStats(data)
      } catch (err) {
        console.error('Error fetching GitHub stats:', err)
        setError('Failed to load GitHub stats')
        setStats(fallbackStats) // Use fallback data
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Intersection observer for animations
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

  const processContributions = useCallback((contributions: any[]) => {
    setTimeout(() => {
      const total = contributions
        .map((el) => el.count)
        .reduce((acc, curr) => acc + curr, 0)
      setTotalCount(total)
    }, 0)

    return contributions.slice(91, 365)
  }, [])

  const theme = {
    light: [
      "#ebedf0",  // Level 0 - light gray (no contributions)
      "#d6f4d6",  // Level 1 - very dim green
      "#9fdf9f",  // Level 2 - dim green
      "#6bb96b",  // Level 3 - medium green
      "#2d8b2d"   // Level 4 - bright green (most contributions)
    ],
    dark: [
      "#161b22",  // Level 0 - dark background (no contributions)
      "#1a4d3a",  // Level 1 - very dim green
      "#2d6b4f",  // Level 2 - dim green
      "#4a9c6e",  // Level 3 - medium green
      "#6fbf73"   // Level 4 - bright green (most contributions)
    ]
  }

  if (loading) {
    return (
      <section id="stats" className="py-8 bg-background" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              GitHub Stats
            </h2>
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p className="text-base sm:text-lg text-muted-foreground">Loading GitHub stats...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!stats) return null

  return (
    <section id="stats" className="py-8 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            GitHub Stats
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-balance px-4 sm:px-0">
            My open source contributions and development activity
            {error && <span className="block text-sm text-orange-500 mt-2">(Using cached data)</span>}
          </p>
        </div>

        {/* Main Stats Card */}
        <div
          className={`max-w-6xl mx-auto mb-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: isVisible ? "0.2s" : "0s" }}
        >
          <Card className="glass border-primary/20 overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              {/* Header with GitHub Icon */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-14 h-14 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
                  <Github className="w-7 h-7 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold">@{stats.username}</h3>
                  <p className="text-sm text-muted-foreground">Active Open Source Contributor</p>
                </div>
              </div>

              {/* Primary Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {primaryStatsConfig.map((config, index) => (
                  <div
                    key={index}
                    className={`text-center p-3 sm:p-4 rounded-xl glass border border-primary/10 group hover:border-primary/30 transition-all duration-300 ${
                      isVisible ? "animate-fade-in-scale" : "opacity-0"
                    }`}
                    style={{ animationDelay: isVisible ? `${0.3 + index * 0.1}s` : "0s" }}
                  >
                    <div className="mb-2 sm:mb-3 flex justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <config.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent leading-tight">
                      {stats.primaryStats[config.key]}
                    </div>
                    <div className="text-xs sm:text-sm font-medium mb-1 px-1">{config.label}</div>
                    <div className="text-xs text-muted-foreground px-1 leading-tight">{config.description}</div>
                  </div>
                ))}
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-6 border-b border-border">
                {additionalStatsConfig.map((config, index) => (
                  <div
                    key={index}
                    className={`text-center sm:flex sm:items-center sm:gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-250 ${
                      isVisible ? "animate-fade-in-scale" : "opacity-0"
                    }`}
                    style={{ animationDelay: isVisible ? `${0.6 + index * 0.05}s` : "0s" }}
                  >
                    <div className="flex justify-center sm:flex-shrink-0 mb-2 sm:mb-0">
                      <config.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="sm:min-w-0 sm:flex-1">
                      <div className="text-lg font-bold">{stats.additionalStats[config.key]}</div>
                      <div className="text-xs text-muted-foreground sm:truncate">{config.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contribution Streak */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mt-6">
                <div className="text-center p-2 sm:p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-700/10 border border-green-500/20">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-green-500 mb-1 leading-tight">
                    {stats.contributionData.totalContributions}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">Total Contributions</div>
                </div>
                <div className="text-center p-2 sm:p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-700/10 border border-blue-500/20">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-blue-500 mb-1 leading-tight">
                    {stats.contributionData.currentStreak}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">Day Streak</div>
                </div>
                <div className="text-center p-2 sm:p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-700/10 border border-purple-500/20">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-purple-500 mb-1 leading-tight">
                    {stats.contributionData.longestStreak}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">Longest Streak</div>
                </div>
              </div>

              {/* GitHub Link */}
              <div className="mt-8 pt-6 border-t border-border text-center">
                <a
                  href={`https://github.com/${stats.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
                >
                  <span className="text-sm sm:text-base font-medium">View Full Profile on GitHub</span>
                  <GitFork className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GitHub Contribution Calendar */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
            ease: "easeInOut",
          }}
          className="w-full lg:max-w-[60%] md:max-w-[60%] sm:max-w-[80%] px-4 sm:px-6 py-8 mx-auto"
        >
          <motion.h4
            className="text-2xl sm:text-3xl font-bold mb-2 pb-4"
          >
            GitHub Contributions
          </motion.h4>

          <motion.div
            className="bg-card p-6 flex flex-col justify-self-center rounded-xl shadow-md border overflow-x-auto"
          >
            <div className="min-w-max">
              <GitHubCalendar
                username={stats?.username || "Arun-S-1505"}
                transformData={processContributions}
                totalCount={totalCount}
                theme={theme}
                blockSize={14}
                blockMargin={4}
                fontSize={12}
                blockRadius={3}
              />
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center mt-5"
          >
            <a
              href={`https://github.com/${stats?.username || "Arun-S-1505"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
            >
              <span className="font-medium">GitHub</span>
              <Github className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}