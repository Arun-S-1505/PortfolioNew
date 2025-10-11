"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import TypingEffect from "@/components/typing-effect";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    <section id="hero" className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4 sm:pt-3 sm:pb-6 lg:pt-4 lg:pb-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${mounted ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="space-y-2">
              <p className="text-primary font-mono text-lg tracking-wider uppercase">Hello, I am</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">Arun Saravanan S</h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground">
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
                className="text-base px-8 py-3 font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-purple-600 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="text-base px-8 py-3 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get In Touch
              </Button>
            </div>
            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              {[
                { platform: "github", url: "https://github.com/Arun-S-1505" },
                { platform: "linkedin", url: "https://www.linkedin.com/in/arun-saravanan-s/" },
                { platform: "twitter", url: "https://x.com/arunsarava68426" }
              ].map(({ platform, url }) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                const socialColors = {
                  github: "hover:bg-[#333] hover:text-white",
                  linkedin: "hover:bg-[#0077b5] hover:text-white",
                  twitter: "hover:bg-[#1DA1F2] hover:text-white",
                  email: "hover:bg-primary hover:text-primary-foreground",
                };
                return (
                  <a
                    key={platform}
                    href={typeof url === "string" ? url : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 rounded-xl bg-muted/50 border border-border text-muted-foreground transition-all duration-300 ${socialColors[platform as keyof typeof socialColors]} hover:shadow-lg hover:scale-110`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="sr-only">{platform}</span>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          <div className={`flex justify-center lg:justify-end order-first lg:order-last -mt-6 ${mounted ? "animate-fade-in" : "opacity-0"}`}>
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl transform rotate-6"></div>
                <div className="relative w-full h-full bg-muted rounded-2xl overflow-hidden border border-border">
                  <Image
                    src="/Photo.jpg"
                    alt="Arun Saravanan S"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToAbout}
          className="text-muted-foreground hover:text-foreground transition-colors animate-bounce p-2"
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
