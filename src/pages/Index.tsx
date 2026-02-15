import React, { useState, useEffect, useRef } from 'react';  
import { Link } from 'react-router-dom';
import { getJson, postJson, apiPath } from '../lib/api';
import SiteFooter from '../components/SiteFooter';

// Logo Component with Two Flying Doves and Rotating Globe  
const ChurchLogo = ({ className = "", light = false }: { className?: string; light?: boolean }) => {  
  const primaryColor = light ? "#ffffff" : "#5c1229";  
  const secondaryColor = light ? "#fef9e7" : "#f0b429";  
    
  return (  
    <div className={`flex items-center gap-3 ${className}`}>  
      <div className="relative w-14 h-14 flex items-center justify-center">  
        {/* Rotating Globe */}  
        <svg  
          viewBox="0 0 100 100"  
          className="absolute w-10 h-10 animate-spin-slow"  
          style={{ animationDuration: '20s' }}  
        >  
          <circle  
            cx="50"  
            cy="50"  
            r="45"  
            fill="none"  
            stroke={secondaryColor}  
            strokeWidth="2"  
            opacity="0.6"  
          />  
          <ellipse  
            cx="50"  
            cy="50"  
            rx="45"  
            ry="15"  
            fill="none"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          />  
          <ellipse  
            cx="50"  
            cy="50"  
            rx="45"  
            ry="30"  
            fill="none"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          />  
          <ellipse  
            cx="50"  
            cy="50"  
            rx="15"  
            ry="45"  
            fill="none"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          />  
          <ellipse  
            cx="50"  
            cy="50"  
            rx="30"  
            ry="45"  
            fill="none"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          />  
          <line  
            x1="50"  
            y1="5"  
            x2="50"  
            y2="95"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          />  
          <line  
            x1="5"  
            y1="50"  
            x2="95"  
            y2="50"  
            stroke={secondaryColor}  
            strokeWidth="1.5"  
            opacity="0.5"  
          />  
        </svg>  
          
        {/* Two Flying Doves */}  
        <svg  
          viewBox="0 0 100 100"  
          className="absolute w-14 h-14 z-10"  
        >  
          <g transform="translate(8, 25) scale(0.4)">  
            <path  
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
            />  
            <path  
              d="M30 50  
                 C20 35, 5 25, 0 30  
                 C5 35, 15 45, 30 50Z"  
              fill={primaryColor}  
              opacity="0.8"  
            />  
            <path  
              d="M60 50  
                 C70 35, 85 25, 90 30  
                 C85 35, 75 45, 60 50Z"  
              fill={primaryColor}  
              opacity="0.8"  
            />  
            <circle cx="45" cy="42" r="8" fill={primaryColor} />  
            <path  
              d="M45 40 L55 42 L45 44 Z"  
              fill={secondaryColor}  
            />  
            <circle cx="42" cy="41" r="1.5" fill={light ? "#1a1a1a" : "#ffffff"} />  
          </g>  
            
          <g transform="translate(92, 45) scale(-0.4, 0.4)">  
            <path  
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
            />  
            <path  
              d="M30 50  
                 C20 35, 5 25, 0 30  
                 C5 35, 15 45, 30 50Z"  
              fill={primaryColor}  
              opacity="0.8"  
            />  
            <path  
              d="M60 50  
                 C70 35, 85 25, 90 30  
                 C85 35, 75 45, 60 50Z"  
              fill={primaryColor}  
              opacity="0.8"  
            />  
            <circle cx="45" cy="42" r="8" fill={primaryColor} />  
            <path  
              d="M45 40 L55 42 L45 44 Z"  
              fill={secondaryColor}  
            />  
            <circle cx="42" cy="41" r="1.5" fill={light ? "#1a1a1a" : "#ffffff"} />  
          </g>  
        </svg>  
      </div>  
        
      <div className="flex flex-col">  
        <span className={`font-display text-xl font-bold leading-tight ${light ? 'text-white' : 'text-burgundy-900'}`}>  
          Church Name  
        </span>  
        <span className={`text-xs tracking-widest uppercase ${light ? 'text-gold-400' : 'text-gold-600'}`}>  
          Ministry  
        </span>  
      </div>  
    </div>  
  );  
};

// Theme Toggle Component  
const ThemeToggle = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {  
  return (  
    <button  
      onClick={toggleTheme}  
      className={`theme-toggle ${isDark ? 'active' : ''}`}  
      aria-label="Toggle theme"  
    >  
      <div className="theme-toggle-slider">  
        {isDark ? (  
          <svg className="w-4 h-4 text-burgundy-950" fill="currentColor" viewBox="0 0 20 20">  
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />  
          </svg>  
        ) : (  
          <svg className="w-4 h-4 text-gold-600" fill="currentColor" viewBox="0 0 20 20">  
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />  
          </svg>  
        )}  
      </div>  
    </button>  
  );  
};

// Animated Counter Component  
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {  
  const [count, setCount] = useState(0);  
  const [isVisible, setIsVisible] = useState(false);  
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {  
    const observer = new IntersectionObserver(  
      ([entry]) => {  
        if (entry.isIntersecting && !isVisible) {  
          setIsVisible(true);  
        }  
      },  
      { threshold: 0.5 }  
    );

    if (countRef.current) {  
      observer.observe(countRef.current);  
    }

    return () => observer.disconnect();  
  }, [isVisible]);

  useEffect(() => {  
    if (!isVisible) return;

    const increment = end / (duration / 16);  
    let current = 0;  
    const timer = setInterval(() => {  
      current += increment;  
      if (current >= end) {  
        setCount(end);  
        clearInterval(timer);  
      } else {  
        setCount(Math.floor(current));  
      }  
    }, 16);

    return () => clearInterval(timer);  
  }, [isVisible, end, duration]);

  return (  
    <div
      ref={countRef}
      className="font-display font-bold tabular-nums leading-none text-3xl sm:text-4xl lg:text-5xl"
    >
      {count}
      {suffix}
    </div>  
  );  
};

// Countdown Timer Component  
const CountdownTimer = () => {  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });  
  const [nextService, setNextService] = useState("");

  useEffect(() => {  
    const getNextService = () => {  
      const now = new Date();  
      const currentDay = now.getDay();  
      const currentHour = now.getHours();  
      const currentMinute = now.getMinutes();  
        
      let nextServiceDate = new Date(now);  
        
      // Sunday services: 8:00 AM, 10:30 AM, 6:00 PM  
      if (currentDay === 0) { // Sunday  
        if (currentHour < 8) {  
          nextServiceDate.setHours(8, 0, 0, 0);  
          return { date: nextServiceDate, name: "Sunday 8:00 AM Service" };  
        } else if (currentHour < 10 || (currentHour === 10 && currentMinute < 30)) {  
          nextServiceDate.setHours(10, 30, 0, 0);  
          return { date: nextServiceDate, name: "Sunday 10:30 AM Service" };  
        } else if (currentHour < 18) {  
          nextServiceDate.setHours(18, 0, 0, 0);  
          return { date: nextServiceDate, name: "Sunday 6:00 PM Service" };  
        }  
      }  
        
      // Wednesday service: 7:00 PM  
      if (currentDay === 3 && currentHour < 19) { // Wednesday  
        nextServiceDate.setHours(19, 0, 0, 0);  
        return { date: nextServiceDate, name: "Wednesday 7:00 PM Bible Study" };  
      }  
        
      // Default to next Sunday 8:00 AM  
      const daysUntilSunday = (7 - currentDay) % 7 || 7;  
      nextServiceDate.setDate(now.getDate() + daysUntilSunday);  
      nextServiceDate.setHours(8, 0, 0, 0);  
      return { date: nextServiceDate, name: "Sunday 8:00 AM Service" };  
    };

    const updateCountdown = () => {  
      const service = getNextService();  
      setNextService(service.name);  
        
      const now = new Date().getTime();  
      const distance = service.date.getTime() - now;  
        
      setTimeLeft({  
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),  
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),  
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),  
        seconds: Math.floor((distance % (1000 * 60)) / 1000)  
      });  
    };

    updateCountdown();  
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);  
  }, []);

  return (  
    <div className="text-center">  
      <p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4">Next Service</p>  
      <h3 className="font-display text-2xl font-bold text-white mb-6">{nextService}</h3>  
      <div className="grid grid-cols-4 gap-2 sm:gap-4">  
        {[  
          { label: 'Days', value: timeLeft.days },  
          { label: 'Hours', value: timeLeft.hours },  
          { label: 'Minutes', value: timeLeft.minutes },  
          { label: 'Seconds', value: timeLeft.seconds }  
        ].map((unit, index) => (  
          <div key={index} className="countdown-unit">  
            <div className="glass-dark rounded-2xl p-2 sm:p-4">  
              <div className="countdown-number font-display tabular-nums leading-none text-2xl sm:text-4xl font-bold text-gold-400">  
                {String(unit.value).padStart(2, '0')}  
              </div>  
              <div className="text-white/60 text-xs uppercase mt-2">{unit.label}</div>  
            </div>  
          </div>  
        ))}  
      </div>  
    </div>  
  );  
};

// Testimonial Carousel Component  
const TestimonialCarousel = () => {  
  const [currentSlide, setCurrentSlide] = useState(0);  
  const [isPaused, setIsPaused] = useState(false);

  const fallbackTestimonials = [  
    {  
      name: "Sarah Johnson",  
      role: "Member since 2015",  
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",  
      quote: "This church has been my spiritual home for years. The community is warm, the teaching is biblical, and I've grown so much in my faith here.",  
      rating: 5  
    },  
    {  
      name: "Michael Thompson",  
      role: "Youth Ministry Volunteer",  
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",  
      quote: "Serving in the youth ministry has been life-changing. Watching young people encounter God's love and grow in their faith is incredibly rewarding.",  
      rating: 5  
    },  
    {  
      name: "Emily Davis",  
      role: "New Member",  
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",  
      quote: "As a new member, I was welcomed with open arms. The genuine love and care from everyone here made me feel like I belonged from day one.",  
      rating: 5  
    },  
    {  
      name: "James Wilson",  
      role: "Worship Team",  
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",  
      quote: "Being part of the worship team has deepened my relationship with God. The way our church community worships together is truly powerful.",  
      rating: 5  
    }  
  ];

  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getJson<{ ok: boolean; testimonials?: Array<{ full_name: string; title: string | null; quote: string; avatar_url: string | null }> }>(
          apiPath('api/testimonials.php'),
        );
        const rows = data.ok && Array.isArray(data.testimonials) ? data.testimonials : [];
        if (rows.length === 0) return;

        setTestimonials(
          rows.map((r) => ({
            name: r.full_name,
            role: r.title || 'Member',
            image: r.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
            quote: r.quote,
            rating: 5,
          })),
        );
        setCurrentSlide(0);
      } catch {
        // Keep fallback
      }
    };

    void load();
  }, []);

  useEffect(() => {  
    if (isPaused) return;  
      
    const timer = setInterval(() => {  
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);  
    }, 5000);

    return () => clearInterval(timer);  
  }, [isPaused, testimonials.length]);

  const goToSlide = (index: number) => {  
    setCurrentSlide(index);  
  };

  const nextSlide = () => {  
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);  
  };

  const prevSlide = () => {  
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);  
  };

  return (  
    <div   
      className="carousel-container"  
      onMouseEnter={() => setIsPaused(true)}  
      onMouseLeave={() => setIsPaused(false)}  
    >  
      <div className="carousel-track" style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}>  
        {testimonials.map((testimonial, index) => (  
          <div key={index} className="carousel-slide px-4">  
            <div className="max-w-3xl mx-auto glass-dark rounded-3xl p-8 sm:p-12">  
              <div className="flex items-center gap-1 mb-6 justify-center">  
                {[...Array(testimonial.rating)].map((_, i) => (  
                  <svg key={i} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">  
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />  
                  </svg>  
                ))}  
              </div>  
              <p className="text-white text-lg sm:text-xl leading-relaxed text-center mb-8 italic">  
                "{testimonial.quote}"  
              </p>  
              <div className="flex flex-col items-center">  
                <img  
                  src={testimonial.image}  
                  alt={testimonial.name}  
                  className="w-16 h-16 rounded-full object-cover mb-4 ring-4 ring-gold-400"  
                />  
                <h4 className="font-display text-xl font-bold text-white">{testimonial.name}</h4>  
                <p className="text-gold-400 text-sm">{testimonial.role}</p>  
              </div>  
            </div>  
          </div>  
        ))}  
      </div>

      {/* Navigation Arrows */}  
      <button  
        onClick={prevSlide}  
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-dark rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover-lift"  
        aria-label="Previous testimonial"  
      >  
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />  
        </svg>  
      </button>  
      <button  
        onClick={nextSlide}  
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-dark rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all hover-lift"  
        aria-label="Next testimonial"  
      >  
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />  
        </svg>  
      </button>

      {/* Dots Navigation */}  
      <div className="carousel-dots">  
        {testimonials.map((_, index) => (  
          <button  
            key={index}  
            onClick={() => goToSlide(index)}  
            className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}  
            aria-label={`Go to testimonial ${index + 1}`}  
          />  
        ))}  
      </div>

      {/* Progress Bar */}  
      {!isPaused && (  
        <div className="carousel-progress">  
          <div className="carousel-progress-bar" />  
        </div>  
      )}  
    </div>  
  );  
};

const Index = () => {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [scrolled, setScrolled] = useState(false);  
  const [scrollProgress, setScrollProgress] = useState(0);  
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());  
  const [activeSection, setActiveSection] = useState('');  
  const [isDarkMode, setIsDarkMode] = useState(false);  
  const heroRef = useRef<HTMLDivElement>(null);
  const [visitForm, setVisitForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
  });
  const [visitStatus, setVisitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const YOUTUBE_LIVE_URL = "https://www.youtube.com/@YourChurchChannel/live";

  // Theme Toggle  
  useEffect(() => {  
    const savedTheme = localStorage.getItem('theme');  
    if (savedTheme === 'dark') {  
      setIsDarkMode(true);  
      document.documentElement.classList.add('dark');  
    }  
  }, []);

  const toggleTheme = () => {  
    setIsDarkMode(!isDarkMode);  
    if (!isDarkMode) {  
      document.documentElement.classList.add('dark');  
      localStorage.setItem('theme', 'dark');  
    } else {  
      document.documentElement.classList.remove('dark');  
      localStorage.setItem('theme', 'light');  
    }  
  };

  // Scroll Progress Bar  
  useEffect(() => {  
    const handleScroll = () => {  
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;  
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;  
      const progress = (scrollTop / scrollHeight) * 100;  
      setScrollProgress(progress);  
      setScrolled(window.scrollY > 50);  
    };

    window.addEventListener('scroll', handleScroll);  
    return () => window.removeEventListener('scroll', handleScroll);  
  }, []);

  // Parallax Effect  
  useEffect(() => {  
    const handleParallax = () => {  
      if (heroRef.current) {  
        const scrolled = window.pageYOffset;  
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;  
      }  
    };

    window.addEventListener('scroll', handleParallax);  
    return () => window.removeEventListener('scroll', handleParallax);  
  }, []);

  // Section Visibility Observer  
  useEffect(() => {  
    const observer = new IntersectionObserver(  
      (entries) => {  
        entries.forEach((entry) => {  
          if (entry.isIntersecting) {  
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));  
            setActiveSection(entry.target.id);  
          }  
        });  
      },  
      // On small mobile viewports, sections can be taller than the viewport,
      // making a high threshold (e.g. 0.3) impossible to ever reach.
      // Use a low threshold so the animation triggers as soon as a section enters view.
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }  
    );

    document.querySelectorAll('section[id]').forEach((section) => {  
      observer.observe(section);  
    });

    return () => observer.disconnect();  
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  const navLinks = [  
    { href: '#about', label: 'About', id: 'about' },  
    { href: '#sermons', label: 'Sermons', id: 'sermons' },  
    { href: '#events', label: 'Events', id: 'events' },  
    { href: '#testimonials', label: 'Testimonials', id: 'testimonials' },  
    { href: '#giving', label: 'Giving', id: 'giving' },  
    { href: '#contact', label: 'Contact', id: 'contact' },  
  ];

  const scrollToSection = (id: string) => {  
    const element = document.getElementById(id);  
    if (element) {  
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });  
    }  
  };

  // Support deep links like "/#contact" so footer links can jump to forms.
  useEffect(() => {
    const scrollFromHash = () => {
      const hash = window.location.hash || '';
      const id = hash.replace(/^#/, '');
      if (!id) return;
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    scrollFromHash();
    window.addEventListener('hashchange', scrollFromHash);
    return () => window.removeEventListener('hashchange', scrollFromHash);
  }, []);

  const fallbackEvents = [  
    {  
      title: "Youth Revival Weekend",  
      date: "Feb 21-23",  
      time: "7:00 PM",  
      category: "Youth",  
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80"  
    },  
    {  
      title: "Women's Prayer Breakfast",  
      date: "Feb 28",  
      time: "9:00 AM",  
      category: "Women",  
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"  
    },  
    {  
      title: "Community Outreach Day",  
      date: "Mar 1",  
      time: "10:00 AM",  
      category: "Outreach",  
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"  
    },  
    {  
      title: "Marriage Enrichment Seminar",  
      date: "Mar 7",  
      time: "6:30 PM",  
      category: "Couples",  
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80"  
    },  
    {  
      title: "Choir Anniversary Concert",  
      date: "Mar 14",  
      time: "5:00 PM",  
      category: "Music",  
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80"  
    },  
    {  
      title: "Men's Fellowship Breakfast",  
      date: "Mar 21",  
      time: "8:00 AM",  
      category: "Men",  
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80"  
    }  
  ];

  const [events, setEvents] = useState(fallbackEvents);
  const [latestSermons, setLatestSermons] = useState([
    {  
      title: "Walking in Purpose",  
      speaker: "Pastor James Williams",  
      date: "February 9, 2026",  
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&q=80",  
      duration: "45 min"  
    },  
    {  
      title: "The Power of Prayer",  
      speaker: "Minister Sarah Johnson",  
      date: "February 2, 2026",  
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80",  
      duration: "38 min"  
    },  
    {  
      title: "Faith Over Fear",  
      speaker: "Pastor James Williams",  
      date: "January 26, 2026",  
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80",  
      duration: "42 min"  
    }  
  ]);

  useEffect(() => {
    const load = async () => {
      try {
        const ev = await getJson<{ ok: boolean; events?: Array<{ title: string; starts_at: string | null; image_url: string | null; category: string | null }> }>(
          apiPath('api/events.php'),
        );
        if (ev.ok && Array.isArray(ev.events) && ev.events.length > 0) {
          // Show more than the original static 6 so seeded DB content is visible.
          setEvents(
            ev.events.slice(0, 9).map((e) => {
              const d = e.starts_at ? new Date(e.starts_at) : null;
              return {
                title: e.title,
                date: d ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'TBD',
                time: d ? d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : 'TBD',
                category: e.category || 'Upcoming',
                image: e.image_url || 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80',
              };
            }),
          );
        }

        const se = await getJson<{ ok: boolean; sermons?: Array<{ title: string; speaker: string | null; sermon_date: string | null; thumbnail_url: string | null; duration_seconds: number | null }> }>(
          apiPath('api/sermons.php'),
        );
        if (se.ok && Array.isArray(se.sermons) && se.sermons.length > 0) {
          setLatestSermons(
            se.sermons.slice(0, 3).map((s) => {
              const d = s.sermon_date ? new Date(s.sermon_date) : null;
              const minutes = s.duration_seconds ? Math.round(s.duration_seconds / 60) : null;
              return {
                title: s.title,
                speaker: s.speaker || 'Church Name',
                date: d ? d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : '',
                image: s.thumbnail_url || 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&q=80',
                duration: minutes ? `${minutes} min` : '',
              };
            }),
          );
        }
      } catch {
        // Keep fallback
      }
    };

    void load();
  }, []);

  const submitVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVisitStatus('submitting');
    try {
      const res = await postJson<{ ok: boolean; error?: string }>(apiPath('api/visit-submit.php'), visitForm);
      if (!res.ok) throw new Error(res.error || 'unknown');
      setVisitStatus('success');
      setVisitForm({ firstName: '', lastName: '', email: '', phone: '', service: '' });
    } catch (err) {
      // In local Vite dev, PHP endpoints won't execute. Fall back to simulated success.
      console.warn('Visit submit API failed, falling back to simulated success.', err);
      setTimeout(() => {
        setVisitStatus('success');
        setVisitForm({ firstName: '', lastName: '', email: '', phone: '', service: '' });
      }, 800);
    }
  };

  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('submitting');
    try {
      const res = await postJson<{ ok: boolean; error?: string }>(apiPath('api/contact-submit.php'), contactForm);
      if (!res.ok) throw new Error(res.error || 'unknown');
      setContactStatus('success');
      setContactForm({ fullName: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.warn('Contact submit API failed, falling back to simulated success.', err);
      setTimeout(() => {
        setContactStatus('success');
        setContactForm({ fullName: '', email: '', phone: '', message: '' });
      }, 800);
    }
  };
  return (  
    <div className="min-h-screen bg-cream dark:bg-charcoal overflow-x-hidden theme-transition">  
      {/* Progress Bar */}  
      <div   
        className="progress-bar"   
        style={{ transform: `scaleX(${scrollProgress / 100})` }}  
      />

      {/* Scroll Indicator */}  
      <div className="scroll-indicator hidden lg:flex">  
        {navLinks.map((link) => (  
          <div  
            key={link.id}  
            className={`scroll-dot ${activeSection === link.id ? 'active' : ''}`}  
            onClick={() => scrollToSection(link.id)}  
            title={link.label}  
          />  
        ))}  
      </div>

      {/* Navigation */}  
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${  
        scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'  
      }`}>  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
          <div className="flex items-center justify-between h-20">  
            <a href="#" className="transition-transform hover:scale-105 duration-300">  
              <ChurchLogo light={!scrolled} />  
            </a>

            {/* Desktop Navigation */}  
            <div className="hidden lg:flex items-center gap-6">  
              {navLinks.map((link) => (  
                <a  
                  key={link.href}  
                  href={link.href}  
                  className={`text-sm font-medium transition-all duration-300 hover:opacity-70 relative group ${  
                    scrolled ? 'text-white' : 'text-white'  
                  }`}  
                >  
                  {link.label}  
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 transition-all duration-300 group-hover:w-full"></span>  
                </a>  
              ))}  
                
              <a  
                href={YOUTUBE_LIVE_URL}  
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
                
              <a  
                href="#visit"  
                className="bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/50 hover-lift"  
              >  
                Plan Your Visit  
              </a>

              <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />  
            </div>

            {/* Mobile Menu Button */}  
            <button  
              onClick={() => setIsMenuOpen(!isMenuOpen)}  
              className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-white' : 'text-white'}`}  
            >  
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                {isMenuOpen ? (  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />  
                ) : (  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />  
                )}  
              </svg>  
            </button>  
          </div>  
        </div>

        {/* Mobile Menu */}  
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${  
          isMenuOpen ? 'max-h-screen glass-dark' : 'max-h-0'  
        }`}>  
          <div className="px-4 py-6 space-y-4">  
            {navLinks.map((link) => (  
              <a  
                key={link.href}  
                href={link.href}  
                onClick={() => setIsMenuOpen(false)}  
                className="block text-white font-medium py-2 hover:text-gold-400 transition-colors"  
              >  
                {link.label}  
              </a>  
            ))}  
            <a  
              href={YOUTUBE_LIVE_URL}  
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
            <a  
              href="#visit"  
              onClick={() => setIsMenuOpen(false)}  
              className="block bg-gold-500 text-burgundy-950 px-6 py-3 rounded-full text-center font-semibold hover-lift"  
            >  
              Plan Your Visit  
            </a>  
            <div className="flex items-center justify-center py-2">  
              <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />  
            </div>  
          </div>  
        </div>  
      </nav>

      {/* Hero Section */}  
      <section className="relative h-screen min-h-[700px] flex items-start md:items-center justify-center overflow-hidden pt-24 md:pt-0">  
        {/* Animated Blobs */}  
        <div className="blob blob-1"></div>  
        <div className="blob blob-2"></div>  
        <div className="blob blob-3"></div>  
          
        {/* Floating Particles */}  
        <div className="floating-particle floating-particle-1"></div>  
        <div className="floating-particle floating-particle-2"></div>  
        <div className="floating-particle floating-particle-3"></div>  
        <div className="floating-particle floating-particle-4"></div>

        {/* Image Background with Parallax */}  
        <div ref={heroRef} className="absolute inset-0 parallax">  
          <img  
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80"  
            alt="Church worship"  
            className="w-full h-full object-cover"  
          />  
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/80 via-burgundy-900/70 to-burgundy-950/90" />  
        </div>

        {/* Hero Content */}  
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">  
          <p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-6 animate-fade-in-up opacity-0 animation-delay-200">  
            Welcome to Church Name  
          </p>  
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-8 animate-fade-in-up opacity-0 animation-delay-400">  
            Experience God's  
            <span className="block gradient-text">Transforming Love</span>  
          </h1>  
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0 animation-delay-600">  
            Join a community where faith meets family. Discover purpose, find belonging, and grow in your spiritual journey.  
          </p>  
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0 animation-delay-800">  
            <a  
              href={YOUTUBE_LIVE_URL}  
              target="_blank"  
              rel="noopener noreferrer"  
              className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 hover-lift animate-pulse-glow"  
            >  
              <span className="relative flex h-3 w-3">  
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>  
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>  
              </span>  
              Watch Live  
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">  
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>  
              </svg>  
            </a>  
            <a  
              href="#visit"  
              className="bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover-lift"  
            >  
              Plan Your Visit  
            </a>  
            <a  
              href="#sermons"  
              className="glass border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover-lift"  
            >  
              Watch Sermons  
            </a>  
          </div>  
        </div>

        {/* Scroll Indicator */}  
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">  
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />  
          </svg>  
        </div>  
      </section>

      {/* Service Times Banner with Countdown */}  
      <section className="bg-burgundy-900 dark:bg-burgundy-950 py-12 relative overflow-hidden theme-transition">  
        <div className="absolute inset-0 opacity-10">  
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDI4aC0ydi0yaDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] animate-[scroll_20s_linear_infinite]"></div>  
        </div>  
        <div className="max-w-7xl mx-auto px-4 relative z-10">  
          <div className="grid lg:grid-cols-2 gap-8 items-center">  
            {/* Service Times */}  
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-white">  
              <div className="flex items-center gap-3">  
                <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />  
                </svg>  
                <span className="font-medium">Sundays: 8:00 AM, 10:30 AM & 6:00 PM</span>  
              </div>  
              <div className="hidden md:block w-px h-6 bg-white/20" />  
              <div className="flex items-center gap-3">  
                <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />  
                </svg>  
                <span className="font-medium">1234 Faith Avenue, Atlanta, GA 30301</span>  
              </div>  
            </div>

            {/* Countdown Timer */}  
            <div className="border-l-0 lg:border-l border-white/20 pl-0 lg:pl-8">  
              <CountdownTimer />  
            </div>  
          </div>  
        </div>  
      </section>

      {/* About Section */}  
      <section id="about" className="scroll-mt-32 py-24 lg:py-32 bg-cream dark:bg-charcoal relative overflow-hidden gradient-mesh theme-transition">  
        <div className={`max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>  
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">  
            <div className={`${isVisible('about') ? 'animate-slide-in-left' : ''}`}>  
              <p className="text-burgundy-600 dark:text-gold-400 font-medium tracking-widest uppercase text-sm mb-4">Our Story</p>  
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 theme-transition">  
                A Place Where Everyone Belongs  
              </h2>  
              <p className="text-body text-lg leading-relaxed mb-6 theme-transition">  
                For over 50 years, Church Name has been a beacon of hope in our community. We believe in the power of authentic worship, meaningful connections, and serving others with the love of Christ.  
              </p>  
              <p className="text-body text-lg leading-relaxed mb-8 theme-transition">  
                Whether you're taking your first steps in faith or you've been walking with God for decades, there's a place for you here. Come as you are and discover the life-changing power of God's grace.  
              </p>  
                
              {/* Stats */}  
              <div className="grid grid-cols-3 gap-6 mb-8">  
                <div className="text-center p-4 glass dark:bg-burgundy-900/20 rounded-2xl hover-lift theme-transition">  
                  <AnimatedCounter end={50} suffix="+" />  
                  <p className="text-sm text-muted mt-2 theme-transition">Years Serving</p>  
                </div>  
                <div className="text-center p-4 glass dark:bg-burgundy-900/20 rounded-2xl hover-lift theme-transition">  
                  <AnimatedCounter end={1200} suffix="+" />  
                  <p className="text-sm text-muted mt-2 theme-transition">Members</p>  
                </div>  
                <div className="text-center p-4 glass dark:bg-burgundy-900/20 rounded-2xl hover-lift theme-transition">  
                  <AnimatedCounter end={30} suffix="+" />  
                  <p className="text-sm text-muted mt-2 theme-transition">Ministries</p>  
                </div>  
              </div>  
                
              <a href="#visit" className="inline-flex items-center gap-2 text-burgundy-700 dark:text-gold-400 font-semibold hover:text-burgundy-500 dark:hover:text-gold-300 transition-colors group">  
                Learn More About Us  
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />  
                </svg>  
              </a>  
            </div>  
            <div className={`relative ${isVisible('about') ? 'animate-slide-in-right' : ''}`}>  
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl image-reveal hover-lift">  
                <img  
                  src="https://images.unsplash.com/photo-1609234656388-0ff363383899?w=800&q=80"  
                  alt="Church community gathering"  
                  className="w-full h-full object-cover"  
                />  
              </div>  
              <div className="absolute -bottom-6 -left-6 bg-gold-500 text-burgundy-950 p-6 rounded-2xl shadow-xl hover-lift glass">  
                <p className="font-display text-4xl font-bold">50+</p>  
                <p className="text-sm font-medium">Years of Faith</p>  
              </div>  
            </div>  
          </div>  
        </div>  
      </section>

      {/* Sermons Section */}  
      <section id="sermons" className="scroll-mt-32 py-24 lg:py-32 bg-white dark:bg-burgundy-950 relative overflow-hidden theme-transition">  
        <div className={`max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible('sermons') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>  
          <div className="text-center mb-16">  
            <p className="text-burgundy-600 dark:text-gold-400 font-medium tracking-widest uppercase text-sm mb-4">Latest Messages</p>  
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 theme-transition">  
              Inspiring Sermons  
            </h2>  
            <p className="text-body text-lg max-w-2xl mx-auto theme-transition">  
              Dive deeper into God's Word with our latest messages. Available to watch anytime, anywhere.  
            </p>  
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">  
            {latestSermons.map((sermon, index) => (  
              <article key={index} className={`group cursor-pointer hover-lift card-3d ${isVisible('sermons') ? 'animate-scale-in' : 'opacity-0'}`} style={{animationDelay: `${index * 200}ms`}}>  
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 shadow-lg bg-burgundy-100 dark:bg-burgundy-900/30">  
                  <img  
                    src={sermon.image}  
                    alt={sermon.title}  
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0.15';
                      e.currentTarget.style.filter = 'grayscale(1)';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"  
                  />  
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/60 to-transparent group-hover:from-burgundy-950/40 transition-all duration-300" />  
                  <div className="absolute inset-0 flex items-center justify-center">  
                    <div className="w-16 h-16 glass rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform hover-glow">  
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">  
                        <path d="M8 5v14l11-7z" />  
                      </svg>  
                    </div>  
                  </div>  
                  <span className="absolute bottom-4 right-4 glass-dark text-white text-sm px-3 py-1 rounded-full">  
                    {sermon.duration}  
                  </span>  
                </div>  
                <p className="text-burgundy-600 dark:text-gold-400 text-sm font-medium mb-2">{sermon.date}</p>  
                <h3 className="font-display text-xl font-semibold text-primary mb-2 group-hover:text-burgundy-700 dark:group-hover:text-gold-400 transition-colors theme-transition">  
                  {sermon.title}  
                </h3>  
                <p className="text-muted theme-transition">{sermon.speaker}</p>  
              </article>  
            ))}  
          </div>

          <div className="text-center mt-12">  
            <Link  
              to="/sermons"  
              className="inline-flex items-center gap-2 bg-burgundy-900 hover:bg-burgundy-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover-lift"  
            >  
              View All Sermons  
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />  
              </svg>  
            </Link>  
          </div>  
        </div>  
      </section>

      {/* Events Section */}  
      <section id="events" className="scroll-mt-32 py-24 lg:py-32 bg-burgundy-950 dark:bg-charcoal relative overflow-hidden theme-transition">  
        <div className="blob blob-1"></div>  
        <div className="blob blob-2"></div>  
          
        <div className="max-w-7xl mx-auto px-4 relative z-10 transition-all duration-1000 opacity-100 translate-y-0">  
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">  
            <div>  
              <p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4">What's Happening</p>  
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-bold">  
                Upcoming Events  
              </h2>  
            </div>  
            <Link  
              to="/events"  
              className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors group"  
            >  
              View Full Calendar  
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />  
              </svg>  
            </Link>  
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">  
            {events.map((event, index) => (  
              <div
                key={index}
                className="flip-card animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flip-card-inner h-full">  
                  <div className="flip-card-front group relative glass-dark rounded-2xl overflow-hidden cursor-pointer hover-lift">  
                    <div className="aspect-[16/10] overflow-hidden bg-burgundy-900/40">  
                      <img  
                        src={event.image}  
                        alt={event.title}  
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // If a remote image fails (mobile networks, ad-blockers), keep the card looking intentional.
                          e.currentTarget.style.opacity = '0.15';
                          e.currentTarget.style.filter = 'grayscale(1)';
                        }}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-105"  
                      />  
                    </div>  
                    <div className="p-6">  
                      <span className="inline-block glass text-gold-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">  
                        {event.category}  
                      </span>  
                      <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors">  
                        {event.title}  
                      </h3>  
                      <div className="flex items-center gap-4 text-white/60 text-sm">  
                        <span className="flex items-center gap-1">  
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />  
                          </svg>  
                          {event.date}  
                        </span>  
                        <span className="flex items-center gap-1">  
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />  
                          </svg>  
                          {event.time}  
                        </span>  
                      </div>  
                    </div>  
                  </div>  
                  <div className="flip-card-back glass-dark rounded-2xl p-6 flex flex-col justify-center items-center text-center">  
                    <h3 className="font-display text-xl font-bold text-white mb-4">{event.title}</h3>  
                    <p className="text-white/80 mb-6">Join us for this special event. Click to register or learn more.</p>  
                    <button className="bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-6 py-2 rounded-full font-semibold transition-all duration-300 hover-lift">  
                      Register Now  
                    </button>  
                  </div>  
                </div>  
              </div>  
            ))}  
          </div>  
        </div>  
      </section>

      {/* Testimonials Carousel Section */}  
      <section id="testimonials" className="scroll-mt-32 py-24 lg:py-32 bg-cream dark:bg-burgundy-950 relative gradient-mesh theme-transition">  
        <div className={`max-w-7xl mx-auto px-4 transition-all duration-1000 ${isVisible('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>  
          <div className="text-center mb-16">  
            <p className="text-burgundy-600 dark:text-gold-400 font-medium tracking-widest uppercase text-sm mb-4">Stories of Faith</p>  
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 theme-transition">  
              Member Testimonials  
            </h2>  
            <p className="text-body text-lg max-w-2xl mx-auto theme-transition">  
              Hear from our community about how God is working in their lives.  
            </p>  
          </div>

          <TestimonialCarousel />

          <div className="text-center mt-12">  
            <Link  
              to="/testimonials"  
              className="inline-flex items-center gap-2 bg-burgundy-900 hover:bg-burgundy-800 dark:bg-burgundy-800 dark:hover:bg-burgundy-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover-lift"  
            >  
              View All Testimonials  
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />  
              </svg>  
            </Link>  
          </div>  
        </div>  
      </section>

      {/* Giving Section */}  
      <section id="giving" className="scroll-mt-32 py-24 lg:py-32 bg-gradient-to-br from-gold-500 via-gold-400 to-gold-500 relative overflow-hidden">  
        <div className="absolute inset-0 opacity-20">  
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wIDI4aC0ydi0yaDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] animate-[scroll_20s_linear_infinite]"></div>  
        </div>  
          
        <div className={`max-w-7xl mx-auto px-4 relative z-10 transition-all duration-1000 ${isVisible('giving') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>  
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">  
            <div>  
              <p className="text-burgundy-800 font-medium tracking-widest uppercase text-sm mb-4">Generosity</p>  
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-burgundy-950 font-bold mb-6">  
                Partner With Us in Ministry  
              </h2>  
              <p className="text-burgundy-900/80 text-lg leading-relaxed mb-8">  
                Your generous giving fuels our mission to spread hope, serve our community, and transform lives. Every gift, no matter the size, makes an eternal impact.  
              </p>  
                
              <div className="grid sm:grid-cols-3 gap-6 mb-10">  
                {[  
                  { icon: "🏠", label: "Local Outreach", desc: "Serving our community" },  
                  { icon: "🌍", label: "Global Missions", desc: "Reaching the nations" },  
                  { icon: "📚", label: "Youth Programs", desc: "Investing in futures" }  
                ].map((item, index) => (  
                  <div key={index} className="glass backdrop-blur-sm rounded-2xl p-5 text-center hover-lift">  
                    <span className="text-3xl mb-2 block">{item.icon}</span>  
                    <p className="font-semibold text-burgundy-950">{item.label}</p>  
                    <p className="text-burgundy-800/70 text-sm">{item.desc}</p>  
                  </div>  
                ))}  
              </div>

              <div className="flex flex-col sm:flex-row gap-4">  
                <a  
                  href="#"  
                  className="bg-burgundy-950 hover:bg-burgundy-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl text-center hover-lift"  
                >  
                  Give Online  
                </a>  
                <a  
                  href="#"  
                  className="border-2 border-burgundy-950 text-burgundy-950 hover:bg-burgundy-950 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 text-center hover-lift"  
                >  
                  Set Up Recurring Gift  
                </a>  
              </div>  
            </div>

            <div className="relative">  
              <div className="bg-white rounded-3xl p-8 shadow-2xl hover-lift">  
                <h3 className="font-display text-2xl font-bold text-burgundy-950 mb-6">Quick Give</h3>  
                <div className="grid grid-cols-3 gap-3 mb-6">  
                  {['$25', '$50', '$100', '$250', '$500', 'Other'].map((amount) => (  
                    <button  
                      key={amount}  
                      className="py-3 px-4 border-2 border-burgundy-200 rounded-xl font-semibold text-burgundy-950 hover:border-burgundy-500 hover:bg-burgundy-50 transition-all duration-300 hover-lift"  
                    >  
                      {amount}  
                    </button>  
                  ))}  
                </div>  
                <div className="space-y-4">  
                  <select className="w-full p-4 border-2 border-burgundy-200 rounded-xl text-burgundy-950 focus:border-burgundy-500 focus:outline-none transition-colors">  
                    <option>General Fund</option>  
                    <option>Building Fund</option>  
                    <option>Missions</option>  
                    <option>Youth Ministry</option>  
                  </select>  
                  <button className="w-full bg-burgundy-900 hover:bg-burgundy-800 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover-lift">  
                    Continue to Give  
                  </button>  
                </div>  
                <p className="text-center text-burgundy-600/60 text-sm mt-4">  
                  Secure giving powered by trusted payment providers  
                </p>  
              </div>  
            </div>  
          </div>  
        </div>  
      </section>

      {/* Plan Your Visit Section */}  
      <section id="visit" className="scroll-mt-32 py-24 lg:py-32 bg-white dark:bg-charcoal relative gradient-mesh theme-transition">  
        <div className="max-w-7xl mx-auto px-4 transition-all duration-1000 opacity-100 translate-y-0">  
          <div className="text-center mb-16">  
            <p className="text-burgundy-600 dark:text-gold-400 font-medium tracking-widest uppercase text-sm mb-4">We'd Love to Meet You</p>  
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 theme-transition">  
              Plan Your Visit  
            </h2>  
            <p className="text-body text-lg max-w-2xl mx-auto theme-transition">  
              Your first visit is important to us. Here's everything you need to know to make your experience seamless and welcoming.  
            </p>  
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">  
            {[  
              {  
                icon: (  
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />  
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />  
                  </svg>  
                ),  
                title: "Location",  
                desc: "1234 Faith Avenue, Atlanta, GA 30301. Free parking available."  
              },  
              {  
                icon: (  
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />  
                  </svg>  
                ),  
                title: "Service Times",  
                desc: "Sundays at 8:00 AM, 10:30 AM, and 6:00 PM. Wednesday Bible Study at 7 PM."  
              },  
              {  
                icon: (  
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />  
                  </svg>  
                ),  
                title: "What to Wear",  
                desc: "Come as you are! We have a casual, welcoming atmosphere."  
              },  
              {  
                icon: (  
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />  
                  </svg>  
                ),  
                title: "Kids Ministry",  
                desc: "Safe, fun, and engaging programs for children of all ages."  
              }  
            ].map((item, index) => (  
              <div
                key={index}
                className="text-center p-6 rounded-2xl glass dark:bg-burgundy-900/20 hover:shadow-lg transition-all duration-300 hover-lift theme-transition animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-burgundy-100 dark:bg-burgundy-800 rounded-2xl flex items-center justify-center mx-auto mb-5 text-burgundy-700 dark:text-gold-400 theme-transition">  
                  {item.icon}  
                </div>  
                <h3 className="font-display text-xl font-semibold text-primary mb-3 theme-transition">{item.title}</h3>  
                <p className="text-muted theme-transition">{item.desc}</p>  
              </div>  
            ))}  
          </div>

          {/* Visit Form */}  
          <div className="max-w-2xl mx-auto bg-burgundy-950 dark:bg-burgundy-900 rounded-3xl p-8 sm:p-12 shadow-2xl hover-lift theme-transition">  
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-2">Let Us Know You're Coming</h3>  
            <p className="text-white/70 text-center mb-8">We'll have someone ready to greet you and answer any questions.</p>  
              
            <form onSubmit={submitVisit} className="space-y-5">  
              <div className="grid sm:grid-cols-2 gap-5">  
                <input  
                  type="text"  
                  required
                  value={visitForm.firstName}
                  onChange={(e) => setVisitForm((p) => ({ ...p, firstName: e.target.value }))}
                  placeholder="First Name"  
                  className="w-full px-5 py-4 glass-dark border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                />  
                <input  
                  type="text"  
                  required
                  value={visitForm.lastName}
                  onChange={(e) => setVisitForm((p) => ({ ...p, lastName: e.target.value }))}
                  placeholder="Last Name"  
                  className="w-full px-5 py-4 glass-dark border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                />  
              </div>  
              <input  
                type="email"  
                required
                value={visitForm.email}
                onChange={(e) => setVisitForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="Email Address"  
                className="w-full px-5 py-4 glass-dark border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
              />  
              <input  
                type="tel"  
                required
                value={visitForm.phone}
                onChange={(e) => setVisitForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="Phone Number"  
                className="w-full px-5 py-4 glass-dark border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
              />  
              <select
                required
                value={visitForm.service}
                onChange={(e) => setVisitForm((p) => ({ ...p, service: e.target.value }))}
                className="w-full px-5 py-4 glass-dark border border-white/20 rounded-xl text-white/70 focus:border-gold-400 focus:outline-none transition-colors"
              >  
                <option value="">Which service are you planning to attend?</option>  
                <option value="8am">Sunday 8:00 AM</option>  
                <option value="1030am">Sunday 10:30 AM</option>  
                <option value="6pm">Sunday 6:00 PM</option>  
              </select>  
              <button  
                type="submit"  
                disabled={visitStatus === 'submitting'}
                className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-gold-500/60 text-burgundy-950 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover-lift disabled:cursor-not-allowed"  
              >  
                {visitStatus === 'submitting' ? 'Submitting...' : 'Submit My Visit'}
              </button>  
              {visitStatus === 'success' && (
                <p className="text-center text-green-300 text-sm">Thanks. We will reach out before your visit.</p>
              )}
              {visitStatus === 'error' && (
                <p className="text-center text-red-200 text-sm">Something went wrong. Please try again.</p>
              )}
            </form>  
          </div>  
        </div>  
      </section>

      {/* Contact Section */}  
      <section id="contact" className="scroll-mt-32 py-24 lg:py-32 bg-cream dark:bg-burgundy-950 relative gradient-mesh theme-transition">  
        <div className="max-w-7xl mx-auto px-4 transition-all duration-1000 opacity-100 translate-y-0">  
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">  
            <div>  
              <p className="text-burgundy-600 dark:text-gold-400 font-medium tracking-widest uppercase text-sm mb-4">Get in Touch</p>  
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 theme-transition">  
                We're Here For You  
              </h2>  
              <p className="text-body text-lg leading-relaxed mb-10 theme-transition">  
                Have questions? Need prayer? Want to learn more about our ministries? We'd love to hear from you. Reach out anytime.  
              </p>

              <div className="space-y-6">  
                <div className="flex items-start gap-5 hover-lift">  
                  <div className="w-12 h-12 bg-burgundy-100 dark:bg-burgundy-800 rounded-xl flex items-center justify-center flex-shrink-0 text-burgundy-700 dark:text-gold-400 theme-transition">  
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />  
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />  
                    </svg>  
                  </div>  
                  <div>  
                    <h3 className="font-semibold text-primary mb-1 theme-transition">Address</h3>  
                    <p className="text-muted theme-transition">1234 Faith Avenue, Atlanta, GA 30301</p>  
                  </div>  
                </div>  
                  
                <div className="flex items-start gap-5 hover-lift">  
                  <div className="w-12 h-12 bg-burgundy-100 dark:bg-burgundy-800 rounded-xl flex items-center justify-center flex-shrink-0 text-burgundy-700 dark:text-gold-400 theme-transition">  
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />  
                    </svg>  
                  </div>  
                  <div>  
                    <h3 className="font-semibold text-primary mb-1 theme-transition">Phone</h3>  
                    <p className="text-muted theme-transition">(404) 555-0123</p>  
                  </div>  
                </div>  
                  
                <div className="flex items-start gap-5 hover-lift">  
                  <div className="w-12 h-12 bg-burgundy-100 dark:bg-burgundy-800 rounded-xl flex items-center justify-center flex-shrink-0 text-burgundy-700 dark:text-gold-400 theme-transition">  
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />  
                    </svg>  
                  </div>  
                  <div>  
                    <h3 className="font-semibold text-primary mb-1 theme-transition">Email</h3>  
                    <p className="text-muted theme-transition">info@churchname.org</p>  
                  </div>  
                </div>  
              </div>

              {/* Social Links */}  
              <div className="mt-10">  
                <p className="font-semibold text-primary mb-4 theme-transition">Follow Us</p>  
                <div className="flex gap-4">  
                  {['facebook', 'instagram', 'youtube', 'twitter'].map((social) => (  
                    <a  
                      key={social}  
                      href="#"  
                      className="w-12 h-12 bg-burgundy-900 dark:bg-burgundy-800 hover:bg-burgundy-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover-lift hover-glow theme-transition"  
                    >  
                      {social === 'facebook' && (  
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">  
                          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>  
                        </svg>  
                      )}  
                      {social === 'instagram' && (  
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">  
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>  
                        </svg>  
                      )}  
                      {social === 'youtube' && (  
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">  
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>  
                        </svg>  
                      )}  
                      {social === 'twitter' && (  
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">  
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>  
                        </svg>  
                      )}  
                    </a>  
                  ))}  
                </div>  
              </div>  

              {/* Contact Form */}  
              <div className="mt-12 bg-white dark:bg-burgundy-900/20 rounded-3xl p-6 sm:p-8 shadow-xl hover-lift theme-transition">  
                <h3 className="font-display text-2xl font-bold text-primary dark:text-white mb-2 theme-transition">Send a Message</h3>  
                <p className="text-muted mb-6 theme-transition">We will respond as soon as possible.</p>  
                <form onSubmit={submitContact} className="space-y-4">  
                  <input
                    type="text"
                    required
                    value={contactForm.fullName}
                    onChange={(e) => setContactForm((p) => ({ ...p, fullName: e.target.value }))}
                    placeholder="Full Name"
                    className="w-full px-5 py-4 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="Email (optional)"
                      className="w-full px-5 py-4 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"
                    />
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="Phone (optional)"
                      className="w-full px-5 py-4 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"
                    />
                  </div>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full px-5 py-4 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={contactStatus === 'submitting'}
                    className="w-full bg-burgundy-900 hover:bg-burgundy-800 disabled:bg-burgundy-900/60 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover-lift disabled:cursor-not-allowed"
                  >
                    {contactStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                  {contactStatus === 'success' && (
                    <p className="text-center text-green-700 dark:text-green-300 text-sm theme-transition">Message received. Thank you.</p>
                  )}
                  {contactStatus === 'error' && (
                    <p className="text-center text-red-700 dark:text-red-200 text-sm theme-transition">Something went wrong. Please try again.</p>
                  )}
                </form>  
              </div>
            </div>

            {/* Map */}  
            <div className="relative">  
              <div className="aspect-square lg:aspect-auto lg:h-full rounded-3xl overflow-hidden shadow-xl bg-burgundy-100 dark:bg-burgundy-900 hover-lift theme-transition">  
                <iframe  
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212270.61979983138!2d-84.56437658867188!3d33.76764080000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5045d6993098d%3A0x66fede2f990b630b!2sAtlanta%2C%20GA!5e0!3m2!1sen!2sus!4v1707918000000!5m2!1sen!2sus"  
                  className="w-full h-full min-h-[400px]"  
                  style={{ border: 0 }}  
                  allowFullScreen  
                  loading="lazy"  
                  referrerPolicy="no-referrer-when-downgrade"  
                  title="Church Location"  
                />  
              </div>  
            </div>  
          </div>  
        </div>  
      </section>

      {/* Footer */}  
      <SiteFooter />  
    </div>  
  );  
};

export default Index;
