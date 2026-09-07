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
    <div className="w-64 bg-[#343F35] text-[#E8EDEA] flex flex-col rounded-2xl border border-[#262E27] shrink-0 p-4 shadow-sm h-full min-h-[calc(100vh-8rem)]">
      {/* Navigation list */}
      <div className="flex-1 space-y-1">
        <div className="px-3 py-2 text-[10px] uppercase font-bold text-[#A3B18A] tracking-widest flex items-center justify-between">
          <span>{currentUser?.role} NAVIGATION</span>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => selectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-[#4A5D4E] text-white shadow-xs font-semibold'
                  : 'text-[#E8EDEA]/70 hover:text-white hover:bg-[#4A5D4E]/40'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-[#A3B18A]' : 'text-[#A3B18A]/60'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Storage & Sync status card matching Design HTML */}
      <div className="mt-auto pt-4 border-t border-[#4A5D4E]/30">
        <div className="p-3.5 bg-[#262E27] rounded-xl border border-[#4A5D4E]/30 text-[#E8EDEA]">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#A3B18A] font-bold mb-2">
            <span>Offline Cache</span>
            <span className="w-2 h-2 rounded-full bg-[#A3B18A] animate-pulse"></span>
          </div>
          <div className="w-full h-1.5 bg-[#4A5D4E] rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-[#A3B18A]"></div>
          </div>
          <div className="text-[10px] mt-2 text-[#E8EDEA]/60 flex items-center justify-between font-mono">
            <span>LearnFlow Engine</span>
            <span>Active</span>
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
