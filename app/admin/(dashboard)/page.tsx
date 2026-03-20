'use client';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, FolderKanban, UserCircle, Database } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { portfolioData } from '@/lib/data';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [seeding, setSeeding] = useState(false);

  const handleAutoFillData = async () => {
    if (!confirm('Apakah Anda yakin ingin memindahkan data lama Anda (dari file data statis) ke Database ini? Jika data sudah ada, ini bisa menimpa data yang lama.')) return;
    
    setSeeding(true);
    const toastId = toast.loading('Sedang memindahkan data, harap tunggu...');
    try {
      // 1. Fill Profile (Hero)
      await setDoc(doc(db, 'site_data', 'profile'), {
        heroTitle: portfolioData.hero.title || '',
        heroName: portfolioData.hero.name || '',
        heroTagline: portfolioData.hero.tagline || '',
        heroDescription: portfolioData.hero.description || '',
        heroStatus: portfolioData.hero.status || '',
        heroImage: portfolioData.hero.profileImage || '',
        cvLink: '' 
      });

      // 2. Fill About & Experience
      await setDoc(doc(db, 'site_data', 'about'), {
        heading: portfolioData.about.heading || '',
        bio: portfolioData.about.bio || '',
        profileImage: portfolioData.about.profileImage || '',
        stats: portfolioData.stats || [],
        experience: portfolioData.experience || [],
        methodologies: portfolioData.about.methodologies || []
      });

      // 3. Fill Skills
      await setDoc(doc(db, 'site_data', 'skills'), portfolioData.skills);

      // 4. Fill Contact
      await setDoc(doc(db, 'site_data', 'contact'), portfolioData.contact);

      // 5. Fill Projects
      for (const project of portfolioData.projects) {
        // use sluggified title or a simple string as ID, let's just use string to ensure valid doc name
        const docId = project.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
        await setDoc(doc(db, 'projects', docId), {
          title: project.title,
          category: project.category,
          categories: project.categories || [],
          description: project.description,
          fullDescription: project.fullDescription || '',
          impact: project.impact || '',
          techStack: project.techStack || [],
          image: project.image || '',
          link: project.link || {}
        });
      }

      toast.success('Sukses! Semua data statis berhasil disalin.', { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error('Gagal memindahkan data.', { id: toastId });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Selamat Datang, Admin!</h1>
          <p className="text-gray-500 mt-2">Kelola konten portofolio Anda di sini.</p>
        </div>
        
        <button 
          onClick={handleAutoFillData}
          disabled={seeding}
          className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-4 py-2 border border-orange-200 rounded-xl font-medium flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <Database size={18} />
          {seeding ? 'Memproses...' : 'Auto-Fill Data Lama'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/projects" className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-[#E8C4C4]">
          <div className="w-12 h-12 bg-[#E8C4C4]/20 rounded-xl flex items-center justify-center mb-4">
            <FolderKanban className="w-6 h-6 text-[#5D3A5D]" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Projects</h2>
          <p className="text-gray-500">Kelola dan tambahkan project portofolio baru Anda.</p>
        </Link>

        <Link href="/admin/profile" className="block p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-[#E8C4C4]">
          <div className="w-12 h-12 bg-[#C4D7C4]/20 rounded-xl flex items-center justify-center mb-4">
            <UserCircle className="w-6 h-6 text-emerald-700" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile & CV</h2>
          <p className="text-gray-500">Update biodata, skills, dan link CV Anda.</p>
        </Link>
      </div>
    </div>
  );
}
