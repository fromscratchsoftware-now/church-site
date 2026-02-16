import React, { useState, useEffect, useMemo } from 'react';  
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { SITE } from '../config/site';
import { loadSermons, type Sermon } from '../lib/content';

// Video Player Modal Component  
const VideoPlayerModal = ({ sermon, isOpen, onClose }: { sermon: Sermon | null; isOpen: boolean; onClose: () => void }) => {  
  useEffect(() => {  
    if (isOpen) {  
      document.body.style.overflow = 'hidden';  
    } else {  
      document.body.style.overflow = 'unset';  
    }  
    return () => {  
      document.body.style.overflow = 'unset';  
    };  
  }, [isOpen]);

  if (!isOpen || !sermon) return null;

  return (  
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">  
      {/* Backdrop */}  
      <div   
        className="absolute inset-0 bg-burgundy-950/95 backdrop-blur-sm"  
        onClick={onClose}  
      />  
        
      {/* Modal Content */}  
      <div className="relative w-full max-w-5xl bg-white dark:bg-burgundy-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">  
        {/* Close Button */}  
        <button  
          onClick={onClose}  
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-burgundy-950/80 hover:bg-burgundy-950 text-white rounded-full flex items-center justify-center transition-all duration-300 hover-lift"  
          aria-label="Close video"  
        >  
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />  
          </svg>  
        </button>

        {/* Video Player */}  
        <div className="aspect-video bg-charcoal">  
          <iframe  
            src={sermon.videoUrl}  
            className="w-full h-full"  
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  
            allowFullScreen  
            title={sermon.title}  
          />  
        </div>

        {/* Sermon Details */}  
        <div className="p-6 sm:p-8">  
          <div className="flex flex-wrap items-center gap-3 mb-4">  
            <span className="glass dark:bg-burgundy-800 text-burgundy-700 dark:text-gold-400 text-xs font-semibold px-3 py-1 rounded-full">  
              {sermon.series}  
            </span>  
            <span className="text-burgundy-600 dark:text-gold-400 text-sm font-medium">{sermon.date}</span>  
            <span className="text-charcoal/60 dark:text-white/60 text-sm flex items-center gap-1">  
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />  
              </svg>  
              {sermon.views} views  
            </span>  
          </div>  
            
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-burgundy-950 dark:text-white mb-3">  
            {sermon.title}  
          </h2>  
            
          <p className="text-charcoal/70 dark:text-white/70 text-lg mb-4">{sermon.speaker}</p>  
            
          <p className="text-body leading-relaxed mb-6">  
            {sermon.description}  
          </p>

          {/* Action Buttons */}  
          <div className="flex flex-wrap gap-3">  
            <button className="flex items-center gap-2 bg-burgundy-900 hover:bg-burgundy-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover-lift">  
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />  
              </svg>  
              Share  
            </button>  
            <button className="flex items-center gap-2 glass dark:bg-burgundy-800 text-burgundy-950 dark:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover-lift">  
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />  
              </svg>  
              Download Audio  
            </button>  
            <button className="flex items-center gap-2 glass dark:bg-burgundy-800 text-burgundy-950 dark:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover-lift">  
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />  
              </svg>  
              Save  
            </button>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};

const Sermons = () => {  
  const [selectedCategory, setSelectedCategory] = useState('All');  
  const [visibleCount, setVisibleCount] = useState(9);  
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const categories = ['All', 'Recent', 'Most Viewed', 'Faith & Hope', 'Prayer', 'Worship', 'Family'];

  const fallbackSermons: Sermon[] = useMemo(() => [  
    {  
      title: "Walking in Purpose",  
      speaker: "Pastor James Williams",  
      date: "February 9, 2026",  
      category: "Recent",  
      series: "Living with Purpose",  
      image: "/images/unsplash/1507692049790-de58290a4334-w600.jpg",  
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
      image: "/images/unsplash/1544027993-37dbfe43562a-w600.jpg",  
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
      image: "/images/unsplash/1504052434569-70ad5836ab65-w600.jpg",  
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
      image: "/images/unsplash/1511632765486-a01980e01a18-w600.jpg",  
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
      image: "/images/unsplash/1507003211169-0a1dd7228f2d-w600.jpg",  
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
      image: "/images/unsplash/1438232992991-995b7058bbb3-w600.jpg",  
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
      image: "/images/unsplash/1509062522246-3755977927d7-w600.jpg",  
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
      image: "/images/unsplash/1519834785169-98be25ec3f84-w600.jpg",  
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
      image: "/images/unsplash/1516589178581-6cd7833ae3b2-w600.jpg",  
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
      image: "/images/unsplash/1502945015378-0e284ca1a5be-w600.jpg",  
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
      image: "/images/unsplash/1476703993599-0035a21b17a9-w600.jpg",  
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
      image: "/images/unsplash/1501386761578-eac5c94b800a-w600.jpg",  
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
      image: "/images/unsplash/1466921583968-f07aa80c526e-w600.jpg",  
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
      image: "/images/unsplash/1490730141103-6cac27aaab94-w600.jpg",  
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
      image: "/images/unsplash/1470071459604-3b5ec3a7fe05-w600.jpg",  
      duration: "47 min",  
      views: "8.3K",  
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",  
      description: "Uncover God's master plan for your life and learn how to align yourself with His divine purposes. This message will give you clarity and direction."  
    }  
  ], []);

  const [allSermons, setAllSermons] = useState<Sermon[]>(fallbackSermons);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const rows = await loadSermons(fallbackSermons);
      if (cancelled) return;
      setAllSermons(rows);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [fallbackSermons]);

  const filteredSermons = selectedCategory === 'All'   
    ? allSermons   
    : selectedCategory === 'Most Viewed'  
    ? [...allSermons].sort((a, b) => parseFloat(b.views) - parseFloat(a.views))  
    : allSermons.filter(s => s.category === selectedCategory);

  const displayedSermons = filteredSermons.slice(0, visibleCount);  
  const hasMore = visibleCount < filteredSermons.length;

  const loadMore = () => {  
    setVisibleCount(prev => prev + 6);  
  };

  const openVideoModal = (sermon: Sermon) => {  
    setSelectedSermon(sermon);  
    setIsVideoModalOpen(true);  
  };

  const closeVideoModal = () => {  
    setIsVideoModalOpen(false);  
    setTimeout(() => setSelectedSermon(null), 300);  
  };

  return (
    <Layout>  
      {/* Video Player Modal */}  
      <VideoPlayerModal   
        sermon={selectedSermon}   
        isOpen={isVideoModalOpen}   
        onClose={closeVideoModal}   
      />

      {/* Hero Section */}  
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">  
        <div className="blob blob-1"></div>  
        <div className="blob blob-2"></div>  
          
        <div className="absolute inset-0">  
          <img  
            src="/images/unsplash/1507692049790-de58290a4334-w1200.jpg"  
            alt="Sermon messages"  
            className="w-full h-full object-cover"  
          />  
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/90 via-burgundy-900/80 to-burgundy-950/90" />  
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">  
          <p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up opacity-0 animation-delay-200">  
            Messages That Transform  
          </p>  
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-tight mb-6 animate-fade-in-up opacity-0 animation-delay-400">  
            Sermon Library  
          </h1>  
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-up opacity-0 animation-delay-600">  
            Dive deeper into God's Word with our collection of powerful messages. Watch, listen, and grow in your faith journey.  
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

      {/* Sermons Grid */}  
      <section className="py-24 lg:py-32 bg-cream dark:bg-charcoal relative gradient-mesh theme-transition">  
        <div className="max-w-7xl mx-auto px-4">  
          {displayedSermons.length === 0 ? (  
            <div className="text-center py-20">  
              <p className="text-muted text-lg">  
                No sermons found in this category.  
              </p>  
            </div>  
          ) : (  
            <>  
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">  
                {displayedSermons.map((sermon, index) => (  
                  <article  
                    key={index}  
                    onClick={() => openVideoModal(sermon)}  
                    className="group cursor-pointer hover-lift card-3d theme-transition animate-fade-in-up"  
                    style={{ animationDelay: `${(index % 9) * 100}ms` }}  
                  >  
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
                      <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 to-transparent group-hover:from-burgundy-950/60 transition-all duration-300" />  
                        
                      {/* Play Button */}  
                      <div className="absolute inset-0 flex items-center justify-center">  
                        <div className="w-16 h-16 glass rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform hover-glow">  
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">  
                            <path d="M8 5v14l11-7z" />  
                          </svg>  
                        </div>  
                      </div>

                      {/* Duration & Views */}  
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">  
                        <span className="glass-dark text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">  
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />  
                          </svg>  
                          {sermon.duration}  
                        </span>  
                        <span className="glass-dark text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">  
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />  
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />  
                          </svg>  
                          {sermon.views}  
                        </span>  
                      </div>  
                    </div>

                    {/* Sermon Info */}  
                    <div className="space-y-2">  
                      <span className="inline-block glass dark:bg-burgundy-900/20 text-burgundy-700 dark:text-gold-400 text-xs font-semibold px-3 py-1 rounded-full">  
                        {sermon.series}  
                      </span>  
                      <h3 className="font-display text-xl font-semibold text-primary group-hover:text-burgundy-700 dark:group-hover:text-gold-400 transition-colors theme-transition">  
                        {sermon.title}  
                      </h3>  
                      <p className="text-muted text-sm theme-transition">{sermon.speaker}</p>  
                      <p className="text-burgundy-600 dark:text-gold-400 text-xs font-medium">{sermon.date}</p>  
                    </div>  
                  </article>  
                ))}  
              </div>

              {/* Load More Button */}  
              {hasMore && (  
                <div className="text-center mt-16">  
                  <button  
                    onClick={loadMore}  
                    className="bg-burgundy-900 hover:bg-burgundy-800 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover-lift"  
                  >  
                    Load More Sermons  
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
            Never Miss a Message  
          </h2>  
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">  
            Subscribe to our podcast or YouTube channel to get notified when we upload new sermons. Stay connected to the Word.  
          </p>  
          <div className="flex flex-col sm:flex-row gap-4 justify-center">  
            <a  
              href={SITE.links.youtubeLive}  
              target="_blank"  
              rel="noopener noreferrer"  
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover-lift"  
            >  
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">  
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>  
              </svg>  
              Subscribe on YouTube  
            </a>  
            <Link  
              to="/"  
              className="glass-dark border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover-lift"  
            >  
              Back to Home  
            </Link>  
          </div>  
        </div>  
      </section>

          </Layout>
  );
};

export default Sermons;
