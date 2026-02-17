'use client';

import { useState } from 'react';
import { ArrowRight, Github } from 'lucide-react';
import { portfolioData, projectCategories } from '@/lib/data';

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { projects } = portfolioData;

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-plum mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            A selection of data projects showcasing analytical skills, visualization expertise, and business impact.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300
                hover:scale-105
                ${activeFilter === category 
                  ? 'bg-deep-plum text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="
                bg-white rounded-2xl overflow-hidden shadow-lg
                transition-all duration-300
                hover:shadow-2xl hover:scale-[1.02]
                group
              "
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-muted-rose/20 to-soft-sage/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-20 h-20 bg-deep-plum/10 rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm">Project Thumbnail</p>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-2xl font-playfair font-bold text-deep-plum">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Impact Badge */}
                {project.impact && (
                  <div className="inline-flex items-center gap-2 bg-soft-sage/20 px-4 py-2 rounded-full">
                    <svg className="w-4 h-4 text-soft-sage" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span className="text-sm text-deep-plum font-medium">
                      {project.impact}
                    </span>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  <a
                    href={project.link.caseStudy}
                    className="
                      flex items-center gap-2 text-deep-plum font-medium
                      transition-all duration-300 hover:gap-3
                    "
                  >
                    View Case Study
                    <ArrowRight size={18} />
                  </a>

                  {project.link.github && (
                    <a
                      href={project.link.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center gap-2 text-gray-600 font-medium
                        transition-all duration-300 hover:text-deep-plum
                      "
                    >
                      <Github size={18} />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if no projects found */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
