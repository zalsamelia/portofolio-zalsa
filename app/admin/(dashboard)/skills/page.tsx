'use client';
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Save, Plus, Trash2, Award, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadFileToStorage } from '@/lib/upload';

export default function SkillsAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [skillsData, setSkillsData] = useState({
    coreCompetencies: [] as { title: string; icon: string; items: string[] }[],
    technicalExpertise: [] as { skill: string; level: number }[],
    coreStrengths: [] as string[],
    certifications: [] as any[]
  });

  const [contactData, setContactData] = useState({
    heading: '',
    description: '',
    links: [] as { type: string; label: string; value: string; url: string; icon: string }[]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsSnap, contactSnap] = await Promise.all([
          getDoc(doc(db, 'site_data', 'skills')),
          getDoc(doc(db, 'site_data', 'contact'))
        ]);

        if (skillsSnap.exists()) {
          const s = skillsSnap.data();
          setSkillsData({
            coreCompetencies: s.coreCompetencies || [],
            technicalExpertise: s.technicalExpertise || [],
            coreStrengths: s.coreStrengths || [],
            certifications: s.certifications || []
          });
        }

        if (contactSnap.exists()) {
          const c = contactSnap.data();
          setContactData({
            heading: c.heading || '',
            description: c.description || '',
            links: c.links || []
          });
        }
      } catch (error) {
        console.error("Error fetching skills/contact data", error);
        toast.error('Gagal memuat data Skills & Contact.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- CORE COMPETENCIES ---
  const handleCompChange = (index: number, field: string, value: string) => {
    const newComp = [...skillsData.coreCompetencies];
    newComp[index] = { ...newComp[index], [field]: value };
    setSkillsData({ ...skillsData, coreCompetencies: newComp });
  };
  const addComp = () => setSkillsData({ ...skillsData, coreCompetencies: [...skillsData.coreCompetencies, { title: '', icon: 'database', items: [''] }] });
  const removeComp = (index: number) => {
    const newComp = [...skillsData.coreCompetencies];
    newComp.splice(index, 1);
    setSkillsData({ ...skillsData, coreCompetencies: newComp });
  };
  const handleCompItemChange = (compIndex: number, itemIndex: number, value: string) => {
    const newComp = [...skillsData.coreCompetencies];
    newComp[compIndex].items[itemIndex] = value;
    setSkillsData({ ...skillsData, coreCompetencies: newComp });
  };
  const addCompItem = (compIndex: number) => {
    const newComp = [...skillsData.coreCompetencies];
    newComp[compIndex].items.push('');
    setSkillsData({ ...skillsData, coreCompetencies: newComp });
  };
  const removeCompItem = (compIndex: number, itemIndex: number) => {
    const newComp = [...skillsData.coreCompetencies];
    newComp[compIndex].items.splice(itemIndex, 1);
    setSkillsData({ ...skillsData, coreCompetencies: newComp });
  };

  // --- TECHNICAL EXPERTISE ---
  const handleTechChange = (index: number, field: string, value: string | number) => {
    const newTech = [...skillsData.technicalExpertise];
    newTech[index] = { ...newTech[index], [field]: value };
    setSkillsData({ ...skillsData, technicalExpertise: newTech });
  };
  const addTech = () => setSkillsData({ ...skillsData, technicalExpertise: [...skillsData.technicalExpertise, { skill: '', level: 50 }] });
  const removeTech = (index: number) => {
    const newTech = [...skillsData.technicalExpertise];
    newTech.splice(index, 1);
    setSkillsData({ ...skillsData, technicalExpertise: newTech });
  };

  // --- CORE STRENGTHS ---
  const handleStrengthChange = (index: number, value: string) => {
    const newStrengths = [...skillsData.coreStrengths];
    newStrengths[index] = value;
    setSkillsData({ ...skillsData, coreStrengths: newStrengths });
  };
  const addStrength = () => setSkillsData({ ...skillsData, coreStrengths: [...skillsData.coreStrengths, ''] });
  const removeStrength = (index: number) => {
    const newStrengths = [...skillsData.coreStrengths];
    newStrengths.splice(index, 1);
    setSkillsData({ ...skillsData, coreStrengths: newStrengths });
  };

  // --- CERTIFICATIONS ---
  const handleCertChange = (index: number, field: string, value: string) => {
    const newCerts = [...skillsData.certifications];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setSkillsData({ ...skillsData, certifications: newCerts });
  };
  const addCert = () => setSkillsData({ ...skillsData, certifications: [...skillsData.certifications, { name: '', issuer: '', year: '', imageUrl: '', pdfUrl: '' }] });
  const removeCert = (index: number) => {
    const newCerts = [...skillsData.certifications];
    newCerts.splice(index, 1);
    setSkillsData({ ...skillsData, certifications: newCerts });
  };

  const [uploadingCertImage, setUploadingCertImage] = useState<number | null>(null);
  const [uploadingCertPdf, setUploadingCertPdf] = useState<number | null>(null);

  const handleCertImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCertImage(index);
    const toastId = toast.loading(`Mengunggah gambar sertifikat...`);
    try {
      const url = await uploadFileToStorage(file, 'certificates');
      handleCertChange(index, 'imageUrl', url);
      toast.success('Gambar berhasil diunggah!', { id: toastId });
    } catch {
      toast.error('Gagal.', { id: toastId });
    } finally {
      setUploadingCertImage(null);
    }
  };

  const handleCertPdfUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCertPdf(index);
    const toastId = toast.loading(`Mengunggah PDF sertifikat...`);
    try {
      const url = await uploadFileToStorage(file, 'certificates');
      handleCertChange(index, 'pdfUrl', url);
      toast.success('PDF berhasil diunggah!', { id: toastId });
    } catch {
      toast.error('Gagal.', { id: toastId });
    } finally {
      setUploadingCertPdf(null);
    }
  };

  // --- CONTACT INFO ---
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };
  const handleSocialChange = (index: number, field: string, value: string) => {
    const newLinks = [...contactData.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setContactData({ ...contactData, links: newLinks });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const toastId = toast.loading('Menyimpan data Skills & Contact...');

    try {
      await Promise.all([
        setDoc(doc(db, 'site_data', 'skills'), skillsData),
        setDoc(doc(db, 'site_data', 'contact'), contactData)
      ]);
      toast.success('Data berhasil disimpan!', { id: toastId });
    } catch (error) {
      console.error("Error saving data", error);
      toast.error('Gagal menyimpan data.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading Skills & Contact data...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Award className="text-[#5D3A5D]" size={36} /> Skills & Contact
        </h1>
        <p className="text-gray-500 mt-2">Kelola keahlian teknis, soft skills, sertifikat, dan info kontak Anda.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Core Competencies */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold text-[#5D3A5D]">Core Competencies (Kartu Utama)</h2>
            <button type="button" onClick={addComp} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
              <Plus size={16} /> Tambah Kartu
            </button>
          </div>
          <div className="space-y-6">
            {skillsData.coreCompetencies.map((comp, i) => (
              <div key={i} className="border p-4 rounded-xl bg-gray-50 border-gray-200">
                <div className="flex gap-4 mb-4 items-center">
                  <input type="text" placeholder="Judul (ex: Data Analysis)" value={comp.title} onChange={(e) => handleCompChange(i, 'title', e.target.value)} className="flex-1 px-4 py-2 border rounded-xl font-medium" />
                  <select value={comp.icon} onChange={(e) => handleCompChange(i, 'icon', e.target.value)} className="px-4 py-2 border rounded-xl">
                    <option value="database">Database Icon</option>
                    <option value="bar-chart-2">Chart Icon</option>
                    <option value="brain">Brain Icon</option>
                  </select>
                  <button type="button" onClick={() => removeComp(i)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg"><Trash2 size={20}/></button>
                </div>
                <div className="pl-4 space-y-2 border-l-2 border-blue-200">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Bullet Points</label>
                  {comp.items.map((item, j) => (
                    <div key={j} className="flex gap-2">
                      <input type="text" placeholder="Bullet item..." value={item} onChange={(e) => handleCompItemChange(i, j, e.target.value)} className="flex-1 px-3 py-1.5 border rounded-lg text-sm" />
                       <button type="button" onClick={() => removeCompItem(i, j)} className="text-red-400 hover:text-red-600 px-2">✕</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addCompItem(i)} className="text-xs text-blue-600 font-medium mt-2 hover:underline">+ Tambah Point</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Expertise */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold text-[#5D3A5D]">Keahlian Teknis & Level (%)</h2>
            <button type="button" onClick={addTech} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
              <Plus size={16} /> Tambah Skill
            </button>
          </div>
          <div className="space-y-3">
            {skillsData.technicalExpertise.map((tech, i) => (
              <div key={i} className="flex gap-4 items-center">
                <input type="text" placeholder="Nama Skill (ex: Python)" value={tech.skill} onChange={(e) => handleTechChange(i, 'skill', e.target.value)} className="flex-1 px-4 py-2 border rounded-xl" />
                <input type="number" placeholder="Level % (ex: 90)" value={tech.level} onChange={(e) => handleTechChange(i, 'level', Number(e.target.value))} className="w-24 px-4 py-2 border rounded-xl" />
                <button type="button" onClick={() => removeTech(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* Core Strengths */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold text-[#5D3A5D]">Core Strengths (Soft Skills)</h2>
            <button type="button" onClick={addStrength} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
              <Plus size={16} /> Tambah Kekuatan
            </button>
          </div>
          <div className="space-y-3">
            {skillsData.coreStrengths.map((str, i) => (
              <div key={i} className="flex gap-4 items-center">
                <input type="text" placeholder="Data Storytelling, Problem Solving..." value={str} onChange={(e) => handleStrengthChange(i, e.target.value)} className="flex-1 px-4 py-2 border rounded-xl" />
                <button type="button" onClick={() => removeStrength(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold text-[#5D3A5D]">Sertifikat</h2>
            <button type="button" onClick={addCert} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
              <Plus size={16} /> Tambah Sertifikat
            </button>
          </div>
          <div className="space-y-6">
            {skillsData.certifications.map((cert, i) => (
              <div key={i} className="flex gap-4 items-start relative border p-4 rounded-xl bg-gray-50">
                <div className="flex-1 space-y-3">
                  <div className="flex gap-3">
                    <input type="text" placeholder="Nama Sertifikat" value={cert.name} onChange={(e) => handleCertChange(i, 'name', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                    <input type="text" placeholder="Penerbit (ex: Google)" value={cert.issuer} onChange={(e) => handleCertChange(i, 'issuer', e.target.value)} className="w-1/3 px-3 py-2 border rounded-lg text-sm" />
                    <input type="text" placeholder="Tahun" value={cert.year} onChange={(e) => handleCertChange(i, 'year', e.target.value)} className="w-24 px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <div className="flex gap-3">
                    <label className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-white transition-colors ${uploadingCertImage === i ? 'opacity-50 pointer-events-none' : 'border-gray-300'}`}>
                      <UploadCloud size={16} className="text-[#5D3A5D]" /> 
                      <span className="text-sm font-medium text-gray-700">{cert.imageUrl ? '✓ Gambar Siap' : 'Upload Gambar'}</span>
                      <input type="file" accept="image/*" onChange={(e) => handleCertImageUpload(i, e)} className="hidden" />
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-white transition-colors ${uploadingCertPdf === i ? 'opacity-50 pointer-events-none' : 'border-gray-300'}`}>
                      <UploadCloud size={16} className="text-[#5D3A5D]" /> 
                      <span className="text-sm font-medium text-gray-700">{cert.pdfUrl ? '✓ PDF Siap' : 'Upload PDF'}</span>
                      <input type="file" accept="application/pdf" onChange={(e) => handleCertPdfUpload(i, e)} className="hidden" />
                    </label>
                  </div>
                </div>
                <button type="button" onClick={() => removeCert(i)} className="text-red-500 hover:bg-red-100 p-2 rounded-lg h-fit"><Trash2 size={20}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-xl font-semibold text-[#5D3A5D] border-b pb-2">Informasi Kontak</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Teks Heading (ex: Get in Touch)</label>
            <input type="text" name="heading" value={contactData.heading} onChange={handleContactChange} className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div className="space-y-2 mb-4">
            <label className="text-sm font-medium text-gray-700">Deskripsi Kontak</label>
            <textarea name="description" value={contactData.description} onChange={handleContactChange} rows={2} className="w-full px-4 py-2 border rounded-xl" />
          </div>

          <label className="text-sm font-medium text-gray-700 block mb-2">Social / Links</label>
          <div className="space-y-3">
            {contactData.links.map((link, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-24 font-medium text-sm text-gray-600 uppercase">{link.type}</div>
                <input type="text" placeholder="Label text" value={link.value} onChange={(e) => handleSocialChange(i, 'value', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                <input type="text" placeholder="URL (ex: https://... atau mailto:...)" value={link.url} onChange={(e) => handleSocialChange(i, 'url', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
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
