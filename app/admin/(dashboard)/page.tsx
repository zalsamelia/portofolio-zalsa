'use client';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, FolderKanban, UserCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Selamat Datang, Admin!</h1>
        <p className="text-gray-500 mt-2">Kelola konten portofolio Anda di sini.</p>
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
