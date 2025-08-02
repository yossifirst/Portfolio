
import React from "react";

const SpecsSection = () => {
  return (
    <section className="w-full py-6 sm:py-10 bg-white" id="specifications">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header with badge and line */}
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="flex items-center gap-4">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pulse-500 text-white mr-2">03</span>
              <span>About</span>
            </div>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        
        {/* Main content with text mask image - responsive text sizing */}
        <div className="max-w-5xl pl-4 sm:pl-8 mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display leading-tight mb-8 sm:mb-12">
            <span className="block bg-clip-text text-transparent bg-[url('/text-mask-image.jpg')] bg-cover bg-center">
              I'm a Computer Science student at UC Davis with a passion for building intelligent systems that make a difference. From AI-powered tools to autonomous systems, I work at the intersection of technology and innovation to create solutions that matter.
            </span>
          </h2>
        </div>

        {/* Certifications Section */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-8 pl-4 sm:pl-8">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-8">
            <div className="bg-white rounded-xl p-4 shadow-elegant border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pulse-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pulse-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.64 9 10 .46.03.86.03 1 0 5.16-.36 9-4.45 9-10V7l-10-5z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">OCI (Cloud) Foundations</h4>
                  <p className="text-gray-600 text-xs">June 2025</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-elegant border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pulse-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pulse-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">OCI AI Foundations</h4>
                  <p className="text-gray-600 text-xs">July 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-elegant border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pulse-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pulse-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Vector Databases</h4>
                  <p className="text-gray-600 text-xs">August 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-elegant border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pulse-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pulse-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8.5 15H7V9h1.5v6zm5.5 0h-1.5V9H14v6zm5.5 0H18V9h1.5v6z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Docker Foundations</h4>
                  <p className="text-gray-600 text-xs">August 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-elegant border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pulse-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pulse-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">SQL Essentials</h4>
                  <p className="text-gray-600 text-xs">July 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-elegant border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pulse-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pulse-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Multiple Context Protocol (MCP)</h4>
                  <p className="text-gray-600 text-xs">August 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-elegant border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pulse-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pulse-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7H3zm16-2V3c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v2H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-2z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Designing RESTful APIs</h4>
                  <p className="text-gray-600 text-xs">August 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-elegant border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pulse-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pulse-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Microservices: Design Patterns</h4>
                  <p className="text-gray-600 text-xs">August 2025</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-elegant border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-pulse-50 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-pulse-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.64 9 10 .46.03.86.03 1 0 5.16-.36 9-4.45 9-10V7l-10-5z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Build AI Agents & Chatbots with LangGraph</h4>
                  <p className="text-gray-600 text-xs">August 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Expertise & Development Services */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-8 pl-4 sm:pl-8">Technical Expertise & Development Services</h3>
          
          {/* Core Specializations */}
          <div className="mb-8 px-4 sm:px-8">
            <h4 className="text-xl font-semibold mb-4 text-pulse-600">Core Specializations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-pulse-50 to-pulse-100 rounded-xl p-4 border border-pulse-200">
                <h5 className="font-semibold text-pulse-800 mb-2">AI & Machine Learning</h5>
                <p className="text-sm text-pulse-700">YOLOv8 models, LLM integration, Computer Vision, Natural Language Processing</p>
              </div>
              <div className="bg-gradient-to-br from-pulse-50 to-pulse-100 rounded-xl p-4 border border-pulse-200">
                <h5 className="font-semibold text-pulse-800 mb-2">Autonomous Systems</h5>
                <p className="text-sm text-pulse-700">ROS2 development, SLAM algorithms, Real-time processing pipelines</p>
              </div>
              <div className="bg-gradient-to-br from-pulse-50 to-pulse-100 rounded-xl p-4 border border-pulse-200">
                <h5 className="font-semibold text-pulse-800 mb-2">Cloud Architecture</h5>
                <p className="text-sm text-pulse-700">AWS Lambda, S3, Oracle Cloud Infrastructure, Distributed systems</p>
              </div>
              <div className="bg-gradient-to-br from-pulse-50 to-pulse-100 rounded-xl p-4 border border-pulse-200">
                <h5 className="font-semibold text-pulse-800 mb-2">Full-Stack Development</h5>
                <p className="text-sm text-pulse-700">React, Django, TypeScript, RESTful APIs, Database design</p>
              </div>
              <div className="bg-gradient-to-br from-pulse-50 to-pulse-100 rounded-xl p-4 border border-pulse-200">
                <h5 className="font-semibold text-pulse-800 mb-2">Mobile Development</h5>
                <p className="text-sm text-pulse-700">React Native, Firebase integration, Cross-platform solutions</p>
              </div>
              <div className="bg-gradient-to-br from-pulse-50 to-pulse-100 rounded-xl p-4 border border-pulse-200">
                <h5 className="font-semibold text-pulse-800 mb-2">System Programming</h5>
                <p className="text-sm text-pulse-700">Distributed file systems, Operating systems, Low-level optimization</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-8">
            {/* Programming Languages */}
            <div className="bg-white rounded-xl p-6 shadow-elegant border border-gray-100">
              <h4 className="font-semibold text-lg mb-4 text-pulse-600">Programming Languages</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Java', 'C++', 'Kotlin', 'C', 'HTML/CSS', 'Assembly', 'Haskell', 'Erlang', 'Prolog', 'SQL'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks & Tools */}
            <div className="bg-white rounded-xl p-6 shadow-elegant border border-gray-100">
              <h4 className="font-semibold text-lg mb-4 text-pulse-600">Frameworks & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['Django', 'YOLOv8', 'React', 'TypeScript', 'ROS2', 'TinySAM', 'LangSAM', 'Firebase', 'Docker', 'Redis', 'Stockfish AI'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud & Infrastructure */}
            <div className="bg-white rounded-xl p-6 shadow-elegant border border-gray-100">
              <h4 className="font-semibold text-lg mb-4 text-pulse-600">Cloud & Infrastructure</h4>
              <div className="flex flex-wrap gap-2">
                {['AWS Lambda', 'AWS S3', 'Oracle Cloud', 'OCI AI Services', 'SQL Dialogs', 'IAM', 'LLMs', 'Nvidia Jetson Xavier NX', 'Ubuntu 20.04'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Experience */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-8 pl-4 sm:pl-8">Leadership & Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-8">
            <div className="bg-white rounded-xl p-6 shadow-elegant border border-gray-100">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-pulse-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Director of Philanthropy</h4>
                  <p className="text-pulse-600 text-sm mb-2">Alpha Epsilon Pi • September 2023 - Present</p>
                  <p className="text-gray-700 text-sm">Orchestrating 100+ students to raise $10,000+ for charities and organizing 200+ hours of community service with the City of Davis.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-elegant border border-gray-100">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-pulse-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">TEDx Speaker</h4>
                  <p className="text-pulse-600 text-sm mb-2">TEDx UC Davis • April 2025</p>
                  <p className="text-gray-700 text-sm">Speaking on embracing fear for personal growth, illustrating how overcoming discomfort leads to continuous self-improvement.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-elegant border border-gray-100">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-pulse-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Innovation Engineer</h4>
                  <p className="text-pulse-600 text-sm mb-2">TechSprint Innovators, UC Davis • October 2024 - Present</p>
                  <p className="text-gray-700 text-sm">Researching and implementing methods to bring projects to life, leveraging technical skills and experimentation.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-elegant border border-gray-100">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-pulse-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Board of Directors</h4>
                  <p className="text-pulse-600 text-sm mb-2">Hillel at Davis and Sacramento • July 2024 - Present</p>
                  <p className="text-gray-700 text-sm">Managing a $500,000+ budget, allocating resources to enhance campus engagement while ensuring financial sustainability.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
