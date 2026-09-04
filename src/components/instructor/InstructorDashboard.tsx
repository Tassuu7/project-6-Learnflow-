import React from 'react';
import {
  BookOpen,
  Users,
  FileCheck,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  PlusCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { StatCard } from '../common/StatCard';
import { calculateEngagementRisk } from '../../services/aiEngine';

export const InstructorDashboard: React.FC<{
  onNavigate: (tab: string) => void;
}> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { courses, enrollments, submissions, quizzes, quizAttempts } = useLearning();

  // Courses taught by instructor
  const instructorCourses = courses.filter(
    (c) => c.instructorId === currentUser?.id || currentUser?.role === 'ADMIN'
  );

  // Enrolled students in instructor courses
  const courseIds = instructorCourses.map((c) => c.id);
  const instructorEnrollments = enrollments.filter((e) => courseIds.includes(e.courseId));
  const uniqueStudents = Array.from(new Set(instructorEnrollments.map((e) => e.userId)));

  // Pending grading submissions
  const pendingSubmissions = submissions.filter((s) => s.status === 'SUBMITTED');

  // Analyze at-risk students with our local AI model
  const atRiskStudents = instructorEnrollments
    .map((enrollment) => {
      const risk = calculateEngagementRisk(enrollment, undefined, quizAttempts);
      const course = courses.find((c) => c.id === enrollment.courseId);
      return {
        enrollment,
        courseTitle: course?.title || enrollment.courseId,
        risk,
      };
    })
    .filter((item) => item.risk.level === 'HIGH' || item.risk.level === 'MEDIUM');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              Faculty Instructional Command
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Welcome, Professor {currentUser?.name}
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
              Manage your technical curricula, grade coursework submissions with rubrics, and monitor AI-detected learning drop-off risks.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('course_builder')}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Create Curriculum
            </button>
            <button
              onClick={() => onNavigate('grading')}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-700"
            >
              <FileCheck className="w-3.5 h-3.5" />
              Grading Queue ({pendingSubmissions.length})
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Curricula"
          value={instructorCourses.length}
          subtitle="Taught by faculty"
          icon={BookOpen}
          variant="stone"
        />
        <StatCard
          title="Total Students"
          value={uniqueStudents.length}
          subtitle="Unique learners"
          icon={Users}
          variant="emerald"
        />
        <StatCard
          title="Submissions Pending"
          value={pendingSubmissions.length}
          subtitle="Needs faculty grading"
          icon={FileCheck}
          variant="amber"
        />
        <StatCard
          title="At-Risk Learners"
          value={atRiskStudents.length}
          subtitle="AI early intervention"
          icon={ShieldAlert}
          variant={atRiskStudents.length > 0 ? 'rose' : 'emerald'}
        />
      </div>

      {/* Two column layout: Courses overview & At-Risk Early Warning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Curricula Management (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-800" />
              Authored Curricula Portfolio
            </h3>
            <button
              onClick={() => onNavigate('course_builder')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 cursor-pointer"
            >
              + Add New Course
            </button>
          </div>

          <div className="space-y-3">
            {instructorCourses.map((course) => {
              const enrolledCount = enrollments.filter((e) => e.courseId === course.id).length;
              const completedCount = enrollments.filter(
                (e) => e.courseId === course.id && e.completedAt
              ).length;
              const completionRate =
                enrolledCount > 0 ? Math.round((completedCount / enrolledCount) * 100) : 0;

              return (
                <div
                  key={course.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:border-stone-300 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-200 text-stone-800">
                          {course.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {course.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-stone-900 font-serif mt-1">
                        {course.title}
                      </h4>
                    </div>

                    <div className="text-right text-xs">
                      <div className="font-bold text-stone-900 font-mono">
                        {enrolledCount} Students
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {completionRate}% Completion Rate
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                    <span className="font-mono text-[11px]">
                      {course.modules.length} Modules • {course.estimatedHours} Estimated Hrs
                    </span>
                    <button
                      onClick={() => onNavigate('course_builder')}
                      className="text-amber-800 font-semibold hover:underline cursor-pointer"
                    >
                      Edit Syllabus →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Local AI Early Intervention Alert (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
              AI Disengagement Radar
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono">
              LOCAL MODEL
            </span>
          </div>

          <p className="text-xs text-stone-500">
            Identifies students showing deceleration in lesson completions or declining quiz performance before drop-off occurs.
          </p>

          {atRiskStudents.length === 0 ? (
            <div className="p-8 border border-stone-200 rounded-xl bg-emerald-50/50 text-center text-xs text-emerald-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto mb-1" />
              <div className="font-bold">All Learners On-Track</div>
              <div className="text-[11px] text-emerald-700 mt-0.5">
                No active drop-off risks detected across enrolled cohorts.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {atRiskStudents.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    item.risk.level === 'HIGH'
                      ? 'bg-rose-50/60 border-rose-200'
                      : 'bg-amber-50/60 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">
                      Learner ID: {item.enrollment.userId}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.risk.level === 'HIGH'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.risk.level} RISK ({item.risk.score}%)
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-600">Course: {item.courseTitle}</div>
                  <div className="text-[11px] text-stone-700 font-medium">
                    Diagnostic: {item.risk.reasons[0]}
                  </div>
                </div>
              ))}

              <button
                onClick={() => onNavigate('students')}
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                View Full Student Roster
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
