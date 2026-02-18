'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Tag } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;

  // Cari project berdasarkan slug dari URL
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
            ← Kembali ke Beranda
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
            Kembali ke Projects
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Judul */}
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-plum mb-6">
            {project.title}
          </h1>

          {/* Info Meta */}
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

          {/* Deskripsi Singkat */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 tracking-wider uppercase mb-3">
              Teknologi yang Digunakan
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

          {/* Link Tombol */}
          <div className="flex flex-wrap gap-4">
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
                Lihat di GitHub
              </a>
            )}
            {project.link.live && (
              <a
                href={project.link.live}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-6 py-3 border-2 border-deep-plum text-deep-plum rounded-full
                  transition-all duration-300 hover:scale-105 hover:bg-deep-plum hover:text-white
                "
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Gambar Project */}
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

      {/* Detail Project */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-playfair font-bold text-deep-plum mb-8 border-b pb-4">
            Project Overview
          </h2>

          <div className="prose prose-lg max-w-none">
            {/* Deskripsi Lengkap / About */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-deep-plum mb-4">About this Project</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Structured Sections */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-deep-plum mb-3">Challenge</h3>
                <p className="text-gray-600 leading-relaxed">
                  Project ini mengatasi kebutuhan solusi {project.category.toLowerCase()}
                  untuk mendorong wawasan bisnis dan pengambilan keputusan. Tantangan utamanya adalah mengolah data dalam jumlah besar dengan cepat dan akurat.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-deep-plum mb-3">Solution</h3>
                <p className="text-gray-600 leading-relaxed">
                  Menggunakan {project.techStack.join(', ')}, saya mengembangkan solusi komprehensif
                  yang mengubah data mentah menjadi wawasan yang dapat ditindaklanjuti. Fokus implementasi adalah pada akurasi, performa, dan visualisasi yang user-friendly.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-deep-plum mb-3">Impact</h3>
                <p className="text-gray-600 leading-relaxed bg-soft-sage/20 p-4 rounded-lg border border-soft-sage inline-block">
                  {project.impact}
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-deep-plum mb-4">Fitur Utama</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-muted-rose rounded-full mt-2"></span>
                <span>Visualisasi data dan pelaporan interaktif</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-muted-rose rounded-full mt-2"></span>
                <span>Pipeline pemrosesan dan pembersihan data otomatis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-muted-rose rounded-full mt-2"></span>
                <span>Analitik dan pemantauan real-time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-muted-rose rounded-full mt-2"></span>
                <span>Arsitektur yang skalabel untuk pertumbuhan di masa depan</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Lihat Project Lain */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Link
            href="/#projects"
            className="
              inline-flex items-center gap-2 px-8 py-4 bg-deep-plum text-white rounded-full
              font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl
            "
          >
            Lihat Project Lainnya
            <ExternalLink size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
