'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Database, BarChart2, Brain, Award, X, Download, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/lib/data';

const SkillsSection = () => {
  const { skills } = portfolioData;
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'database': return <Database size={32} className="text-deep-plum" />;
      case 'bar-chart-2': return <BarChart2 size={32} className="text-deep-plum" />;
      case 'brain': return <Brain size={32} className="text-deep-plum" />;
      default: return <Database size={32} className="text-deep-plum" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Core Competencies */}
        <div className="mb-20">
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-plum text-center mb-12">
            Core Competencies
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.coreCompetencies.map((competency, index) => (
              <div
                key={index}
                className="
                  bg-white border border-gray-200 rounded-2xl p-8
                  transition-all duration-300
                  hover:shadow-xl hover:border-soft-sage
                  group
                "
              >
                {/* Icon */}
                <div className="
                  w-16 h-16 bg-soft-sage/20 rounded-xl
                  flex items-center justify-center mb-6
                  transition-all duration-300
                  group-hover:bg-soft-sage group-hover:scale-110
                ">
                  {getIcon(competency.icon)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-deep-plum mb-4">
                  {competency.title}
                </h3>

                {/* Items */}
                <ul className="space-y-3">
                  {competency.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="
                        flex items-start gap-3 text-gray-600
                        transition-all duration-300
                        hover:text-deep-plum hover:translate-x-2
                      "
                    >
                      <span className="w-1.5 h-1.5 bg-muted-rose rounded-full mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Expertise & Core Strengths */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Technical Expertise */}
          <div>
            <h3 className="text-3xl font-playfair font-bold text-deep-plum mb-8">
              Technical Expertise
            </h3>

            <div className="space-y-6">
              {skills.technicalExpertise.map((tech, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700">{tech.skill}</span>
                    <span className="font-medium text-deep-plum">{tech.level}%</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-muted-rose to-soft-sage transition-all duration-1000 ease-out"
                      style={{ width: `${tech.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Strengths */}
          <div>
            <h3 className="text-3xl font-playfair font-bold text-deep-plum mb-8">
              Core Strengths
            </h3>

            <div className="flex flex-wrap gap-3">
              {skills.coreStrengths.map((strength, index) => (
                <div
                  key={index}
                  className="
                    px-6 py-3 bg-soft-sage/10 text-deep-plum rounded-full
                    font-medium transition-all duration-300
                    hover:bg-muted-rose/20 hover:scale-105
                    cursor-default
                  "
                >
                  {strength}
                </div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="mt-8 p-6 bg-gradient-to-r from-muted-rose/10 to-soft-sage/10 rounded-2xl">
              <p className="text-gray-600 italic">
                &quot;Combining technical expertise with strategic thinking to deliver data-driven solutions that create measurable business impact.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-gold-metallic" size={32} />
            <h3 className="text-3xl font-playfair font-bold text-deep-plum">
              Certifications
            </h3>
          </div>

          <ul className="space-y-4">
            {skills.certifications.map((cert, index) => (
              <li
                key={index}
                onClick={() => setSelectedCert(cert)}
                className="
                  flex items-start gap-3 text-gray-600
                  cursor-pointer transition-all duration-300
                  hover:text-deep-plum hover:translate-x-2
                "
              >
                <span className="w-2 h-2 bg-gold-metallic rounded-full mt-2 flex-shrink-0"></span>
                <span className="hover:underline">
                  {cert.name} - {cert.issuer} ({cert.year})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal Sertifikat */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-[80%] max-w-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button
              onClick={() => setSelectedCert(null)}
              className="
                absolute top-4 right-4 p-2 rounded-full
                bg-gray-100 hover:bg-gray-200 transition-colors
              "
            >
              <X size={24} />
            </button>

            {/* Konten Sertifikat */}
            <div className="text-center">
              <Award className="text-gold-metallic mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-playfair font-bold text-deep-plum mb-2">
                {selectedCert.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedCert.issuer} • {selectedCert.year}
              </p>

              {/* Gambar Sertifikat */}
              <div className="bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative mb-6" style={{ minHeight: '200px' }}>
                {selectedCert.imageUrl ? (
                  <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={selectedCert.imageUrl}
                      alt={selectedCert.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="text-gray-300 mx-auto mb-2" size={64} />
                    <p className="text-gray-400">Certificate Image</p>
                  </div>
                )}
              </div>

              {/* Tombol Aksi */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {/* Tombol Download PDF */}
                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    download={`${selectedCert.name.replace(/\s+/g, '_')}_Certificate.pdf`}
                    className="
                      flex items-center justify-center gap-2
                      px-6 py-3 bg-deep-plum text-white rounded-full
                      font-medium transition-all duration-300
                      hover:scale-105 hover:shadow-lg
                    "
                  >
                    <Download size={18} />
                    Download PDF
                  </a>
                )}


              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
