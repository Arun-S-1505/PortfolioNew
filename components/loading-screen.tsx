"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    // Start progress animation
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) { // Don't reach 100 until page actually loads
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    // Function to hide loading screen
    const hideLoadingScreen = () => {
      clearInterval(progressInterval);
      setProgress(100);
      hideTimer = setTimeout(() => {
        setIsLoading(false);
      }, 500); // Small delay after reaching 100%
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      hideLoadingScreen();
    } else {
      // Wait for page to fully load
      const handleLoad = () => {
        hideLoadingScreen();
      };

      window.addEventListener('load', handleLoad);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearInterval(progressInterval);
        if (hideTimer) clearTimeout(hideTimer);
      };
    }

    return () => {
      clearInterval(progressInterval);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm">
      <div className="text-center space-y-8 max-w-sm mx-auto px-6">
        {/* Next.js Logo Animation */}
        <div className="relative mx-auto">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-4 border-muted/30 rounded-full animate-spin border-t-primary border-r-primary/50"></div>

            {/* Next.js Logo */}
            <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center animate-pulse">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="animate-pulse"
              >
                <path
                  d="M17.5 22V14.5H22.5V16H19V17.5H22V19H19V22H17.5Z"
                  fill="white"
                />
                <path
                  d="M9.5 22V10H15C16.3807 10 17.5 11.1193 17.5 12.5V14.5C17.5 15.8807 16.3807 17 15 17H11V22H9.5ZM11 11.5V15.5H15C15.5523 15.5 16 15.0523 16 14.5V12.5C16 11.9477 15.5523 11.5 15 11.5H11Z"
                  fill="white"
                />
                <circle
                  cx="26"
                  cy="6"
                  r="3"
                  fill="#0070f3"
                  className="animate-ping"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-pulse">
              Loading Portfolio
            </h2>
            <p className="text-muted-foreground text-sm animate-pulse delay-300">
              Powered by Next.js • Crafting digital experiences...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {/* Progress Percentage */}
          <div className="text-xs text-muted-foreground font-mono">
            {Math.min(Math.round(progress), 100)}% loaded
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary/40 rounded-full animate-bounce delay-1500"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce delay-2000"></div>
        </div>
      </div>
    </div>
  );
}