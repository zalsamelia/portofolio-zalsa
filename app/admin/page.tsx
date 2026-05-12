'use client';

import { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, serverTimestamp, orderBy, query
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  PlusCircle, Pencil, Trash2, X, Check, Loader2,
  LayoutDashboard, FolderOpen, LogOut, ChevronRight
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Project {
  id?: string;
  title: string;
  category: string;
  categories: string[];
  description: string;
  image: string;
  impact: string;
  techStack: string[];
  github: string;
  demoUrl: string;
  createdAt?: any;
}

const emptyProject: Omit<Project, 'id' | 'createdAt'> = {
  title: '',
  category: '',
  categories: [],
  description: '',
  image: '',
  impact: '',
  techStack: [],
  github: '',
  demoUrl: '',
};

const ADMIN_PASSWORD = 'jalsa2024'; // Ganti sesuai keinginan

// ─── Admin Panel ─────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects'>('projects');

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState({ ...emptyProject, techStackRaw: '', categoriesRaw: '' });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  // ── Auth ──────────────────────────────────────────────────────────────────
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Password salah. Coba lagi.');
    }
  };

  // ── Fetch Projects ────────────────────────────────────────────────────────
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const data: Project[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Project, 'id'>),
      }));
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchProjects();
  }, [isLoggedIn]);

  // ── Form Helpers ──────────────────────────────────────────────────────────
  const openNewForm = () => {
    setEditingProject(null);
    setForm({ ...emptyProject, techStackRaw: '', categoriesRaw: '' });
    setShowForm(true);
  };

  const openEditForm = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      category: project.category,
      categories: project.categories || [],
      description: project.description,
      image: project.image || '',
      impact: project.impact || '',
      techStack: project.techStack || [],
      github: project.github || '',
      demoUrl: project.demoUrl || '',
      techStackRaw: (project.techStack || []).join(', '),
      categoriesRaw: (project.categories || []).join(', '),
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    setSaving(true);
    try {
      const techStack = form.techStackRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const categories = form.categoriesRaw
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);
      const category = categories[0] || form.category || '';

      const payload = {
        title: form.title,
        category,
        categories,
        description: form.description,
        image: form.image,
        impact: form.impact,
        techStack,
        github: form.github,
        demoUrl: form.demoUrl,
      };

      if (editingProject?.id) {
        await updateDoc(doc(db, 'projects', editingProject.id), payload);
        setSuccessMsg('Proyek berhasil diperbarui!');
      } else {
        await addDoc(collection(db, 'projects'), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        setSuccessMsg('Proyek berhasil ditambahkan!');
      }

      setShowForm(false);
      fetchProjects();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
      setSuccessMsg('Proyek berhasil dihapus!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // ─── Login Screen ─────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-plum via-[#4a1942] to-[#2d0f35] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-deep-plum rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <LayoutDashboard className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-deep-plum font-playfair">Admin Panel</h1>
            <p className="text-gray-500 mt-2">Portfolio Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-deep-plum transition-colors"
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-deep-plum text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all hover:scale-[1.02]"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Admin Dashboard ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-4 fixed h-full shadow-sm">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-deep-plum font-playfair">Admin Panel</h1>
          <p className="text-gray-400 text-xs mt-1">Portfolio Manager</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-deep-plum/10 text-deep-plum'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'projects'
                ? 'bg-deep-plum/10 text-deep-plum'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <FolderOpen size={18} />
            Projects
          </button>
        </nav>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Success Toast */}
        {successMsg && (
          <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-bounce">
            <Check size={18} />
            {successMsg}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold text-deep-plum font-playfair mb-2">Dashboard</h2>
            <p className="text-gray-500 mb-8">Selamat datang di panel admin portfolio.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm mb-1">Total Projects</p>
                <p className="text-4xl font-bold text-deep-plum">{projects.length}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm mb-1">Machine Learning</p>
                <p className="text-4xl font-bold text-deep-plum">
                  {projects.filter((p) => p.categories?.includes('Machine Learning') || p.category === 'Machine Learning').length}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm mb-1">Software Development</p>
                <p className="text-4xl font-bold text-deep-plum">
                  {projects.filter((p) => p.categories?.includes('Software Development') || p.category === 'Software Development').length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-700 mb-4">Daftar Project Terbaru</h3>
              {projects.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800">{p.title}</p>
                    <p className="text-xs text-gray-400">{p.category}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-deep-plum font-playfair">Projects</h2>
                <p className="text-gray-500 mt-1">Tambah, edit, atau hapus portofolio data Anda.</p>
              </div>
              <button
                onClick={openNewForm}
                className="flex items-center gap-2 bg-deep-plum text-white px-5 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all hover:scale-[1.02] shadow-md"
              >
                <PlusCircle size={18} />
                Tambah Project
              </button>
            </div>

            {/* Project Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8">
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-deep-plum">
                      {editingProject ? 'Edit Project' : 'Tambah Project Baru'}
                    </h3>
                    <button
                      onClick={() => setShowForm(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Project *</label>
                        <input
                          required
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                          placeholder="Contoh: Klasifikasi Penyakit Daun Jagung"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-deep-plum transition-colors"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Kategori (pisahkan dengan koma) *
                        </label>
                        <input
                          value={form.categoriesRaw}
                          onChange={(e) => setForm({ ...form, categoriesRaw: e.target.value })}
                          placeholder="Machine Learning, Data Analysis"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-deep-plum transition-colors"
                        />
                        <p className="text-xs text-gray-400 mt-1">Kategori pertama akan jadi kategori utama</p>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi *</label>
                        <textarea
                          required
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          rows={3}
                          placeholder="Jelaskan proyek ini secara singkat..."
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-deep-plum transition-colors resize-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Tech Stack (pisahkan dengan koma)
                        </label>
                        <input
                          value={form.techStackRaw}
                          onChange={(e) => setForm({ ...form, techStackRaw: e.target.value })}
                          placeholder="Python, PyTorch, Torchvision"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-deep-plum transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">GitHub URL</label>
                        <input
                          value={form.github}
                          onChange={(e) => setForm({ ...form, github: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-deep-plum transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Demo / Website URL</label>
                        <input
                          value={form.demoUrl}
                          onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-deep-plum transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Dampak / Impact</label>
                        <input
                          value={form.impact}
                          onChange={(e) => setForm({ ...form, impact: e.target.value })}
                          placeholder="Contoh: Akurasi 92%"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-deep-plum transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">URL Gambar</label>
                        <input
                          value={form.image}
                          onChange={(e) => setForm({ ...form, image: e.target.value })}
                          placeholder="https://... atau /images/..."
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-deep-plum transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-deep-plum text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                      >
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                        {saving ? 'Menyimpan...' : 'Simpan'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Projects Table */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-deep-plum animate-spin" />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {projects.length === 0 ? (
                  <div className="text-center py-20 text-gray-400">
                    <FolderOpen size={48} className="mx-auto mb-4 opacity-30" />
                    <p>Belum ada proyek. Klik "Tambah Project" untuk mulai.</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Project Name</th>
                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Category</th>
                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Tech Stack</th>
                        <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr
                          key={project.id}
                          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <p className="font-semibold text-gray-800 text-sm">{project.title}</p>
                            <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{project.description}</p>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-deep-plum/10 text-deep-plum">
                              {project.category}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-gray-600 text-xs">
                              {(project.techStack || []).slice(0, 3).join(', ')}
                              {(project.techStack || []).length > 3 ? ' ...' : ''}
                            </p>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditForm(project)}
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                                title="Edit"
                              >
                                <Pencil size={16} />
                              </button>
                              {deleteConfirm === project.id ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleDelete(project.id!)}
                                    className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg"
                                  >
                                    Hapus
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-lg"
                                  >
                                    Batal
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(project.id!)}
                                  className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
                                  title="Hapus"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
