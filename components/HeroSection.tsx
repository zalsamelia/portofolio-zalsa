'use client';


import { Download, ArrowRight } from 'lucide-react';
import { portfolioData } from '@/lib/data';

const HeroSection = () => {
  const { hero, stats } = portfolioData;

  const handleDownloadCV = () => {
    // Download CV from public/files folder
    const link = document.createElement('a');
    link.href = '/files/Zalsabilah_DataAnalyst_Resume.pdf';
    link.download = 'Zalsabilah_DataAnalyst_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <span className="w-2 h-2 bg-soft-sage rounded-full animate-pulse"></span>
              {hero.status}
            </div>

            {/* Title */}
            <div className="space-y-4">
              <p className="text-sm tracking-[0.3em] text-gray-500 font-medium uppercase">
                Let&apos;s connect and create something amazing together.
              </p>
              <h1 className="text-5xl lg:text-6xl font-playfair font-bold leading-tight">
                Hello, I&apos;m{' '}
                <span className="text-muted-rose block mt-2">{hero.name}</span>
              </h1>
            </div>

            {/* Tagline & Description */}
            <div className="space-y-4">
              <p className="text-xl text-deep-plum font-medium">
                {hero.tagline}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {hero.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProjects}
                className="
                  bg-deep-plum text-white px-8 py-4 rounded-full
                  font-medium transition-all duration-300
                  hover:scale-105 hover:shadow-xl
                  flex items-center gap-2
                "
              >
                Explore My Work
                <ArrowRight size={20} />
              </button>

              <button
                onClick={handleDownloadCV}
                className="
                  border-2 border-deep-plum text-deep-plum px-8 py-4 rounded-full
                  font-medium transition-all duration-300
                  hover:scale-105 hover:bg-deep-plum hover:text-white
                  flex items-center gap-2
                "
              >
                <Download size={20} />
                Download CV
              </button>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Profile Image Circle */}
              <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-muted-rose/20 to-soft-sage/20 flex items-center justify-center">
                  {/* Placeholder for profile image */}
                  <div className="text-center">
                    <div className="w-32 h-32 bg-deep-plum/10 rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-400">Profile Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Circles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                relative flex flex-col items-center justify-center
                aspect-square max-w-xs mx-auto
                rounded-full border-4 border-soft-sage
                transition-all duration-300
                hover:scale-110 hover:border-muted-rose hover:shadow-xl
                cursor-pointer
              "
            >
              <div className="text-center p-8">
                <div className="text-4xl lg:text-5xl font-playfair font-bold text-deep-plum mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
