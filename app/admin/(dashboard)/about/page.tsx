'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Save, Plus, Trash2, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AboutAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    heading: '',
    bio: '',
    profileImage: '',
    stats: [] as { number: string; label: string }[],
    methodologies: [] as string[],
    experience: [] as { period: string; role: string; company: string; icon: string }[]
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const docRef = doc(db, 'site_data', 'about');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            heading: data.heading || '',
            bio: data.bio || '',
            profileImage: data.profileImage || '',
            stats: data.stats || [],
            methodologies: data.methodologies || [],
            experience: data.experience || []
          });
        }
      } catch (error) {
        console.error("Error fetching about data", error);
        toast.error('Gagal memuat data About.');
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- STATS HANDLERS ---
  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };
  const addStat = () => setFormData({ ...formData, stats: [...formData.stats, { number: '', label: '' }] });
  const removeStat = (index: number) => {
    const newStats = [...formData.stats];
    newStats.splice(index, 1);
    setFormData({ ...formData, stats: newStats });
  };

  // --- EXPERIENCE HANDLERS ---
  const handleExpChange = (index: number, field: string, value: string) => {
    const newExp = [...formData.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    setFormData({ ...formData, experience: newExp });
  };
  const addExp = () => setFormData({ ...formData, experience: [...formData.experience, { period: '', role: '', company: '', icon: 'briefcase' }] });
  const removeExp = (index: number) => {
    const newExp = [...formData.experience];
    newExp.splice(index, 1);
    setFormData({ ...formData, experience: newExp });
  };

  // --- METHODOLOGIES HANDLERS ---
  const handleMethodologyChange = (index: number, value: string) => {
    const newMethods = [...formData.methodologies];
    newMethods[index] = value;
    setFormData({ ...formData, methodologies: newMethods });
  };
  const addMethodology = () => setFormData({ ...formData, methodologies: [...formData.methodologies, ''] });
  const removeMethodology = (index: number) => {
    const newMethods = [...formData.methodologies];
    newMethods.splice(index, 1);
    setFormData({ ...formData, methodologies: newMethods });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const toastId = toast.loading('Menyimpan data About & Experience...');

    try {
      await setDoc(doc(db, 'site_data', 'about'), formData);
      toast.success('Data berhasil disimpan!', { id: toastId });
    } catch (error) {
      console.error("Error saving about data", error);
      toast.error('Gagal menyimpan data.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading About & Experience data...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <FileText className="text-[#5D3A5D]" size={36} /> About & Experience
        </h1>
        <p className="text-gray-500 mt-2">Kelola teks About Me, Foto Profil, Statistik, Methodologies, dan Riwayat Pekerjaan.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic About */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-xl font-semibold text-[#5D3A5D] border-b pb-2">Informasi Dasar (About Me)</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Heading Text</label>
            <input type="text" name="heading" value={formData.heading} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" placeholder="DATA ANALYST WITH 2 YEARS EXPERIENCE" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Bio Deskripsi</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className="w-full px-4 py-2 border rounded-xl" placeholder="I specialize in turning raw data..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">URL Foto Profil (Opsional)</label>
            <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" placeholder="https://..." />
            <p className="text-xs text-gray-500">Foto profil asli Anda (bukan logo). Kosongkan untuk pakai default.</p>
          </div>
        </div>

        {/* Section 2: Stats */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold text-[#5D3A5D]">Statistik (Angka Besar)</h2>
            <button type="button" onClick={addStat} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
              <Plus size={16} /> Tambah Stat
            </button>
          </div>
          <div className="space-y-3">
            {formData.stats.map((stat, i) => (
              <div key={i} className="flex gap-4 items-center">
                <input type="text" placeholder="Angka (ex: 2+)" value={stat.number} onChange={(e) => handleStatChange(i, 'number', e.target.value)} className="w-1/3 px-4 py-2 border rounded-xl" />
                <input type="text" placeholder="Label (ex: PROJECTS COMPLETED)" value={stat.label} onChange={(e) => handleStatChange(i, 'label', e.target.value)} className="flex-1 px-4 py-2 border rounded-xl" />
                <button type="button" onClick={() => removeStat(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20}/></button>
              </div>
            ))}
            {formData.stats.length === 0 && <p className="text-sm text-gray-500">Belum ada statistik.</p>}
          </div>
        </div>

        {/* Section 3: Core Methodologies */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold text-[#5D3A5D]">Core Methodologies</h2>
            <button type="button" onClick={addMethodology} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
              <Plus size={16} /> Tambah Method
            </button>
          </div>
          <div className="space-y-3">
            {formData.methodologies.map((method, i) => (
              <div key={i} className="flex gap-4 items-center">
                <input type="text" placeholder="Nama Metodologi" value={method} onChange={(e) => handleMethodologyChange(i, e.target.value)} className="flex-1 px-4 py-2 border rounded-xl" />
                <button type="button" onClick={() => removeMethodology(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Experience */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold text-[#5D3A5D]">Riwayat Pekerjaan (Experience)</h2>
            <button type="button" onClick={addExp} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
              <Plus size={16} /> Tambah Pekerjaan
            </button>
          </div>
          <div className="space-y-6">
            {formData.experience.map((exp, i) => (
              <div key={i} className="flex gap-4 items-start relative border p-4 rounded-xl bg-gray-50">
                <div className="flex-1 space-y-3">
                  <div className="flex gap-3">
                    <input type="text" placeholder="Periode (ex: 2028-Present)" value={exp.period} onChange={(e) => handleExpChange(i, 'period', e.target.value)} className="w-1/3 px-3 py-2 border rounded-lg text-sm" />
                    <input type="text" placeholder="Posisi (ex: Data Analyst)" value={exp.role} onChange={(e) => handleExpChange(i, 'role', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <input type="text" placeholder="Nama Perusahaan" value={exp.company} onChange={(e) => handleExpChange(i, 'company', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <button type="button" onClick={() => removeExp(i)} className="text-red-500 hover:bg-red-100 p-2 rounded-lg h-fit"><Trash2 size={20}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="bg-[#5D3A5D] hover:bg-[#5D3A5D]/90 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all shadow-md disabled:opacity-70">
            {saving ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> : <><Save size={20} /> Simpan Perubahan</>}
          </button>
        </div>
      </form>
    </div>
  );
}
