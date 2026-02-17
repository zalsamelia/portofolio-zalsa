'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;

  // In production, you would fetch project by slug
  // For now, we'll find by matching slug pattern
  const project = portfolioData.projects.find(p => 
    p.link.caseStudy.includes(slug)
  );

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-playfair font-bold text-deep-plum mb-4">
            Project Not Found
          </h1>
          <Link
            href="/"
            className="text-soft-sage hover:text-deep-plum transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <Link
            href="/#projects"
            className="
              inline-flex items-center gap-2 text-deep-plum
              hover:gap-3 transition-all duration-300
            "
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-plum mb-6">
            {project.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Tag size={18} />
              <span>{project.category}</span>
            </div>
            {project.impact && (
              <div className="flex items-center gap-2 bg-soft-sage/20 px-4 py-2 rounded-full">
                <span className="text-sm text-deep-plum font-medium">
                  {project.impact}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.link.github && (
              <a
                href={project.link.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-6 py-3 bg-deep-plum text-white rounded-full
                  transition-all duration-300 hover:scale-105 hover:shadow-lg
                "
              >
                <Github size={20} />
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="aspect-video bg-gradient-to-br from-muted-rose/20 to-soft-sage/20 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-deep-plum/10 rounded-lg mx-auto mb-4"></div>
              <p className="text-gray-400">Project Screenshot</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-playfair font-bold text-deep-plum mb-6">
            Project Overview
          </h2>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-bold text-deep-plum mb-4">Challenge</h3>
            <p className="text-gray-600 mb-6">
              This project addressed the need for {project.category.toLowerCase()} 
              solutions to drive business insights and decision-making. The goal was 
              to create a scalable, efficient system that could handle complex data 
              analysis requirements.
            </p>

            <h3 className="text-xl font-bold text-deep-plum mb-4">Solution</h3>
            <p className="text-gray-600 mb-6">
              Using {project.techStack.join(', ')}, I developed a comprehensive solution 
              that transformed raw data into actionable insights. The implementation 
              focused on accuracy, performance, and user-friendly visualization.
            </p>

            <h3 className="text-xl font-bold text-deep-plum mb-4">Impact</h3>
            <p className="text-gray-600 mb-6">
              {project.impact}. The solution has been successfully deployed and 
              continues to provide valuable insights for data-driven decision making.
            </p>

            <h3 className="text-xl font-bold text-deep-plum mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-muted-rose rounded-full mt-2"></span>
                <span>Interactive data visualization and reporting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-muted-rose rounded-full mt-2"></span>
                <span>Automated data processing and cleaning pipeline</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-muted-rose rounded-full mt-2"></span>
                <span>Real-time analytics and monitoring</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-muted-rose rounded-full mt-2"></span>
                <span>Scalable architecture for future growth</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* More Projects CTA */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Link
            href="/#projects"
            className="
              inline-flex items-center gap-2 px-8 py-4 bg-deep-plum text-white rounded-full
              font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl
            "
          >
            View More Projects
            <ExternalLink size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
