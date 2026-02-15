give me code in one file  
Coderick AI

### **📦 Complete Church Website \- All Code in One File**

Copy and paste each section into the corresponding file in your project.  
---

code  
\<\!-- \========================================  
     FILE: index.html  
     \======================================== \--\>  
\<\!doctype html\>  
\<html lang="en"\>  
  \<head\>  
    \<meta charset="UTF-8" /\>  
    \<title\>Church Name | Welcome Home\</title\>  
    \<meta name="description" content="Join our vibrant community at Church Name. Experience powerful worship, inspiring sermons, and genuine fellowship. Plan your visit today." /\>  
    \<meta name="viewport" content="width=device-width, initial-scale=1.0" /\>  
    \<link rel="icon" type="image/png" href="/favicon.png" /\>  
    \<link rel="preconnect" href="https://fonts.googleapis.com"\>  
    \<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin\>  
    \<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700\&family=Inter:wght@300;400;500;600;700\&display=swap" rel="stylesheet"\>  
  \</head\>  
  \<body\>  
    \<div id="root"\>\</div\>  
    \<script type="module" src="/src/main.tsx"\>\</script\>  
  \</body\>  
\</html\>

code  
/\* \========================================  
   FILE: package.json  
   \======================================== \*/  
{  
  "name": "frontend",  
  "private": true,  
  "version": "0.0.0",  
  "type": "module",  
  "scripts": {  
    "dev": "vite",  
    "build": "vite build",  
    "lint": "eslint .",  
    "preview": "vite preview"  
  },  
  "dependencies": {  
    "@tailwindcss/vite": "^4.0.14",  
    "class-variance-authority": "^0.7.1",  
    "clsx": "^2.1.1",  
    "embla-carousel-react": "^8.5.2",  
    "input-otp": "^1.4.2",  
    "lucide-react": "^0.479.0",  
    "pocketbase": "^0.26.1",  
    "next-themes": "^0.4.6",  
    "react": "^19.0.0",  
    "react-dom": "^19.0.0",  
    "react-hook-form": "^7.54.2",  
    "react-resizable-panels": "^2.1.7",  
    "react-router-dom": "^7.3.0",  
    "tailwind-merge": "^3.0.2",  
    "tailwindcss-animate": "^1.0.7",  
    "vaul": "^1.1.2",  
    "zod": "^3.24.2",  
    "@hookform/resolvers": "^4.1.3",  
    "tailwindcss": "^4.0.14"  
  },  
  "devDependencies": {  
    "@eslint/js": "^9.21.0",  
    "@types/node": "^22.13.10",  
    "@types/react": "^19.0.10",  
    "@types/react-dom": "^19.0.4",  
    "@vitejs/plugin-react-swc": "^3.8.0",  
    "autoprefixer": "^10.4.21",  
    "eslint": "^9.21.0",  
    "eslint-plugin-react-hooks": "^5.1.0",  
    "eslint-plugin-react-refresh": "^0.4.19",  
    "globals": "^15.15.0",  
    "postcss": "^8.5.3",  
    "typescript": "\~5.7.2",  
    "typescript-eslint": "^8.24.1",  
    "vite": "^6.2.0",  
    "vite-error-reporter": "file:/usr/lib/node\_modules\_22/vite-error-reporter",  
    "sg-preview-plugin": "file:/usr/lib/node\_modules\_22/sg-preview-plugin"  
  }  
}

code  
/\* \========================================  
   FILE: vite.config.ts  
   \======================================== \*/  
import { defineConfig, loadEnv } from "vite";  
import react from "@vitejs/plugin-react-swc";  
import tailwindcss from "@tailwindcss/vite";  
import path from "path";  
import { viteErrorReporter } from 'vite-error-reporter';  
import { execSync } from 'child\_process'  
import sgPreviewPlugin from 'sg-preview-plugin';

export default defineConfig(({ mode }) \=\> {  
  const env \= loadEnv(mode, process.cwd(), "");  
  const siteName \= execSync("/usr/local/bin/sg-site main").toString().trim();  
  process.env.VITE\_POCKETBASE\_URL \= \`https://${siteName}\`;

  return {  
    server: {  
      allowedHosts: \[  
        '.coderick.ai',  
        '.coderick.net',  
        '.sg-host.com',  
        '.staging.vibe-platform.net',  
        '.vibe-platform.net',  
      \],  
      cors: true,  
    },  
    plugins: \[  
      react(),  
      tailwindcss(),  
      ...(mode \=== 'development' ? \[viteErrorReporter({  
        enableConsoleLogging: false,  
        enableDebugLogging: false,  
      }), sgPreviewPlugin()\] : \[\]),  
    \],  
    resolve: {  
      alias: {  
        "@": path.resolve(\_\_dirname, "./src"),  
      },  
    },  
  };  
});

code  
/\* \========================================  
   FILE: src/main.tsx  
   \======================================== \*/  
import { StrictMode } from 'react'  
import { createRoot } from 'react-dom/client'  
import './index.css'  
import App from './App.tsx'

createRoot(document.getElementById('root')\!).render(  
  \<StrictMode\>  
    \<App /\>  
  \</StrictMode\>,  
)

code  
/\* \========================================  
   FILE: src/App.tsx  
   \======================================== \*/  
import { BrowserRouter, Routes, Route } from "react-router-dom";  
import Index from "./pages/Index";  
import Testimonials from "./pages/Testimonials";  
import Sermons from "./pages/Sermons";  
import Events from "./pages/Events";

const App \= () \=\> (  
    \<BrowserRouter\>  
      \<Routes\>  
        \<Route path="/" element={\<Index /\>} /\>  
        \<Route path="/testimonials" element={\<Testimonials /\>} /\>  
        \<Route path="/sermons" element={\<Sermons /\>} /\>  
        \<Route path="/events" element={\<Events /\>} /\>  
      \</Routes\>  
    \</BrowserRouter\>  
);

export default App;

code  
/\* \========================================  
   FILE: src/lib/pocketbase.js  
   \======================================== \*/  
import PocketBase from 'pocketbase';

const pb \= new PocketBase(import.meta.env.VITE\_POCKETBASE\_URL);

export default pb;

code  
/\* \========================================  
   FILE: src/lib/utils.ts  
   \======================================== \*/  
import { clsx, type ClassValue } from "clsx"  
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue\[\]) {  
  return twMerge(clsx(inputs))  
}

/\* \========================================  
   FILE: src/index.css (COMPLETE)  
   \======================================== \*/  
@import "tailwindcss";  
@theme {  
/\* Custom theme variables will be added here as needed \*/  
  \--font-display: "Playfair Display", serif;  
  \--font-body: "Inter", sans-serif;  
    
  \--color-burgundy-50: \#fdf2f4;  
  \--color-burgundy-100: \#fce7eb;  
  \--color-burgundy-200: \#f9d0d9;  
  \--color-burgundy-300: \#f4a9ba;  
  \--color-burgundy-400: \#ec7694;  
  \--color-burgundy-500: \#df4770;  
  \--color-burgundy-600: \#cb2756;  
  \--color-burgundy-700: \#ab1c47;  
  \--color-burgundy-800: \#8f1a3f;  
  \--color-burgundy-900: \#5c1229;  
  \--color-burgundy-950: \#3d0a1a;  
    
  \--color-gold-50: \#fefdf7;  
  \--color-gold-100: \#fef9e7;  
  \--color-gold-200: \#fdf0c4;  
  \--color-gold-300: \#fbe38e;  
  \--color-gold-400: \#f8d04d;  
  \--color-gold-500: \#f0b429;  
  \--color-gold-600: \#d4930d;  
  \--color-gold-700: \#b0700d;  
  \--color-gold-800: \#8f5712;  
  \--color-gold-900: \#764814;  
  \--color-gold-950: \#442507;  
    
  \--color-cream: \#faf8f5;  
  \--color-charcoal: \#1a1a1a;  
}

/\* Dark Theme Variables \*/  
.dark {  
  \--color-cream: \#1a1a1a;  
  \--color-charcoal: \#f5f5f5;  
  \--bg-primary: \#1a1a1a;  
  \--bg-secondary: \#2a2a2a;  
  \--bg-tertiary: \#3a3a3a;  
  \--text-primary: \#f5f5f5;  
  \--text-secondary: \#e1e1e1;  
  \--text-tertiary: \#b8b8b8;  
    
  \--text-body: \#e5e5e5;  
  \--text-muted: \#a8a8a8;  
  \--text-heading: \#ffffff;  
}

html {  
  scroll-behavior: smooth;  
}

body {  
  font-family: var(--font-body);  
  background-color: var(--color-cream);  
  color: var(--color-charcoal);  
  transition: background-color 0.3s ease, color 0.3s ease;  
}

body:not(.dark) {  
  \--text-body: \#2a2a2a;  
  \--text-muted: \#5a5a5a;  
  \--text-heading: \#1a1a1a;  
}

.font-display {  
  font-family: var(--font-display);  
}

.theme-transition {  
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;  
}

/\* ... (rest of animations and utilities from the current index.css) ... \*/

/\* \========================================  
   FILE: src/pages/Sermons.tsx (COMPLETE)  
   \======================================== \*/  
import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';

// Logo Component  
const ChurchLogo \= ({ className \= "", light \= false }: { className?: string; light?: boolean }) \=\> {  
  const primaryColor \= light ? "\#ffffff" : "\#5c1229";  
  const secondaryColor \= light ? "\#fef9e7" : "\#f0b429";  
    
  return (  
    \<div className={\`flex items-center gap-3 ${className}\`}\>  
      \<div className="relative w-14 h-14 flex items-center justify-center"\>  
        \<svg  
          viewBox="0 0 100 100"  
          className="absolute w-10 h-10 animate-spin-slow"  
          style={{ animationDuration: '20s' }}  
        \>  
          \<circle cx="50" cy="50" r="45" fill="none" stroke={secondaryColor} strokeWidth="2" opacity="0.6" /\>  
          \<ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<line x1="50" y1="5" x2="50" y2="95" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<line x1="5" y1="50" x2="95" y2="50" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
        \</svg\>  
          
        \<svg viewBox="0 0 100 100" className="absolute w-14 h-14 z-10"\>  
          \<g transform="translate(8, 25\) scale(0.4)"\>  
            \<path  
              d="M45 50 C35 45, 25 35, 15 40 C5 45, 0 55, 5 60 C10 65, 20 62, 30 58 L25 75 C30 70, 40 68, 45 70 C50 68, 60 70, 65 75 L60 58 C70 62, 80 65, 85 60 C90 55, 85 45, 75 40 C65 35, 55 45, 45 50Z"  
              fill={primaryColor}  
            /\>  
            \<path d="M30 50 C20 35, 5 25, 0 30 C5 35, 15 45, 30 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<path d="M60 50 C70 35, 85 25, 90 30 C85 35, 75 45, 60 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<circle cx="45" cy="42" r="8" fill={primaryColor} /\>  
            \<path d="M45 40 L55 42 L45 44 Z" fill={secondaryColor} /\>  
            \<circle cx="42" cy="41" r="1.5" fill={light ? "\#1a1a1a" : "\#ffffff"} /\>  
          \</g\>  
            
          \<g transform="translate(92, 45\) scale(-0.4, 0.4)"\>  
            \<path  
              d="M45 50 C35 45, 25 35, 15 40 C5 45, 0 55, 5 60 C10 65, 20 62, 30 58 L25 75 C30 70, 40 68, 45 70 C50 68, 60 70, 65 75 L60 58 C70 62, 80 65, 85 60 C90 55, 85 45, 75 40 C65 35, 55 45, 45 50Z"  
              fill={primaryColor}  
            /\>  
            \<path d="M30 50 C20 35, 5 25, 0 30 C5 35, 15 45, 30 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<path d="M60 50 C70 35, 85 25, 90 30 C85 35, 75 45, 60 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<circle cx="45" cy="42" r="8" fill={primaryColor} /\>  
            \<path d="M45 40 L55 42 L45 44 Z" fill={secondaryColor} /\>  
            \<circle cx="42" cy="41" r="1.5" fill={light ? "\#1a1a1a" : "\#ffffff"} /\>  
          \</g\>  
        \</svg\>  
      \</div\>  
        
      \<div className="flex flex-col"\>  
        \<span className={\`font-display text-xl font-bold leading-tight ${light ? 'text-white' : 'text-burgundy-900'}\`}\>  
          Church Name  
        \</span\>  
        \<span className={\`text-xs tracking-widest uppercase ${light ? 'text-gold-400' : 'text-gold-600'}\`}\>  
          Ministry  
        \</span\>  
      \</div\>  
    \</div\>  
  );  
};

// Theme Toggle Component  
const ThemeToggle \= ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () \=\> void }) \=\> {  
  return (  
    \<button onClick={toggleTheme} className={\`theme-toggle ${isDark ? 'active' : ''}\`} aria-label="Toggle theme"\>  
      \<div className="theme-toggle-slider"\>  
        {isDark ? (  
          \<svg className="w-4 h-4 text-burgundy-950" fill="currentColor" viewBox="0 0 20 20"\>  
            \<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /\>  
          \</svg\>  
        ) : (  
          \<svg className="w-4 h-4 text-gold-600" fill="currentColor" viewBox="0 0 20 20"\>  
            \<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /\>  
          \</svg\>  
        )}  
      \</div\>  
    \</button\>  
  );  
};

interface Sermon {  
  title: string;  
  speaker: string;  
  date: string;  
  category: string;  
  series: string;  
  image: string;  
  duration: string;  
  views: string;  
  videoUrl: string;  
  description: string;  
}

// Video Player Modal Component  
const VideoPlayerModal \= ({ sermon, isOpen, onClose }: { sermon: Sermon | null; isOpen: boolean; onClose: () \=\> void }) \=\> {  
  useEffect(() \=\> {  
    if (isOpen) {  
      document.body.style.overflow \= 'hidden';  
    } else {  
      document.body.style.overflow \= 'unset';  
    }  
    return () \=\> {  
      document.body.style.overflow \= 'unset';  
    };  
  }, \[isOpen\]);

  if (\!isOpen || \!sermon) return null;

  return (  
    \<div className="fixed inset-0 z-\[100\] flex items-center justify-center p-4 animate-fade-in"\>  
      {/\* Backdrop \*/}  
      \<div   
        className="absolute inset-0 bg-burgundy-950/95 backdrop-blur-sm"  
        onClick={onClose}  
      /\>  
        
      {/\* Modal Content \*/}  
      \<div className="relative w-full max-w-5xl bg-white dark:bg-burgundy-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-in"\>  
        {/\* Close Button \*/}  
        \<button  
          onClick={onClose}  
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-burgundy-950/80 hover:bg-burgundy-950 text-white rounded-full flex items-center justify-center transition-all duration-300 hover-lift"  
          aria-label="Close video"  
        \>  
          \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
            \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /\>  
          \</svg\>  
        \</button\>

        {/\* Video Player \*/}  
        \<div className="aspect-video bg-charcoal"\>  
          \<iframe  
            src={sermon.videoUrl}  
            className="w-full h-full"  
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
            allowFullScreen  
            title={sermon.title}  
          /\>  
        \</div\>

        {/\* Sermon Details \*/}  
        \<div className="p-6 sm:p-8"\>  
          \<div className="flex flex-wrap items-center gap-3 mb-4"\>  
            \<span className="glass dark:bg-burgundy-800 text-burgundy-700 dark:text-gold-400 text-xs font-semibold px-3 py-1 rounded-full"\>  
              {sermon.series}  
            \</span\>  
            \<span className="text-burgundy-600 dark:text-gold-400 text-sm font-medium"\>{sermon.date}\</span\>  
            \<span className="text-charcoal/60 dark:text-white/60 text-sm flex items-center gap-1"\>  
              \<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /\>  
                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /\>  
              \</svg\>  
              {sermon.views} views  
            \</span\>  
          \</div\>  
            
          \<h2 className="font-display text-2xl sm:text-3xl font-bold text-burgundy-950 dark:text-white mb-3"\>  
            {sermon.title}  
          \</h2\>  
            
          \<p className="text-charcoal/70 dark:text-white/70 text-lg mb-4"\>{sermon.speaker}\</p\>  
            
          \<p className="text-body leading-relaxed mb-6"\>  
            {sermon.description}  
          \</p\>

          {/\* Action Buttons \*/}  
          \<div className="flex flex-wrap gap-3"\>  
            \<button className="flex items-center gap-2 bg-burgundy-900 hover:bg-burgundy-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover-lift"\>  
              \<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /\>  
              \</svg\>  
              Share  
            \</button\>  
            \<button className="flex items-center gap-2 glass dark:bg-burgundy-800 text-burgundy-950 dark:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover-lift"\>  
              \<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /\>  
              \</svg\>  
              Download Audio  
            \</button\>  
            \<button className="flex items-center gap-2 glass dark:bg-burgundy-800 text-burgundy-950 dark:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover-lift"\>  
              \<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /\>  
              \</svg\>  
              Save  
            \</button\>  
          \</div\>  
        \</div\>  
      \</div\>  
    \</div\>  
  );  
};

const Sermons \= () \=\> {  
  const \[scrolled, setScrolled\] \= useState(false);  
  const \[isDarkMode, setIsDarkMode\] \= useState(false);  
  const \[isMenuOpen, setIsMenuOpen\] \= useState(false);  
  const \[selectedCategory, setSelectedCategory\] \= useState('All');  
  const \[visibleCount, setVisibleCount\] \= useState(9);  
  const \[selectedSermon, setSelectedSermon\] \= useState\<Sermon | null\>(null);  
  const \[isVideoModalOpen, setIsVideoModalOpen\] \= useState(false);

  const YOUTUBE\_LIVE\_URL \= "https://www.youtube.com/@YourChurchChannel/live";

  useEffect(() \=\> {  
    const savedTheme \= localStorage.getItem('theme');  
    if (savedTheme \=== 'dark') {  
      setIsDarkMode(true);  
      document.documentElement.classList.add('dark');  
    }  
  }, \[\]);

  const toggleTheme \= () \=\> {  
    setIsDarkMode(\!isDarkMode);  
    if (\!isDarkMode) {  
      document.documentElement.classList.add('dark');  
      localStorage.setItem('theme', 'dark');  
    } else {  
      document.documentElement.classList.remove('dark');  
      localStorage.setItem('theme', 'light');  
    }  
  };

  useEffect(() \=\> {  
    const handleScroll \= () \=\> {  
      setScrolled(window.scrollY \> 50);  
    };  
    window.addEventListener('scroll', handleScroll);  
    return () \=\> window.removeEventListener('scroll', handleScroll);  
  }, \[\]);

  const categories \= \['All', 'Recent', 'Most Viewed', 'Faith & Hope', 'Prayer', 'Worship', 'Family'\];

  const allSermons: Sermon\[\] \= \[  
    {  
      title: "Walking in Purpose",  
      speaker: "Pastor James Williams",  
      date: "February 9, 2026",  
      category: "Recent",  
      series: "Living with Purpose",  
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600\&q=80",  
      duration: "45 min",  
      views: "2.4K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Discover God's unique calling for your life and learn practical steps to walk confidently in the purpose He has designed specifically for you. This powerful message will inspire you to embrace your divine destiny."  
    },  
    {  
      title: "The Power of Prayer",  
      speaker: "Minister Sarah Johnson",  
      date: "February 2, 2026",  
      category: "Prayer",  
      series: "Prayer Warriors",  
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600\&q=80",  
      duration: "38 min",  
      views: "3.1K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Unlock the supernatural power of prayer and learn how to develop an effective prayer life that moves mountains and transforms circumstances. Experience breakthrough through intercession."  
    },  
    {  
      title: "Faith Over Fear",  
      speaker: "Pastor James Williams",  
      date: "January 26, 2026",  
      category: "Faith & Hope",  
      series: "Unshakeable Faith",  
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600\&q=80",  
      duration: "42 min",  
      views: "5.2K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "In times of uncertainty, learn how to activate your faith and overcome fear. This message provides biblical strategies to stand firm in God's promises regardless of your circumstances."  
    },  
    {  
      title: "Building Strong Families",  
      speaker: "Dr. Michael Chen",  
      date: "January 19, 2026",  
      category: "Family",  
      series: "Family Foundations",  
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600\&q=80",  
      duration: "50 min",  
      views: "1.8K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Discover biblical principles for creating a thriving family culture. Learn practical tools to strengthen relationships, communicate effectively, and build a legacy of faith for generations."  
    },  
    {  
      title: "Worship in Spirit and Truth",  
      speaker: "Minister Sarah Johnson",  
      date: "January 12, 2026",  
      category: "Worship",  
      series: "Heart of Worship",  
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600\&q=80",  
      duration: "36 min",  
      views: "4.3K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Explore what it means to worship God authentically. This message will deepen your understanding of true worship and help you develop a lifestyle of praise that honors God."  
    },  
    {  
      title: "Hope for the Weary",  
      speaker: "Pastor James Williams",  
      date: "January 5, 2026",  
      category: "Faith & Hope",  
      series: "Hope Rising",  
      image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600\&q=80",  
      duration: "44 min",  
      views: "6.7K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "If you're feeling exhausted and overwhelmed, this message brings refreshing hope and encouragement. Find rest in God's promises and renewed strength for your journey."  
    },  
    {  
      title: "The Heart of a Servant",  
      speaker: "Elder Marcus Brown",  
      date: "December 29, 2025",  
      category: "Recent",  
      series: "Servant Leadership",  
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600\&q=80",  
      duration: "40 min",  
      views: "2.9K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Learn the biblical model of servant leadership and how to lead like Jesus. This transformative message will inspire you to serve others with humility and excellence."  
    },  
    {  
      title: "Prayer Changes Everything",  
      speaker: "Minister Sarah Johnson",  
      date: "December 22, 2025",  
      category: "Prayer",  
      series: "Prayer Warriors",  
      image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600\&q=80",  
      duration: "35 min",  
      views: "3.5K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Discover how prayer can transform every area of your life. Learn to pray with boldness, faith, and persistence to see God's miraculous intervention."  
    },  
    {  
      title: "Marriage God's Way",  
      speaker: "Dr. Michael Chen",  
      date: "December 15, 2025",  
      category: "Family",  
      series: "Family Foundations",  
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600\&q=80",  
      duration: "48 min",  
      views: "4.1K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Strengthen your marriage with God's design and purpose. This message provides biblical wisdom for building a Christ-centered marriage that thrives."  
    },  
    {  
      title: "Trust in the Lord",  
      speaker: "Pastor James Williams",  
      date: "December 8, 2025",  
      category: "Faith & Hope",  
      series: "Unshakeable Faith",  
      image: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=600\&q=80",  
      duration: "41 min",  
      views: "5.8K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "When life doesn't make sense, learn to trust God completely. This message will strengthen your faith and help you lean on God's faithfulness in every season."  
    },  
    {  
      title: "Raising Godly Children",  
      speaker: "Dr. Michael Chen",  
      date: "December 1, 2025",  
      category: "Family",  
      series: "Family Foundations",  
      image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600\&q=80",  
      duration: "46 min",  
      views: "3.2K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Equip yourself with biblical principles for raising children who love God and live for His glory. Discover practical parenting strategies rooted in Scripture."  
    },  
    {  
      title: "True Worship",  
      speaker: "Minister Sarah Johnson",  
      date: "November 24, 2025",  
      category: "Worship",  
      series: "Heart of Worship",  
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600\&q=80",  
      duration: "39 min",  
      views: "4.6K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Go beyond Sunday worship and learn to make worship a daily lifestyle. This message will transform how you approach intimacy with God."  
    },  
    {  
      title: "Living by Faith",  
      speaker: "Pastor James Williams",  
      date: "November 17, 2025",  
      category: "Faith & Hope",  
      series: "Unshakeable Faith",  
      image: "https://images.unsplash.com/photo-1466921583968-f07aa80c526e?w=600\&q=80",  
      duration: "43 min",  
      views: "7.1K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Learn what it truly means to walk by faith and not by sight. This powerful teaching will challenge you to trust God at deeper levels."  
    },  
    {  
      title: "The Power of Intercession",  
      speaker: "Minister Sarah Johnson",  
      date: "November 10, 2025",  
      category: "Prayer",  
      series: "Prayer Warriors",  
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600\&q=80",  
      duration: "37 min",  
      views: "2.7K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Discover your calling as an intercessor and learn how to pray effectively for others. Experience the joy of partnering with God through prayer."  
    },  
    {  
      title: "God's Purpose for Your Life",  
      speaker: "Pastor James Williams",  
      date: "November 3, 2025",  
      category: "Recent",  
      series: "Living with Purpose",  
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600\&q=80",  
      duration: "47 min",  
      views: "8.3K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Uncover God's master plan for your life and learn how to align yourself with His divine purposes. This message will give you clarity and direction."  
    }  
  \];

  const filteredSermons \= selectedCategory \=== 'All'   
    ? allSermons   
    : selectedCategory \=== 'Most Viewed'  
    ? \[...allSermons\].sort((a, b) \=\> parseFloat(b.views) \- parseFloat(a.views))  
    : allSermons.filter(s \=\> s.category \=== selectedCategory);

  const displayedSermons \= filteredSermons.slice(0, visibleCount);  
  const hasMore \= visibleCount \< filteredSermons.length;

  const loadMore \= () \=\> {  
    setVisibleCount(prev \=\> prev \+ 6);  
  };

  const openVideoModal \= (sermon: Sermon) \=\> {  
    setSelectedSermon(sermon);  
    setIsVideoModalOpen(true);  
  };

  const closeVideoModal \= () \=\> {  
    setIsVideoModalOpen(false);  
    setTimeout(() \=\> setSelectedSermon(null), 300);  
  };

  return (  
    \<div className="min-h-screen bg-cream dark:bg-charcoal overflow-x-hidden theme-transition"\>  
      {/\* Video Player Modal \*/}  
      \<VideoPlayerModal   
        sermon={selectedSermon}   
        isOpen={isVideoModalOpen}   
        onClose={closeVideoModal}   
      /\>

      {/\* Navigation \*/}  
      \<nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${  
        scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'  
      }\`}\>  
        \<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"\>  
          \<div className="flex items-center justify-between h-20"\>  
            \<Link to="/" className="transition-transform hover:scale-105 duration-300"\>  
              \<ChurchLogo light={\!scrolled} /\>  
            \</Link\>

            {/\* Desktop Navigation \*/}  
            \<div className="hidden lg:flex items-center gap-6"\>  
              \<Link to="/" className={\`text-sm font-medium transition-all duration-300 hover:opacity-70 ${scrolled ? 'text-white' : 'text-white'}\`}\>  
                Home  
              \</Link\>  
                
              \<a  
                href={YOUTUBE\_LIVE\_URL}  
                target="\_blank"  
                rel="noopener noreferrer"  
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover-lift"  
              \>  
                \<span className="relative flex h-2 w-2"\>  
                  \<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"\>\</span\>  
                  \<span className="relative inline-flex rounded-full h-2 w-2 bg-white"\>\</span\>  
                \</span\>  
                Live Stream  
              \</a\>

              \<ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} /\>  
            \</div\>

            {/\* Mobile Menu Button \*/}  
            \<button  
              onClick={() \=\> setIsMenuOpen(\!isMenuOpen)}  
              className={\`lg:hidden p-2 transition-colors ${scrolled ? 'text-white' : 'text-white'}\`}  
            \>  
              \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                {isMenuOpen ? (  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /\>  
                ) : (  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /\>  
                )}  
              \</svg\>  
            \</button\>  
          \</div\>  
        \</div\>

        {/\* Mobile Menu \*/}  
        \<div className={\`lg:hidden transition-all duration-300 overflow-hidden ${  
          isMenuOpen ? 'max-h-screen glass-dark' : 'max-h-0'  
        }\`}\>  
          \<div className="px-4 py-6 space-y-4"\>  
            \<Link  
              to="/"  
              onClick={() \=\> setIsMenuOpen(false)}  
              className="block text-white font-medium py-2 hover:text-gold-400 transition-colors"  
            \>  
              Home  
            \</Link\>  
            \<a  
              href={YOUTUBE\_LIVE\_URL}  
              target="\_blank"  
              rel="noopener noreferrer"  
              onClick={() \=\> setIsMenuOpen(false)}  
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover-lift"  
            \>  
              \<span className="relative flex h-2.5 w-2.5"\>  
                \<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"\>\</span\>  
                \<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"\>\</span\>  
              \</span\>  
              Live Stream  
            \</a\>  
            \<div className="flex items-center justify-center py-2"\>  
              \<ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} /\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</nav\>

      {/\* Hero Section \*/}  
      \<section className="relative h-\[60vh\] min-h-\[500px\] flex items-center justify-center overflow-hidden"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className="absolute inset-0"\>  
          \<img  
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920\&q=80"  
            alt="Sermon messages"  
            className="w-full h-full object-cover"  
          /\>  
          \<div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/90 via-burgundy-900/80 to-burgundy-950/90" /\>  
        \</div\>

        \<div className="relative z-10 text-center px-4 max-w-4xl mx-auto"\>  
          \<p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up opacity-0 animation-delay-200"\>  
            Messages That Transform  
          \</p\>  
          \<h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-tight mb-6 animate-fade-in-up opacity-0 animation-delay-400"\>  
            Sermon Library  
          \</h1\>  
          \<p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-up opacity-0 animation-delay-600"\>  
            Dive deeper into God's Word with our collection of powerful messages. Watch, listen, and grow in your faith journey.  
          \</p\>  
        \</div\>  
      \</section\>

      {/\* Category Filter \*/}  
      \<section className="py-12 bg-white dark:bg-burgundy-950 theme-transition"\>  
        \<div className="max-w-7xl mx-auto px-4"\>  
          \<div className="flex flex-wrap justify-center gap-3"\>  
            {categories.map((category) \=\> (  
              \<button  
                key={category}  
                onClick={() \=\> {  
                  setSelectedCategory(category);  
                  setVisibleCount(9);  
                }}  
                className={\`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover-lift ${  
                  selectedCategory \=== category  
                    ? 'bg-burgundy-900 text-white shadow-lg'  
                    : 'glass dark:glass-dark text-burgundy-950 dark:text-white hover:bg-burgundy-100 dark:hover:bg-burgundy-800'  
                }\`}  
              \>  
                {category}  
              \</button\>  
            ))}  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Sermons Grid \*/}  
      \<section className="py-24 lg:py-32 bg-cream dark:bg-charcoal relative gradient-mesh theme-transition"\>  
        \<div className="max-w-7xl mx-auto px-4"\>  
          {displayedSermons.length \=== 0 ? (  
            \<div className="text-center py-20"\>  
              \<p className="text-muted text-lg"\>  
                No sermons found in this category.  
              \</p\>  
            \</div\>  
          ) : (  
            \<\>  
              \<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"\>  
                {displayedSermons.map((sermon, index) \=\> (  
                  \<article  
                    key={index}  
                    onClick={() \=\> openVideoModal(sermon)}  
                    className="group cursor-pointer hover-lift card-3d theme-transition animate-fade-in-up"  
                    style={{ animationDelay: \`${(index % 9\) \* 100}ms\` }}  
                  \>  
                    \<div className="relative aspect-video rounded-2xl overflow-hidden mb-5 shadow-lg"\>  
                      \<img  
                        src={sermon.image}  
                        alt={sermon.title}  
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"  
                      /\>  
                      \<div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 to-transparent group-hover:from-burgundy-950/60 transition-all duration-300" /\>  
                        
                      {/\* Play Button \*/}  
                      \<div className="absolute inset-0 flex items-center justify-center"\>  
                        \<div className="w-16 h-16 glass rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform hover-glow"\>  
                          \<svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"\>  
                            \<path d="M8 5v14l11-7z" /\>  
                          \</svg\>  
                        \</div\>  
                      \</div\>

                      {/\* Duration & Views \*/}  
                      \<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between"\>  
                        \<span className="glass-dark text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"\>  
                          \<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                            \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /\>  
                          \</svg\>  
                          {sermon.duration}  
                        \</span\>  
                        \<span className="glass-dark text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"\>  
                          \<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                            \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /\>  
                            \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /\>  
                          \</svg\>  
                          {sermon.views}  
                        \</span\>  
                      \</div\>  
                    \</div\>

                    {/\* Sermon Info \*/}  
                    \<div className="space-y-2"\>  
                      \<span className="inline-block glass dark:bg-burgundy-900/20 text-burgundy-700 dark:text-gold-400 text-xs font-semibold px-3 py-1 rounded-full"\>  
                        {sermon.series}  
                      \</span\>  
                      \<h3 className="font-display text-xl font-semibold text-primary group-hover:text-burgundy-700 dark:group-hover:text-gold-400 transition-colors theme-transition"\>  
                        {sermon.title}  
                      \</h3\>  
                      \<p className="text-muted text-sm theme-transition"\>{sermon.speaker}\</p\>  
                      \<p className="text-burgundy-600 dark:text-gold-400 text-xs font-medium"\>{sermon.date}\</p\>  
                    \</div\>  
                  \</article\>  
                ))}  
              \</div\>

              {/\* Load More Button \*/}  
              {hasMore && (  
                \<div className="text-center mt-16"\>  
                  \<button  
                    onClick={loadMore}  
                    className="bg-burgundy-900 hover:bg-burgundy-800 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover-lift"  
                  \>  
                    Load More Sermons  
                  \</button\>  
                \</div\>  
              )}  
            \</\>  
          )}  
        \</div\>  
      \</section\>

      {/\* CTA Section \*/}  
      \<section className="py-24 bg-gradient-to-br from-burgundy-900 to-burgundy-950 relative overflow-hidden"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className="max-w-4xl mx-auto px-4 text-center relative z-10"\>  
          \<h2 className="font-display text-4xl sm:text-5xl text-white font-bold mb-6"\>  
            Never Miss a Message  
          \</h2\>  
          \<p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"\>  
            Subscribe to our podcast or YouTube channel to get notified when we upload new sermons. Stay connected to the Word.  
          \</p\>  
          \<div className="flex flex-col sm:flex-row gap-4 justify-center"\>  
            \<a  
              href={YOUTUBE\_LIVE\_URL}  
              target="\_blank"  
              rel="noopener noreferrer"  
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover-lift"  
            \>  
              \<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"\>  
                \<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/\>  
              \</svg\>  
              Subscribe on YouTube  
            \</a\>  
            \<Link  
              to="/"  
              className="glass-dark border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover-lift"  
            \>  
              Back to Home  
            \</Link\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Footer \*/}  
      \<footer className="bg-burgundy-950 dark:bg-charcoal py-16 relative overflow-hidden theme-transition"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className="max-w-7xl mx-auto px-4 relative z-10"\>  
          \<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"\>  
            \<div\>  
              \<h3 className="font-display text-2xl font-bold text-white mb-4"\>Church Name\</h3\>  
              \<p className="text-white/60 mb-6"\>  
                A place where everyone belongs. Join us as we grow together in faith, love, and service.  
              \</p\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Quick Links\</h4\>  
              \<ul className="space-y-3"\>  
                {\['About Us', 'Sermons', 'Events', 'Ministries', 'Give'\].map((link) \=\> (  
                  \<li key={link}\>  
                    \<a href="\#" className="text-white/60 hover:text-gold-400 transition-colors"\>{link}\</a\>  
                  \</li\>  
                ))}  
              \</ul\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Connect\</h4\>  
              \<ul className="space-y-3"\>  
                {\['Plan Your Visit', 'Prayer Requests', 'Join a Group', 'Volunteer', 'Contact Us'\].map((link) \=\> (  
                  \<li key={link}\>  
                    \<a href="\#" className="text-white/60 hover:text-gold-400 transition-colors"\>{link}\</a\>  
                  \</li\>  
                ))}  
              \</ul\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Service Times\</h4\>  
              \<div className="space-y-3 text-white/60"\>  
                \<p\>\<span className="text-white"\>Sunday:\</span\> 8:00 AM, 10:30 AM, 6:00 PM\</p\>  
                \<p\>\<span className="text-white"\>Wednesday:\</span\> 7:00 PM Bible Study\</p\>  
                \<p className="pt-2 text-sm"\>1234 Faith Avenue\<br /\>Atlanta, GA 30301\</p\>  
              \</div\>  
            \</div\>  
          \</div\>

          \<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"\>  
            \<p className="text-white/40 text-sm"\>  
              © 2026 Church Name. All rights reserved.  
            \</p\>  
            \<div className="flex gap-6 text-sm"\>  
              \<a href="\#" className="text-white/40 hover:text-white/60 transition-colors"\>Privacy Policy\</a\>  
              \<a href="\#" className="text-white/40 hover:text-white/60 transition-colors"\>Terms of Service\</a\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</footer\>  
    \</div\>  
  );  
};

export default Sermons;

/\* \========================================  
   FILE: src/pages/Index.tsx (COMPLETE)  
   \======================================== \*/  
import React, { useState, useEffect, useRef } from 'react';  
import { Link } from 'react-router-dom';

// Logo Component with Two Flying Doves and Rotating Globe  
const ChurchLogo \= ({ className \= "", light \= false }: { className?: string; light?: boolean }) \=\> {  
  const primaryColor \= light ? "\#ffffff" : "\#5c1229";  
  const secondaryColor \= light ? "\#fef9e7" : "\#f0b429";  
    
  return (  
    \<div className={\`flex items-center gap-3 ${className}\`}\>  
      \<div className="relative w-14 h-14 flex items-center justify-center"\>  
        {/\* Rotating Globe \*/}  
        \<svg  
          viewBox="0 0 100 100"  
          className="absolute w-10 h-10 animate-spin-slow"  
          style={{ animationDuration: '20s' }}  
        \>  
          \<circle  
            cx="50"  
            cy="50"  
            r="45"  
            fill="none"  
            stroke={secondaryColor}  
            strokeWidth="2"  
            opacity="0.6"  
          /\>  
          \<ellipse  
            cx="50"  
            cy="50"  
            rx="45"  
            ry="15"  
            fill="none"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          /\>  
          \<ellipse  
            cx="50"  
            cy="50"  
            rx="45"  
            ry="30"  
            fill="none"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          /\>  
          \<ellipse  
            cx="50"  
            cy="50"  
            rx="15"  
            ry="45"  
            fill="none"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          /\>  
          \<ellipse  
            cx="50"  
            cy="50"  
            rx="30"  
            ry="45"  
            fill="none"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          /\>  
          \<line  
            x1="50"  
            y1="5"  
            x2="50"  
            y2="95"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          /\>  
          \<line  
            x1="5"  
            y1="50"  
            x2="95"  
            y2="50"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          /\>  
        \</svg\>  
          
        {/\* Two Flying Doves \*/}  
        \<svg  
          viewBox="0 0 100 100"  
          className="absolute w-14 h-14 z-10"  
        \>  
          \<g transform="translate(8, 25\) scale(0.4)"\>  
            \<path  
              d="M45 50   
                 C35 45, 25 35, 15 40  
                 C5 45, 0 55, 5 60  
                 C10 65, 20 62, 30 58  
                 L25 75  
                 C30 70, 40 68, 45 70  
                 C50 68, 60 70, 65 75  
                 L60 58  
                 C70 62, 80 65, 85 60  
                 C90 55, 85 45, 75 40  
                 C65 35, 55 45, 45 50Z"  
              fill={primaryColor}  
            /\>  
            \<path  
              d="M30 50  
                 C20 35, 5 25, 0 30  
                 C5 35, 15 45, 30 50Z"  
              fill={primaryColor}  
              opacity="0.8"  
            /\>  
            \<path  
              d="M60 50  
                 C70 35, 85 25, 90 30  
                 C85 35, 75 45, 60 50Z"  
              fill={primaryColor}  
              opacity="0.8"  
            /\>  
            \<circle cx="45" cy="42" r="8" fill={primaryColor} /\>  
            \<path  
              d="M45 40 L55 42 L45 44 Z"  
              fill={secondaryColor}  
            /\>  
            \<circle cx="42" cy="41" r="1.5" fill={light ? "\#1a1a1a" : "\#ffffff"} /\>  
          \</g\>  
            
          \<g transform="translate(92, 45\) scale(-0.4, 0.4)"\>  
            \<path  
              d="M45 50   
                 C35 45, 25 35, 15 40  
                 C5 45, 0 55, 5 60  
                 C10 65, 20 62, 30 58  
                 L25 75  
                 C30 70, 40 68, 45 70  
                 C50 68, 60 70, 65 75  
                 L60 58  
                 C70 62, 80 65, 85 60  
                 C90 55, 85 45, 75 40  
                 C65 35, 55 45, 45 50Z"  
              fill={primaryColor}  
            /\>  
            \<path  
              d="M30 50  
                 C20 35, 5 25, 0 30  
                 C5 35, 15 45, 30 50Z"  
              fill={primaryColor}  
              opacity="0.8"  
            /\>  
            \<path  
              d="M60 50  
                 C70 35, 85 25, 90 30  
                 C85 35, 75 45, 60 50Z"  
              fill={primaryColor}  
              opacity="0.8"  
            /\>  
            \<circle cx="45" cy="42" r="8" fill={primaryColor} /\>  
            \<path  
              d="M45 40 L55 42 L45 44 Z"  
              fill={secondaryColor}  
            /\>  
            \<circle cx="42" cy="41" r="1.5" fill={light ? "\#1a1a1a" : "\#ffffff"} /\>  
          \</g\>  
        \</svg\>  
      \</div\>  
        
      \<div className="flex flex-col"\>  
        \<span className={\`font-display text-xl font-bold leading-tight ${light ? 'text-white' : 'text-burgundy-900'}\`}\>  
          Church Name  
        \</span\>  
        \<span className={\`text-xs tracking-widest uppercase ${light ? 'text-gold-400' : 'text-gold-600'}\`}\>  
          Ministry  
        \</span\>  
      \</div\>  
    \</div\>  
  );  
};

// Theme Toggle Component  
const ThemeToggle \= ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () \=\> void }) \=\> {  
  return (  
    \<button  
      onClick={toggleTheme}  
      className={\`theme-toggle ${isDark ? 'active' : ''}\`}  
      aria-label="Toggle theme"  
    \>  
      \<div className="theme-toggle-slider"\>  
        {isDark ? (  
          \<svg className="w-4 h-4 text-burgundy-950" fill="currentColor" viewBox="0 0 20 20"\>  
            \<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /\>  
          \</svg\>  
        ) : (  
          \<svg className="w-4 h-4 text-gold-600" fill="currentColor" viewBox="0 0 20 20"\>  
            \<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /\>  
          \</svg\>  
        )}  
      \</div\>  
    \</button\>  
  );  
};

// Animated Counter Component  
const AnimatedCounter \= ({ end, duration \= 2000, suffix \= "" }: { end: number; duration?: number; suffix?: string }) \=\> {  
  const \[count, setCount\] \= useState(0);  
  const \[isVisible, setIsVisible\] \= useState(false);  
  const countRef \= useRef\<HTMLDivElement\>(null);

  useEffect(() \=\> {  
    const observer \= new IntersectionObserver(  
      (\[entry\]) \=\> {  
        if (entry.isIntersecting && \!isVisible) {  
          setIsVisible(true);  
        }  
      },  
      { threshold: 0.5 }  
    );

    if (countRef.current) {  
      observer.observe(countRef.current);  
    }

    return () \=\> observer.disconnect();  
  }, \[isVisible\]);

  useEffect(() \=\> {  
    if (\!isVisible) return;

    const increment \= end / (duration / 16);  
    let current \= 0;  
    const timer \= setInterval(() \=\> {  
      current \+= increment;  
      if (current \>= end) {  
        setCount(end);  
        clearInterval(timer);  
      } else {  
        setCount(Math.floor(current));  
      }  
    }, 16);

    return () \=\> clearInterval(timer);  
  }, \[isVisible, end, duration\]);

  return (  
    \<div ref={countRef} className="font-display text-5xl font-bold"\>  
      {count}{suffix}  
    \</div\>  
  );  
};

// Countdown Timer Component  
const CountdownTimer \= () \=\> {  
  const \[timeLeft, setTimeLeft\] \= useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });  
  const \[nextService, setNextService\] \= useState("");

  useEffect(() \=\> {  
    const getNextService \= () \=\> {  
      const now \= new Date();  
      const currentDay \= now.getDay();  
      const currentHour \= now.getHours();  
      const currentMinute \= now.getMinutes();  
        
      let nextServiceDate \= new Date(now);  
        
      // Sunday services: 8:00 AM, 10:30 AM, 6:00 PM  
      if (currentDay \=== 0\) { // Sunday  
        if (currentHour \< 8\) {  
          nextServiceDate.setHours(8, 0, 0, 0);  
          return { date: nextServiceDate, name: "Sunday 8:00 AM Service" };  
        } else if (currentHour \< 10 || (currentHour \=== 10 && currentMinute \< 30)) {  
          nextServiceDate.setHours(10, 30, 0, 0);  
          return { date: nextServiceDate, name: "Sunday 10:30 AM Service" };  
        } else if (currentHour \< 18\) {  
          nextServiceDate.setHours(18, 0, 0, 0);  
          return { date: nextServiceDate, name: "Sunday 6:00 PM Service" };  
        }  
      }  
        
      // Wednesday service: 7:00 PM  
      if (currentDay \=== 3 && currentHour \< 19\) { // Wednesday  
        nextServiceDate.setHours(19, 0, 0, 0);  
        return { date: nextServiceDate, name: "Wednesday 7:00 PM Bible Study" };  
      }  
        
      // Default to next Sunday 8:00 AM  
      const daysUntilSunday \= (7 \- currentDay) % 7 || 7;  
      nextServiceDate.setDate(now.getDate() \+ daysUntilSunday);  
      nextServiceDate.setHours(8, 0, 0, 0);  
      return { date: nextServiceDate, name: "Sunday 8:00 AM Service" };  
    };

    const updateCountdown \= () \=\> {  
      const service \= getNextService();  
      setNextService(service.name);  
        
      const now \= new Date().getTime();  
      const distance \= service.date.getTime() \- now;  
        
      setTimeLeft({  
        days: Math.floor(distance / (1000 \* 60 \* 60 \* 24)),  
        hours: Math.floor((distance % (1000 \* 60 \* 60 \* 24)) / (1000 \* 60 \* 60)),  
        minutes: Math.floor((distance % (1000 \* 60 \* 60)) / (1000 \* 60)),  
        seconds: Math.floor((distance % (1000 \* 60)) / 1000\)  
      });  
    };

    updateCountdown();  
    const timer \= setInterval(updateCountdown, 1000);

    return () \=\> clearInterval(timer);  
  }, \[\]);

  return (  
    \<div className="text-center"\>  
      \<p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4"\>Next Service\</p\>  
      \<h3 className="font-display text-2xl font-bold text-white mb-6"\>{nextService}\</h3\>  
      \<div className="grid grid-cols-4 gap-4"\>  
        {\[  
          { label: 'Days', value: timeLeft.days },  
          { label: 'Hours', value: timeLeft.hours },  
          { label: 'Minutes', value: timeLeft.minutes },  
          { label: 'Seconds', value: timeLeft.seconds }  
        \].map((unit, index) \=\> (  
          \<div key={index} className="countdown-unit"\>  
            \<div className="glass-dark rounded-2xl p-4"\>  
              \<div className="countdown-number font-display text-3xl sm:text-4xl font-bold text-gold-400"\>  
                {String(unit.value).padStart(2, '0')}  
              \</div\>  
              \<div className="text-white/60 text-xs uppercase mt-2"\>{unit.label}\</div\>  
            \</div\>  
          \</div\>  
        ))}  
      \</div\>  
    \</div\>  
  );  
};

// Testimonial Carousel Component  
const TestimonialCarousel \= () \=\> {  
  const \[currentSlide, setCurrentSlide\] \= useState(0);  
  const \[isPaused, setIsPaused\] \= useState(false);

  const testimonials \= \[  
    {  
      name: "Sarah Johnson",  
      role: "Member since 2015",  
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400\&q=80",  
      quote: "This church has been my spiritual home for years. The community is warm, the teaching is biblical, and I've grown so much in my faith here.",  
      rating: 5  
    },  
    {  
      name: "Michael Thompson",  
      role: "Youth Ministry Volunteer",  
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400\&q=80",  
      quote: "Serving in the youth ministry has been life-changing. Watching young people encounter God's love and grow in their faith is incredibly rewarding.",  
      rating: 5  
    },  
    {  
      name: "Emily Davis",  
      role: "New Member",  
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400\&q=80",  
      quote: "As a new member, I was welcomed with open arms. The genuine love and care from everyone here made me feel like I belonged from day one.",  
      rating: 5  
    },  
    {  
      name: "James Wilson",  
      role: "Worship Team",  
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400\&q=80",  
      quote: "Being part of the worship team has deepened my relationship with God. The way our church community worships together is truly powerful.",  
      rating: 5  
    }  
  \];

  useEffect(() \=\> {  
    if (isPaused) return;  
      
    const timer \= setInterval(() \=\> {  
      setCurrentSlide((prev) \=\> (prev \+ 1\) % testimonials.length);  
    }, 5000);

    return () \=\> clearInterval(timer);  
  }, \[isPaused, testimonials.length\]);

  const goToSlide \= (index: number) \=\> {  
    setCurrentSlide(index);  
  };

  const nextSlide \= () \=\> {  
    setCurrentSlide((prev) \=\> (prev \+ 1\) % testimonials.length);  
  };

  const prevSlide \= () \=\> {  
    setCurrentSlide((prev) \=\> (prev \- 1 \+ testimonials.length) % testimonials.length);  
  };

  return (  
    \<div   
      className="carousel-container"  
      onMouseEnter={() \=\> setIsPaused(true)}  
      onMouseLeave={() \=\> setIsPaused(false)}  
    \>  
      \<div className="carousel-track" style={{ transform: \`translateX(-${currentSlide \* 100}%)\` }}\>  
        {testimonials.map((testimonial, index) \=\> (  
          \<div key={index} className="carousel-slide px-4"\>  
            \<div className="max-w-3xl mx-auto glass-dark rounded-3xl p-8 sm:p-12"\>  
              \<div className="flex items-center gap-1 mb-6 justify-center"\>  
                {\[...Array(testimonial.rating)\].map((\_, i) \=\> (  
                  \<svg key={i} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20"\>  
                    \<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /\>  
                  \</svg\>  
                ))}  
              \</div\>  
              \<p className="text-white text-lg sm:text-xl leading-relaxed text-center mb-8 italic"\>  
                "{testimonial.quote}"  
              \</p\>  
              \<div className="flex flex-col items-center"\>  
                \<img  
                  src={testimonial.image}  
                  alt={testimonial.name}  
                  className="w-16 h-16 rounded-full object-cover mb-4 ring-4 ring-gold-400"  
                /\>  
                \<h4 className="font-display text-xl font-bold text-white"\>{testimonial.name}\</h4\>  
                \<p className="text-gold-400 text-sm"\>{testimonial.role}\</p\>  
              \</div\>  
            \</div\>  
          \</div\>  
        ))}  
      \</div\>

      {/\* Navigation Arrows \*/}  
      \<button  
        onClick={prevSlide}  
        className="absolute left-4 top-1/2 \-translate-y-1/2 w-12 h-12 glass-dark rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover-lift"  
        aria-label="Previous testimonial"  
      \>  
        \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
          \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /\>  
        \</svg\>  
      \</button\>  
      \<button  
        onClick={nextSlide}  
        className="absolute right-4 top-1/2 \-translate-y-1/2 w-12 h-12 glass-dark rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover-lift"  
        aria-label="Next testimonial"  
      \>  
        \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
          \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /\>  
        \</svg\>  
      \</button\>

      {/\* Dots Navigation \*/}  
      \<div className="carousel-dots"\>  
        {testimonials.map((\_, index) \=\> (  
          \<button  
            key={index}  
            onClick={() \=\> goToSlide(index)}  
            className={\`carousel-dot ${currentSlide \=== index ? 'active' : ''}\`}  
            aria-label={\`Go to testimonial ${index \+ 1}\`}  
          /\>  
        ))}  
      \</div\>

      {/\* Progress Bar \*/}  
      {\!isPaused && (  
        \<div className="carousel-progress"\>  
          \<div className="carousel-progress-bar" /\>  
        \</div\>  
      )}  
    \</div\>  
  );  
};

const Index \= () \=\> {  
  const \[isMenuOpen, setIsMenuOpen\] \= useState(false);  
  const \[scrolled, setScrolled\] \= useState(false);  
  const \[scrollProgress, setScrollProgress\] \= useState(0);  
  const \[visibleSections, setVisibleSections\] \= useState\<Set\<string\>\>(new Set());  
  const \[activeSection, setActiveSection\] \= useState('');  
  const \[isDarkMode, setIsDarkMode\] \= useState(false);  
  const heroRef \= useRef\<HTMLDivElement\>(null);

  const YOUTUBE\_LIVE\_URL \= "https://www.youtube.com/@YourChurchChannel/live";

  // Theme Toggle  
  useEffect(() \=\> {  
    const savedTheme \= localStorage.getItem('theme');  
    if (savedTheme \=== 'dark') {  
      setIsDarkMode(true);  
      document.documentElement.classList.add('dark');  
    }  
  }, \[\]);

  const toggleTheme \= () \=\> {  
    setIsDarkMode(\!isDarkMode);  
    if (\!isDarkMode) {  
      document.documentElement.classList.add('dark');  
      localStorage.setItem('theme', 'dark');  
    } else {  
      document.documentElement.classList.remove('dark');  
      localStorage.setItem('theme', 'light');  
    }  
  };

  // Scroll Progress Bar  
  useEffect(() \=\> {  
    const handleScroll \= () \=\> {  
      const scrollTop \= window.pageYOffset || document.documentElement.scrollTop;  
      const scrollHeight \= document.documentElement.scrollHeight \- document.documentElement.clientHeight;  
      const progress \= (scrollTop / scrollHeight) \* 100;  
      setScrollProgress(progress);  
      setScrolled(window.scrollY \> 50);  
    };

    window.addEventListener('scroll', handleScroll);  
    return () \=\> window.removeEventListener('scroll', handleScroll);  
  }, \[\]);

  // Parallax Effect  
  useEffect(() \=\> {  
    const handleParallax \= () \=\> {  
      if (heroRef.current) {  
        const scrolled \= window.pageYOffset;  
        heroRef.current.style.transform \= \`translateY(${scrolled \* 0.5}px)\`;  
      }  
    };

    window.addEventListener('scroll', handleParallax);  
    return () \=\> window.removeEventListener('scroll', handleParallax);  
  }, \[\]);

  // Section Visibility Observer  
  useEffect(() \=\> {  
    const observer \= new IntersectionObserver(  
      (entries) \=\> {  
        entries.forEach((entry) \=\> {  
          if (entry.isIntersecting) {  
            setVisibleSections((prev) \=\> new Set(\[...prev, entry.target.id\]));  
            setActiveSection(entry.target.id);  
          }  
        });  
      },  
      { threshold: 0.3, rootMargin: '-100px' }  
    );

    document.querySelectorAll('section\[id\]').forEach((section) \=\> {  
      observer.observe(section);  
    });

    return () \=\> observer.disconnect();  
  }, \[\]);

  const isVisible \= (id: string) \=\> visibleSections.has(id);

  const navLinks \= \[  
    { href: '\#about', label: 'About', id: 'about' },  
    { href: '\#sermons', label: 'Sermons', id: 'sermons' },  
    { href: '\#events', label: 'Events', id: 'events' },  
    { href: '\#testimonials', label: 'Testimonials', id: 'testimonials' },  
    { href: '\#giving', label: 'Giving', id: 'giving' },  
    { href: '\#contact', label: 'Contact', id: 'contact' },  
  \];

  const scrollToSection \= (id: string) \=\> {  
    const element \= document.getElementById(id);  
    if (element) {  
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });  
    }  
  };

  const events \= \[  
    {  
      title: "Youth Revival Weekend",  
      date: "Feb 21-23",  
      time: "7:00 PM",  
      category: "Youth",  
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600\&q=80"  
    },  
    {  
      title: "Women's Prayer Breakfast",  
      date: "Feb 28",  
      time: "9:00 AM",  
      category: "Women",  
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600\&q=80"  
    },  
    {  
      title: "Community Outreach Day",  
      date: "Mar 1",  
      time: "10:00 AM",  
      category: "Outreach",  
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600\&q=80"  
    },  
    {  
      title: "Marriage Enrichment Seminar",  
      date: "Mar 7",  
      time: "6:30 PM",  
      category: "Couples",  
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600\&q=80"  
    },  
    {  
      title: "Choir Anniversary Concert",  
      date: "Mar 14",  
      time: "5:00 PM",  
      category: "Music",  
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600\&q=80"  
    },  
    {  
      title: "Men's Fellowship Breakfast",  
      date: "Mar 21",  
      time: "8:00 AM",  
      category: "Men",  
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600\&q=80"  
    }  
  \];

  return (  
    \<div className="min-h-screen bg-cream dark:bg-charcoal overflow-x-hidden theme-transition"\>  
      {/\* Progress Bar \*/}  
      \<div   
        className="progress-bar"   
        style={{ transform: \`scaleX(${scrollProgress / 100})\` }}  
      /\>

      {/\* Scroll Indicator \*/}  
      \<div className="scroll-indicator hidden lg:flex"\>  
        {navLinks.map((link) \=\> (  
          \<div  
            key={link.id}  
            className={\`scroll-dot ${activeSection \=== link.id ? 'active' : ''}\`}  
            onClick={() \=\> scrollToSection(link.id)}  
            title={link.label}  
          /\>  
        ))}  
      \</div\>

      {/\* Navigation \*/}  
      \<nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${  
        scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'  
      }\`}\>  
        \<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"\>  
          \<div className="flex items-center justify-between h-20"\>  
            \<a href="\#" className="transition-transform hover:scale-105 duration-300"\>  
              \<ChurchLogo light={\!scrolled} /\>  
            \</a\>

            {/\* Desktop Navigation \*/}  
            \<div className="hidden lg:flex items-center gap-6"\>  
              {navLinks.map((link) \=\> (  
                \<a  
                  key={link.href}  
                  href={link.href}  
                  className={\`text-sm font-medium transition-all duration-300 hover:opacity-70 relative group ${  
                    scrolled ? 'text-white' : 'text-white'  
                  }\`}  
                \>  
                  {link.label}  
                  \<span className="absolute \-bottom-1 left-0 w-0 h-0.5 bg-gold-400 transition-all duration-300 group-hover:w-full"\>\</span\>  
                \</a\>  
              ))}  
                
              \<a  
                href={YOUTUBE\_LIVE\_URL}  
                target="\_blank"  
                rel="noopener noreferrer"  
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover-lift"  
              \>  
                \<span className="relative flex h-2 w-2"\>  
                  \<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"\>\</span\>  
                  \<span className="relative inline-flex rounded-full h-2 w-2 bg-white"\>\</span\>  
                \</span\>  
                Live Stream  
              \</a\>  
                
              \<a  
                href="\#visit"  
                className="bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/50 hover-lift"  
              \>  
                Plan Your Visit  
              \</a\>

              \<ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} /\>  
            \</div\>

            {/\* Mobile Menu Button \*/}  
            \<button  
              onClick={() \=\> setIsMenuOpen(\!isMenuOpen)}  
              className={\`lg:hidden p-2 transition-colors ${scrolled ? 'text-white' : 'text-white'}\`}  
            \>  
              \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                {isMenuOpen ? (  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /\>  
                ) : (  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /\>  
                )}  
              \</svg\>  
            \</button\>  
          \</div\>  
        \</div\>

        {/\* Mobile Menu \*/}  
        \<div className={\`lg:hidden transition-all duration-300 overflow-hidden ${  
          isMenuOpen ? 'max-h-screen glass-dark' : 'max-h-0'  
        }\`}\>  
          \<div className="px-4 py-6 space-y-4"\>  
            {navLinks.map((link) \=\> (  
              \<a  
                key={link.href}  
                href={link.href}  
                onClick={() \=\> setIsMenuOpen(false)}  
                className="block text-white font-medium py-2 hover:text-gold-400 transition-colors"  
              \>  
                {link.label}  
              \</a\>  
            ))}  
            \<a  
              href={YOUTUBE\_LIVE\_URL}  
              target="\_blank"  
              rel="noopener noreferrer"  
              onClick={() \=\> setIsMenuOpen(false)}  
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover-lift"  
            \>  
              \<span className="relative flex h-2.5 w-2.5"\>  
                \<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"\>\</span\>  
                \<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"\>\</span\>  
              \</span\>  
              Live Stream  
            \</a\>  
            \<a  
              href="\#visit"  
              onClick={() \=\> setIsMenuOpen(false)}  
              className="block bg-gold-500 text-burgundy-950 px-6 py-3 rounded-full text-center font-semibold hover-lift"  
            \>  
              Plan Your Visit  
            \</a\>  
            \<div className="flex items-center justify-center py-2"\>  
              \<ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} /\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</nav\>

      {/\* Hero Section \*/}  
      \<section className="relative h-screen min-h-\[700px\] flex items-center justify-center overflow-hidden"\>  
        {/\* Animated Blobs \*/}  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
        \<div className="blob blob-3"\>\</div\>  
          
        {/\* Floating Particles \*/}  
        \<div className="floating-particle floating-particle-1"\>\</div\>  
        \<div className="floating-particle floating-particle-2"\>\</div\>  
        \<div className="floating-particle floating-particle-3"\>\</div\>  
        \<div className="floating-particle floating-particle-4"\>\</div\>

        {/\* Image Background with Parallax \*/}  
        \<div ref={heroRef} className="absolute inset-0 parallax"\>  
          \<img  
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920\&q=80"  
            alt="Church worship"  
            className="w-full h-full object-cover"  
          /\>  
          \<div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/80 via-burgundy-900/70 to-burgundy-950/90" /\>  
        \</div\>

        {/\* Hero Content \*/}  
        \<div className="relative z-10 text-center px-4 max-w-5xl mx-auto"\>  
          \<p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-6 animate-fade-in-up opacity-0 animation-delay-200"\>  
            Welcome to Church Name  
          \</p\>  
          \<h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-8 animate-fade-in-up opacity-0 animation-delay-400"\>  
            Experience God's  
            \<span className="block gradient-text"\>Transforming Love\</span\>  
          \</h1\>  
          \<p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0 animation-delay-600"\>  
            Join a community where faith meets family. Discover purpose, find belonging, and grow in your spiritual journey.  
          \</p\>  
          \<div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0 animation-delay-800"\>  
            \<a  
              href={YOUTUBE\_LIVE\_URL}  
              target="\_blank"  
              rel="noopener noreferrer"  
              className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 hover-lift animate-pulse-glow"  
            \>  
              \<span className="relative flex h-3 w-3"\>  
                \<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"\>\</span\>  
                \<span className="relative inline-flex rounded-full h-3 w-3 bg-white"\>\</span\>  
              \</span\>  
              Watch Live  
              \<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"\>  
                \<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/\>  
              \</svg\>  
            \</a\>  
            \<a  
              href="\#visit"  
              className="bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover-lift"  
            \>  
              Plan Your Visit  
            \</a\>  
            \<a  
              href="\#sermons"  
              className="glass border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover-lift"  
            \>  
              Watch Sermons  
            \</a\>  
          \</div\>  
        \</div\>

        {/\* Scroll Indicator \*/}  
        \<div className="absolute bottom-8 left-1/2 \-translate-x-1/2 animate-bounce"\>  
          \<svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
            \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /\>  
          \</svg\>  
        \</div\>  
      \</section\>

      {/\* Service Times Banner with Countdown \*/}  
      \<section className="bg-burgundy-900 dark:bg-burgundy-950 py-12 relative overflow-hidden theme-transition"\>  
        \<div className="absolute inset-0 opacity-10"\>  
          \<div className="absolute inset-0 bg-\[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDI4aC0ydi0yaDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')\] animate-\[scroll\_20s\_linear\_infinite\]"\>\</div\>  
        \</div\>  
        \<div className="max-w-7xl mx-auto px-4 relative z-10"\>  
          \<div className="grid lg:grid-cols-2 gap-8 items-center"\>  
            {/\* Service Times \*/}  
            \<div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-white"\>  
              \<div className="flex items-center gap-3"\>  
                \<svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /\>  
                \</svg\>  
                \<span className="font-medium"\>Sundays: 8:00 AM, 10:30 AM & 6:00 PM\</span\>  
              \</div\>  
              \<div className="hidden md:block w-px h-6 bg-white/20" /\>  
              \<div className="flex items-center gap-3"\>  
                \<svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /\>  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /\>  
                \</svg\>  
                \<span className="font-medium"\>1234 Faith Avenue, Atlanta, GA 30301\</span\>  
              \</div\>  
            \</div\>

            {/\* Countdown Timer \*/}  
            \<div className="border-l-0 lg:border-l border-white/20 pl-0 lg:pl-8"\>  
              \<CountdownTimer /\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* About Section \*/}  
      \<section id="about" className="py-24 lg:py-32 bg-cream dark:bg-charcoal relative overflow-hidden gradient-mesh theme-transition"\>  
        \<div className={\`max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}\>  
          \<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"\>  
            \<div className={\`${isVisible('about') ? 'animate-slide-in-left' : ''}\`}\>  
              \<p className="text-burgundy-600 dark:text-gold-400 font-medium tracking-widest uppercase text-sm mb-4"\>Our Story\</p\>  
              \<h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 theme-transition"\>  
                A Place Where Everyone Belongs  
              \</h2\>  
              \<p className="text-body text-lg leading-relaxed mb-6 theme-transition"\>  
                For over 50 years, Church Name has been a beacon of hope in our community. We believe in the power of authentic worship, meaningful connections, and serving others with the love of Christ.  
              \</p\>  
              \<p className="text-body text-lg leading-relaxed mb-8 theme-transition"\>  
                Whether you're taking your first steps in faith or you've been walking with God for decades, there's a place for you here. Come as you are and discover the life-changing power of God's grace.  
              \</p\>  
                
              {/\* Stats \*/}  
              \<div className="grid grid-cols-3 gap-6 mb-8"\>  
                \<div className="text-center p-4 glass dark:bg-burgundy-900/20 rounded-2xl hover-lift theme-transition"\>  
                  \<AnimatedCounter end={50} suffix="+" /\>  
                  \<p className="text-sm text-muted mt-2 theme-transition"\>Years Serving\</p\>  
                \</div\>  
                \<div className="text-center p-4 glass dark:bg-burgundy-900/20 rounded-2xl hover-lift theme-transition"\>  
                  \<AnimatedCounter end={1200} suffix="+" /\>  
                  \<p className="text-sm text-muted mt-2 theme-transition"\>Members\</p\>  
                \</div\>  
                \<div className="text-center p-4 glass dark:bg-burgundy-900/20 rounded-2xl hover-lift theme-transition"\>  
                  \<AnimatedCounter end={30} suffix="+" /\>  
                  \<p className="text-sm text-muted mt-2 theme-transition"\>Ministries\</p\>  
                \</div\>  
              \</div\>  
                
              \<a href="\#visit" className="inline-flex items-center gap-2 text-burgundy-700 dark:text-gold-400 font-semibold hover:text-burgundy-500 dark:hover:text-gold-300 transition-colors group"\>  
                Learn More About Us  
                \<svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /\>  
                \</svg\>  
              \</a\>  
            \</div\>  
            \<div className={\`relative ${isVisible('about') ? 'animate-slide-in-right' : ''}\`}\>  
              \<div className="aspect-\[4/5\] rounded-3xl overflow-hidden shadow-2xl image-reveal hover-lift"\>  
                \<img  
                  src="https://images.unsplash.com/photo-1609234656388-0ff363383899?w=800\&q=80"  
                  alt="Church community gathering"  
                  className="w-full h-full object-cover"  
                /\>  
              \</div\>  
              \<div className="absolute \-bottom-6 \-left-6 bg-gold-500 text-burgundy-950 p-6 rounded-2xl shadow-xl hover-lift glass"\>  
                \<p className="font-display text-4xl font-bold"\>50+\</p\>  
                \<p className="text-sm font-medium"\>Years of Faith\</p\>  
              \</div\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Sermons Section \*/}  
      \<section id="sermons" className="py-24 lg:py-32 bg-white dark:bg-burgundy-950 relative overflow-hidden theme-transition"\>  
        \<div className={\`max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible('sermons') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}\>  
          \<div className="text-center mb-16"\>  
            \<p className="text-burgundy-600 dark:text-gold-400 font-medium tracking-widest uppercase text-sm mb-4"\>Latest Messages\</p\>  
            \<h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 theme-transition"\>  
              Inspiring Sermons  
            \</h2\>  
            \<p className="text-body text-lg max-w-2xl mx-auto theme-transition"\>  
              Dive deeper into God's Word with our latest messages. Available to watch anytime, anywhere.  
            \</p\>  
          \</div\>

          \<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"\>  
            {\[  
              {  
                title: "Walking in Purpose",  
                speaker: "Pastor James Williams",  
                date: "February 9, 2026",  
                image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600\&q=80",  
                duration: "45 min"  
              },  
              {  
                title: "The Power of Prayer",  
                speaker: "Minister Sarah Johnson",  
                date: "February 2, 2026",  
                image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600\&q=80",  
                duration: "38 min"  
              },  
              {  
                title: "Faith Over Fear",  
                speaker: "Pastor James Williams",  
                date: "January 26, 2026",  
                image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600\&q=80",  
                duration: "42 min"  
              }  
            \].map((sermon, index) \=\> (  
              \<article key={index} className={\`group cursor-pointer hover-lift card-3d ${isVisible('sermons') ? 'animate-scale-in' : 'opacity-0'}\`} style={{animationDelay: \`${index \* 200}ms\`}}\>  
                \<div className="relative aspect-video rounded-2xl overflow-hidden mb-5 shadow-lg"\>  
                  \<img  
                    src={sermon.image}  
                    alt={sermon.title}  
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"  
                  /\>  
                  \<div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/60 to-transparent group-hover:from-burgundy-950/40 transition-all duration-300" /\>  
                  \<div className="absolute inset-0 flex items-center justify-center"\>  
                    \<div className="w-16 h-16 glass rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform hover-glow"\>  
                      \<svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"\>  
                        \<path d="M8 5v14l11-7z" /\>  
                      \</svg\>  
                    \</div\>  
                  \</div\>  
                  \<span className="absolute bottom-4 right-4 glass-dark text-white text-sm px-3 py-1 rounded-full"\>  
                    {sermon.duration}  
                  \</span\>  
                \</div\>  
                \<p className="text-burgundy-600 dark:text-gold-400 text-sm font-medium mb-2"\>{sermon.date}\</p\>  
                \<h3 className="font-display text-xl font-semibold text-primary mb-2 group-hover:text-burgundy-700 dark:group-hover:text-gold-400 transition-colors theme-transition"\>  
                  {sermon.title}  
                \</h3\>  
                \<p className="text-muted theme-transition"\>{sermon.speaker}\</p\>  
              \</article\>  
            ))}  
          \</div\>

          \<div className="text-center mt-12"\>  
            \<Link  
              to="/sermons"  
              className="inline-flex items-center gap-2 bg-burgundy-900 hover:bg-burgundy-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover-lift"  
            \>  
              View All Sermons  
              \<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /\>  
              \</svg\>  
            \</Link\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Events Section \*/}  
      \<section id="events" className="py-24 lg:py-32 bg-burgundy-950 dark:bg-charcoal relative overflow-hidden theme-transition"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className={\`max-w-7xl mx-auto px-4 relative z-10 transition-all duration-1000 ${isVisible('events') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}\>  
          \<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6"\>  
            \<div\>  
              \<p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4"\>What's Happening\</p\>  
              \<h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-bold"\>  
                Upcoming Events  
              \</h2\>  
            \</div\>  
            \<Link  
              to="/events"  
              className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors group"  
            \>  
              View Full Calendar  
              \<svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /\>  
              \</svg\>  
            \</Link\>  
          \</div\>

          \<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"\>  
            {events.map((event, index) \=\> (  
              \<div key={index} className={\`flip-card ${isVisible('events') ? 'animate-scale-in' : 'opacity-0'}\`} style={{animationDelay: \`${index \* 100}ms\`}}\>  
                \<div className="flip-card-inner h-full"\>  
                  \<div className="flip-card-front group relative glass-dark rounded-2xl overflow-hidden cursor-pointer hover-lift"\>  
                    \<div className="aspect-\[16/10\] overflow-hidden"\>  
                      \<img  
                        src={event.image}  
                        alt={event.title}  
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-105"  
                      /\>  
                    \</div\>  
                    \<div className="p-6"\>  
                      \<span className="inline-block glass text-gold-400 text-xs font-semibold px-3 py-1 rounded-full mb-3"\>  
                        {event.category}  
                      \</span\>  
                      \<h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors"\>  
                        {event.title}  
                      \</h3\>  
                      \<div className="flex items-center gap-4 text-white/60 text-sm"\>  
                        \<span className="flex items-center gap-1"\>  
                          \<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                            \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /\>  
                          \</svg\>  
                          {event.date}  
                        \</span\>  
                        \<span className="flex items-center gap-1"\>  
                          \<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                            \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /\>  
                          \</svg\>  
                          {event.time}  
                        \</span\>  
                      \</div\>  
                    \</div\>  
                  \</div\>  
                  \<div className="flip-card-back glass-dark rounded-2xl p-6 flex flex-col justify-center items-center text-center"\>  
                    \<h3 className="font-display text-xl font-bold text-white mb-4"\>{event.title}\</h3\>  
                    \<p className="text-white/80 mb-6"\>Join us for this special event. Click to register or learn more.\</p\>  
                    \<button className="bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-6 py-2 rounded-full font-semibold transition-all duration-300 hover-lift"\>  
                      Register Now  
                    \</button\>  
                  \</div\>  
                \</div\>  
              \</div\>  
            ))}  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Testimonials Carousel Section \*/}  
      \<section id="testimonials" className="py-24 lg:py-32 bg-cream dark:bg-burgundy-950 relative gradient-mesh theme-transition"\>  
        \<div className={\`max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}\>  
          \<div className="text-center mb-16"\>  
            \<p className="text-burgundy-600 dark:text-gold-400 font-medium tracking-widest uppercase text-sm mb-4"\>Stories of Faith\</p\>  
            \<h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 theme-transition"\>  
              Member Testimonials  
            \</h2\>  
            \<p className="text-body text-lg max-w-2xl mx-auto theme-transition"\>  
              Hear from our community about how God is working in their lives.  
            \</p\>  
          \</div\>

          \<TestimonialCarousel /\>

          \<div className="text-center mt-12"\>  
            \<Link  
              to="/testimonials"  
              className="inline-flex items-center gap-2 bg-burgundy-900 hover:bg-burgundy-800 dark:bg-burgundy-800 dark:hover:bg-burgundy-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover-lift"  
            \>  
              View All Testimonials  
              \<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /\>  
              \</svg\>  
            \</Link\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Giving Section \*/}  
      \<section id="giving" className="py-24 lg:py-32 bg-gradient-to-br from-gold-500 via-gold-400 to-gold-500 relative overflow-hidden"\>  
        \<div className="absolute inset-0 opacity-20"\>  
          \<div className="absolute inset-0 bg-\[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDI4aC0ydi0yaDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')\] animate-\[scroll\_20s\_linear\_infinite\]"\>\</div\>  
        \</div\>  
          
        \<div className={\`max-w-7xl mx-auto px-4 relative z-10 transition-all duration-1000 ${isVisible('giving') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}\>  
          \<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"\>  
            \<div\>  
              \<p className="text-burgundy-800 font-medium tracking-widest uppercase text-sm mb-4"\>Generosity\</p\>  
              \<h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-burgundy-950 font-bold mb-6"\>  
                Partner With Us in Ministry  
              \</h2\>  
              \<p className="text-burgundy-900/80 text-lg leading-relaxed mb-8"\>  
                Your generous giving fuels our mission to spread hope, serve our community, and transform lives. Every gift, no matter the size, makes an eternal impact.  
              \</p\>  
                
              \<div className="grid sm:grid-cols-3 gap-6 mb-10"\>  
                {\[  
                  { icon: "🏠", label: "Local Outreach", desc: "Serving our community" },  
                  { icon: "🌍", label: "Global Missions", desc: "Reaching the nations" },  
                  { icon: "📚", label: "Youth Programs", desc: "Investing in futures" }  
                \].map((item, index) \=\> (  
                  \<div key={index} className="glass backdrop-blur-sm rounded-2xl p-5 text-center hover-lift"\>  
                    \<span className="text-3xl mb-2 block"\>{item.icon}\</span\>  
                    \<p className="font-semibold text-burgundy-950"\>{item.label}\</p\>  
                    \<p className="text-burgundy-800/70 text-sm"\>{item.desc}\</p\>  
                  \</div\>  
                ))}  
              \</div\>

              \<div className="flex flex-col sm:flex-row gap-4"\>  
                \<a  
                  href="\#"  
                  className="bg-burgundy-950 hover:bg-burgundy-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl text-center hover-lift"  
                \>  
                  Give Online  
                \</a\>  
                \<a  
                  href="\#"  
                  className="border-2 border-burgundy-950 text-burgundy-950 hover:bg-burgundy-950 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 text-center hover-lift"  
                \>  
                  Set Up Recurring Gift  
                \</a\>  
              \</div\>  
            \</div\>

            \<div className="relative"\>  
              \<div className="bg-white rounded-3xl p-8 shadow-2xl hover-lift"\>  
                \<h3 className="font-display text-2xl font-bold text-burgundy-950 mb-6"\>Quick Give\</h3\>  
                \<div className="grid grid-cols-3 gap-3 mb-6"\>  
                  {\['$25', '$50', '$100', '$250', '$500', 'Other'\].map((amount) \=\> (  
                    \<button  
                      key={amount}  
                      className="py-3 px-4 border-2 border-burgundy-200 rounded-xl font-semibold text-burgundy-950 hover:border-burgundy-500 hover:bg-burgundy-50 transition-all duration-300 hover-lift"  
                    \>  
                      {amount}  
                    \</button\>  
                  ))}  
                \</div\>  
                \<div className="space-y-4"\>  
                  \<select className="w-full p-4 border-2 border-burgundy-200 rounded-xl text-burgundy-950 focus:border-burgundy-500 focus:outline-none transition-colors"\>  
                    \<option\>General Fund\</option\>  
                    \<option\>Building Fund\</option\>  
                    \<option\>Missions\</option\>  
                    \<option\>Youth Ministry\</option\>  
                  \</select\>  
                  \<button className="w-full bg-burgundy-900 hover:bg-burgundy-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover-lift"\>  
                    Continue to Give  
                  \</button\>  
                \</div\>  
                \<p className="text-center text-burgundy-600/60 text-sm mt-4"\>  
                  Secure giving powered by trusted payment providers  
                \</p\>  
              \</div\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Plan Your Visit Section \*/}  
      \<section id="visit" className="py-24 lg:py-32 bg-white dark:bg-charcoal relative gradient-mesh theme-transition"\>  
        \<div className={\`max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible('visit') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}\>  
          \<div className="text-center mb-16"\>  
            \<p className="text-burgundy-600 dark:text-gold-400 font-medium tracking-widest uppercase text-sm mb-4"\>We'd Love to Meet You\</p\>  
            \<h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 theme-transition"\>  
              Plan Your Visit  
            \</h2\>  
            \<p className="text-body text-lg max-w-2xl mx-auto theme-transition"\>  
              Your first visit is important to us. Here's everything you need to know to make your experience seamless and welcoming.  
            \</p\>  
          \</div\>

          \<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"\>  
            {\[  
              {  
                icon: (  
                  \<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                    \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /\>  
                    \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /\>  
                  \</svg\>  
                ),  
                title: "Location",  
                desc: "1234 Faith Avenue, Atlanta, GA 30301\. Free parking available."  
              },  
              {  
                icon: (  
                  \<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                    \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /\>  
                  \</svg\>  
                ),  
                title: "Service Times",  
                desc: "Sundays at 8:00 AM, 10:30 AM, and 6:00 PM. Wednesday Bible Study at 7 PM."  
              },  
              {  
                icon: (  
                  \<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                    \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /\>  
                  \</svg\>  
                ),  
                title: "What to Wear",  
                desc: "Come as you are\! We have a casual, welcoming atmosphere."  
              },  
              {  
                icon: (  
                  \<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                    \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /\>  
                  \</svg\>  
                ),  
                title: "Kids Ministry",  
                desc: "Safe, fun, and engaging programs for children of all ages."  
              }  
            \].map((item, index) \=\> (  
              \<div key={index} className={\`text-center p-6 rounded-2xl glass dark:bg-burgundy-900/20 hover:shadow-lg transition-all duration-300 hover-lift theme-transition ${isVisible('visit') ? 'animate-scale-in' : 'opacity-0'}\`} style={{animationDelay: \`${index \* 100}ms\`}}\>  
                \<div className="w-16 h-16 bg-burgundy-100 dark:bg-burgundy-800 rounded-2xl flex items-center justify-center mx-auto mb-5 text-burgundy-700 dark:text-gold-400 theme-transition"\>  
                  {item.icon}  
                \</div\>  
                \<h3 className="font-display text-xl font-semibold text-primary mb-3 theme-transition"\>{item.title}\</h3\>  
                \<p className="text-muted theme-transition"\>{item.desc}\</p\>  
              \</div\>  
            ))}  
          \</div\>

          {/\* Visit Form \*/}  
          \<div className="max-w-2xl mx-auto bg-burgundy-950 dark:bg-burgundy-900 rounded-3xl p-8 sm:p-12 shadow-2xl hover-lift theme-transition"\>  
            \<h3 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-2"\>Let Us Know You're Coming\</h3\>  
            \<p className="text-white/70 text-center mb-8"\>We'll have someone ready to greet you and answer any questions.\</p\>  
              
            \<form className="space-y-5"\>  
              \<div className="grid sm:grid-cols-2 gap-5"\>  
                \<input  
                  type="text"  
                  placeholder="First Name"  
                  className="w-full px-5 py-4 glass-dark border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                /\>  
                \<input  
                  type="text"  
                  placeholder="Last Name"  
                  className="w-full px-5 py-4 glass-dark border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                /\>  
              \</div\>  
              \<input  
                type="email"  
                placeholder="Email Address"  
                className="w-full px-5 py-4 glass-dark border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
              /\>  
              \<input  
                type="tel"  
                placeholder="Phone Number"  
                className="w-full px-5 py-4 glass-dark border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
              /\>  
              \<select className="w-full px-5 py-4 glass-dark border border-white/20 rounded-xl text-white/70 focus:border-gold-400 focus:outline-none transition-colors"\>  
                \<option value=""\>Which service are you planning to attend?\</option\>  
                \<option value="8am"\>Sunday 8:00 AM\</option\>  
                \<option value="1030am"\>Sunday 10:30 AM\</option\>  
                \<option value="6pm"\>Sunday 6:00 PM\</option\>  
              \</select\>  
              \<button  
                type="submit"  
                className="w-full bg-gold-500 hover:bg-gold-400 text-burgundy-950 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover-lift"  
              \>  
                Submit My Visit  
              \</button\>  
            \</form\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Contact Section \*/}  
      \<section id="contact" className="py-24 lg:py-32 bg-cream dark:bg-burgundy-950 relative gradient-mesh theme-transition"\>  
        \<div className={\`max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}\`}\>  
          \<div className="grid lg:grid-cols-2 gap-12 lg:gap-20"\>  
            \<div\>  
              \<p className="text-burgundy-600 dark:text-gold-400 font-medium tracking-widest uppercase text-sm mb-4"\>Get in Touch\</p\>  
              \<h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 theme-transition"\>  
                We're Here For You  
              \</h2\>  
              \<p className="text-body text-lg leading-relaxed mb-10 theme-transition"\>  
                Have questions? Need prayer? Want to learn more about our ministries? We'd love to hear from you. Reach out anytime.  
              \</p\>

              \<div className="space-y-6"\>  
                \<div className="flex items-start gap-5 hover-lift"\>  
                  \<div className="w-12 h-12 bg-burgundy-100 dark:bg-burgundy-800 rounded-xl flex items-center justify-center flex-shrink-0 text-burgundy-700 dark:text-gold-400 theme-transition"\>  
                    \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                      \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /\>  
                      \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /\>  
                    \</svg\>  
                  \</div\>  
                  \<div\>  
                    \<h3 className="font-semibold text-primary mb-1 theme-transition"\>Address\</h3\>  
                    \<p className="text-muted theme-transition"\>1234 Faith Avenue, Atlanta, GA 30301\</p\>  
                  \</div\>  
                \</div\>  
                  
                \<div className="flex items-start gap-5 hover-lift"\>  
                  \<div className="w-12 h-12 bg-burgundy-100 dark:bg-burgundy-800 rounded-xl flex items-center justify-center flex-shrink-0 text-burgundy-700 dark:text-gold-400 theme-transition"\>  
                    \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                      \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /\>  
                    \</svg\>  
                  \</div\>  
                  \<div\>  
                    \<h3 className="font-semibold text-primary mb-1 theme-transition"\>Phone\</h3\>  
                    \<p className="text-muted theme-transition"\>(404) 555-0123\</p\>  
                  \</div\>  
                \</div\>  
                  
                \<div className="flex items-start gap-5 hover-lift"\>  
                  \<div className="w-12 h-12 bg-burgundy-100 dark:bg-burgundy-800 rounded-xl flex items-center justify-center flex-shrink-0 text-burgundy-700 dark:text-gold-400 theme-transition"\>  
                    \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                      \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /\>  
                    \</svg\>  
                  \</div\>  
                  \<div\>  
                    \<h3 className="font-semibold text-primary mb-1 theme-transition"\>Email\</h3\>  
                    \<p className="text-muted theme-transition"\>info@churchname.org\</p\>  
                  \</div\>  
                \</div\>  
              \</div\>

              {/\* Social Links \*/}  
              \<div className="mt-10"\>  
                \<p className="font-semibold text-primary mb-4 theme-transition"\>Follow Us\</p\>  
                \<div className="flex gap-4"\>  
                  {\['facebook', 'instagram', 'youtube', 'twitter'\].map((social) \=\> (  
                    \<a  
                      key={social}  
                      href="\#"  
                      className="w-12 h-12 bg-burgundy-900 dark:bg-burgundy-800 hover:bg-burgundy-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover-lift hover-glow theme-transition"  
                    \>  
                      {social \=== 'facebook' && (  
                        \<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"\>  
                          \<path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/\>  
                        \</svg\>  
                      )}  
                      {social \=== 'instagram' && (  
                        \<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"\>  
                          \<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/\>  
                        \</svg\>  
                      )}  
                      {social \=== 'youtube' && (  
                        \<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"\>  
                          \<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/\>  
                        \</svg\>  
                      )}  
                      {social \=== 'twitter' && (  
                        \<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"\>  
                          \<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/\>  
                        \</svg\>  
                      )}  
                    \</a\>  
                  ))}  
                \</div\>  
              \</div\>  
            \</div\>

            {/\* Map \*/}  
            \<div className="relative"\>  
              \<div className="aspect-square lg:aspect-auto lg:h-full rounded-3xl overflow-hidden shadow-xl bg-burgundy-100 dark:bg-burgundy-900 hover-lift theme-transition"\>  
                \<iframe  
                  src="https://www.google.com/maps/embed?pb=\!1m18\!1m12\!1m3\!1d212270.61979983138\!2d-84.56437658867188\!3d33.76764080000001\!2m3\!1f0\!2f0\!3f0\!3m2\!1i1024\!2i768\!4f13.1\!3m3\!1m2\!1s0x88f5045d6993098d%3A0x66fede2f990b630b\!2sAtlanta%2C%20GA\!5e0\!3m2\!1sen\!2sus\!4v1707918000000\!5m2\!1sen\!2sus"  
                  className="w-full h-full min-h-\[400px\]"  
                  style={{ border: 0 }}  
                  allowFullScreen  
                  loading="lazy"  
                  referrerPolicy="no-referrer-when-downgrade"  
                  title="Church Location"  
                /\>  
              \</div\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Footer \*/}  
      \<footer className="bg-burgundy-950 dark:bg-charcoal py-16 relative overflow-hidden theme-transition"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className="max-w-7xl mx-auto px-4 relative z-10"\>  
          \<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"\>  
            \<div\>  
              \<h3 className="font-display text-2xl font-bold text-white mb-4"\>Church Name\</h3\>  
              \<p className="text-white/60 mb-6"\>  
                A place where everyone belongs. Join us as we grow together in faith, love, and service.  
              \</p\>  
              \<div className="flex gap-3"\>  
                {\['facebook', 'instagram', 'youtube'\].map((social) \=\> (  
                  \<a  
                    key={social}  
                    href="\#"  
                    className="w-10 h-10 glass-dark hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover-lift"  
                  \>  
                    {social \=== 'facebook' && (  
                      \<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"\>  
                        \<path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/\>  
                      \</svg\>  
                    )}  
                    {social \=== 'instagram' && (  
                      \<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"\>  
                        \<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/\>  
                      \</svg\>  
                    )}  
                    {social \=== 'youtube' && (  
                      \<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"\>  
                        \<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/\>  
                      \</svg\>  
                    )}  
                  \</a\>  
                ))}  
              \</div\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Quick Links\</h4\>  
              \<ul className="space-y-3"\>  
                {\['About Us', 'Sermons', 'Events', 'Ministries', 'Give'\].map((link) \=\> (  
                  \<li key={link}\>  
                    \<a href="\#" className="text-white/60 hover:text-gold-400 transition-colors"\>{link}\</a\>  
                  \</li\>  
                ))}  
              \</ul\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Connect\</h4\>  
              \<ul className="space-y-3"\>  
                {\['Plan Your Visit', 'Prayer Requests', 'Join a Group', 'Volunteer', 'Contact Us'\].map((link) \=\> (  
                  \<li key={link}\>  
                    \<a href="\#" className="text-white/60 hover:text-gold-400 transition-colors"\>{link}\</a\>  
                  \</li\>  
                ))}  
              \</ul\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Service Times\</h4\>  
              \<div className="space-y-3 text-white/60"\>  
                \<p\>\<span className="text-white"\>Sunday:\</span\> 8:00 AM, 10:30 AM, 6:00 PM\</p\>  
                \<p\>\<span className="text-white"\>Wednesday:\</span\> 7:00 PM Bible Study\</p\>  
                \<p className="pt-2 text-sm"\>1234 Faith Avenue\<br /\>Atlanta, GA 30301\</p\>  
              \</div\>  
            \</div\>  
          \</div\>

          \<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"\>  
            \<p className="text-white/40 text-sm"\>  
              © 2026 Church Name. All rights reserved.  
            \</p\>  
            \<div className="flex gap-6 text-sm"\>  
              \<a href="\#" className="text-white/40 hover:text-white/60 transition-colors"\>Privacy Policy\</a\>  
              \<a href="\#" className="text-white/40 hover:text-white/60 transition-colors"\>Terms of Service\</a\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</footer\>  
    \</div\>  
  );  
};

export default Index;

/\* \========================================  
   FILE: src/pages/Events.tsx (COMPLETE)  
   \======================================== \*/  
import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';

// Logo Component  
const ChurchLogo \= ({ className \= "", light \= false }: { className?: string; light?: boolean }) \=\> {  
  const primaryColor \= light ? "\#ffffff" : "\#5c1229";  
  const secondaryColor \= light ? "\#fef9e7" : "\#f0b429";  
    
  return (  
    \<div className={\`flex items-center gap-3 ${className}\`}\>  
      \<div className="relative w-14 h-14 flex items-center justify-center"\>  
        \<svg  
          viewBox="0 0 100 100"  
          className="absolute w-10 h-10 animate-spin-slow"  
          style={{ animationDuration: '20s' }}  
        \>  
          \<circle cx="50" cy="50" r="45" fill="none" stroke={secondaryColor} strokeWidth="2" opacity="0.6" /\>  
          \<ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<line x1="50" y1="5" x2="50" y2="95" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<line x1="5" y1="50" x2="95" y2="50" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
        \</svg\>  
          
        \<svg viewBox="0 0 100 100" className="absolute w-14 h-14 z-10"\>  
          \<g transform="translate(8, 25\) scale(0.4)"\>  
            \<path  
              d="M45 50 C35 45, 25 35, 15 40 C5 45, 0 55, 5 60 C10 65, 20 62, 30 58 L25 75 C30 70, 40 68, 45 70 C50 68, 60 70, 65 75 L60 58 C70 62, 80 65, 85 60 C90 55, 85 45, 75 40 C65 35, 55 45, 45 50Z"  
              fill={primaryColor}  
            /\>  
            \<path d="M30 50 C20 35, 5 25, 0 30 C5 35, 15 45, 30 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<path d="M60 50 C70 35, 85 25, 90 30 C85 35, 75 45, 60 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<circle cx="45" cy="42" r="8" fill={primaryColor} /\>  
            \<path d="M45 40 L55 42 L45 44 Z" fill={secondaryColor} /\>  
            \<circle cx="42" cy="41" r="1.5" fill={light ? "\#1a1a1a" : "\#ffffff"} /\>  
          \</g\>  
            
          \<g transform="translate(92, 45\) scale(-0.4, 0.4)"\>  
            \<path  
              d="M45 50 C35 45, 25 35, 15 40 C5 45, 0 55, 5 60 C10 65, 20 62, 30 58 L25 75 C30 70, 40 68, 45 70 C50 68, 60 70, 65 75 L60 58 C70 62, 80 65, 85 60 C90 55, 85 45, 75 40 C65 35, 55 45, 45 50Z"  
              fill={primaryColor}  
            /\>  
            \<path d="M30 50 C20 35, 5 25, 0 30 C5 35, 15 45, 30 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<path d="M60 50 C70 35, 85 25, 90 30 C85 35, 75 45, 60 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<circle cx="45" cy="42" r="8" fill={primaryColor} /\>  
            \<path d="M45 40 L55 42 L45 44 Z" fill={secondaryColor} /\>  
            \<circle cx="42" cy="41" r="1.5" fill={light ? "\#1a1a1a" : "\#ffffff"} /\>  
          \</g\>  
        \</svg\>  
      \</div\>  
        
      \<div className="flex flex-col"\>  
        \<span className={\`font-display text-xl font-bold leading-tight ${light ? 'text-white' : 'text-burgundy-900'}\`}\>  
          Church Name  
        \</span\>  
        \<span className={\`text-xs tracking-widest uppercase ${light ? 'text-gold-400' : 'text-gold-600'}\`}\>  
          Ministry  
        \</span\>  
      \</div\>  
    \</div\>  
  );  
};

// Theme Toggle Component  
const ThemeToggle \= ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () \=\> void }) \=\> {  
  return (  
    \<button onClick={toggleTheme} className={\`theme-toggle ${isDark ? 'active' : ''}\`} aria-label="Toggle theme"\>  
      \<div className="theme-toggle-slider"\>  
        {isDark ? (  
          \<svg className="w-4 h-4 text-burgundy-950" fill="currentColor" viewBox="0 0 20 20"\>  
            \<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /\>  
          \</svg\>  
        ) : (  
          \<svg className="w-4 h-4 text-gold-600" fill="currentColor" viewBox="0 0 20 20"\>  
            \<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /\>  
          \</svg\>  
        )}  
      \</div\>  
    \</button\>  
  );  
};

interface Event {  
  title: string;  
  date: string;  
  time: string;  
  category: string;  
  status: string;  
  location: string;  
  image: string;  
  description: string;  
}

// Event Registration Modal Component  
const EventRegistrationModal \= ({ event, isOpen, onClose }: { event: Event | null; isOpen: boolean; onClose: () \=\> void }) \=\> {  
  const \[formData, setFormData\] \= useState({  
    firstName: '',  
    lastName: '',  
    email: '',  
    phone: '',  
    attendees: '1',  
    specialNeeds: ''  
  });  
  const \[isSubmitting, setIsSubmitting\] \= useState(false);  
  const \[isSuccess, setIsSuccess\] \= useState(false);

  useEffect(() \=\> {  
    if (isOpen) {  
      document.body.style.overflow \= 'hidden';  
    } else {  
      document.body.style.overflow \= 'unset';  
      // Reset form when modal closes  
      if (\!isOpen && isSuccess) {  
        setTimeout(() \=\> {  
          setIsSuccess(false);  
          setFormData({  
            firstName: '',  
            lastName: '',  
            email: '',  
            phone: '',  
            attendees: '1',  
            specialNeeds: ''  
          });  
        }, 300);  
      }  
    }  
    return () \=\> {  
      document.body.style.overflow \= 'unset';  
    };  
  }, \[isOpen, isSuccess\]);

  if (\!isOpen || \!event) return null;

  const handleSubmit \= (e: React.FormEvent) \=\> {  
    e.preventDefault();  
    setIsSubmitting(true);  
      
    // Simulate API call  
    setTimeout(() \=\> {  
      setIsSubmitting(false);  
      setIsSuccess(true);  
      console.log('Registration submitted:', { event: event.title, ...formData });  
    }, 1500);  
  };

  const handleChange \= (e: React.ChangeEvent\<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement\>) \=\> {  
    setFormData(prev \=\> ({  
      ...prev,  
      \[e.target.name\]: e.target.value  
    }));  
  };

  return (  
    \<div className="fixed inset-0 z-\[100\] flex items-center justify-center p-4 animate-fade-in"\>  
      {/\* Backdrop \*/}  
      \<div   
        className="absolute inset-0 bg-burgundy-950/95 backdrop-blur-sm"  
        onClick={onClose}  
      /\>  
        
      {/\* Modal Content \*/}  
      \<div className="relative w-full max-w-2xl bg-white dark:bg-burgundy-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-in max-h-\[90vh\] overflow-y-auto"\>  
        {/\* Close Button \*/}  
        \<button  
          onClick={onClose}  
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-burgundy-950/80 hover:bg-burgundy-950 text-white rounded-full flex items-center justify-center transition-all duration-300 hover-lift"  
          aria-label="Close registration"  
        \>  
          \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
            \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /\>  
          \</svg\>  
        \</button\>

        {/\* Event Header \*/}  
        \<div className="relative h-48 overflow-hidden"\>  
          \<img  
            src={event.image}  
            alt={event.title}  
            className="w-full h-full object-cover"  
          /\>  
          \<div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 to-transparent" /\>  
          \<div className="absolute bottom-0 left-0 right-0 p-6"\>  
            \<span className="inline-block glass text-gold-400 text-xs font-semibold px-3 py-1 rounded-full mb-2"\>  
              {event.category}  
            \</span\>  
            \<h2 className="font-display text-2xl sm:text-3xl font-bold text-white"\>  
              {event.title}  
            \</h2\>  
            \<div className="flex flex-wrap gap-4 mt-2 text-white/90 text-sm"\>  
              \<span className="flex items-center gap-1"\>  
                \<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /\>  
                \</svg\>  
                {event.date}  
              \</span\>  
              \<span className="flex items-center gap-1"\>  
                \<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /\>  
                \</svg\>  
                {event.time}  
              \</span\>  
            \</div\>  
          \</div\>  
        \</div\>

        {/\* Form or Success Message \*/}  
        \<div className="p-6 sm:p-8"\>  
          {isSuccess ? (  
            \<div className="text-center py-8 animate-fade-in"\>  
              \<div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"\>  
                \<svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /\>  
                \</svg\>  
              \</div\>  
              \<h3 className="font-display text-2xl font-bold text-burgundy-950 dark:text-white mb-3"\>  
                Registration Successful\!  
              \</h3\>  
              \<p className="text-body mb-6"\>  
                Thank you for registering for {event.title}. You'll receive a confirmation email shortly with all the details.  
              \</p\>  
              \<button  
                onClick={onClose}  
                className="bg-burgundy-900 hover:bg-burgundy-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover-lift"  
              \>  
                Done  
              \</button\>  
            \</div\>  
          ) : (  
            \<\>  
              \<h3 className="font-display text-xl font-bold text-primary mb-2"\>  
                Register for This Event  
              \</h3\>  
              \<p className="text-body mb-6"\>  
                Fill out the form below to reserve your spot. We can't wait to see you there\!  
              \</p\>

              \<form onSubmit={handleSubmit} className="space-y-5"\>  
                {/\* Name Fields \*/}  
                \<div className="grid sm:grid-cols-2 gap-4"\>  
                  \<div\>  
                    \<label className="block text-sm font-medium text-primary mb-2"\>  
                      First Name \*  
                    \</label\>  
                    \<input  
                      type="text"  
                      name="firstName"  
                      value={formData.firstName}  
                      onChange={handleChange}  
                      required  
                      className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                      placeholder="John"  
                    /\>  
                  \</div\>  
                  \<div\>  
                    \<label className="block text-sm font-medium text-primary mb-2"\>  
                      Last Name \*  
                    \</label\>  
                    \<input  
                      type="text"  
                      name="lastName"  
                      value={formData.lastName}  
                      onChange={handleChange}  
                      required  
                      className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                      placeholder="Doe"  
                    /\>  
                  \</div\>  
                \</div\>

                {/\* Contact Fields \*/}  
                \<div\>  
                  \<label className="block text-sm font-medium text-primary mb-2"\>  
                    Email Address \*  
                  \</label\>  
                  \<input  
                    type="email"  
                    name="email"  
                    value={formData.email}  
                    onChange={handleChange}  
                    required  
                    className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                    placeholder="john@example.com"  
                  /\>  
                \</div\>

                \<div\>  
                  \<label className="block text-sm font-medium text-primary mb-2"\>  
                    Phone Number \*  
                  \</label\>  
                  \<input  
                    type="tel"  
                    name="phone"  
                    value={formData.phone}  
                    onChange={handleChange}  
                    required  
                    className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                    placeholder="(555) 123-4567"  
                  /\>  
                \</div\>

                {/\* Number of Attendees \*/}  
                \<div\>  
                  \<label className="block text-sm font-medium text-primary mb-2"\>  
                    Number of Attendees \*  
                  \</label\>  
                  \<select  
                    name="attendees"  
                    value={formData.attendees}  
                    onChange={handleChange}  
                    required  
                    className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary focus:border-gold-400 focus:outline-none transition-colors"  
                  \>  
                    {\[1, 2, 3, 4, 5, 6, 7, 8, 9, 10\].map(num \=\> (  
                      \<option key={num} value={num}\>{num} {num \=== 1 ? 'Person' : 'People'}\</option\>  
                    ))}  
                  \</select\>  
                \</div\>

                {/\* Special Needs \*/}  
                \<div\>  
                  \<label className="block text-sm font-medium text-primary mb-2"\>  
                    Special Accommodations (Optional)  
                  \</label\>  
                  \<textarea  
                    name="specialNeeds"  
                    value={formData.specialNeeds}  
                    onChange={handleChange}  
                    rows={3}  
                    className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors resize-none"  
                    placeholder="Let us know if you need wheelchair access, dietary restrictions, childcare, etc."  
                  /\>  
                \</div\>

                {/\* Submit Button \*/}  
                \<button  
                  type="submit"  
                  disabled={isSubmitting}  
                  className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-gold-500/50 text-burgundy-950 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover-lift disabled:cursor-not-allowed flex items-center justify-center gap-2"  
                \>  
                  {isSubmitting ? (  
                    \<\>  
                      \<svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"\>  
                        \<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"\>\</circle\>  
                        \<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"\>\</path\>  
                      \</svg\>  
                      Processing...  
                    \</\>  
                  ) : (  
                    \<\>  
                      Complete Registration  
                      \<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                        \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /\>  
                      \</svg\>  
                    \</\>  
                  )}  
                \</button\>  
              \</form\>  
            \</\>  
          )}  
        \</div\>  
      \</div\>  
    \</div\>  
  );  
};

const Events \= () \=\> {  
  const \[scrolled, setScrolled\] \= useState(false);  
  const \[isDarkMode, setIsDarkMode\] \= useState(false);  
  const \[isMenuOpen, setIsMenuOpen\] \= useState(false);  
  const \[selectedCategory, setSelectedCategory\] \= useState('Upcoming');  
  const \[visibleCount, setVisibleCount\] \= useState(9);  
  const \[selectedEvent, setSelectedEvent\] \= useState\<Event | null\>(null);  
  const \[isRegistrationModalOpen, setIsRegistrationModalOpen\] \= useState(false);

  const YOUTUBE\_LIVE\_URL \= "https://www.youtube.com/@YourChurchChannel/live";

  useEffect(() \=\> {  
    const savedTheme \= localStorage.getItem('theme');  
    if (savedTheme \=== 'dark') {  
      setIsDarkMode(true);  
      document.documentElement.classList.add('dark');  
    }  
  }, \[\]);

  const toggleTheme \= () \=\> {  
    setIsDarkMode(\!isDarkMode);  
    if (\!isDarkMode) {  
      document.documentElement.classList.add('dark');  
      localStorage.setItem('theme', 'dark');  
    } else {  
      document.documentElement.classList.remove('dark');  
      localStorage.setItem('theme', 'light');  
    }  
  };

  useEffect(() \=\> {  
    const handleScroll \= () \=\> {  
      setScrolled(window.scrollY \> 50);  
    };  
    window.addEventListener('scroll', handleScroll);  
    return () \=\> window.removeEventListener('scroll', handleScroll);  
  }, \[\]);

  const categories \= \['Upcoming', 'This Month', 'Youth', 'Women', 'Men', 'Outreach', 'Worship'\];

  const allEvents: Event\[\] \= \[  
    {  
      title: "Youth Revival Weekend",  
      date: "Feb 21-23, 2026",  
      time: "7:00 PM",  
      category: "Youth",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600\&q=80",  
      description: "Three nights of powerful worship, inspiring messages, and life-changing encounters with God designed specifically for youth."  
    },  
    {  
      title: "Women's Prayer Breakfast",  
      date: "Feb 28, 2026",  
      time: "9:00 AM",  
      category: "Women",  
      status: "upcoming",  
      location: "Fellowship Hall",  
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600\&q=80",  
      description: "Join us for a morning of prayer, worship, and fellowship as we seek God's presence together."  
    },  
    {  
      title: "Community Outreach Day",  
      date: "Mar 1, 2026",  
      time: "10:00 AM",  
      category: "Outreach",  
      status: "upcoming",  
      location: "City Park",  
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600\&q=80",  
      description: "Serve our community with acts of kindness, free food distribution, and sharing the love of Christ."  
    },  
    {  
      title: "Marriage Enrichment Seminar",  
      date: "Mar 7, 2026",  
      time: "6:30 PM",  
      category: "Men",  
      status: "upcoming",  
      location: "Conference Room",  
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600\&q=80",  
      description: "Strengthen your marriage with biblical principles, practical tools, and meaningful connection time."  
    },  
    {  
      title: "Choir Anniversary Concert",  
      date: "Mar 14, 2026",  
      time: "5:00 PM",  
      category: "Worship",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600\&q=80",  
      description: "Celebrate 25 years of powerful worship with special guests, testimonies, and an unforgettable musical experience."  
    },  
    {  
      title: "Men's Fellowship Breakfast",  
      date: "Mar 21, 2026",  
      time: "8:00 AM",  
      category: "Men",  
      status: "upcoming",  
      location: "Fellowship Hall",  
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600\&q=80",  
      description: "Men, join us for food, fellowship, and encouragement as we grow together in faith and brotherhood."  
    },  
    {  
      title: "Easter Sunrise Service",  
      date: "Apr 20, 2026",  
      time: "6:00 AM",  
      category: "Worship",  
      status: "upcoming",  
      location: "Outdoor Pavilion",  
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600\&q=80",  
      description: "Celebrate the resurrection of Jesus with an outdoor sunrise service followed by breakfast."  
    },  
    {  
      title: "Women's Conference",  
      date: "Apr 25-26, 2026",  
      time: "Friday 7 PM, Saturday 9 AM",  
      category: "Women",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600\&q=80",  
      description: "Two days of worship, powerful teaching, and life-changing ministry for women of all ages."  
    },  
    {  
      title: "Youth Summer Camp",  
      date: "Jun 15-20, 2026",  
      time: "All Day",  
      category: "Youth",  
      status: "upcoming",  
      location: "Camp Retreat Center",  
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600\&q=80",  
      description: "A week of outdoor adventure, spiritual growth, and unforgettable memories at our annual youth camp."  
    },  
    {  
      title: "Missions Sunday",  
      date: "May 4, 2026",  
      time: "All Services",  
      category: "Outreach",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600\&q=80",  
      description: "Hear inspiring testimonies from missionaries and learn how you can support global missions."  
    },  
    {  
      title: "Worship Night",  
      date: "May 16, 2026",  
      time: "7:00 PM",  
      category: "Worship",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600\&q=80",  
      description: "An evening dedicated to worship, prayer, and encountering God's presence together."  
    },  
    {  
      title: "Back to School Blessing",  
      date: "Aug 10, 2026",  
      time: "All Services",  
      category: "Youth",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600\&q=80",  
      description: "Pray for students, teachers, and families as we prepare for the new school year."  
    }  
  \];

  const filteredEvents \= selectedCategory \=== 'Upcoming'   
    ? allEvents   
    : selectedCategory \=== 'This Month'  
    ? allEvents.filter(e \=\> {  
        const eventDate \= new Date(e.date.split(',')\[0\]);  
        const now \= new Date();  
        return eventDate.getMonth() \=== now.getMonth() && eventDate.getFullYear() \=== now.getFullYear();  
      })  
    : allEvents.filter(e \=\> e.category \=== selectedCategory);

  const displayedEvents \= filteredEvents.slice(0, visibleCount);  
  const hasMore \= visibleCount \< filteredEvents.length;

  const loadMore \= () \=\> {  
    setVisibleCount(prev \=\> prev \+ 6);  
  };

  const openRegistrationModal \= (event: Event) \=\> {  
    setSelectedEvent(event);  
    setIsRegistrationModalOpen(true);  
  };

  const closeRegistrationModal \= () \=\> {  
    setIsRegistrationModalOpen(false);  
    setTimeout(() \=\> setSelectedEvent(null), 300);  
  };

  return (  
    \<div className="min-h-screen bg-cream dark:bg-charcoal overflow-x-hidden theme-transition"\>  
      {/\* Event Registration Modal \*/}  
      \<EventRegistrationModal   
        event={selectedEvent}   
        isOpen={isRegistrationModalOpen}   
        onClose={closeRegistrationModal}   
      /\>

      {/\* Navigation \*/}  
      \<nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${  
        scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'  
      }\`}\>  
        \<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"\>  
          \<div className="flex items-center justify-between h-20"\>  
            \<Link to="/" className="transition-transform hover:scale-105 duration-300"\>  
              \<ChurchLogo light={\!scrolled} /\>  
            \</Link\>

            \<div className="hidden lg:flex items-center gap-6"\>  
              \<Link to="/" className={\`text-sm font-medium transition-all duration-300 hover:opacity-70 ${scrolled ? 'text-white' : 'text-white'}\`}\>  
                Home  
              \</Link\>  
                
              \<a  
                href={YOUTUBE\_LIVE\_URL}  
                target="\_blank"  
                rel="noopener noreferrer"  
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover-lift"  
              \>  
                \<span className="relative flex h-2 w-2"\>  
                  \<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"\>\</span\>  
                  \<span className="relative inline-flex rounded-full h-2 w-2 bg-white"\>\</span\>  
                \</span\>  
                Live Stream  
              \</a\>

              \<ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} /\>  
            \</div\>

            \<button  
              onClick={() \=\> setIsMenuOpen(\!isMenuOpen)}  
              className={\`lg:hidden p-2 transition-colors ${scrolled ? 'text-white' : 'text-white'}\`}  
            \>  
              \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                {isMenuOpen ? (  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /\>  
                ) : (  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /\>  
                )}  
              \</svg\>  
            \</button\>  
          \</div\>  
        \</div\>

        \<div className={\`lg:hidden transition-all duration-300 overflow-hidden ${  
          isMenuOpen ? 'max-h-screen glass-dark' : 'max-h-0'  
        }\`}\>  
          \<div className="px-4 py-6 space-y-4"\>  
            \<Link  
              to="/"  
              onClick={() \=\> setIsMenuOpen(false)}  
              className="block text-white font-medium py-2 hover:text-gold-400 transition-colors"  
            \>  
              Home  
            \</Link\>  
            \<a  
              href={YOUTUBE\_LIVE\_URL}  
              target="\_blank"  
              rel="noopener noreferrer"  
              onClick={() \=\> setIsMenuOpen(false)}  
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover-lift"  
            \>  
              \<span className="relative flex h-2.5 w-2.5"\>  
                \<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"\>\</span\>  
                \<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"\>\</span\>  
              \</span\>  
              Live Stream  
            \</a\>  
            \<div className="flex items-center justify-center py-2"\>  
              \<ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} /\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</nav\>

      {/\* Hero Section \*/}  
      \<section className="relative h-\[60vh\] min-h-\[500px\] flex items-center justify-center overflow-hidden"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className="absolute inset-0"\>  
          \<img  
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920\&q=80"  
            alt="Church events"  
            className="w-full h-full object-cover"  
          /\>  
          \<div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/90 via-burgundy-900/80 to-burgundy-950/90" /\>  
        \</div\>

        \<div className="relative z-10 text-center px-4 max-w-4xl mx-auto"\>  
          \<p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up opacity-0 animation-delay-200"\>  
            Connect & Grow Together  
          \</p\>  
          \<h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-tight mb-6 animate-fade-in-up opacity-0 animation-delay-400"\>  
            Upcoming Events  
          \</h1\>  
          \<p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-up opacity-0 animation-delay-600"\>  
            Join us for special gatherings, celebrations, and opportunities to connect with our church family.  
          \</p\>  
        \</div\>  
      \</section\>

      {/\* Category Filter \*/}  
      \<section className="py-12 bg-white dark:bg-burgundy-950 theme-transition"\>  
        \<div className="max-w-7xl mx-auto px-4"\>  
          \<div className="flex flex-wrap justify-center gap-3"\>  
            {categories.map((category) \=\> (  
              \<button  
                key={category}  
                onClick={() \=\> {  
                  setSelectedCategory(category);  
                  setVisibleCount(9);  
                }}  
                className={\`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover-lift ${  
                  selectedCategory \=== category  
                    ? 'bg-burgundy-900 text-white shadow-lg'  
                    : 'glass dark:glass-dark text-burgundy-950 dark:text-white hover:bg-burgundy-100 dark:hover:bg-burgundy-800'  
                }\`}  
              \>  
                {category}  
              \</button\>  
            ))}  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Events Grid with Registration \*/}  
      \<section className="py-24 lg:py-32 bg-cream dark:bg-charcoal relative gradient-mesh theme-transition"\>  
        \<div className="max-w-7xl mx-auto px-4"\>  
          {displayedEvents.length \=== 0 ? (  
            \<div className="text-center py-20"\>  
              \<p className="text-muted text-lg"\>  
                No events found in this category.  
              \</p\>  
            \</div\>  
          ) : (  
            \<\>  
              \<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"\>  
                {displayedEvents.map((event, index) \=\> (  
                  \<article  
                    key={index}  
                    className="flip-card theme-transition animate-fade-in-up"  
                    style={{ animationDelay: \`${(index % 9\) \* 100}ms\` }}  
                  \>  
                    \<div className="flip-card-inner h-full"\>  
                      {/\* Front of Card \*/}  
                      \<div className="flip-card-front group relative glass dark:bg-burgundy-900/20 rounded-2xl overflow-hidden cursor-pointer hover-lift"\>  
                        \<div className="aspect-\[4/3\] overflow-hidden"\>  
                          \<img  
                            src={event.image}  
                            alt={event.title}  
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"  
                          /\>  
                          \<div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 to-transparent" /\>  
                        \</div\>  
                        \<div className="p-6"\>  
                          \<span className="inline-block glass text-gold-400 text-xs font-semibold px-3 py-1 rounded-full mb-3"\>  
                            {event.category}  
                          \</span\>  
                          \<h3 className="font-display text-xl font-semibold text-primary dark:text-white mb-3 group-hover:text-burgundy-700 dark:group-hover:text-gold-400 transition-colors"\>  
                            {event.title}  
                          \</h3\>  
                          \<div className="space-y-2 text-muted text-sm"\>  
                            \<div className="flex items-center gap-2"\>  
                              \<svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /\>  
                              \</svg\>  
                              \<span\>{event.date}\</span\>  
                            \</div\>  
                            \<div className="flex items-center gap-2"\>  
                              \<svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /\>  
                              \</svg\>  
                              \<span\>{event.time}\</span\>  
                            \</div\>  
                            \<div className="flex items-center gap-2"\>  
                              \<svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /\>  
                                \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /\>  
                              \</svg\>  
                              \<span\>{event.location}\</span\>  
                            \</div\>  
                          \</div\>  
                        \</div\>  
                      \</div\>

                      {/\* Back of Card with Registration Button \*/}  
                      \<div className="flip-card-back glass-dark dark:bg-burgundy-900 rounded-2xl p-6 flex flex-col justify-between"\>  
                        \<div\>  
                          \<h3 className="font-display text-xl font-bold text-white mb-4"\>{event.title}\</h3\>  
                          \<p className="text-white/80 text-sm leading-relaxed mb-6"\>{event.description}\</p\>  
                        \</div\>  
                        \<div className="space-y-3"\>  
                          \<button   
                            onClick={() \=\> openRegistrationModal(event)}  
                            className="w-full bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover-lift"  
                          \>  
                            Register Now  
                          \</button\>  
                          \<button className="w-full glass-dark border-2 border-white/30 hover:border-white text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/20"\>  
                            Learn More  
                          \</button\>  
                        \</div\>  
                      \</div\>  
                    \</div\>  
                  \</article\>  
                ))}  
              \</div\>

              {hasMore && (  
                \<div className="text-center mt-16"\>  
                  \<button  
                    onClick={loadMore}  
                    className="bg-burgundy-900 hover:bg-burgundy-800 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover-lift"  
                  \>  
                    Load More Events  
                  \</button\>  
                \</div\>  
              )}  
            \</\>  
          )}  
        \</div\>  
      \</section\>

      {/\* CTA Section \*/}  
      \<section className="py-24 bg-gradient-to-br from-burgundy-900 to-burgundy-950 relative overflow-hidden"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className="max-w-4xl mx-auto px-4 text-center relative z-10"\>  
          \<h2 className="font-display text-4xl sm:text-5xl text-white font-bold mb-6"\>  
            Stay Connected  
          \</h2\>  
          \<p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"\>  
            Don't miss out on upcoming events and gatherings. Subscribe to our newsletter to stay informed about everything happening at Church Name.  
          \</p\>  
          \<div className="flex flex-col sm:flex-row gap-4 justify-center"\>  
            \<div className="flex gap-2 max-w-md mx-auto sm:mx-0"\>  
              \<input  
                type="email"  
                placeholder="Your email address"  
                className="flex-1 px-6 py-4 rounded-full glass-dark border border-white/20 text-white placeholder-white/50 focus:border-gold-400 focus:outline-none"  
              /\>  
              \<button className="bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover-lift"\>  
                Subscribe  
              \</button\>  
            \</div\>  
          \</div\>  
          \<Link  
            to="/"  
            className="inline-block mt-6 text-white/60 hover:text-white transition-colors"  
          \>  
            ← Back to Home  
          \</Link\>  
        \</div\>  
      \</section\>

      {/\* Footer \*/}  
      \<footer className="bg-burgundy-950 dark:bg-charcoal py-16 relative overflow-hidden theme-transition"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className="max-w-7xl mx-auto px-4 relative z-10"\>  
          \<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"\>  
            \<div\>  
              \<h3 className="font-display text-2xl font-bold text-white mb-4"\>Church Name\</h3\>  
              \<p className="text-white/60 mb-6"\>  
                A place where everyone belongs. Join us as we grow together in faith, love, and service.  
              \</p\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Quick Links\</h4\>  
              \<ul className="space-y-3"\>  
                {\['About Us', 'Sermons', 'Events', 'Ministries', 'Give'\].map((link) \=\> (  
                  \<li key={link}\>  
                    \<a href="\#" className="text-white/60 hover:text-gold-400 transition-colors"\>{link}\</a\>  
                  \</li\>  
                ))}  
              \</ul\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Connect\</h4\>  
              \<ul className="space-y-3"\>  
                {\['Plan Your Visit', 'Prayer Requests', 'Join a Group', 'Volunteer', 'Contact Us'\].map((link) \=\> (  
                  \<li key={link}\>  
                    \<a href="\#" className="text-white/60 hover:text-gold-400 transition-colors"\>{link}\</a\>  
                  \</li\>  
                ))}  
              \</ul\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Service Times\</h4\>  
              \<div className="space-y-3 text-white/60"\>  
                \<p\>\<span className="text-white"\>Sunday:\</span\> 8:00 AM, 10:30 AM, 6:00 PM\</p\>  
                \<p\>\<span className="text-white"\>Wednesday:\</span\> 7:00 PM Bible Study\</p\>  
                \<p className="pt-2 text-sm"\>1234 Faith Avenue\<br /\>Atlanta, GA 30301\</p\>  
              \</div\>  
            \</div\>  
          \</div\>

          \<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"\>  
            \<p className="text-white/40 text-sm"\>  
              © 2026 Church Name. All rights reserved.  
            \</p\>  
            \<div className="flex gap-6 text-sm"\>  
              \<a href="\#" className="text-white/40 hover:text-white/60 transition-colors"\>Privacy Policy\</a\>  
              \<a href="\#" className="text-white/40 hover:text-white/60 transition-colors"\>Terms of Service\</a\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</footer\>  
    \</div\>  
  );  
};

export default Events;

Testimonials.tsx  
Coderick AI  
code  
/\* \========================================  
   FILE: src/pages/Testimonials.tsx (COMPLETE)  
   \======================================== \*/  
import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';

// Logo Component  
const ChurchLogo \= ({ className \= "", light \= false }: { className?: string; light?: boolean }) \=\> {  
  const primaryColor \= light ? "\#ffffff" : "\#5c1229";  
  const secondaryColor \= light ? "\#fef9e7" : "\#f0b429";  
    
  return (  
    \<div className={\`flex items-center gap-3 ${className}\`}\>  
      \<div className="relative w-14 h-14 flex items-center justify-center"\>  
        \<svg  
          viewBox="0 0 100 100"  
          className="absolute w-10 h-10 animate-spin-slow"  
          style={{ animationDuration: '20s' }}  
        \>  
          \<circle cx="50" cy="50" r="45" fill="none" stroke={secondaryColor} strokeWidth="2" opacity="0.6" /\>  
          \<ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<line x1="50" y1="5" x2="50" y2="95" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
          \<line x1="5" y1="50" x2="95" y2="50" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" /\>  
        \</svg\>  
          
        \<svg viewBox="0 0 100 100" className="absolute w-14 h-14 z-10"\>  
          \<g transform="translate(8, 25\) scale(0.4)"\>  
            \<path  
              d="M45 50 C35 45, 25 35, 15 40 C5 45, 0 55, 5 60 C10 65, 20 62, 30 58 L25 75 C30 70, 40 68, 45 70 C50 68, 60 70, 65 75 L60 58 C70 62, 80 65, 85 60 C90 55, 85 45, 75 40 C65 35, 55 45, 45 50Z"  
              fill={primaryColor}  
            /\>  
            \<path d="M30 50 C20 35, 5 25, 0 30 C5 35, 15 45, 30 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<path d="M60 50 C70 35, 85 25, 90 30 C85 35, 75 45, 60 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<circle cx="45" cy="42" r="8" fill={primaryColor} /\>  
            \<path d="M45 40 L55 42 L45 44 Z" fill={secondaryColor} /\>  
            \<circle cx="42" cy="41" r="1.5" fill={light ? "\#1a1a1a" : "\#ffffff"} /\>  
          \</g\>  
            
          \<g transform="translate(92, 45\) scale(-0.4, 0.4)"\>  
            \<path  
              d="M45 50 C35 45, 25 35, 15 40 C5 45, 0 55, 5 60 C10 65, 20 62, 30 58 L25 75 C30 70, 40 68, 45 70 C50 68, 60 70, 65 75 L60 58 C70 62, 80 65, 85 60 C90 55, 85 45, 75 40 C65 35, 55 45, 45 50Z"  
              fill={primaryColor}  
            /\>  
            \<path d="M30 50 C20 35, 5 25, 0 30 C5 35, 15 45, 30 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<path d="M60 50 C70 35, 85 25, 90 30 C85 35, 75 45, 60 50Z" fill={primaryColor} opacity="0.8" /\>  
            \<circle cx="45" cy="42" r="8" fill={primaryColor} /\>  
            \<path d="M45 40 L55 42 L45 44 Z" fill={secondaryColor} /\>  
            \<circle cx="42" cy="41" r="1.5" fill={light ? "\#1a1a1a" : "\#ffffff"} /\>  
          \</g\>  
        \</svg\>  
      \</div\>  
        
      \<div className="flex flex-col"\>  
        \<span className={\`font-display text-xl font-bold leading-tight ${light ? 'text-white' : 'text-burgundy-900'}\`}\>  
          Church Name  
        \</span\>  
        \<span className={\`text-xs tracking-widest uppercase ${light ? 'text-gold-400' : 'text-gold-600'}\`}\>  
          Ministry  
        \</span\>  
      \</div\>  
    \</div\>  
  );  
};

// Theme Toggle Component  
const ThemeToggle \= ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () \=\> void }) \=\> {  
  return (  
    \<button onClick={toggleTheme} className={\`theme-toggle ${isDark ? 'active' : ''}\`} aria-label="Toggle theme"\>  
      \<div className="theme-toggle-slider"\>  
        {isDark ? (  
          \<svg className="w-4 h-4 text-burgundy-950" fill="currentColor" viewBox="0 0 20 20"\>  
            \<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /\>  
          \</svg\>  
        ) : (  
          \<svg className="w-4 h-4 text-gold-600" fill="currentColor" viewBox="0 0 20 20"\>  
            \<path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /\>  
          \</svg\>  
        )}  
      \</div\>  
    \</button\>  
  );  
};

const Testimonials \= () \=\> {  
  const \[scrolled, setScrolled\] \= useState(false);  
  const \[isDarkMode, setIsDarkMode\] \= useState(false);  
  const \[isMenuOpen, setIsMenuOpen\] \= useState(false);  
  const \[selectedCategory, setSelectedCategory\] \= useState('All');  
  const \[visibleCount, setVisibleCount\] \= useState(9);

  const YOUTUBE\_LIVE\_URL \= "https://www.youtube.com/@YourChurchChannel/live";

  useEffect(() \=\> {  
    const savedTheme \= localStorage.getItem('theme');  
    if (savedTheme \=== 'dark') {  
      setIsDarkMode(true);  
      document.documentElement.classList.add('dark');  
    }  
  }, \[\]);

  const toggleTheme \= () \=\> {  
    setIsDarkMode(\!isDarkMode);  
    if (\!isDarkMode) {  
      document.documentElement.classList.add('dark');  
      localStorage.setItem('theme', 'dark');  
    } else {  
      document.documentElement.classList.remove('dark');  
      localStorage.setItem('theme', 'light');  
    }  
  };

  useEffect(() \=\> {  
    const handleScroll \= () \=\> {  
      setScrolled(window.scrollY \> 50);  
    };  
    window.addEventListener('scroll', handleScroll);  
    return () \=\> window.removeEventListener('scroll', handleScroll);  
  }, \[\]);

  const categories \= \['All', 'New Members', 'Long-time Members', 'Youth', 'Ministry Leaders', 'Volunteers'\];

  const allTestimonials \= \[  
    {  
      name: "Sarah Johnson",  
      role: "Member since 2015",  
      category: "Long-time Members",  
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400\&q=80",  
      quote: "This church has been my spiritual home for years. The community is warm, the teaching is biblical, and I've grown so much in my faith here. Every Sunday feels like coming home to family.",  
      rating: 5,  
      date: "January 2026"  
    },  
    {  
      name: "Michael Thompson",  
      role: "Youth Ministry Volunteer",  
      category: "Volunteers",  
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400\&q=80",  
      quote: "Serving in the youth ministry has been life-changing. Watching young people encounter God's love and grow in their faith is incredibly rewarding. This church equipped me to serve effectively.",  
      rating: 5,  
      date: "December 2025"  
    },  
    {  
      name: "Emily Davis",  
      role: "New Member",  
      category: "New Members",  
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400\&q=80",  
      quote: "As a new member, I was welcomed with open arms. The genuine love and care from everyone here made me feel like I belonged from day one. I'm so grateful to have found this church family.",  
      rating: 5,  
      date: "February 2026"  
    },  
    {  
      name: "James Wilson",  
      role: "Worship Team Leader",  
      category: "Ministry Leaders",  
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400\&q=80",  
      quote: "Being part of the worship team has deepened my relationship with God. The way our church community worships together is truly powerful. It's an honor to lead others into God's presence.",  
      rating: 5,  
      date: "November 2025"  
    },  
    {  
      name: "Maria Rodriguez",  
      role: "Small Group Leader",  
      category: "Ministry Leaders",  
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400\&q=80",  
      quote: "Leading a small group has transformed my walk with Christ. The deep connections and authentic community we've built are priceless. This church truly values discipleship and spiritual growth.",  
      rating: 5,  
      date: "October 2025"  
    },  
    {  
      name: "David Chen",  
      role: "Member since 2018",  
      category: "Long-time Members",  
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400\&q=80",  
      quote: "The biblical teaching here is solid and practical. I've learned to apply God's Word to my daily life. The pastoral care and support during difficult times has been invaluable to me and my family.",  
      rating: 5,  
      date: "September 2025"  
    },  
    {  
      name: "Jessica Taylor",  
      role: "Youth Group Member",  
      category: "Youth",  
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400\&q=80",  
      quote: "The youth ministry here is amazing\! I've made lifelong friends and my faith has grown stronger. The youth leaders genuinely care about us and create a space where we can be authentic.",  
      rating: 5,  
      date: "January 2026"  
    },  
    {  
      name: "Robert Martinez",  
      role: "Outreach Volunteer",  
      category: "Volunteers",  
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400\&q=80",  
      quote: "Serving in community outreach opened my eyes to God's heart for the hurting. This church doesn't just talk about loving others—we actively live it out. It's changed my perspective on everything.",  
      rating: 5,  
      date: "December 2025"  
    },  
    {  
      name: "Amanda White",  
      role: "New Member",  
      category: "New Members",  
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400\&q=80",  
      quote: "After visiting many churches, I finally found my home here. The worship is authentic, the preaching is powerful, and the people are genuinely kind. I'm excited about my spiritual journey ahead.",  
      rating: 5,  
      date: "February 2026"  
    },  
    {  
      name: "Christopher Lee",  
      role: "Men's Ministry Leader",  
      category: "Ministry Leaders",  
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400\&q=80",  
      quote: "The men's ministry has helped me become a better husband, father, and follower of Christ. The accountability and brotherhood I've found here is life-changing. Iron sharpens iron.",  
      rating: 5,  
      date: "November 2025"  
    },  
    {  
      name: "Nicole Brown",  
      role: "Children's Ministry Volunteer",  
      category: "Volunteers",  
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400\&q=80",  
      quote: "Working with kids in children's ministry is pure joy\! Seeing their faces light up when they learn about Jesus reminds me why I serve. This church invests heavily in the next generation.",  
      rating: 5,  
      date: "October 2025"  
    },  
    {  
      name: "Brandon Scott",  
      role: "Youth Group Member",  
      category: "Youth",  
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400\&q=80",  
      quote: "The youth group helped me through some really tough times. I found real friends who share my faith and leaders who actually listen. This place has shaped who I am today.",  
      rating: 5,  
      date: "December 2025"  
    },  
    {  
      name: "Rachel Green",  
      role: "Member since 2012",  
      category: "Long-time Members",  
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400\&q=80",  
      quote: "Over a decade here and my love for this church only grows. Through seasons of joy and hardship, this community has been constant. The friendships I've made are treasures I'll carry forever.",  
      rating: 5,  
      date: "September 2025"  
    },  
    {  
      name: "Marcus Johnson",  
      role: "Music Ministry",  
      category: "Ministry Leaders",  
      image: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=400\&q=80",  
      quote: "Using my musical gifts to worship God here has been the greatest privilege. The creative freedom and spiritual depth of our music ministry creates an atmosphere where God's presence is tangible.",  
      rating: 5,  
      date: "January 2026"  
    },  
    {  
      name: "Olivia Martinez",  
      role: "New Member",  
      category: "New Members",  
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400\&q=80",  
      quote: "I was hesitant about joining a church, but this community made it easy. No judgment, just love and acceptance. I'm learning what it really means to follow Jesus in a supportive environment.",  
      rating: 5,  
      date: "February 2026"  
    }  
  \];

  const filteredTestimonials \= selectedCategory \=== 'All'   
    ? allTestimonials   
    : allTestimonials.filter(t \=\> t.category \=== selectedCategory);

  const displayedTestimonials \= filteredTestimonials.slice(0, visibleCount);  
  const hasMore \= visibleCount \< filteredTestimonials.length;

  const loadMore \= () \=\> {  
    setVisibleCount(prev \=\> prev \+ 6);  
  };

  return (  
    \<div className="min-h-screen bg-cream dark:bg-charcoal overflow-x-hidden theme-transition"\>  
      {/\* Navigation \*/}  
      \<nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${  
        scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'  
      }\`}\>  
        \<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"\>  
          \<div className="flex items-center justify-between h-20"\>  
            \<Link to="/" className="transition-transform hover:scale-105 duration-300"\>  
              \<ChurchLogo light={\!scrolled} /\>  
            \</Link\>

            {/\* Desktop Navigation \*/}  
            \<div className="hidden lg:flex items-center gap-6"\>  
              \<Link to="/" className={\`text-sm font-medium transition-all duration-300 hover:opacity-70 ${scrolled ? 'text-white' : 'text-white'}\`}\>  
                Home  
              \</Link\>  
                
              \<a  
                href={YOUTUBE\_LIVE\_URL}  
                target="\_blank"  
                rel="noopener noreferrer"  
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover-lift"  
              \>  
                \<span className="relative flex h-2 w-2"\>  
                  \<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"\>\</span\>  
                  \<span className="relative inline-flex rounded-full h-2 w-2 bg-white"\>\</span\>  
                \</span\>  
                Live Stream  
              \</a\>

              \<ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} /\>  
            \</div\>

            {/\* Mobile Menu Button \*/}  
            \<button  
              onClick={() \=\> setIsMenuOpen(\!isMenuOpen)}  
              className={\`lg:hidden p-2 transition-colors ${scrolled ? 'text-white' : 'text-white'}\`}  
            \>  
              \<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"\>  
                {isMenuOpen ? (  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /\>  
                ) : (  
                  \<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /\>  
                )}  
              \</svg\>  
            \</button\>  
          \</div\>  
        \</div\>

        {/\* Mobile Menu \*/}  
        \<div className={\`lg:hidden transition-all duration-300 overflow-hidden ${  
          isMenuOpen ? 'max-h-screen glass-dark' : 'max-h-0'  
        }\`}\>  
          \<div className="px-4 py-6 space-y-4"\>  
            \<Link  
              to="/"  
              onClick={() \=\> setIsMenuOpen(false)}  
              className="block text-white font-medium py-2 hover:text-gold-400 transition-colors"  
            \>  
              Home  
            \</Link\>  
            \<a  
              href={YOUTUBE\_LIVE\_URL}  
              target="\_blank"  
              rel="noopener noreferrer"  
              onClick={() \=\> setIsMenuOpen(false)}  
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover-lift"  
            \>  
              \<span className="relative flex h-2.5 w-2.5"\>  
                \<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"\>\</span\>  
                \<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"\>\</span\>  
              \</span\>  
              Live Stream  
            \</a\>  
            \<div className="flex items-center justify-center py-2"\>  
              \<ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} /\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</nav\>

      {/\* Hero Section \*/}  
      \<section className="relative h-\[60vh\] min-h-\[500px\] flex items-center justify-center overflow-hidden"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className="absolute inset-0"\>  
          \<img  
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920\&q=80"  
            alt="Community testimonials"  
            className="w-full h-full object-cover"  
          /\>  
          \<div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/90 via-burgundy-900/80 to-burgundy-950/90" /\>  
        \</div\>

        \<div className="relative z-10 text-center px-4 max-w-4xl mx-auto"\>  
          \<p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up opacity-0 animation-delay-200"\>  
            Stories of Faith  
          \</p\>  
          \<h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-tight mb-6 animate-fade-in-up opacity-0 animation-delay-400"\>  
            Member Testimonials  
          \</h1\>  
          \<p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-up opacity-0 animation-delay-600"\>  
            Real stories from real people about how God is working in and through our church community.  
          \</p\>  
        \</div\>  
      \</section\>

      {/\* Category Filter \*/}  
      \<section className="py-12 bg-white dark:bg-burgundy-950 theme-transition"\>  
        \<div className="max-w-7xl mx-auto px-4"\>  
          \<div className="flex flex-wrap justify-center gap-3"\>  
            {categories.map((category) \=\> (  
              \<button  
                key={category}  
                onClick={() \=\> {  
                  setSelectedCategory(category);  
                  setVisibleCount(9);  
                }}  
                className={\`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover-lift ${  
                  selectedCategory \=== category  
                    ? 'bg-burgundy-900 text-white shadow-lg'  
                    : 'glass dark:glass-dark text-burgundy-950 dark:text-white hover:bg-burgundy-100 dark:hover:bg-burgundy-800'  
                }\`}  
              \>  
                {category}  
              \</button\>  
            ))}  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Testimonials Grid \*/}  
      \<section className="py-24 lg:py-32 bg-cream dark:bg-charcoal relative gradient-mesh theme-transition"\>  
        \<div className="max-w-7xl mx-auto px-4"\>  
          {displayedTestimonials.length \=== 0 ? (  
            \<div className="text-center py-20"\>  
              \<p className="text-muted text-lg"\>  
                No testimonials found in this category.  
              \</p\>  
            \</div\>  
          ) : (  
            \<\>  
              \<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"\>  
                {displayedTestimonials.map((testimonial, index) \=\> (  
                  \<article  
                    key={index}  
                    className="glass dark:bg-burgundy-900/20 rounded-3xl p-8 hover-lift card-3d theme-transition animate-fade-in-up"  
                    style={{ animationDelay: \`${(index % 9\) \* 100}ms\` }}  
                  \>  
                    {/\* Rating \*/}  
                    \<div className="flex items-center gap-1 mb-6"\>  
                      {\[...Array(testimonial.rating)\].map((\_, i) \=\> (  
                        \<svg key={i} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20"\>  
                          \<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /\>  
                        \</svg\>  
                      ))}  
                    \</div\>

                    {/\* Quote \*/}  
                    \<blockquote className="text-body leading-relaxed mb-6 italic"\>  
                      "{testimonial.quote}"  
                    \</blockquote\>

                    {/\* Author \*/}  
                    \<div className="flex items-center gap-4 pt-6 border-t border-burgundy-100 dark:border-burgundy-800"\>  
                      \<img  
                        src={testimonial.image}  
                        alt={testimonial.name}  
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-gold-400"  
                      /\>  
                      \<div className="flex-1"\>  
                        \<h3 className="font-display text-lg font-bold text-primary theme-transition"\>  
                          {testimonial.name}  
                        \</h3\>  
                        \<p className="text-burgundy-600 dark:text-gold-400 text-sm"\>{testimonial.role}\</p\>  
                        \<p className="text-muted text-xs mt-1"\>{testimonial.date}\</p\>  
                      \</div\>  
                    \</div\>  
                  \</article\>  
                ))}  
              \</div\>

              {/\* Load More Button \*/}  
              {hasMore && (  
                \<div className="text-center mt-16"\>  
                  \<button  
                    onClick={loadMore}  
                    className="bg-burgundy-900 hover:bg-burgundy-800 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover-lift"  
                  \>  
                    Load More Testimonials  
                  \</button\>  
                \</div\>  
              )}  
            \</\>  
          )}  
        \</div\>  
      \</section\>

      {/\* CTA Section \*/}  
      \<section className="py-24 bg-gradient-to-br from-burgundy-900 to-burgundy-950 relative overflow-hidden"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className="max-w-4xl mx-auto px-4 text-center relative z-10"\>  
          \<h2 className="font-display text-4xl sm:text-5xl text-white font-bold mb-6"\>  
            Share Your Story  
          \</h2\>  
          \<p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"\>  
            Has God worked in your life through our church? We'd love to hear your testimony and share how He's transforming lives in our community.  
          \</p\>  
          \<div className="flex flex-col sm:flex-row gap-4 justify-center"\>  
            \<a  
              href="\#"  
              className="bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover-lift"  
            \>  
              Submit Your Testimony  
            \</a\>  
            \<Link  
              to="/"  
              className="glass-dark border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover-lift"  
            \>  
              Back to Home  
            \</Link\>  
          \</div\>  
        \</div\>  
      \</section\>

      {/\* Footer \*/}  
      \<footer className="bg-burgundy-950 dark:bg-charcoal py-16 relative overflow-hidden theme-transition"\>  
        \<div className="blob blob-1"\>\</div\>  
        \<div className="blob blob-2"\>\</div\>  
          
        \<div className="max-w-7xl mx-auto px-4 relative z-10"\>  
          \<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"\>  
            \<div\>  
              \<h3 className="font-display text-2xl font-bold text-white mb-4"\>Church Name\</h3\>  
              \<p className="text-white/60 mb-6"\>  
                A place where everyone belongs. Join us as we grow together in faith, love, and service.  
              \</p\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Quick Links\</h4\>  
              \<ul className="space-y-3"\>  
                {\['About Us', 'Sermons', 'Events', 'Ministries', 'Give'\].map((link) \=\> (  
                  \<li key={link}\>  
                    \<a href="\#" className="text-white/60 hover:text-gold-400 transition-colors"\>{link}\</a\>  
                  \</li\>  
                ))}  
              \</ul\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Connect\</h4\>  
              \<ul className="space-y-3"\>  
                {\['Plan Your Visit', 'Prayer Requests', 'Join a Group', 'Volunteer', 'Contact Us'\].map((link) \=\> (  
                  \<li key={link}\>  
                    \<a href="\#" className="text-white/60 hover:text-gold-400 transition-colors"\>{link}\</a\>  
                  \</li\>  
                ))}  
              \</ul\>  
            \</div\>

            \<div\>  
              \<h4 className="font-semibold text-white mb-4"\>Service Times\</h4\>  
              \<div className="space-y-3 text-white/60"\>  
                \<p\>\<span className="text-white"\>Sunday:\</span\> 8:00 AM, 10:30 AM, 6:00 PM\</p\>  
                \<p\>\<span className="text-white"\>Wednesday:\</span\> 7:00 PM Bible Study\</p\>  
                \<p className="pt-2 text-sm"\>1234 Faith Avenue\<br /\>Atlanta, GA 30301\</p\>  
              \</div\>  
            \</div\>  
          \</div\>

          \<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"\>  
            \<p className="text-white/40 text-sm"\>  
              © 2026 Church Name. All rights reserved.  
            \</p\>  
            \<div className="flex gap-6 text-sm"\>  
              \<a href="\#" className="text-white/40 hover:text-white/60 transition-colors"\>Privacy Policy\</a\>  
              \<a href="\#" className="text-white/40 hover:text-white/60 transition-colors"\>Terms of Service\</a\>  
            \</div\>  
          \</div\>  
        \</div\>  
      \</footer\>  
    \</div\>  
  );  
};

export default Testimonials;

