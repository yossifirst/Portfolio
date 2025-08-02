import React from "react";
import { ExternalLink, Github } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      name: "Davis Autonomous Race Car (DARC)",
      description: "Contributing to CORE Lab's car for the F1Tenth Autonomous Racing League, developing computer vision solutions for real-time racetrack mapping and navigation.",
      technologies: ["LangSAM", "TinySAM", "TensorFlow", "ROS2", "Python", "C++", "OpenCV"],
      timeline: "January 2025 - June 2025",
      features: [
        "Semi-automated map generation pipeline with bitmask stitching method",
        "Real-time CNN control system using TinySAM for dynamic track segmentation",
        "Data preprocessing tools with GUI for filtering training images",
        "Integration with SLAM and planning stack using ROS2 on NVIDIA Jetson Xavier NX",
        "Sensor fusion proposal for LiDAR and depth data integration"
      ],
      github: "#",
      demo: "#",
      category: "Autonomous Systems"
    },
    {
      name: "Winner - Oracle Intern Idea-a-thon",
      description: "1st place winning AI-powered platform as part of Team SkillSync, helping students translate academic coursework into job-ready skills with personalized career guidance.",
      technologies: ["AI/ML", "Python", "React", "Oracle Cloud", "Data Analytics"],
      timeline: "July 2025",
      features: [
        "Skills Dashboard mapping university classes to in-demand skills",
        "Mentor-Bot providing intelligent course recommendations",
        "Integration of course evaluations with real-world job data",
        "Personalized course-to-career guidance system",
        "Strategic learning journey navigation tools"
      ],
      github: "#",
      demo: "#",
      category: "AI/Product Development"
    },
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

  return (
    <section id="projects" className="w-full bg-white py-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Featured Projects */}
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
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;