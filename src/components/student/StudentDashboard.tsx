import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Clock,
  Award,
  ArrowRight,
  HardDriveDownload,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { StatCard } from '../common/StatCard';
import { getPersonalizedRecommendations, detectWeakTopics } from '../../services/aiEngine';

export const StudentDashboard: React.FC<{
  onNavigate: (tab: string, courseId?: string) => void;
}> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const {
    courses,
    enrollments,
    certificates,
    quizAttempts,
    quizzes,
    offlinePackages,
    getCourseProgressPercentage,
    isOffline,
    pendingSyncCount,
  } = useLearning();

  const userEnrollments = enrollments.filter((e) => e.userId === currentUser?.id);
  const enrolledCourses = courses.filter((c) =>
    userEnrollments.some((e) => e.courseId === c.id)
  );

  // Calculate learning stats
  const totalCompletedLessons = userEnrollments.reduce(
    (acc, e) => acc + e.completedLessons.length,
    0
  );
  const totalHoursSpent = (
    userEnrollments.reduce((acc, e) => acc + e.timeSpentMinutes, 0) / 60
  ).toFixed(1);

  // Active course to continue
  const primaryEnrollment = userEnrollments[0];
  const primaryCourse = courses.find((c) => c.id === primaryEnrollment?.courseId);
  const primaryProgress = primaryCourse ? getCourseProgressPercentage(primaryCourse.id) : 0;

  // Local AI recommendations
  const recommendations = currentUser
    ? getPersonalizedRecommendations(currentUser, enrollments, courses, quizAttempts).slice(0, 2)
    : [];

  // Local AI weak topics
  const weakTopics = currentUser
    ? detectWeakTopics(currentUser.id, quizAttempts, quizzes)
    : [];
  const needsPractice = weakTopics.filter((t) => t.proficiency === 'NEEDS_PRACTICE');

  return (
    <div className="space-y-6 font-sans">
      {/* Welcome Banner */}
      <div className="bg-[#343F35] text-[#E8EDEA] rounded-2xl p-6 sm:p-8 shadow-xs border border-[#262E27]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#A3B18A] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Student Learning Workspace
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, {currentUser?.name}
            </h2>
            <p className="text-[#E8EDEA]/80 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              {isOffline
                ? 'You are currently in offline mode. Your offline courses and downloaded study packages remain accessible.'
                : 'Your study streak is active! Continue where you left off or review recommended diagnostic modules.'}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <span className="px-3.5 py-1 bg-[#262E27] border border-[#4A5D4E] text-[#DDE5B6] rounded-full text-xs font-semibold shadow-2xs">
              4-Day Study Streak
            </span>
            <button
              onClick={() => onNavigate('learning', primaryCourse?.id)}
              className="px-4 py-2 bg-[#588157] hover:bg-[#476A46] text-white rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              Resume Learning
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards - strictly NO BLUE */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Enrolled Courses"
          value={userEnrollments.length}
          subtitle="Active curricula"
          icon={BookOpen}
          variant="emerald"
        />
        <StatCard
          title="Hours Logged"
          value={`${totalHoursSpent} hrs`}
          subtitle="Cumulative study time"
          icon={Clock}
          variant="amber"
        />
        <StatCard
          title="Lessons Completed"
          value={totalCompletedLessons}
          subtitle="Across enrolled tracks"
          icon={CheckCircle2}
          variant="stone"
        />
        <StatCard
          title="Certificates"
          value={certificates.filter((c) => c.userId === currentUser?.id).length}
          subtitle="Verifiable credentials"
          icon={Award}
          variant="emerald"
        />
      </div>

      {/* Primary Continue Learning & Offline Readiness Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#1F241F] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#588157]" />
              Active Course in Progress
            </h3>
            <button
              onClick={() => onNavigate('learning')}
              className="text-xs font-semibold text-[#4A5D4E] hover:text-[#343F35] cursor-pointer"
            >
              View all ({enrolledCourses.length})
            </button>
          </div>

          {primaryCourse ? (
            <div className="border border-[#E5E1D8] rounded-2xl p-5 hover:border-[#A3B18A] transition-all bg-[#F9F7F2]/60">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8EDEA] text-[#343F35] border border-[#A3B18A]/50 mb-2">
                    {primaryCourse.category}
                  </span>
                  <h4 className="text-lg font-bold text-[#1F241F]">
                    {primaryCourse.title}
                  </h4>
                  <p className="text-xs text-[#6D756D] mt-1 line-clamp-2 leading-relaxed">
                    {primaryCourse.description}
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-[#6D756D]">
                    <span>Instructor: {primaryCourse.instructorName}</span>
                    <span>•</span>
                    <span>{primaryCourse.estimatedHours} Total Hours</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-[#1F241F] font-mono">
                    {primaryProgress}%
                  </div>
                  <div className="text-[11px] text-[#6D756D] uppercase font-semibold">Progress</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#E5E1D8] rounded-full h-2 mt-4 overflow-hidden">
                <div
                  className="bg-[#588157] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${primaryProgress}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-[#6D756D]">
                  {primaryEnrollment.completedLessons.length} lessons finished
                </div>
                <button
                  onClick={() => onNavigate('learning', primaryCourse.id)}
                  className="px-4 py-2 bg-[#4A5D4E] hover:bg-[#343F35] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  Continue Lesson
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-[#6D756D] text-xs">
              No enrolled courses yet. Browse the catalog to start learning.
            </div>
          )}
        </div>

        {/* Offline Center & Diagnostic Insights */}
        <div className="space-y-6">
          {/* Offline Center Status */}
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F241F] flex items-center gap-1.5">
                <HardDriveDownload className="w-4 h-4 text-[#588157]" />
                Offline Readiness
              </h4>
              <span className="text-[11px] text-[#6D756D] font-mono">
                {offlinePackages.length} package(s)
              </span>
            </div>

            <p className="text-xs text-[#6D756D] mb-3 leading-relaxed">
              Courses saved locally can be studied without network access.
            </p>

            <div className="p-3.5 rounded-xl bg-[#F4F1EA] border border-[#E5E1D8] text-xs space-y-1.5">
              <div className="flex justify-between text-[#2D332D]">
                <span>Offline Storage:</span>
                <span className="font-semibold font-mono">42.5 MB used</span>
              </div>
              <div className="flex justify-between text-[#2D332D]">
                <span>Pending Sync Events:</span>
                <span className="font-semibold font-mono">{pendingSyncCount} queued</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('offline')}
              className="mt-3.5 w-full py-2 bg-[#343F35] hover:bg-[#262E27] text-[#E8EDEA] rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Open Offline Center
            </button>
          </div>

          {/* AI Concept Diagnostic Pill */}
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F241F] flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-4 h-4 text-[#B27D26]" />
              AI Pedagogical Diagnostic
            </h4>

            {needsPractice.length > 0 ? (
              <div>
                <div className="p-3 rounded-xl bg-[#FDF8EE] border border-[#F2CC8F] text-[#8C6019] text-xs">
                  <div className="font-semibold flex items-center gap-1.5 text-[#B27D26]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Concept Review Suggested
                  </div>
                  <div className="mt-1 font-bold text-[#1F241F]">{needsPractice[0].topic}</div>
                  <div className="text-[11px] text-[#8C6019] mt-0.5">
                    {needsPractice[0].recommendationNote}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#E8EDEA] border border-[#A3B18A] text-[#1F241F] text-xs">
                <div className="font-semibold flex items-center gap-1 text-[#588157]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Strong Concept Mastery
                </div>
                <div className="text-[11px] text-[#586358] mt-0.5">
                  High proficiency confirmed across all assessed topics.
                </div>
              </div>
            )}
            <button
              onClick={() => onNavigate('analytics')}
              className="mt-3 w-full py-2 border border-[#E5E1D8] hover:bg-[#F9F7F2] text-[#2D332D] rounded-xl text-xs font-semibold cursor-pointer transition-colors"
            >
              View Weak-Topic Analysis
            </button>
          </div>
        </div>
      </div>

      {/* AI Personalized Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#1F241F] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#588157]" />
                Personalized Course Recommendations
              </h3>
              <p className="text-xs text-[#6D756D] mt-0.5">
                Generated locally by LearnFlow's hybrid content-affinity recommendation model.
              </p>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="text-xs font-semibold text-[#4A5D4E] hover:text-[#343F35] cursor-pointer"
            >
              Browse all courses
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.course.id}
                className="border border-[#E5E1D8] rounded-2xl p-5 hover:border-[#A3B18A] transition-all flex flex-col justify-between bg-[#F9F7F2]/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E8EDEA] text-[#343F35] border border-[#A3B18A]/40">
                      {rec.course.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#588157]">
                      {Math.round(rec.score * 100)}% Match
                    </span>
                  </div>
                  <h4 className="font-bold text-[#1F241F] text-sm">
                    {rec.course.title}
                  </h4>
                  <p className="text-xs text-[#6D756D] mt-1 line-clamp-2 leading-relaxed">
                    {rec.course.description}
                  </p>
                  <div className="mt-2.5 p-2.5 rounded-xl bg-[#E8EDEA]/60 border border-[#A3B18A]/40 text-[11px] text-[#2D332D] leading-snug">
                    <span className="font-semibold text-[#343F35]">Why recommended:</span> {rec.matchReason}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E1D8] flex items-center justify-between">
                  <span className="text-xs text-[#6D756D]">
                    Difficulty: {rec.course.difficulty}
                  </span>
                  <button
                    onClick={() => onNavigate('catalog')}
                    className="px-3.5 py-1.5 bg-[#4A5D4E] hover:bg-[#343F35] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    View Syllabus & Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
