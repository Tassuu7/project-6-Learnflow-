import React, { useState } from 'react';
import {
  Bell,
  LogOut,
  User,
  Shield,
  GraduationCap,
  BookOpen,
  Check,
  Award,
  AlertTriangle,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { useTheme } from '../../context/ThemeContext';
import { UserAvatar } from './UserAvatar';

export const Header: React.FC<{
  currentSectionTitle: string;
  onToggleMobileSidebar?: () => void;
  onNavigateProfile?: () => void;
  onNavigate?: (tab: string, contextId?: string) => void;
}> = ({ currentSectionTitle, onToggleMobileSidebar, onNavigateProfile, onNavigate }) => {
  const { currentUser, logout } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useLearning();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const userNotifications = notifications.filter((n) => {
    if (!currentUser) return false;
    if (n.userId === currentUser.id) return true;
    if (n.targetRole && n.targetRole === currentUser.role) return true;
    if (n.userId === 'ALL') return true;
    return false;
  });

  const unreadNotifications = userNotifications.filter((n) => !n.isRead);

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'STUDENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#E8EDEA] text-[#343F35] border border-[#A3B18A]/50">
            <GraduationCap className="w-3.5 h-3.5 text-[#588157]" />
            Student
          </span>
        );
      case 'INSTRUCTOR':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FDF8EE] text-[#8C6019] border border-[#F2CC8F]">
            <BookOpen className="w-3.5 h-3.5 text-[#B27D26]" />
            Faculty Instructor
          </span>
        );
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#F4F1EA] text-[#2D332D] border border-[#E5E1D8]">
            <Shield className="w-3.5 h-3.5 text-[#586358]" />
            System Administrator
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="bg-white dark:bg-[#1C231E] border-b border-[#E5E1D8] dark:border-[#2B352E] sticky top-0 z-30 px-4 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between shadow-xs transition-colors">
      {/* Brand & Active view breadcrumb */}
      <div className="flex items-center gap-4 sm:gap-6">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2.5 rounded-xl border border-[#E5E1D8] dark:border-[#2B352E] text-[#586358] hover:bg-[#F9F7F2] dark:hover:bg-[#262E27] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="block w-5 h-0.5 bg-[#586358] mb-1"></span>
            <span className="block w-5 h-0.5 bg-[#586358] mb-1"></span>
            <span className="block w-5 h-0.5 bg-[#586358]"></span>
          </button>
        )}

        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#1E271F] via-[#2F3E31] to-[#1B4332] flex items-center justify-center text-[#D8F3DC] border-2 border-[#588157]/60 shadow-md font-black text-2xl sm:text-3xl tracking-wider shrink-0 transition-transform hover:scale-105">
            LF
          </div>
          <div>
            <div className="font-black text-[#1F241F] dark:text-white tracking-tight text-2xl sm:text-3xl lg:text-4xl leading-tight flex items-center gap-2">
              LearnFlow
            </div>
            <div className="text-xs sm:text-sm text-[#588157] dark:text-[#A3B18A] font-bold tracking-wider uppercase flex items-center gap-2">
              <span>{currentSectionTitle}</span>
            </div>
          </div>
        </div>

        <div className="hidden md:block h-8 w-px bg-[#E5E1D8] dark:bg-[#2B352E]" />

        <div className="hidden sm:block">
          {getRoleBadge(currentUser?.role)}
        </div>
      </div>

      {/* Right-hand utilities */}
      <div className="flex items-center gap-3.5">
        {/* Theme Toggle (Dark / Light Mode) */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white dark:bg-[#1C231E] border border-[#E5E1D8] dark:border-[#2B352E] shadow-xs text-[#586358] hover:text-[#1F241F] dark:hover:text-white hover:bg-[#F9F7F2] dark:hover:bg-[#262E27] transition-colors cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme mode"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-[#E2B714]" />
          ) : (
            <Moon className="w-5 h-5 text-[#343F35]" />
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl bg-white dark:bg-[#1C231E] border border-[#E5E1D8] dark:border-[#2B352E] shadow-xs text-[#586358] hover:text-[#1F241F] dark:hover:text-white hover:bg-[#F9F7F2] dark:hover:bg-[#262E27] transition-colors relative cursor-pointer"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E2725B] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                {unreadNotifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-lg border border-[#E5E1D8] z-50 p-4 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EDE6]">
                <div className="font-bold text-[#1F241F] text-sm">
                  Platform Notifications ({unreadNotifications.length})
                </div>
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={() => markAllNotificationsRead()}
                    className="text-xs text-[#4A5D4E] hover:text-[#343F35] font-semibold cursor-pointer"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="mt-2 divide-y divide-[#F0EDE6] dark:divide-[#2B352E] max-h-80 overflow-y-auto">
                {userNotifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#6D756D] dark:text-[#A3B18A]">
                    No notifications for your account
                  </div>
                ) : (
                  userNotifications.slice(0, 10).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        if (notif.actionUrl && onNavigate) {
                          onNavigate(notif.actionUrl);
                          setShowNotifications(false);
                        }
                      }}
                      className={`py-2.5 px-3 rounded-xl cursor-pointer transition-colors ${
                        notif.isRead ? 'opacity-70 hover:bg-[#F9F7F2]' : 'bg-[#E8EDEA]/40 hover:bg-[#E8EDEA]/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-semibold text-xs text-[#1F241F]">
                          {notif.title}
                        </div>
                        {!notif.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#588157] mt-1 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[#586358] mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-[#A3B18A] font-mono">
                          {new Date(notif.createdAt).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        {notif.actionUrl && (
                          <span className="text-[10px] font-semibold text-[#588157] hover:underline">
                            Open item →
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3.5 pl-3.5 border-l border-[#E5E1D8] dark:border-[#2B352E]">
          <div className="hidden lg:block text-right">
            <div className="text-sm font-bold text-[#1F241F] dark:text-white leading-tight">
              {currentUser?.name}
            </div>
            <div className="text-xs text-[#588157] dark:text-[#A3B18A] uppercase font-bold tracking-wider truncate max-w-[160px]">
              {currentUser?.title || currentUser?.department || currentUser?.role}
            </div>
          </div>
          <UserAvatar
            name={currentUser?.name || 'User'}
            role={currentUser?.role}
            size="lg"
          />
        </div>

        {/* Logout action */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#2D332D] dark:text-[#E8EDEA] hover:text-[#1F241F] hover:bg-[#F9F7F2] dark:hover:bg-[#262E27] border border-[#E5E1D8] dark:border-[#2B352E] shadow-xs transition-colors cursor-pointer"
          title="Sign out of platform"
        >
          <LogOut className="w-4 h-4 text-[#586358] dark:text-[#A3B18A]" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
