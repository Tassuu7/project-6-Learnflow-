import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  KeyRound,
  AlertCircle,
  Wifi,
  Sparkles,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('student01@example.local');
  const [password, setPassword] = useState('student123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'STUDENT' | 'INSTRUCTOR'>('STUDENT');
  const [regSuccess, setRegSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await login(emailOrUsername, password);
      if (!res.success) {
        setErrorMessage(res.error || 'Authentication failed');
      }
    } catch {
      setErrorMessage('A network error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (email: string, pass: string) => {
    setEmailOrUsername(email);
    setPassword(pass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#343F35] text-[#A3B18A] shadow-xs font-bold text-2xl mb-4">
          LF
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1F241F]">
          LearnFlow
        </h1>
        <p className="mt-2 text-sm text-[#6D756D] max-w-sm mx-auto">
          Offline-First Intelligent Online Learning Platform
        </p>
        <p className="text-xs text-[#A3B18A] mt-1 font-semibold uppercase tracking-wider">
          Learn Anywhere. Continue Everywhere.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm sm:rounded-2xl sm:px-10 border border-[#E5E1D8]">
          {/* Header notice */}
          <div className="mb-6 pb-4 border-b border-[#F0EDE6]">
            <h2 className="text-lg font-bold text-[#1F241F]">Platform Sign In</h2>
            <p className="text-xs text-[#6D756D] mt-0.5">
              Enter your credentials to access your designated role workspace.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-[#FDF0ED] border border-[#E2725B]/40 text-[#E2725B] text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#E2725B]" />
              <div>{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email-input"
                className="block text-xs font-bold text-[#586358] uppercase tracking-wider mb-1"
              >
                Email or Username
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A3B18A]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email-input"
                  type="text"
                  required
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-[#E5E1D8] rounded-xl text-sm text-[#2D332D] placeholder-[#6D756D]/50 focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E] focus:border-[#4A5D4E] transition-colors"
                  placeholder="student01@example.local"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password-input"
                  className="block text-xs font-bold text-[#586358] uppercase tracking-wider"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-[#4A5D4E] hover:text-[#343F35] cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A3B18A]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2.5 border border-[#E5E1D8] rounded-xl text-sm text-[#2D332D] placeholder-[#6D756D]/50 focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E] focus:border-[#4A5D4E] transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-semibold text-white bg-[#4A5D4E] hover:bg-[#343F35] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#4A5D4E] transition-colors cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Switcher - Exactly 3 Platform Roles */}
          <div className="mt-8 pt-6 border-t border-[#F0EDE6]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#6D756D] mb-2 text-center">
              Select 1-Click Demo Account (3 Designated Roles)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
              {/* Student */}
              <button
                type="button"
                onClick={() => handleQuickFill('student01@example.local', 'student123')}
                className="p-2.5 rounded-xl border border-[#E5E1D8] hover:border-[#588157] hover:bg-[#E8EDEA]/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs text-[#1F241F] group-hover:text-[#343F35]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#588157]" />
                  Student
                </div>
                <div className="text-[10px] text-[#6D756D] mt-0.5 truncate font-mono">
                  student01@...
                </div>
                <div className="text-[9px] text-[#588157] font-medium mt-0.5">
                  Learn & Quizzes
                </div>
              </button>

              {/* Faculty Instructor */}
              <button
                type="button"
                onClick={() => handleQuickFill('instructor01@example.local', 'instructor123')}
                className="p-2.5 rounded-xl border border-[#E5E1D8] hover:border-[#F2CC8F] hover:bg-[#FDF8EE] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs text-[#1F241F] group-hover:text-[#8C6019]">
                  <BookOpen className="w-3.5 h-3.5 text-[#B27D26]" />
                  Faculty
                </div>
                <div className="text-[10px] text-[#6D756D] mt-0.5 truncate font-mono">
                  instructor01@...
                </div>
                <div className="text-[9px] text-[#B27D26] font-medium mt-0.5">
                  Syllabus & Solver
                </div>
              </button>

              {/* Administrator */}
              <button
                type="button"
                onClick={() => handleQuickFill('admin@example.local', 'admin123')}
                className="p-2.5 rounded-xl border border-[#E5E1D8] hover:border-[#A3B18A] hover:bg-[#F4F1EA] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 font-semibold text-xs text-[#1F241F]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#586358]" />
                  Admin
                </div>
                <div className="text-[10px] text-[#6D756D] mt-0.5 truncate font-mono">
                  admin@...
                </div>
                <div className="text-[9px] text-[#586358] font-medium mt-0.5">
                  Governance
                </div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <span className="text-xs text-[#6D756D]">Need a student account? </span>
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="text-xs font-semibold text-[#4A5D4E] hover:text-[#343F35] cursor-pointer"
            >
              Register here
            </button>
          </div>
        </div>

        {/* System features badge */}
        <div className="mt-6 text-center flex items-center justify-center gap-4 text-xs text-[#6D756D]">
          <span className="flex items-center gap-1">
            <Wifi className="w-3.5 h-3.5 text-[#588157]" /> Offline Capable
          </span>
          <span className="flex items-center gap-1">
            <KeyRound className="w-3.5 h-3.5 text-[#B27D26]" /> RBAC Protected
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#586358]" /> Local Intelligence
          </span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-[#E5E1D8] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotSuccess(false);
              }}
              className="absolute top-4 right-4 text-[#6D756D] hover:text-[#1F241F] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-[#1F241F] flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#4A5D4E]" />
              Account Credential Recovery
            </h3>
            <p className="text-xs text-[#6D756D] mt-1">
              Enter your registered educational email to receive an offline credential reset token.
            </p>

            {forgotSuccess ? (
              <div className="mt-4 p-4 rounded-xl bg-[#E8EDEA]/70 border border-[#A3B18A] text-[#1F241F] text-xs">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#588157]" />
                  Reset Instructions Generated
                </div>
                <p className="mt-1">
                  In this local demonstration environment, demo passwords follow the convention:
                  <code className="block mt-1 font-mono font-bold bg-white text-[#343F35] border border-[#E5E1D8] p-1.5 rounded-lg">
                    student123 | instructor123 | admin123
                  </code>
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#586358] mb-1 uppercase tracking-wider">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="student01@example.local"
                    className="w-full px-3 py-2 text-xs border border-[#E5E1D8] rounded-xl text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
                  />
                </div>
                <button
                  onClick={() => setForgotSuccess(true)}
                  className="w-full py-2.5 bg-[#4A5D4E] hover:bg-[#343F35] text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Generate Local Reset Instructions
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-[#E5E1D8] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => {
                setShowRegisterModal(false);
                setRegSuccess(false);
              }}
              className="absolute top-4 right-4 text-[#6D756D] hover:text-[#1F241F] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-[#1F241F] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#4A5D4E]" />
              Register New Academic Account
            </h3>
            <p className="text-xs text-[#6D756D] mt-1">
              Create an institutional profile to enroll in courses or author syllabus modules.
            </p>

            {regSuccess ? (
              <div className="mt-4 p-4 rounded-xl bg-[#E8EDEA]/70 border border-[#A3B18A] text-[#1F241F] text-xs">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#588157]" />
                  Registration Successful
                </div>
                <p className="mt-1">
                  You can now log in using your registered credentials.
                </p>
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="mt-3 px-3 py-1.5 bg-[#4A5D4E] text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Proceed to Sign In
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#586358] mb-1 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Julian Hayes"
                    className="w-full px-3 py-2 text-xs border border-[#E5E1D8] rounded-xl text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#586358] mb-1 uppercase tracking-wider">
                    Academic Email
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="julian@example.local"
                    className="w-full px-3 py-2 text-xs border border-[#E5E1D8] rounded-xl text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#586358] mb-1 uppercase tracking-wider">
                    Role Category
                  </label>
                  <select
                    value={regRole}
                    onChange={(e: any) => setRegRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5E1D8] rounded-xl text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
                  >
                    <option value="STUDENT">Student / Scholar</option>
                    <option value="INSTRUCTOR">Instructor / Faculty</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#586358] mb-1 uppercase tracking-wider">
                    Create Password
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 text-xs border border-[#E5E1D8] rounded-xl text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
                  />
                </div>
                <button
                  onClick={() => {
                    if (regName && regEmail && regPassword) {
                      setRegSuccess(true);
                      handleQuickFill(regEmail, regPassword);
                    }
                  }}
                  className="w-full py-2.5 bg-[#4A5D4E] hover:bg-[#343F35] text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
