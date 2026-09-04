import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Permission } from '../types';
import { SEED_USERS } from '../data/seedData';

// Role-to-Permissions Mapping matrix
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  STUDENT: [
    'COURSE_VIEW',
    'QUIZ_ATTEMPT',
    'ASSIGNMENT_SUBMIT',
    'OFFLINE_DOWNLOAD',
    'OFFLINE_SYNC',
  ],
  INSTRUCTOR: [
    'COURSE_VIEW',
    'COURSE_CREATE',
    'COURSE_EDIT',
    'QUIZ_CREATE',
    'QUIZ_GRADE',
    'ASSIGNMENT_CREATE',
    'ASSIGNMENT_GRADE',
    'ANALYTICS_VIEW',
    'REPORT_VIEW',
  ],
  ADMIN: [
    'COURSE_VIEW',
    'COURSE_CREATE',
    'COURSE_EDIT',
    'COURSE_DELETE',
    'COURSE_APPROVE',
    'QUIZ_CREATE',
    'QUIZ_ATTEMPT',
    'QUIZ_GRADE',
    'ASSIGNMENT_CREATE',
    'ASSIGNMENT_SUBMIT',
    'ASSIGNMENT_GRADE',
    'USER_VIEW',
    'USER_CREATE',
    'USER_EDIT',
    'USER_DELETE',
    'ANALYTICS_VIEW',
    'REPORT_VIEW',
    'SYSTEM_SETTINGS',
    'AUDIT_VIEW',
    'OFFLINE_DOWNLOAD',
    'OFFLINE_SYNC',
  ],
};

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<{ success: boolean; error?: string; redirectUrl?: string }>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  getRoleDashboardPath: (role?: UserRole) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'learnflow_authenticated_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    // Default to student for instant preview experience
    return SEED_USERS[0];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  const getRoleDashboardPath = (role?: UserRole): string => {
    const r = role || currentUser?.role;
    switch (r) {
      case 'STUDENT':
        return '/student/dashboard';
      case 'INSTRUCTOR':
        return '/instructor/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  const login = async (
    emailOrUsername: string,
    password: string
  ): Promise<{ success: boolean; error?: string; redirectUrl?: string }> => {
    // Artificial small delay to simulate secure token validation
    await new Promise((resolve) => setTimeout(resolve, 300));

    const normalizedInput = emailOrUsername.trim().toLowerCase();

    // Match against user store
    const matched = SEED_USERS.find(
      (u) =>
        (u.email.toLowerCase() === normalizedInput ||
          u.name.toLowerCase() === normalizedInput ||
          u.email.split('@')[0].toLowerCase() === normalizedInput) &&
        u.passwordHash === password
    );

    if (!matched) {
      return {
        success: false,
        error: 'Invalid credentials. Please verify your email and password.',
      };
    }

    if (matched.status !== 'ACTIVE') {
      return {
        success: false,
        error: 'Your account is currently suspended or inactive. Please contact Platform Administration.',
      };
    }

    // Strip passwordHash before saving to session
    const { passwordHash: _, ...safeUser } = matched;
    const sessionUser = {
      ...safeUser,
      lastLogin: new Date().toISOString(),
    };

    setCurrentUser(sessionUser);
    return {
      success: true,
      redirectUrl: getRoleDashboardPath(sessionUser.role),
    };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!currentUser) return false;
    const userPermissions = ROLE_PERMISSIONS[currentUser.role] || [];
    return userPermissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
        hasPermission,
        getRoleDashboardPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
