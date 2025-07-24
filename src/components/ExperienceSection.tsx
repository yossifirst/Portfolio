import React, { useEffect, useRef, useState } from "react";

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  // Professional experiences data
  const experiences = [
    {
      title: "Software Development Intern",
      company: "Oracle",
      duration: "June 2025 - September 2025",
      description: "Developed an AI-powered Digital Assistant for internal Oracle tools, implementing SQL Dialogs to translate natural language queries into SQL for non-technical users.",
      background: "/background-section1.png",
      badge: "Latest Role"
    },
    {
      title: "Software Engineer",
      company: "CORE Lab, UC Davis",
      duration: "January 2025 - Present",
      description: "Developing autonomous driving capabilities using TinySAM and LangSAM for the Davis Autonomous Race Car project with ROS2 Framework.",
      background: "/background-section2.png",
      badge: "Current"
    },
    {
      title: "Machine Learning Engineer",
      company: "AIVISION FOOD, UC Davis",
      duration: "September 2024 - Present",
      description: "Spearheading enhancement of ML models for identifying insect species in agricultural products using YOLOv8, deployed on AWS infrastructure.",
      background: "/background-section3.png",
      badge: "Current"
    },
    {
      title: "Software Engineer Intern",
      company: "Stealth EdTech Startup",
      duration: "June 2024 - September 2024",
      description: "Led development of a chess education coach mobile app from the ground up, employing Stockfish AI for personalized chess experiences.",
      background: "/background-section1.png",
      badge: "Leadership"
    },
    {
      title: "Creative Director",
      company: "John Rusanov",
      duration: "March 2024 - Present",
      description: "Partnering with an influencer with 5M+ followers to create content that has amassed over 150M views, collaborating with major brands.",
      background: "/background-section2.png",
      badge: "Creative"
    }
  ];

  // Responsive timing function with shorter duration
  const cardStyle = {
    height: '60vh',
    maxHeight: '600px',
    borderRadius: '20px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };

  useEffect(() => {
    // Create intersection observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;
        
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 3; // Increased for 5 cards
          
          // Calculate the scroll progress
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
          }
          
          // Determine which card should be visible based on progress (5 cards)
          if (progress >= 0.8) {
            setActiveCardIndex(4);
          } else if (progress >= 0.6) {
            setActiveCardIndex(3);
          } else if (progress >= 0.4) {
            setActiveCardIndex(2);
          } else if (progress >= 0.2) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className="relative" 
      style={{ height: '500vh' }} // Increased height for 5 cards
    >
      <section className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-white" id="experience">
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
          <div className="mb-1 md:mb-2">
            <div className="flex items-center gap-4 mb-1 md:mb-1 pt-4 sm:pt-3 md:pt-2">
              <div className="pulse-chip opacity-0 animate-fade-in" style={{
                animationDelay: "0.1s"
              }}>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">02</span>
                <span>Experience</span>
              </div>
            </div>
            
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-1">
              Professional Experience
            </h2>
          </div>
          
          <div ref={cardsContainerRef} className="relative flex-1 perspective-1000">
            {experiences.map((experience, index) => {
              const isVisible = activeCardIndex >= index;
              const zIndex = 10 + (index * 10);
              
              // Calculate transform based on card position
              let translateY = '200px';
              let scale = 0.9 - (index * 0.02);
              let opacity = 0;
              
              if (isVisible) {
                const offset = (experiences.length - 1 - index) * 15;
                translateY = `${90 + offset}px`;
                opacity = activeCardIndex === index ? 1 : 0.9 - ((activeCardIndex - index) * 0.1);
                if (activeCardIndex === index) {
                  scale = 1;
                } else {
                  scale = 0.95 - ((activeCardIndex - index) * 0.03);
                }
              }
              
              return (
                <div 
                  key={index}
                  className={`absolute inset-0 overflow-hidden shadow-xl ${isVisible ? 'animate-card-enter' : ''}`} 
                  style={{
                    ...cardStyle,
                    zIndex,
                    transform: `translateY(${translateY}) scale(${scale})`,
                    opacity,
                    pointerEvents: isVisible ? 'auto' : 'none'
                  }}
                >
                  <div
                    className="absolute inset-0 z-0 bg-gradient-to-b from-pulse-900/40 to-dark-900/80"
                    style={{
                      backgroundImage: `url('${experience.background}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundBlendMode: "overlay"
                    }}
                  ></div>
                  
                  <div className="absolute top-4 right-4 z-20">
                    <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                      <span className="text-sm font-medium">{experience.badge}</span>
                    </div>
                  </div>
                  
                  <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                    <div className="max-w-lg">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-white font-bold leading-tight mb-2">
                        {experience.title}
                      </h3>
                      <h4 className="text-xl sm:text-2xl text-pulse-400 font-semibold mb-2">
                        {experience.company}
                      </h4>
                      <p className="text-white/80 mb-4 text-sm sm:text-base">
                        {experience.duration}
                      </p>
                      <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                        {experience.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperienceSection;