import React, { useState } from "react";
import { toast } from "sonner";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const projects = [
    {
      name: "Distributed File System",
      description: "A comprehensive file system implementation inspired by Amazon S3, featuring both local and distributed storage capabilities.",
      technologies: ["C++", "Web Server", "HTTP API"],
      timeline: "May 2024 - June 2024",
      features: [
        "On-disk storage with inode management",
        "Hierarchical file structures",
        "Multiple client simultaneous access",
        "HTTP methods (GET, PUT, DELETE)",
        "Transactional disk writes for consistency"
      ],
      github: "#",
      demo: "#",
      category: "Systems Programming"
    },
    {
      name: "Online Marketplace",
      description: "Full-stack web application providing a complete e-commerce platform with user authentication and communication features.",
      technologies: ["Django", "Python", "HTML/CSS"],
      timeline: "June 2024 - July 2024",
      features: [
        "User registration and secure authentication",
        "Real-time messaging system between users",
        "Personalized user dashboard",
        "Custom forms for item listings and transactions",
        "Profile management system"
      ],
      github: "#",
      demo: "#",
      category: "Web Development"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Demo form submission
    toast.success("Message sent successfully! I'll get back to you soon.");

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      message: ""
    });
  };

  return (
    <section id="projects" className="w-full bg-white py-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Card - Featured Projects */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            {/* Card Header with background image */}
            <div className="relative h-48 sm:h-64 p-6 sm:p-8 flex items-end" style={{
              backgroundImage: "url('/background-section3.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold">
                Featured Projects
              </h2>
            </div>
            
            {/* Card Content */}
            <div className="bg-white p-4 sm:p-8" style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #ECECEC"
            }}>
              <h3 className="text-lg sm:text-xl font-display mb-6 sm:mb-8">
                Recent academic and personal projects
              </h3>

              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-pulse-500 pl-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-lg text-gray-900">{project.name}</h4>
                      <div className="flex gap-2 ml-4">
                        <a 
                          href={project.github} 
                          className="text-gray-600 hover:text-pulse-500 transition-colors"
                          aria-label="View GitHub repository"
                        >
                          <Github size={16} />
                        </a>
                        <a 
                          href={project.demo} 
                          className="text-gray-600 hover:text-pulse-500 transition-colors"
                          aria-label="View live demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                    
                    <p className="text-sm text-pulse-600 mb-2">{project.category} • {project.timeline}</p>
                    <p className="text-gray-700 mb-3 text-sm">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-pulse-50 text-pulse-700 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <ul className="text-xs text-gray-600 space-y-1">
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <span className="text-pulse-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card - Contact Form */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            {/* Card Header with background image */}
            <div className="relative h-48 sm:h-64 p-6 sm:p-8 flex flex-col items-start" style={{
              backgroundImage: "url('/background-section1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
              <div className="inline-block px-4 sm:px-6 py-2 border border-white text-white rounded-full text-xs mb-4">
                Let's collaborate
              </div>
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold mt-auto">
                Get in touch
              </h2>
            </div>
            
            {/* Card Content - Form */}
            <div className="bg-white p-4 sm:p-8" style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #ECECEC"
            }}>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    placeholder="Full name" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent" 
                    required 
                  />
                </div>
                
                <div>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email address" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent" 
                    required 
                  />
                </div>
                
                <div>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Tell me about your project or how we can work together..." 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pulse-500 focus:border-transparent resize-none" 
                    required 
                  />
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 bg-pulse-500 hover:bg-pulse-600 text-white font-medium rounded-full transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  You can also reach me at{' '}
                  <a 
                    href="mailto:firstenbergdan@gmail.com" 
                    className="text-pulse-600 hover:text-pulse-700 font-medium"
                  >
                    firstenbergdan@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;