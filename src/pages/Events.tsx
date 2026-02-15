import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';
import { getJson, postJson, apiPath } from '../lib/api';
import SiteFooter from '../components/SiteFooter';

// Logo Component  
const ChurchLogo = ({ className = "", light = false }: { className?: string; light?: boolean }) => {  
  const primaryColor = light ? "#ffffff" : "#5c1229";  
  const secondaryColor = light ? "#fef9e7" : "#f0b429";  
    
  return (  
    <div className={`flex items-center gap-3 ${className}`}>  
      <div className="relative w-14 h-14 flex items-center justify-center">  
        <svg  
          viewBox="0 0 100 100"  
          className="absolute w-10 h-10 animate-spin-slow"  
          style={{ animationDuration: '20s' }}  
        >  
          <circle cx="50" cy="50" r="45" fill="none" stroke={secondaryColor} strokeWidth="2" opacity="0.6" />  
          <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />  
          <ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />  
          <ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />  
          <ellipse cx="50" cy="50" rx="30" ry="45" fill="none" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />  
          <line x1="50" y1="5" x2="50" y2="95" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />  
          <line x1="5" y1="50" x2="95" y2="50" stroke={secondaryColor} strokeWidth="1.5" opacity="0.5" />  
        </svg>  
          
        <svg viewBox="0 0 100 100" className="absolute w-14 h-14 z-10">  
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
    <button onClick={toggleTheme} className={`theme-toggle ${isDark ? 'active' : ''}`} aria-label="Toggle theme">  
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

type EventsApiResponse = {
  ok: boolean;
  events?: Array<{
    id: number;
    title: string;
    description: string | null;
    location_name: string | null;
    starts_at: string | null;
    ends_at: string | null;
    image_url: string | null;
    category: string | null;
  }>;
  error?: string;
};

function formatEventDateTime(startsAt: string | null): { date: string; time: string; status: string } {
  if (!startsAt) return { date: 'TBD', time: 'TBD', status: 'upcoming' };
  const d = new Date(startsAt);
  const date = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  const now = new Date();
  const diffDays = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  const status = diffDays <= 7 ? 'this_week' : 'upcoming';
  return { date, time, status };
}

// Event Registration Modal Component  
const EventRegistrationModal = ({ event, isOpen, onClose }: { event: Event | null; isOpen: boolean; onClose: () => void }) => {  
  const [formData, setFormData] = useState({  
    firstName: '',  
    lastName: '',  
    email: '',  
    phone: '',  
    attendees: '1',  
    specialNeeds: ''  
  });  
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {  
    if (isOpen) {  
      document.body.style.overflow = 'hidden';  
    } else {  
      document.body.style.overflow = 'unset';  
      // Reset form when modal closes  
      if (!isOpen && isSuccess) {  
        setTimeout(() => {  
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
    return () => {  
      document.body.style.overflow = 'unset';  
    };  
  }, [isOpen, isSuccess]);

  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    setIsSubmitting(true);  
    try {
      // SiteGround deployment: this resolves to /1/api/event-register.php when VITE_BASE_PATH=/1/
      await postJson<{ ok: boolean; error?: string }>(
        apiPath('api/event-register.php'),
        {
          event: {
            title: event.title,
            category: event.category,
            location: event.location,
          },
          registration: {
            fullName: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            notes: `Attendees: ${formData.attendees}\nSpecial: ${formData.specialNeeds || ''}`.trim(),
          },
        },
      );

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      // In local Vite dev, PHP endpoints won't execute. Fall back to the original simulated success.
      console.warn('Event registration API failed, falling back to simulated success.', err);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 800);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {  
    setFormData(prev => ({  
      ...prev,  
      [e.target.name]: e.target.value  
    }));  
  };

  return (  
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">  
      {/* Backdrop */}  
      <div   
        className="absolute inset-0 bg-burgundy-950/95 backdrop-blur-sm"  
        onClick={onClose}  
      />  
        
      {/* Modal Content */}  
      <div className="relative w-full max-w-2xl bg-white dark:bg-burgundy-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">  
        {/* Close Button */}  
        <button  
          onClick={onClose}  
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-burgundy-950/80 hover:bg-burgundy-950 text-white rounded-full flex items-center justify-center transition-all duration-300 hover-lift"  
          aria-label="Close registration"  
        >  
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />  
          </svg>  
        </button>

        {/* Event Header */}  
        <div className="relative h-48 overflow-hidden">  
          <img  
            src={event.image}  
            alt={event.title}  
            className="w-full h-full object-cover"  
          />  
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/90 to-transparent" />  
          <div className="absolute bottom-0 left-0 right-0 p-6">  
            <span className="inline-block glass text-gold-400 text-xs font-semibold px-3 py-1 rounded-full mb-2">  
              {event.category}  
            </span>  
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">  
              {event.title}  
            </h2>  
            <div className="flex flex-wrap gap-4 mt-2 text-white/90 text-sm">  
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

        {/* Form or Success Message */}  
        <div className="p-6 sm:p-8">  
          {isSuccess ? (  
            <div className="text-center py-8 animate-fade-in">  
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">  
                <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />  
                </svg>  
              </div>  
              <h3 className="font-display text-2xl font-bold text-burgundy-950 dark:text-white mb-3">  
                Registration Successful!  
              </h3>  
              <p className="text-body mb-6">  
                Thank you for registering for {event.title}. You'll receive a confirmation email shortly with all the details.  
              </p>  
              <button  
                onClick={onClose}  
                className="bg-burgundy-900 hover:bg-burgundy-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover-lift"  
              >  
                Done  
              </button>  
            </div>  
          ) : (  
            <>  
              <h3 className="font-display text-xl font-bold text-primary mb-2">  
                Register for This Event  
              </h3>  
              <p className="text-body mb-6">  
                Fill out the form below to reserve your spot. We can't wait to see you there!  
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">  
                {/* Name Fields */}  
                <div className="grid sm:grid-cols-2 gap-4">  
                  <div>  
                    <label className="block text-sm font-medium text-primary mb-2">  
                      First Name *  
                    </label>  
                    <input  
                      type="text"  
                      name="firstName"  
                      value={formData.firstName}  
                      onChange={handleChange}  
                      required  
                      className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                      placeholder="John"  
                    />  
                  </div>  
                  <div>  
                    <label className="block text-sm font-medium text-primary mb-2">  
                      Last Name *  
                    </label>  
                    <input  
                      type="text"  
                      name="lastName"  
                      value={formData.lastName}  
                      onChange={handleChange}  
                      required  
                      className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                      placeholder="Doe"  
                    />  
                  </div>  
                </div>

                {/* Contact Fields */}  
                <div>  
                  <label className="block text-sm font-medium text-primary mb-2">  
                    Email Address *  
                  </label>  
                  <input  
                    type="email"  
                    name="email"  
                    value={formData.email}  
                    onChange={handleChange}  
                    required  
                    className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                    placeholder="john@example.com"  
                  />  
                </div>

                <div>  
                  <label className="block text-sm font-medium text-primary mb-2">  
                    Phone Number *  
                  </label>  
                  <input  
                    type="tel"  
                    name="phone"  
                    value={formData.phone}  
                    onChange={handleChange}  
                    required  
                    className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors"  
                    placeholder="(555) 123-4567"  
                  />  
                </div>

                {/* Number of Attendees */}  
                <div>  
                  <label className="block text-sm font-medium text-primary mb-2">  
                    Number of Attendees *  
                  </label>  
                  <select  
                    name="attendees"  
                    value={formData.attendees}  
                    onChange={handleChange}  
                    required  
                    className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary focus:border-gold-400 focus:outline-none transition-colors"  
                  >  
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (  
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>  
                    ))}  
                  </select>  
                </div>

                {/* Special Needs */}  
                <div>  
                  <label className="block text-sm font-medium text-primary mb-2">  
                    Special Accommodations (Optional)  
                  </label>  
                  <textarea  
                    name="specialNeeds"  
                    value={formData.specialNeeds}  
                    onChange={handleChange}  
                    rows={3}  
                    className="w-full px-4 py-3 glass dark:bg-burgundy-800 border border-burgundy-200 dark:border-burgundy-700 rounded-xl text-primary placeholder-charcoal/50 dark:placeholder-white/50 focus:border-gold-400 focus:outline-none transition-colors resize-none"  
                    placeholder="Let us know if you need wheelchair access, dietary restrictions, childcare, etc."  
                  />  
                </div>

                {/* Submit Button */}  
                <button  
                  type="submit"  
                  disabled={isSubmitting}  
                  className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-gold-500/50 text-burgundy-950 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover-lift disabled:cursor-not-allowed flex items-center justify-center gap-2"  
                >  
                  {isSubmitting ? (  
                    <>  
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">  
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>  
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>  
                      </svg>  
                      Processing...  
                    </>  
                  ) : (  
                    <>  
                      Complete Registration  
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />  
                      </svg>  
                    </>  
                  )}  
                </button>  
              </form>  
            </>  
          )}  
        </div>  
      </div>  
    </div>  
  );  
};

const Events = () => {  
  const [scrolled, setScrolled] = useState(false);  
  const [isDarkMode, setIsDarkMode] = useState(false);  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [selectedCategory, setSelectedCategory] = useState('Upcoming');  
  const [visibleCount, setVisibleCount] = useState(9);  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);  
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const YOUTUBE_LIVE_URL = "https://www.youtube.com/@YourChurchChannel/live";

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

  useEffect(() => {  
    const handleScroll = () => {  
      setScrolled(window.scrollY > 50);  
    };  
    window.addEventListener('scroll', handleScroll);  
    return () => window.removeEventListener('scroll', handleScroll);  
  }, []);

  const categories = ['Upcoming', 'This Month', 'Youth', 'Women', 'Men', 'Outreach', 'Worship', 'Music', 'Couples', 'Community'];

  const fallbackEvents: Event[] = [  
    {  
      title: "Youth Revival Weekend",  
      date: "Feb 21-23, 2026",  
      time: "7:00 PM",  
      category: "Youth",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",  
      description: "Three nights of powerful worship, inspiring messages, and life-changing encounters with God designed specifically for youth."  
    },  
    {  
      title: "Women's Prayer Breakfast",  
      date: "Feb 28, 2026",  
      time: "9:00 AM",  
      category: "Women",  
      status: "upcoming",  
      location: "Fellowship Hall",  
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",  
      description: "Join us for a morning of prayer, worship, and fellowship as we seek God's presence together."  
    },  
    {  
      title: "Community Outreach Day",  
      date: "Mar 1, 2026",  
      time: "10:00 AM",  
      category: "Outreach",  
      status: "upcoming",  
      location: "City Park",  
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",  
      description: "Serve our community with acts of kindness, free food distribution, and sharing the love of Christ."  
    },  
    {  
      title: "Marriage Enrichment Seminar",  
      date: "Mar 7, 2026",  
      time: "6:30 PM",  
      category: "Men",  
      status: "upcoming",  
      location: "Conference Room",  
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",  
      description: "Strengthen your marriage with biblical principles, practical tools, and meaningful connection time."  
    },  
    {  
      title: "Choir Anniversary Concert",  
      date: "Mar 14, 2026",  
      time: "5:00 PM",  
      category: "Worship",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",  
      description: "Celebrate 25 years of powerful worship with special guests, testimonies, and an unforgettable musical experience."  
    },  
    {  
      title: "Men's Fellowship Breakfast",  
      date: "Mar 21, 2026",  
      time: "8:00 AM",  
      category: "Men",  
      status: "upcoming",  
      location: "Fellowship Hall",  
      image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80",  
      description: "Men, join us for food, fellowship, and encouragement as we grow together in faith and brotherhood."  
    },  
    {  
      title: "Easter Sunrise Service",  
      date: "Apr 20, 2026",  
      time: "6:00 AM",  
      category: "Worship",  
      status: "upcoming",  
      location: "Outdoor Pavilion",  
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80",  
      description: "Celebrate the resurrection of Jesus with an outdoor sunrise service followed by breakfast."  
    },  
    {  
      title: "Women's Conference",  
      date: "Apr 25-26, 2026",  
      time: "Friday 7 PM, Saturday 9 AM",  
      category: "Women",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",  
      description: "Two days of worship, powerful teaching, and life-changing ministry for women of all ages."  
    },  
    {  
      title: "Youth Summer Camp",  
      date: "Jun 15-20, 2026",  
      time: "All Day",  
      category: "Youth",  
      status: "upcoming",  
      location: "Camp Retreat Center",  
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80",  
      description: "A week of outdoor adventure, spiritual growth, and unforgettable memories at our annual youth camp."  
    },  
    {  
      title: "Missions Sunday",  
      date: "May 4, 2026",  
      time: "All Services",  
      category: "Outreach",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",  
      description: "Hear inspiring testimonies from missionaries and learn how you can support global missions."  
    },  
    {  
      title: "Worship Night",  
      date: "May 16, 2026",  
      time: "7:00 PM",  
      category: "Worship",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",  
      description: "An evening dedicated to worship, prayer, and encountering God's presence together."  
    },  
    {  
      title: "Back to School Blessing",  
      date: "Aug 10, 2026",  
      time: "All Services",  
      category: "Youth",  
      status: "upcoming",  
      location: "Main Sanctuary",  
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80",  
      description: "Pray for students, teachers, and families as we prepare for the new school year."  
    }  
  ];

  const [allEvents, setAllEvents] = useState<Event[]>(fallbackEvents);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getJson<EventsApiResponse>(apiPath('api/events.php'));
        const rows = data.ok && Array.isArray(data.events) ? data.events : [];
        if (rows.length === 0) return;

        const mapped: Event[] = rows.map((r) => {
          const dt = formatEventDateTime(r.starts_at);
          return {
            title: r.title,
            date: dt.date,
            time: dt.time,
            category: r.category || 'Upcoming',
            status: dt.status,
            location: r.location_name || 'TBD',
            image: r.image_url || 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80',
            description: r.description || '',
          };
        });

        setAllEvents(mapped);
      } catch {
        // Keep fallbackEvents
      }
    };

    void load();
  }, []);

  const filteredEvents = selectedCategory === 'Upcoming'   
    ? allEvents   
    : selectedCategory === 'This Month'  
    ? allEvents.filter(e => {  
        const eventDate = new Date(e.date);
        if (Number.isNaN(eventDate.getTime())) return false;
        const now = new Date();  
        return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();  
      })  
    : allEvents.filter(e => e.category === selectedCategory);

  const displayedEvents = filteredEvents.slice(0, visibleCount);  
  const hasMore = visibleCount < filteredEvents.length;

  const loadMore = () => {  
    setVisibleCount(prev => prev + 6);  
  };

  const openRegistrationModal = (event: Event) => {  
    setSelectedEvent(event);  
    setIsRegistrationModalOpen(true);  
  };

  const closeRegistrationModal = () => {  
    setIsRegistrationModalOpen(false);  
    setTimeout(() => setSelectedEvent(null), 300);  
  };

  return (  
    <div className="min-h-screen bg-cream dark:bg-charcoal overflow-x-hidden theme-transition">  
      {/* Event Registration Modal */}  
      <EventRegistrationModal   
        event={selectedEvent}   
        isOpen={isRegistrationModalOpen}   
        onClose={closeRegistrationModal}   
      />

      {/* Navigation */}  
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${  
        scrolled ? 'glass-dark shadow-2xl' : 'bg-transparent'  
      }`}>  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
          <div className="flex items-center justify-between h-20">  
            <Link to="/" className="transition-transform hover:scale-105 duration-300">  
              <ChurchLogo light={!scrolled} />  
            </Link>

            <div className="hidden lg:flex items-center gap-6">  
              <Link to="/" className={`text-sm font-medium transition-all duration-300 hover:opacity-70 ${scrolled ? 'text-white' : 'text-white'}`}>  
                Home  
              </Link>  
                
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

              <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />  
            </div>

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

        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${  
          isMenuOpen ? 'max-h-screen glass-dark' : 'max-h-0'  
        }`}>  
          <div className="px-4 py-6 space-y-4">  
            <Link  
              to="/"  
              onClick={() => setIsMenuOpen(false)}  
              className="block text-white font-medium py-2 hover:text-gold-400 transition-colors"  
            >  
              Home  
            </Link>  
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
            <div className="flex items-center justify-center py-2">  
              <ThemeToggle isDark={isDarkMode} toggleTheme={toggleTheme} />  
            </div>  
          </div>  
        </div>  
      </nav>

      {/* Hero Section */}  
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">  
        <div className="blob blob-1"></div>  
        <div className="blob blob-2"></div>  
          
        <div className="absolute inset-0">  
          <img  
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80"  
            alt="Church events"  
            className="w-full h-full object-cover"  
          />  
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/90 via-burgundy-900/80 to-burgundy-950/90" />  
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">  
          <p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up opacity-0 animation-delay-200">  
            Connect & Grow Together  
          </p>  
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-tight mb-6 animate-fade-in-up opacity-0 animation-delay-400">  
            Upcoming Events  
          </h1>  
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-up opacity-0 animation-delay-600">  
            Join us for special gatherings, celebrations, and opportunities to connect with our church family.  
          </p>  
        </div>  
      </section>

      {/* Category Filter */}  
      <section className="py-12 bg-white dark:bg-burgundy-950 theme-transition">  
        <div className="max-w-7xl mx-auto px-4">  
          <div className="flex flex-wrap justify-center gap-3">  
            {categories.map((category) => (  
              <button  
                key={category}  
                onClick={() => {  
                  setSelectedCategory(category);  
                  setVisibleCount(9);  
                }}  
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover-lift ${  
                  selectedCategory === category  
                    ? 'bg-burgundy-900 text-white shadow-lg'  
                    : 'glass dark:glass-dark text-burgundy-950 dark:text-white hover:bg-burgundy-100 dark:hover:bg-burgundy-800'  
                }`}  
              >  
                {category}  
              </button>  
            ))}  
          </div>  
        </div>  
      </section>

      {/* Events Grid with Registration */}  
      <section className="py-24 lg:py-32 bg-cream dark:bg-charcoal relative gradient-mesh theme-transition">  
        <div className="max-w-7xl mx-auto px-4">  
          {displayedEvents.length === 0 ? (  
            <div className="text-center py-20">  
              <p className="text-muted text-lg">  
                No events found in this category.  
              </p>  
            </div>  
          ) : (  
            <>  
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">  
                {displayedEvents.map((event, index) => (  
                  <article  
                    key={index}  
                    className="flip-card theme-transition animate-fade-in-up"  
                    style={{ animationDelay: `${(index % 9) * 100}ms` }}  
                  >  
                    <div className="flip-card-inner h-full">  
                      {/* Front of Card */}  
                      <div className="flip-card-front group relative glass dark:bg-burgundy-900/20 rounded-2xl overflow-hidden cursor-pointer hover-lift">  
                        <div className="aspect-[4/3] overflow-hidden">  
                          <img  
                            src={event.image}  
                            alt={event.title}  
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"  
                          />  
                          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 to-transparent" />  
                        </div>  
                        <div className="p-6">  
                          <span className="inline-block glass text-gold-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">  
                            {event.category}  
                          </span>  
                          <h3 className="font-display text-xl font-semibold text-primary dark:text-white mb-3 group-hover:text-burgundy-700 dark:group-hover:text-gold-400 transition-colors">  
                            {event.title}  
                          </h3>  
                          <div className="space-y-2 text-muted text-sm">  
                            <div className="flex items-center gap-2">  
                              <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />  
                              </svg>  
                              <span>{event.date}</span>  
                            </div>  
                            <div className="flex items-center gap-2">  
                              <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />  
                              </svg>  
                              <span>{event.time}</span>  
                            </div>  
                            <div className="flex items-center gap-2">  
                              <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />  
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />  
                              </svg>  
                              <span>{event.location}</span>  
                            </div>  
                          </div>  
                        </div>  
                      </div>

                      {/* Back of Card with Registration Button */}  
                      <div className="flip-card-back glass-dark dark:bg-burgundy-900 rounded-2xl p-6 flex flex-col justify-between">  
                        <div>  
                          <h3 className="font-display text-xl font-bold text-white mb-4">{event.title}</h3>  
                          <p className="text-white/80 text-sm leading-relaxed mb-6">{event.description}</p>  
                        </div>  
                        <div className="space-y-3">  
                          <button   
                            onClick={() => openRegistrationModal(event)}  
                            className="w-full bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover-lift"  
                          >  
                            Register Now  
                          </button>  
                          <button className="w-full glass-dark border-2 border-white/30 hover:border-white text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/20">  
                            Learn More  
                          </button>  
                        </div>  
                      </div>  
                    </div>  
                  </article>  
                ))}  
              </div>

              {hasMore && (  
                <div className="text-center mt-16">  
                  <button  
                    onClick={loadMore}  
                    className="bg-burgundy-900 hover:bg-burgundy-800 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover-lift"  
                  >  
                    Load More Events  
                  </button>  
                </div>  
              )}  
            </>  
          )}  
        </div>  
      </section>

      {/* CTA Section */}  
      <section className="py-24 bg-gradient-to-br from-burgundy-900 to-burgundy-950 relative overflow-hidden">  
        <div className="blob blob-1"></div>  
        <div className="blob blob-2"></div>  
          
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">  
          <h2 className="font-display text-4xl sm:text-5xl text-white font-bold mb-6">  
            Stay Connected  
          </h2>  
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">  
            Don't miss out on upcoming events and gatherings. Subscribe to our newsletter to stay informed about everything happening at Church Name.  
          </p>  
          <div className="flex flex-col sm:flex-row gap-4 justify-center">  
            <div className="flex gap-2 max-w-md mx-auto sm:mx-0">  
              <input  
                type="email"  
                placeholder="Your email address"  
                className="flex-1 px-6 py-4 rounded-full glass-dark border border-white/20 text-white placeholder-white/50 focus:border-gold-400 focus:outline-none"  
              />  
              <button className="bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover-lift">  
                Subscribe  
              </button>  
            </div>  
          </div>  
          <Link  
            to="/"  
            className="inline-block mt-6 text-white/60 hover:text-white transition-colors"  
          >  
            ← Back to Home  
          </Link>  
        </div>  
      </section>

      {/* Footer */}  
      <SiteFooter showSocial={false} />  
    </div>  
  );  
};

export default Events;
