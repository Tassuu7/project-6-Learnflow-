import React from 'react';

interface UserAvatarProps {
  name: string;
  role?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  role,
  size = 'md',
  className = '',
}) => {
  const trimmed = (name || 'User').trim();
  const parts = trimmed.split(/\s+/);
  const initials =
    parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : trimmed.slice(0, 2).toUpperCase();

  const getRoleColors = () => {
    switch (role?.toUpperCase()) {
      case 'STUDENT':
        return 'bg-gradient-to-br from-[#4A5D4E] to-[#2E3B31] text-[#E8EDEA] border-[#657E6A]';
      case 'INSTRUCTOR':
        return 'bg-gradient-to-br from-[#8C6019] to-[#5C3E0E] text-[#FDF8EE] border-[#B27D26]';
      case 'ADMIN':
        return 'bg-gradient-to-br from-[#2D332D] to-[#171B17] text-[#DDE5B6] border-[#4A5D4E]';
      default:
        return 'bg-gradient-to-br from-[#4A5D4E] to-[#343F35] text-[#E8EDEA] border-[#588157]';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-6 h-6 text-[10px]';
      case 'sm':
        return 'w-8 h-8 text-xs';
      case 'md':
        return 'w-9 h-9 text-xs font-semibold';
      case 'lg':
        return 'w-11 h-11 text-sm font-bold';
      case 'xl':
        return 'w-14 h-14 text-base font-bold tracking-wider';
      default:
        return 'w-9 h-9 text-xs font-semibold';
    }
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full shrink-0 select-none border shadow-xs tracking-tight ${getRoleColors()} ${getSizeClasses()} ${className}`}
      title={`${name} (${role || 'User'})`}
      aria-label={name}
    >
      {initials}
    </div>
  );
};
