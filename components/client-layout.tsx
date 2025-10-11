"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/loading-screen";
import Navbar from "@/components/navbar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
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

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
}