'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, UserCircle, LogOut, FileText, Award } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Projects', icon: FolderKanban, path: '/admin/projects' },
    { name: 'Hero Section', icon: UserCircle, path: '/admin/profile' },
    { name: 'About & Exp', icon: FileText, path: '/admin/about' },
    { name: 'Skills & Contact', icon: Award, path: '/admin/skills' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-10 shadow-sm">
      <div className="flex items-center justify-center h-20 border-b border-gray-100">
        <h1 className="text-xl font-bold text-[#5D3A5D]">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-[#E8C4C4]/30 text-[#5D3A5D] font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#5D3A5D]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#5D3A5D]' : 'text-gray-400'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
