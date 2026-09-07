import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  HardDriveDownload,
  HelpCircle,
  FileCheck,
  Award,
  Bookmark,
  Sparkles,
  BarChart3,
  Users,
  CheckSquare,
  Cpu,
  ShieldAlert,
  Sliders,
  FileText,
  MessageSquare,
  MessageCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
  onSelectTab?: (tab: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onSelectTab,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { currentUser } = useAuth();
  const selectTab = (tab: string) => {
    if (onTabChange) onTabChange(tab);
    if (onSelectTab) onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const getNavItems = () => {
    switch (currentUser?.role) {
      case 'STUDENT':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'catalog', label: 'Course Catalog', icon: BookOpen },
          { id: 'learning', label: 'Learning Center', icon: GraduationCap },
          { id: 'quizzes', label: 'Quizzes & Exams', icon: HelpCircle },
          { id: 'assignments', label: 'Assignments', icon: FileCheck },
          { id: 'doubts', label: 'Ask Faculty & Doubts', icon: MessageCircle },
          { id: 'lab', label: 'Code Lab & Simulators', icon: Cpu },
          { id: 'notes', label: 'Notes & Bookmarks', icon: Bookmark },
          { id: 'assistant', label: 'AI Subject Solver (Online)', icon: Sparkles },
          { id: 'certificates', label: 'Certificates', icon: Award },
          { id: 'offline', label: 'Offline Learning Sync', icon: HardDriveDownload },
          { id: 'analytics', label: 'Progress & Analytics', icon: BarChart3 },
        ];
      case 'INSTRUCTOR':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'courses', label: 'My Courses', icon: BookOpen },
          { id: 'builder', label: 'Syllabus & Video Studio', icon: GraduationCap },
          { id: 'doubts', label: 'Student Doubts & Solver', icon: MessageCircle },
          { id: 'lab', label: 'Code Lab & Simulators', icon: Cpu },
          { id: 'quiz-manager', label: 'Quiz Manager', icon: HelpCircle },
          { id: 'assignments', label: 'Assignment Grading', icon: FileCheck },
          { id: 'students', label: 'Students, Grades & Certs', icon: Users },
          { id: 'analytics', label: 'Course Analytics', icon: BarChart3 },
        ];
      case 'ADMIN':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'users', label: 'Faculty & Student Governance', icon: Users },
          { id: 'approvals', label: 'Course Approvals', icon: CheckSquare },
          { id: 'models', label: 'AI Models & Engine', icon: Cpu },
          { id: 'audit', label: 'Audit Logs', icon: ShieldAlert },
          { id: 'settings', label: 'System Settings', icon: Sliders },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const sidebarContent = (
    <div className="w-72 lg:w-80 bg-[#343F35] text-[#E8EDEA] flex flex-col rounded-2xl border border-[#262E27] shrink-0 p-5 shadow-sm h-full min-h-[calc(100vh-8rem)]">
      {/* Prominent Sidebar Brand Header */}
      <div className="flex items-center gap-3.5 pb-4 mb-3 border-b border-[#4A5D4E]/40">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E271F] via-[#2F3E31] to-[#1B4332] border border-[#A3B18A]/50 flex items-center justify-center font-black text-xl text-[#D8F3DC] shadow-sm shrink-0">
          LF
        </div>
        <div>
          <div className="font-black text-white text-xl tracking-tight leading-tight">
            LearnFlow
          </div>
          <div className="text-xs text-[#A3B18A] font-bold tracking-wider uppercase">
            {currentUser?.role} Workspace
          </div>
        </div>
      </div>

      {/* Navigation list */}
      <div className="flex-1 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-xs uppercase font-extrabold text-[#A3B18A] tracking-wider flex items-center justify-between">
          <span>PORTAL NAVIGATION</span>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => selectTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-[#4A5D4E] text-white shadow-sm font-bold border border-[#A3B18A]/30'
                  : 'text-[#E8EDEA]/75 hover:text-white hover:bg-[#4A5D4E]/40'
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? 'text-[#A3B18A]' : 'text-[#A3B18A]/70'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Storage & Sync status card matching Design HTML */}
      <div className="mt-auto pt-4 border-t border-[#4A5D4E]/40">
        <div className="p-4 bg-[#262E27] rounded-xl border border-[#4A5D4E]/30 text-[#E8EDEA]">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#A3B18A] font-bold mb-2.5">
            <span>Offline Local Storage</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="w-full h-2 bg-[#4A5D4E] rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-emerald-400"></div>
          </div>
          <div className="text-xs mt-2.5 text-[#E8EDEA]/70 flex items-center justify-between font-mono">
            <span>LearnFlow Engine v2.4</span>
            <span className="text-emerald-300 font-bold">100% Operational</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-50 flex-1 max-w-xs w-full bg-[#343F35] p-2 flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
