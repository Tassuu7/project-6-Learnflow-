import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LearningProvider, useLearning } from './context/LearningContext';
import { ThemeProvider } from './context/ThemeContext';
import { OfflineStatusBar } from './components/common/OfflineStatusBar';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LoginPage } from './components/auth/LoginPage';
import { ToastNotification } from './components/common/ToastNotification';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentCatalog } from './components/student/StudentCatalog';
import { StudentCourseView } from './components/student/StudentCourseView';
import { StudentQuizView } from './components/student/StudentQuizView';
import { StudentAssignmentView } from './components/student/StudentAssignmentView';
import { StudentOfflineCenter } from './components/student/StudentOfflineCenter';
import { StudentCertificates } from './components/student/StudentCertificates';
import { StudentLearningAssistant } from './components/student/StudentLearningAssistant';
import { StudentAnalytics } from './components/student/StudentAnalytics';
import { StudentNotesView } from './components/student/StudentNotesView';

// Instructor Views
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { InstructorCoursesView } from './components/instructor/InstructorCoursesView';
import { CourseAuthoringView } from './components/instructor/CourseAuthoringView';
import { GradingCenterView } from './components/instructor/GradingCenterView';
import { QuizBuilderView } from './components/instructor/QuizBuilderView';
import { StudentManagementView } from './components/instructor/StudentManagementView';
import { InstructorAnalyticsView } from './components/instructor/InstructorAnalyticsView';

// Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminUsersView } from './components/admin/AdminUsersView';
import { AdminCourseApprovalsView } from './components/admin/AdminCourseApprovalsView';
import { AdminAIModelsView } from './components/admin/AdminAIModelsView';
import { AdminAuditLogsView } from './components/admin/AdminAuditLogsView';
import { AdminSystemSettingsView } from './components/admin/AdminSystemSettingsView';
import { AdminSyncManagementView } from './components/admin/AdminSyncManagementView';

// Academic Doubts Views
import { StudentDoubtsView } from './components/student/StudentDoubtsView';
import { FacultyDoubtsView } from './components/instructor/FacultyDoubtsView';

const MainApplication: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedCourseContext, setSelectedCourseContext] = useState<string | undefined>();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // When role changes, reset tab to dashboard
  useEffect(() => {
    setActiveTab('dashboard');
    setSelectedCourseContext(undefined);
  }, [currentUser?.role]);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] dark:bg-[#121714] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
        <OfflineStatusBar />
        <LoginPage />
      </div>
    );
  }

  const handleNavigate = (tab: string, contextId?: string) => {
    setActiveTab(tab);
    if (contextId) {
      setSelectedCourseContext(contextId);
    }
  };

  const getSectionTitle = () => {
    const titles: Record<string, string> = {
      dashboard: 'Overview & Activity',
      catalog: 'Curricula Catalog',
      learning: 'Interactive Study Center',
      quizzes: 'Knowledge Checks & Exams',
      assignments: 'Practical Labs & Submissions',
      offline: 'Offline Learning Sync',
      certificates: 'Accredited Credentials',
      assistant: 'AI Subject Solver (Online)',
      doubts: currentUser.role === 'INSTRUCTOR' ? 'Student Doubts & Solver Desk' : 'Ask Faculty & Academic Doubts',
      analytics: 'Mastery & Growth Analytics',
      notes: 'Notes & Study Bookmarks',
      courses: 'Curriculum Management',
      builder: 'Curriculum Authoring & Video Studio',
      course_builder: 'Curriculum Authoring & Video Studio',
      grading: 'Assessment Grading Desk',
      'quiz-manager': 'Question Bank & Assessments',
      quiz_builder: 'Question Bank & Assessments',
      students: 'Cohort Supervision & Grades',
      users: 'User Account Governance',
      approvals: 'Curriculum Verification & Approvals',
      models: 'AI Tutor Engines & Inference Config',
      settings: 'Enterprise Platform Settings',
      sync: 'Offline Queue & Synchronizer',
      sync_admin: 'Offline Queue & Synchronizer',
      audit: 'Immutable Audit Trail',
      audit_logs: 'Immutable Audit Trail',
      assessments: 'Assessment Standards & Grading',
      reports: 'Executive Compliance Reports',
    };
    return titles[activeTab] || 'Learning Platform';
  };

  const renderActiveView = () => {
    const role = currentUser.role;

    if (role === 'STUDENT') {
      switch (activeTab) {
        case 'dashboard':
          return <StudentDashboard onNavigate={handleNavigate} />;
        case 'catalog':
          return (
            <StudentCatalog
              onOpenCourse={(cid) => handleNavigate('learning', cid)}
            />
          );
        case 'learning':
          return (
            <StudentCourseView
              initialCourseId={selectedCourseContext}
              onNavigateTab={handleNavigate}
            />
          );
        case 'quizzes':
          return <StudentQuizView />;
        case 'assignments':
          return <StudentAssignmentView />;
        case 'offline':
          return (
            <StudentOfflineCenter
              onOpenCourse={(cid) => handleNavigate('learning', cid)}
            />
          );
        case 'certificates':
          return <StudentCertificates />;
        case 'assistant':
          return (
            <StudentLearningAssistant
              onOpenLesson={(cid) => handleNavigate('learning', cid)}
            />
          );
        case 'analytics':
          return <StudentAnalytics />;
        case 'notes':
          return (
            <StudentNotesView
              onOpenLesson={(cid) => handleNavigate('learning', cid)}
            />
          );
        case 'doubts':
          return (
            <StudentDoubtsView
              onOpenCourse={(cid) => handleNavigate('learning', cid)}
            />
          );
        default:
          return <StudentDashboard onNavigate={handleNavigate} />;
      }
    }

    if (role === 'INSTRUCTOR') {
      switch (activeTab) {
        case 'dashboard':
          return <InstructorDashboard onNavigate={handleNavigate} />;
        case 'courses':
          return <InstructorCoursesView onNavigate={handleNavigate} />;
        case 'builder':
        case 'course_builder':
          return (
            <CourseAuthoringView
              initialCourseId={selectedCourseContext}
              onNavigate={handleNavigate}
            />
          );
        case 'doubts':
          return <FacultyDoubtsView />;
        case 'quiz-manager':
        case 'quiz_builder':
          return <QuizBuilderView />;
        case 'assignments':
        case 'grading':
          return <GradingCenterView />;
        case 'students':
          return <StudentManagementView />;
        case 'analytics':
          return <InstructorAnalyticsView onNavigate={handleNavigate} />;
        case 'catalog':
          return (
            <StudentCatalog
              onOpenCourse={(cid) => handleNavigate('builder', cid)}
            />
          );
        default:
          return <InstructorDashboard onNavigate={handleNavigate} />;
      }
    }

    if (role === 'ADMIN') {
      switch (activeTab) {
        case 'dashboard':
          return <AdminDashboard onNavigate={handleNavigate} />;
        case 'users':
          return <AdminUsersView />;
        case 'approvals':
          return <AdminCourseApprovalsView onNavigate={handleNavigate} />;
        case 'models':
          return <AdminAIModelsView />;
        case 'audit':
        case 'audit_logs':
          return <AdminAuditLogsView />;
        case 'settings':
          return <AdminSystemSettingsView />;
        case 'sync':
        case 'sync_admin':
          return <AdminSyncManagementView />;
        case 'course_builder':
          return <CourseAuthoringView onNavigate={handleNavigate} />;
        default:
          return <AdminDashboard onNavigate={handleNavigate} />;
      }
    }

    return <StudentDashboard onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] dark:bg-[#121714] flex flex-col text-[#2D332D] dark:text-[#E8EDEA] font-sans antialiased transition-colors duration-200">
      <OfflineStatusBar />
      <Header
        currentSectionTitle={getSectionTitle()}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Responsive Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleNavigate}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic View Workspace */}
        <main className="flex-1 min-w-0">{renderActiveView()}</main>
      </div>

      {/* Global Real-time Toast Notifications */}
      <ToastNotification onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LearningProvider>
          <MainApplication />
        </LearningProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
