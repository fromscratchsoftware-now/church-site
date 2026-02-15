import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SITE } from "../config/site";

function ChurchLogo({ className = "", light = false }: { className?: string; light?: boolean }) {
  const primaryColor = light ? "#ffffff" : "#5c1229";
  const secondaryColor = light ? "#fef9e7" : "#f0b429";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="absolute w-10 h-10 animate-spin-slow"
          style={{ animationDuration: "20s" }}
          aria-hidden
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke={secondaryColor} strokeWidth="2" opacity="0.6" />
          <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />
          <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />
          <ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />
          <ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />
          <line x1="50" y1="5" x2="50" y2="95" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />
          <line x1="5" y1="50" x2="95" y2="50" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />
        </svg>

        <svg viewBox="0 0 100 100" className="absolute w-14 h-14 z-10" aria-hidden>
          <g transform="translate(8, 25) scale(0.4)">
            <path
              d="M45 50 C35 45, 25 35, 15 40 C5 45, 0 55, 5 60 C10 65, 20 62, 30 58 L25 75 C30 70, 40 68, 45 70 C50 68, 60 70, 65 75 L60 58 C70 62, 80 65, 85 60 C90 55, 85 45, 75 40 C65 35, 55 45, 45 50Z"
              fill={primaryColor}
            />
            <path d="M30 50 C20 35, 5 25, 0 30 C5 35, 15 45, 30 50Z" fill={primaryColor} opacity="0.8" />
            <path d="M60 50 C70 35, 85 25, 90 30 C85 35, 75 45, 60 50Z" fill={primaryColor} opacity="0.8" />
            <circle cx="45" cy="42" r="8" fill={primaryColor} />
            <path d="M45 40 L55 42 L45 44 Z" fill={secondaryColor} />
            <circle cx="42" cy="41" r="1.5" fill={light ? "#1a1a1a" : "#ffffff"} />
          </g>

          <g transform="translate(92, 45) scale(-0.4, 0.4)">
            <path
              d="M45 50 C35 45, 25 35, 15 40 C5 45, 0 55, 5 60 C10 65, 20 62, 30 58 L25 75 C30 70, 40 68, 45 70 C50 68, 60 70, 65 75 L60 58 C70 62, 80 65, 85 60 C90 55, 85 45, 75 40 C65 35, 55 45, 45 50Z"
              fill={primaryColor}
            />
            <path d="M30 50 C20 35, 5 25, 0 30 C5 35, 15 45, 30 50Z" fill={primaryColor} opacity="0.8" />
            <path d="M60 50 C70 35, 85 25, 90 30 C85 35, 75 45, 60 50Z" fill={primaryColor} opacity="0.8" />
            <circle cx="45" cy="42" r="8" fill={primaryColor} />
            <path d="M45 40 L55 42 L45 44 Z" fill={secondaryColor} />
            <circle cx="42" cy="41" r="1.5" fill={light ? "#1a1a1a" : "#ffffff"} />
          </g>
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-display text-xl font-bold leading-tight ${light ? "text-white" : "text-burgundy-900"}`}>
          {SITE.name}
        </span>
        <span className={`text-xs tracking-widest uppercase ${light ? "text-gold-400" : "text-gold-600"}`}>{SITE.brandSuffix}</span>
      </div>
    </div>
  );
}

function ThemeToggle({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <button onClick={toggleTheme} className={`theme-toggle ${isDark ? "active" : ""}`} aria-label="Toggle theme">
      <div className="theme-toggle-slider">
        {isDark ? (
          <svg className="w-4 h-4 text-burgundy-950" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-gold-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </button>
  );
}

export function SiteNav({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass =
    variant === "solid"
      ? "glass-dark shadow-2xl"
      : scrolled
        ? "bg-burgundy-950/90 backdrop-blur-md shadow-2xl"
        : "bg-transparent";

  const baseLinkClass = `text-sm font-medium transition-all duration-300 hover:opacity-70 ${"text-white"}`;
  const activeClass = "text-gold-400";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="transition-transform hover:scale-105 duration-300">
            <ChurchLogo light={!scrolled && variant === "overlay"} />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {SITE.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `${baseLinkClass} ${isActive ? activeClass : ""}`}
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            ))}

            <a
              href={SITE.links.youtubeLive}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover-lift"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Live Stream
            </a>

            <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${"text-white"}`}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-screen glass-dark" : "max-h-0"}`}
      >
        <div className="px-4 py-6 space-y-4">
          {SITE.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block font-medium py-2 transition-colors ${isActive ? "text-gold-400" : "text-white hover:text-gold-400"}`
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}

          <a
            href={SITE.links.youtubeLive}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover-lift"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            Live Stream
          </a>

          <div className="flex items-center justify-center py-2">
            <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </nav>
  );
}
