'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Github, Loader2, X, ExternalLink } from 'lucide-react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Tipe data project dari Firestore / admin panel
interface Project {
  id: string;
  title: string;
  category: string;
  categories: string[];
  description: string;
  image?: string;
  impact?: string;
  techStack: string[];
  github?: string;
  link?: string;
  demoUrl?: string;
  createdAt?: any;
}

// ─── Modal Component ──────────────────────────────────────────────────────────
const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  // Tutup modal saat klik backdrop atau tekan Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Tutup"
        >
          <X size={18} className="text-gray-600" />
        </button>

        {/* Gambar / Header */}
        <div className="relative h-56 bg-gradient-to-br from-purple-100 to-rose-100 overflow-hidden rounded-t-2xl">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-24 h-24 bg-deep-plum/10 rounded-xl mx-auto mb-2 flex items-center justify-center">
                  <span className="text-deep-plum/40 text-4xl font-bold">
                    {project.title?.charAt(0) || 'P'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Badge kategori */}
          {project.category && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-deep-plum text-white text-xs font-semibold rounded-full">
                {project.category}
              </span>
            </div>
          )}
        </div>

        {/* Konten */}
        <div className="p-8 space-y-5">
          {/* Judul */}
          <h2 className="text-3xl font-playfair font-bold text-deep-plum leading-tight">
            {project.title}
          </h2>

          {/* Deskripsi lengkap */}
          <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
            {project.description}
          </p>

          {/* Impact */}
          {project.impact && (
            <div className="flex items-start gap-3 bg-soft-sage/15 border border-soft-sage/30 px-5 py-4 rounded-xl">
              <svg
                className="w-5 h-5 text-soft-sage mt-0.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-soft-sage uppercase tracking-wide mb-0.5">
                  Impact / Hasil
                </p>
                <p className="text-sm text-deep-plum font-medium">{project.impact}</p>
              </div>
            </div>
          )}

          {/* Tech Stack — semua ditampilkan */}
          {project.techStack?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-deep-plum/8 text-deep-plum text-sm rounded-full border border-deep-plum/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Semua kategori */}
          {project.categories?.length > 1 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Kategori
              </p>
              <div className="flex flex-wrap gap-2">
                {project.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-muted-rose/15 text-deep-plum text-sm rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tombol Aksi */}
          <div className="flex gap-4 pt-2">
            {(project.link || project.demoUrl) && (
              <a
                href={project.link || project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-5 py-2.5 bg-deep-plum text-white
                  rounded-full font-medium text-sm
                  hover:bg-deep-plum/90 transition-all duration-300 hover:gap-3
                "
              >
                View Project
                <ExternalLink size={16} />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-5 py-2.5 border border-gray-300
                  text-gray-700 rounded-full font-medium text-sm
                  hover:border-deep-plum hover:text-deep-plum transition-all duration-300
                "
              >
                <Github size={16} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsRef = collection(db, 'projects');
        const q = query(projectsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const firestoreProjects: Project[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || '',
              category: data.category || data.categories?.[0] || '',
              categories: data.categories || (data.category ? [data.category] : []),
              description: data.description || '',
              image: data.image || data.imageUrl || '',
              impact: data.impact || '',
              techStack: Array.isArray(data.techStack)
                ? data.techStack
                : (data.techStack || '').split(',').map((t: string) => t.trim()).filter(Boolean),
              github: data.github || data.githubUrl || data.link?.github || '',
              link: data.link || data.demoUrl || data.caseStudy || '',
              demoUrl: data.demoUrl || '',
              createdAt: data.createdAt,
            };
          });

          setProjects(firestoreProjects);

          const allCats = new Set<string>(['All']);
          firestoreProjects.forEach((p) => {
            if (p.category) allCats.add(p.category);
            p.categories?.forEach((c) => c && allCats.add(c));
          });
          setCategories(Array.from(allCats));
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects from Firestore:', err);
        setError('Gagal memuat proyek. Periksa konfigurasi Firebase.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(
          (project) =>
            project.category === activeFilter ||
            project.categories?.includes(activeFilter)
        );

  return (
    <>
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
          {!loading && categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
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
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-deep-plum animate-spin" />
              <p className="text-gray-500">Memuat proyek...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="
                    bg-white rounded-2xl overflow-hidden shadow-lg
                    transition-all duration-300
                    hover:shadow-2xl hover:scale-[1.02]
                    cursor-pointer group
                  "
                >
                  {/* Project Image */}
                  <div className="relative h-52 bg-gradient-to-br from-muted-rose/20 to-soft-sage/20 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <div className="w-20 h-20 bg-deep-plum/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                            <span className="text-deep-plum/40 text-2xl font-bold">
                              {project.title?.charAt(0) || 'P'}
                            </span>
                          </div>
                          <p className="text-sm">Project Thumbnail</p>
                        </div>
                      </div>
                    )}

                    {/* Category Badge */}
                    {project.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-deep-plum text-white text-xs font-semibold rounded-full">
                          {project.category}
                        </span>
                      </div>
                    )}

                    {/* "Klik untuk detail" hint */}
                    <div className="absolute inset-0 bg-deep-plum/0 group-hover:bg-deep-plum/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-deep-plum/80 px-4 py-2 rounded-full">
                        Lihat Detail →
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <h3 className="text-2xl font-playfair font-bold text-deep-plum group-hover:text-deep-plum/80 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description — dipotong di kartu */}
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Impact Badge */}
                    {project.impact && (
                      <div className="inline-flex items-center gap-2 bg-soft-sage/20 px-4 py-2 rounded-full">
                        <svg className="w-4 h-4 text-soft-sage" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-deep-plum font-medium">
                          {project.impact}
                        </span>
                      </div>
                    )}

                    {/* Tech Stack preview */}
                    {project.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
                            +{project.techStack.length - 4} lainnya
                          </span>
                        )}
                      </div>
                    )}

                    {/* Prompt klik */}
                    <div className="flex items-center gap-2 text-deep-plum font-medium text-sm pt-1">
                      <span>Lihat selengkapnya</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-deep-plum/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-deep-plum text-2xl">📂</span>
              </div>
              <p className="text-gray-500 text-lg">
                {activeFilter === 'All'
                  ? 'Belum ada proyek. Tambahkan lewat Admin Panel.'
                  : `Tidak ada proyek dalam kategori "${activeFilter}".`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail Project */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Animasi fadeInUp untuk modal */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ProjectsSection;
