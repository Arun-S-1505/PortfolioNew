"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Twitter, Sparkles, Code2, Rocket } from "lucide-react";
import TypingEffect from "@/components/typing-effect";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'hero') {
            setIsHeroVisible(entry.isIntersecting);
          } else if (entry.target.id === 'about') {
            setIsAboutVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.01, rootMargin: "-150px" }
    );

    const heroElement = document.getElementById('hero');
    const aboutElement = document.getElementById('about');
    
    if (heroElement) {
      observer.observe(heroElement);
    }
    if (aboutElement) {
      observer.observe(aboutElement);
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
      if (aboutElement) {
        observer.unobserve(aboutElement);
      }
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      const navbarHeight = 64; // h-16 = 64px
      const elementPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
  };

  return (
    <section id="hero" className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16 sm:pt-3 sm:pb-20 lg:pt-4 lg:pb-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${mounted ? "animate-fade-in-up" : "opacity-0"}`}>
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 ${mounted ? "animate-fade-in-scale" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Available for opportunities</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-primary font-mono text-lg tracking-wider uppercase flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Hello, I am
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Arun Saravanan S
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground flex items-center gap-2">
                <Rocket className="w-6 h-6 text-primary" />
                <TypingEffect
                  texts={["Web Developer","Tech Enthusiast","Problem Solver"]}
                  speed={120}
                  deleteSpeed={80}
                  pauseDuration={3000}
                />
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                <span className="text-primary font-semibold">I create stunning, interactive</span>{" "}
                web experiences that blend beautiful design with cutting-edge technology.
                Let's build something amazing together.
                <span className="text-primary font-semibold"> Specializing in</span>{" "}
                scalable applications and innovative solutions.
              </p>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="text-base px-8 py-3 font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-purple-600 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="text-base px-8 py-3 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                <span>Get In Touch</span>
                <Mail className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              {[
                { platform: "github", url: "https://github.com/Arun-S-1505", label: "GitHub" },
                { platform: "linkedin", url: "https://www.linkedin.com/in/arun-saravanan-s/", label: "LinkedIn" },
                { platform: "twitter", url: "https://x.com/arunsarava68426", label: "Twitter" }
              ].map(({ platform, url, label }) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                const socialColors = {
                  github: "hover:bg-[#333] hover:text-white hover:border-[#333]",
                  linkedin: "hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]",
                  twitter: "hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]",
                  email: "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                };
                return (
                  <a
                    key={platform}
                    href={typeof url === "string" ? url : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 rounded-xl bg-muted/50 border-2 border-border text-muted-foreground transition-all duration-300 ${socialColors[platform as keyof typeof socialColors]} hover:shadow-lg hover:scale-110 hover:-translate-y-1`}
                  >
                    <Icon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    <span className="sr-only">{label}</span>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {label}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          <div className={`flex justify-center lg:justify-end order-first lg:order-last mt-4 lg:-mt-6 ${mounted ? "animate-fade-in" : "opacity-0"}`}>
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative group">
                {/* Animated rings */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500"></div>
                <div className="relative w-full h-full bg-muted rounded-2xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300 shadow-2xl">
                  <Image
                    src="/Photo.jpg"
                    alt="Arun Saravanan S"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className={`fixed bottom-4 sm:absolute sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-opacity duration-300 ${isHeroVisible && !isAboutVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={scrollToAbout}
          className="text-muted-foreground hover:text-primary transition-colors animate-bounce p-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border hover:border-primary"
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
    </section>
  );
}
