'use client';


import { Briefcase, GraduationCap } from 'lucide-react';
import { portfolioData } from '@/lib/data';

const AboutSection = () => {
  const { about, experience } = portfolioData;

  const getIcon = (iconName: string) => {
    if (iconName === 'briefcase') return <Briefcase className="text-deep-plum" size={24} />;
    if (iconName === 'graduation-cap') return <GraduationCap className="text-deep-plum" size={24} />;
    return <Briefcase className="text-deep-plum" size={24} />;
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* About Me */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Profile Image */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-full overflow-hidden border-8 border-soft-sage/30 shadow-xl">
              <div className="w-full h-full bg-gradient-to-br from-muted-rose/20 to-soft-sage/20 flex items-center justify-center">
                {/* Placeholder for profile image */}
                <div className="text-center">
                  <div className="w-32 h-32 bg-deep-plum/10 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-400">Profile Image</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - About Content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-plum mb-8">
              About Me
            </h2>

            <h3 className="text-xl font-bold text-deep-plum tracking-wider">
              {about.heading}
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed">
              {about.bio}
            </p>

            <div className="pt-6">
              <h4 className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase mb-4">
                CORE METHODOLOGIES
              </h4>
              <ul className="space-y-3">
                {about.methodologies.map((methodology, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-muted-rose rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-600">{methodology}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl">
          <h3 className="text-3xl font-playfair font-bold text-deep-plum mb-8">
            Experience
          </h3>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="flex gap-4 items-start group">
                {/* Icon */}
                <div className="
                  w-14 h-14 rounded-xl bg-soft-sage/30 flex items-center justify-center
                  flex-shrink-0 transition-all duration-300
                  group-hover:bg-soft-sage group-hover:scale-110
                ">
                  {getIcon(exp.icon)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm text-gray-500 font-medium">
                      {exp.period}
                    </span>
                    <span className="text-gray-300">—</span>
                    <span className="text-lg font-bold text-deep-plum">
                      {exp.role}
                    </span>
                  </div>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
