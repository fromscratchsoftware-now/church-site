import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { loadTestimonials } from '../lib/content';
const Testimonials = () => {  
  const [selectedCategory, setSelectedCategory] = useState('All');  
  const [visibleCount, setVisibleCount] = useState(9);
  const categories = ['All', 'New Members', 'Long-time Members', 'Youth', 'Ministry Leaders', 'Volunteers'];

  const fallbackTestimonials = useMemo(() => [  
    {  
      name: "Sarah Johnson",  
      role: "Member since 2015",  
      category: "Long-time Members",  
      image: "/images/unsplash/1494790108377-be9c29b29330-w400.jpg",  
      quote: "This church has been my spiritual home for years. The community is warm, the teaching is biblical, and I've grown so much in my faith here. Every Sunday feels like coming home to family.",  
      rating: 5,  
      date: "January 2026"  
    },  
    {  
      name: "Michael Thompson",  
      role: "Youth Ministry Volunteer",  
      category: "Volunteers",  
      image: "/images/unsplash/1507003211169-0a1dd7228f2d-w400.jpg",  
      quote: "Serving in the youth ministry has been life-changing. Watching young people encounter God's love and grow in their faith is incredibly rewarding. This church equipped me to serve effectively.",  
      rating: 5,  
      date: "December 2025"  
    },  
    {  
      name: "Emily Davis",  
      role: "New Member",  
      category: "New Members",  
      image: "/images/unsplash/1438761681033-6461ffad8d80-w400.jpg",  
      quote: "As a new member, I was welcomed with open arms. The genuine love and care from everyone here made me feel like I belonged from day one. I'm so grateful to have found this church family.",  
      rating: 5,  
      date: "February 2026"  
    },  
    {  
      name: "James Wilson",  
      role: "Worship Team Leader",  
      category: "Ministry Leaders",  
      image: "/images/unsplash/1500648767791-00dcc994a43e-w400.jpg",  
      quote: "Being part of the worship team has deepened my relationship with God. The way our church community worships together is truly powerful. It's an honor to lead others into God's presence.",  
      rating: 5,  
      date: "November 2025"  
    },  
    {  
      name: "Maria Rodriguez",  
      role: "Small Group Leader",  
      category: "Ministry Leaders",  
      image: "/images/unsplash/1580489944761-15a19d654956-w400.jpg",  
      quote: "Leading a small group has transformed my walk with Christ. The deep connections and authentic community we've built are priceless. This church truly values discipleship and spiritual growth.",  
      rating: 5,  
      date: "October 2025"  
    },  
    {  
      name: "David Chen",  
      role: "Member since 2018",  
      category: "Long-time Members",  
      image: "/images/unsplash/1506794778202-cad84cf45f1d-w400.jpg",  
      quote: "The biblical teaching here is solid and practical. I've learned to apply God's Word to my daily life. The pastoral care and support during difficult times has been invaluable to me and my family.",  
      rating: 5,  
      date: "September 2025"  
    },  
    {  
      name: "Jessica Taylor",  
      role: "Youth Group Member",  
      category: "Youth",  
      image: "/images/unsplash/1534528741775-53994a69daeb-w400.jpg",  
      quote: "The youth ministry here is amazing! I've made lifelong friends and my faith has grown stronger. The youth leaders genuinely care about us and create a space where we can be authentic.",  
      rating: 5,  
      date: "January 2026"  
    },  
    {  
      name: "Robert Martinez",  
      role: "Outreach Volunteer",  
      category: "Volunteers",  
      image: "/images/unsplash/1472099645785-5658abf4ff4e-w400.jpg",  
      quote: "Serving in community outreach opened my eyes to God's heart for the hurting. This church doesn't just talk about loving others—we actively live it out. It's changed my perspective on everything.",  
      rating: 5,  
      date: "December 2025"  
    },  
    {  
      name: "Amanda White",  
      role: "New Member",  
      category: "New Members",  
      image: "/images/unsplash/1487412720507-e7ab37603c6f-w400.jpg",  
      quote: "After visiting many churches, I finally found my home here. The worship is authentic, the preaching is powerful, and the people are genuinely kind. I'm excited about my spiritual journey ahead.",  
      rating: 5,  
      date: "February 2026"  
    },  
    {  
      name: "Christopher Lee",  
      role: "Men's Ministry Leader",  
      category: "Ministry Leaders",  
      image: "/images/unsplash/1519085360753-af0119f7cbe7-w400.jpg",  
      quote: "The men's ministry has helped me become a better husband, father, and follower of Christ. The accountability and brotherhood I've found here is life-changing. Iron sharpens iron.",  
      rating: 5,  
      date: "November 2025"  
    },  
    {  
      name: "Nicole Brown",  
      role: "Children's Ministry Volunteer",  
      category: "Volunteers",  
      image: "/images/unsplash/1489424731084-a5d8b219a5bb-w400.jpg",  
      quote: "Working with kids in children's ministry is pure joy! Seeing their faces light up when they learn about Jesus reminds me why I serve. This church invests heavily in the next generation.",  
      rating: 5,  
      date: "October 2025"  
    },  
    {  
      name: "Brandon Scott",  
      role: "Youth Group Member",  
      category: "Youth",  
      image: "/images/unsplash/1492562080023-ab3db95bfbce-w400.jpg",  
      quote: "The youth group helped me through some really tough times. I found real friends who share my faith and leaders who actually listen. This place has shaped who I am today.",  
      rating: 5,  
      date: "December 2025"  
    },  
    {  
      name: "Rachel Green",  
      role: "Member since 2012",  
      category: "Long-time Members",  
      image: "/images/unsplash/1544005313-94ddf0286df2-w400.jpg",  
      quote: "Over a decade here and my love for this church only grows. Through seasons of joy and hardship, this community has been constant. The friendships I've made are treasures I'll carry forever.",  
      rating: 5,  
      date: "September 2025"  
    },  
    {  
      name: "Marcus Johnson",  
      role: "Music Ministry",  
      category: "Ministry Leaders",  
      image: "/images/unsplash/1503443207922-dff7d543fd0e-w400.jpg",  
      quote: "Using my musical gifts to worship God here has been the greatest privilege. The creative freedom and spiritual depth of our music ministry creates an atmosphere where God's presence is tangible.",  
      rating: 5,  
      date: "January 2026"  
    },  
    {  
      name: "Olivia Martinez",  
      role: "New Member",  
      category: "New Members",  
      image: "/images/unsplash/1517841905240-472988babdf9-w400.jpg",  
      quote: "I was hesitant about joining a church, but this community made it easy. No judgment, just love and acceptance. I'm learning what it really means to follow Jesus in a supportive environment.",  
      rating: 5,  
      date: "February 2026"  
    }  
  ], []);

  const [allTestimonials, setAllTestimonials] = useState(fallbackTestimonials);
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const rows = await loadTestimonials(fallbackTestimonials);
      if (cancelled) return;
      setAllTestimonials(rows);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [fallbackTestimonials]);
  const filteredTestimonials = selectedCategory === 'All'   
    ? allTestimonials   
    : allTestimonials.filter(t => t.category === selectedCategory);

  const displayedTestimonials = filteredTestimonials.slice(0, visibleCount);  
  const hasMore = visibleCount < filteredTestimonials.length;

  const loadMore = () => {  
    setVisibleCount(prev => prev + 6);  
  };

  return (
    <Layout navVariant="solid">
      {/* Navigation */}  
      {/* Hero Section */}  
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">  
        <div className="blob blob-1"></div>  
        <div className="blob blob-2"></div>  
          
        <div className="absolute inset-0">  
          <img  
            src="/images/unsplash/1511632765486-a01980e01a18-w1200.jpg"  
            alt="Community testimonials"  
            className="w-full h-full object-cover"  
          />  
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy-950/90 via-burgundy-900/80 to-burgundy-950/90" />  
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">  
          <p className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in-up opacity-0 animation-delay-200">  
            Stories of Faith  
          </p>  
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white font-bold leading-tight mb-6 animate-fade-in-up opacity-0 animation-delay-400">  
            Member Testimonials  
          </h1>  
          <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto animate-fade-in-up opacity-0 animation-delay-600">  
            Real stories from real people about how God is working in and through our church community.  
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

      {/* Testimonials Grid */}  
      <section className="py-24 lg:py-32 bg-cream dark:bg-charcoal relative gradient-mesh theme-transition">  
        <div className="max-w-7xl mx-auto px-4">  
          {displayedTestimonials.length === 0 ? (  
            <div className="text-center py-20">  
              <p className="text-muted text-lg">  
                No testimonials found in this category.  
              </p>  
            </div>  
          ) : (  
            <>  
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">  
                {displayedTestimonials.map((testimonial, index) => (  
                  <article  
                    key={index}  
                    className="glass dark:bg-burgundy-900/20 rounded-3xl p-8 hover-lift card-3d theme-transition animate-fade-in-up"  
                    style={{ animationDelay: `${(index % 9) * 100}ms` }}  
                  >  
                    {/* Rating */}  
                    <div className="flex items-center gap-1 mb-6">  
                      {[...Array(testimonial.rating)].map((_, i) => (  
                        <svg key={i} className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">  
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />  
                        </svg>  
                      ))}  
                    </div>

                    {/* Quote */}  
                    <blockquote className="text-body leading-relaxed mb-6 italic">  
                      "{testimonial.quote}"  
                    </blockquote>

                    {/* Author */}  
                    <div className="flex items-center gap-4 pt-6 border-t border-burgundy-100 dark:border-burgundy-800">  
                      <img  
                        src={testimonial.image}  
                        alt={testimonial.name}  
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.opacity = '0.3';
                          e.currentTarget.style.filter = 'grayscale(1)';
                        }}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-gold-400 bg-burgundy-100 dark:bg-burgundy-900/30"  
                      />  
                      <div className="flex-1">  
                        <h3 className="font-display text-lg font-bold text-primary theme-transition">  
                          {testimonial.name}  
                        </h3>  
                        <p className="text-burgundy-600 dark:text-gold-400 text-sm">{testimonial.role}</p>  
                        <p className="text-muted text-xs mt-1">{testimonial.date}</p>  
                      </div>  
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
                    Load More Testimonials  
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
            Share Your Story  
          </h2>  
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">  
            Has God worked in your life through our church? We'd love to hear your testimony and share how He's transforming lives in our community.  
          </p>  
          <div className="flex flex-col sm:flex-row gap-4 justify-center">  
            <a  
              href="#"  
              className="bg-gold-500 hover:bg-gold-400 text-burgundy-950 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover-lift"  
            >  
              Submit Your Testimony  
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

export default Testimonials;
