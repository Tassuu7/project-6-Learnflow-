import React, { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Award,
  BookOpen,
  MessageSquare,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { calculateEngagementRisk } from '../../services/aiEngine';
import { UserAvatar } from '../common/UserAvatar';

export const StudentManagementView: React.FC = () => {
  const {
    enrollments,
    courses,
    quizAttempts,
    users,
    saveStudentFeedback,
    generateCertificateForStudent,
    certificates,
  } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('ALL');
  const [feedbackDraft, setFeedbackDraft] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Map enrollments to student info
  const studentEnrollments = enrollments.map((enr) => {
    const course = courses.find((c) => c.id === enr.courseId);
    const student = users.find((u) => u.id === enr.userId);
    const risk = calculateEngagementRisk(enr, student, quizAttempts);
    const hasCertificate = certificates.some(
      (cert) => cert.userId === enr.userId && cert.courseId === enr.courseId
    );
    const userQuizzes = quizAttempts.filter(
      (q) => q.userId === enr.userId && q.quizId.includes(enr.courseId.replace('crs_', ''))
    );
    const bestQuizScore = userQuizzes.length > 0
      ? Math.max(...userQuizzes.map((q) => q.scorePercentage))
      : enr.scorePercentage || 0;

    return {
      enrollment: enr,
      course,
      student,
      risk,
      hasCertificate,
      bestQuizScore,
    };
  });

  const filteredStudents = studentEnrollments.filter((item) => {
    const name = item.student?.name || item.enrollment.userId;
    const courseTitle = item.course?.title || '';
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse =
      selectedCourseFilter === 'ALL' || item.enrollment.courseId === selectedCourseFilter;
    return matchesSearch && matchesCourse;
  });

  const handleSaveFeedback = (studentId: string, courseId: string) => {
    const text = feedbackDraft[`${studentId}_${courseId}`];
    if (!text || !text.trim()) return;

    saveStudentFeedback(studentId, courseId, text.trim());
    setStatusMessage(`Feedback submitted for ${studentId}!`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleIssueCertificate = (studentId: string, courseId: string, score: number) => {
    generateCertificateForStudent(studentId, courseId, Math.max(score, 85));
    setStatusMessage(`Official Completion Certificate issued!`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#B27D26] text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-[#B27D26]" />
              Cohort Supervision & Academic Credentials
            </div>
            <h1 className="text-xl font-bold text-[#1F241F] mt-1">
              Student Progress, Feedback & Certificate Generator
            </h1>
            <p className="text-xs text-[#6D756D] mt-0.5 max-w-2xl">
              Track student syllabus completion across Python, Java, DBMS, and ML. Review quiz performances,
              dispatch qualitative academic feedback, and issue accredited certificates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student or course..."
              className="px-3 py-1.5 text-xs border border-[#E5E1D8] rounded-xl bg-[#F9F7F2] text-[#2D332D] w-52 focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
            />
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-[#E5E1D8] rounded-xl bg-[#F9F7F2] text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
            >
              <option value="ALL">All Enrolled Courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#E8EDEA] border border-[#A3B18A] text-[#1F241F] text-xs flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-[#588157] shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Student List */}
      <div className="space-y-4">
        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-12 text-center text-xs text-[#6D756D]">
            No enrolled students match your filter criteria.
          </div>
        ) : (
          filteredStudents.map((item) => {
            const key = `${item.enrollment.userId}_${item.enrollment.courseId}`;
            const studentName = item.student?.name || 'Student Scholar';
            const totalLessons = item.course?.modules.reduce(
              (acc, m) => acc + m.chapters.reduce((cAcc, ch) => cAcc + ch.lessons.length, 0),
              0
            ) || 4;
            const completedCount = item.enrollment.completedLessons.length;
            const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

            return (
              <div
                key={item.enrollment.id}
                className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs space-y-4 hover:border-[#A3B18A] transition-all"
              >
                {/* Top Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0EDE6]">
                  <div className="flex items-center gap-3">
                    <UserAvatar name={studentName} role="STUDENT" size="md" />
                    <div>
                      <div className="text-sm font-bold text-[#1F241F]">{studentName}</div>
                      <div className="text-xs text-[#6D756D]">
                        Enrolled in <span className="font-semibold text-[#1F241F]">{item.course?.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8EDEA] text-[#2E3B31] border border-[#A3B18A]">
                      {progressPercent}% Complete ({completedCount}/{totalLessons} Lessons)
                    </span>

                    {item.hasCertificate ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8EDEA] text-[#588157] border border-[#A3B18A]">
                        <Award className="w-3.5 h-3.5 text-[#588157]" /> Certificate Issued
                      </span>
                    ) : (
                      <button
                        onClick={() =>
                          handleIssueCertificate(
                            item.enrollment.userId,
                            item.enrollment.courseId,
                            item.bestQuizScore || 90
                          )
                        }
                        className="px-3 py-1 bg-[#4A5D4E] hover:bg-[#343F35] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Award className="w-3.5 h-3.5 text-[#A3B18A]" /> Generate Certificate
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar & Assessment Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F9F7F2] p-3.5 rounded-xl border border-[#E5E1D8]">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#586358] tracking-wider mb-1">
                      Lesson Completion Velocity
                    </div>
                    <div className="w-full bg-[#E5E1D8] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#588157] h-full rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-[#6D756D] mt-1 font-mono">
                      {(item.enrollment.timeSpentMinutes / 60).toFixed(1)} Hours Total Study Time
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#586358] tracking-wider mb-1">
                      Assessment Mastery
                    </div>
                    <div className="text-xs font-bold text-[#1F241F]">
                      Quiz Performance: {item.bestQuizScore > 0 ? `${item.bestQuizScore}%` : 'Pending Attempt'}
                    </div>
                    <div className="text-[11px] text-[#588157]">
                      {item.bestQuizScore >= 70 ? 'Passed Passing Threshold' : 'Needs Practice'}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#586358] tracking-wider mb-1">
                      Offline Status
                    </div>
                    <div className="text-xs font-medium text-[#2D332D]">
                      {item.enrollment.isDownloadedOffline ? 'Downloaded Offline Package' : 'Online Browser Study'}
                    </div>
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#586358] uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#588157]" />
                    Faculty Academic Feedback:
                  </div>

                  {item.enrollment.facultyFeedback ? (
                    <div className="p-3 bg-[#E8EDEA]/40 rounded-xl border border-[#A3B18A]/50 text-xs text-[#1F241F]">
                      <span className="font-semibold text-[#588157]">Active Note: </span>
                      {item.enrollment.facultyFeedback}
                    </div>
                  ) : (
                    <div className="text-[11px] text-[#6D756D] italic">
                      No qualitative feedback submitted yet.
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={feedbackDraft[key] || ''}
                      onChange={(e) =>
                        setFeedbackDraft((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      placeholder="Write constructive evaluation feedback for student..."
                      className="flex-1 px-3 py-1.5 text-xs border border-[#E5E1D8] rounded-xl bg-white text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
                    />
                    <button
                      onClick={() =>
                        handleSaveFeedback(item.enrollment.userId, item.enrollment.courseId)
                      }
                      className="px-3.5 py-1.5 bg-[#4A5D4E] hover:bg-[#343F35] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" /> Save Feedback
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
