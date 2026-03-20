'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function ProjectForm({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isEdit = params.id !== 'create';
  
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '', 
    description: '',
    image: '',
    impact: '',
    techStack: '', 
    linkCaseStudy: '',
    linkGithub: ''
  });

  useEffect(() => {
    if (isEdit) {
      const fetchProject = async () => {
        try {
          const docRef = doc(db, 'projects', params.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
              title: data.title || '',
              category: data.category || '',
              description: data.description || '',
              image: data.image || '',
              impact: data.impact || '',
              techStack: data.techStack?.join(', ') || '',
              linkCaseStudy: data.link?.caseStudy || '',
              linkGithub: data.link?.github || ''
            });
          }
        } catch (error) {
          console.error("Error fetching project", error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchProject();
    }
  }, [isEdit, params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const projectData = {
      title: formData.title,
      category: formData.category,
      categories: [formData.category, 'All'], // For filtering compatibility
      description: formData.description,
      image: formData.image || '/images/project-placeholder.svg',
      impact: formData.impact,
      techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean),
      link: {
        caseStudy: formData.linkCaseStudy,
        github: formData.linkGithub
      }
    };

    try {
      if (isEdit) {
        await updateDoc(doc(db, 'projects', params.id), projectData);
      } else {
        await addDoc(collection(db, 'projects'), projectData);
      }
      router.push('/admin/projects');
    } catch (error) {
      console.error("Error saving project", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading form...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto pb-20">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-full transition-colors shadow-sm">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit Project' : 'Tambah Project Baru'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Project Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" placeholder="Contoh: Customer Segmentation" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Kategori (Category)</label>
            <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" placeholder="Contoh: Machine Learning, Dashboard, dll" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Deskripsi Singkat (Description)</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" placeholder="Jelaskan project ini secara singkat..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Dampak/Hasil Bisnis (Impact)</label>
            <input type="text" name="impact" value={formData.impact} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" placeholder="Contoh: 25% increase in ROI" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Stack Teknologi (pisahkan dengan koma)</label>
            <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" placeholder="Python, SQL, Tableau" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Link URL Gambar (Opsional)</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all block" placeholder="https://..." />
          <p className="text-xs text-gray-500 mt-1">Gunakan link gambar dari tempat gratis spt Imgur/Google Drive. Kosongkan untuk pakai gambar default.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Link Case Study / Laporan</label>
            <input type="text" name="linkCaseStudy" value={formData.linkCaseStudy} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Link GitHub (Opsional)</label>
            <input type="text" name="linkGithub" value={formData.linkGithub} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" placeholder="https://github.com/..." />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button type="submit" disabled={saving} className="bg-[#5D3A5D] hover:bg-[#5D3A5D]/90 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-md disabled:opacity-70">
            {saving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <><Save size={20} /> Simpan Project</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
