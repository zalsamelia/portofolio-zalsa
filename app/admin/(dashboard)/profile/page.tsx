'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Save, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfileAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    heroTitle: '',
    heroName: '',
    heroTagline: '',
    heroDescription: '',
    heroStatus: '',
    heroImage: '',
    cvLink: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'site_data', 'profile');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data() as any);
        } else {
          // If default data is not in firestore yet, wait for user to hit save so it creates it
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const toastId = toast.loading('Menyimpan profile...');

    try {
      await setDoc(doc(db, 'site_data', 'profile'), formData);
      toast.success('Profile berhasil disimpan!', { id: toastId });
    } catch (error) {
      console.error("Error saving profile", error);
      toast.error('Gagal menyimpan profile.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading profile data...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <UserCircle className="text-[#5D3A5D]" size={36} /> Profile & CV
        </h1>
        <p className="text-gray-500 mt-2">Ubah teks di Hero Section, About Me, dan Link CV Anda.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Hero Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-[#5D3A5D] border-b pb-2">Hero Section (Bagian Atas)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Gelar Utama (Contoh: DATA ANALYST)</label>
              <input required type="text" name="heroTitle" value={formData.heroTitle} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input required type="text" name="heroName" value={formData.heroName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Slogan Pendek (Tagline)</label>
            <input required type="text" name="heroTagline" value={formData.heroTagline} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Deskripsi Diri</label>
            <textarea required name="heroDescription" value={formData.heroDescription} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Status Pekerjaan</label>
            <input required type="text" name="heroStatus" value={formData.heroStatus} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" placeholder="Contoh: Currently Open to opportunities" />
          </div>
        </div>
          <div className="space-y-4 pt-4 border-t">
            <label className="text-sm font-medium text-gray-700 block">Foto Profil (Hero)</label>
            <div className="flex items-center gap-6">
              {/* Preview Lingkaran */}
              <div className="w-24 h-24 rounded-full border-4 border-[#C4D7C4] shadow-md overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                {formData.heroImage ? (
                  <img src={formData.heroImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle size={40} className="text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <input type="text" name="heroImage" value={formData.heroImage} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" placeholder="URL Gambar (Upload ke Google Drive / imgur)" />
                <p className="text-xs text-gray-500">Tempelkan link/URL gambar Foto Profil Anda di sini. Gambar akan otomatis melingkar.</p>
              </div>
            </div>
          </div>

        {/* CV Link */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-[#5D3A5D] border-b pb-2">Dokumen CV (PDF)</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Link/URL Dokumen CV PDF</label>
              <input type="text" name="cvLink" value={formData.cvLink} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C4D7C4] focus:border-transparent outline-none transition-all" placeholder="Link Google Drive PDF..." />
            </div>
            {formData.cvLink && (
              <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Link CV PDF sudah dimasukkan.
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Pastikan link Google Drive sudah diatur ke &quot;Anyone with the link can view&quot;.</p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="bg-[#5D3A5D] hover:bg-[#5D3A5D]/90 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-md disabled:opacity-70">
            {saving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <><Save size={20} /> Simpan Profile</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
