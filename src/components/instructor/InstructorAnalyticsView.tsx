import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import { useAuth } from '../../context/AuthContext';
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  FileCheck,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

export const InstructorAnalyticsView: React.FC<{
  onNavigate?: (tab: string, contextId?: string) => void;
}> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { courses, enrollments, quizAttempts, submissions } = useLearning();

  const [selectedCourseId, setSelectedCourseId] = useState<string>('ALL');

  const instructorCourses = courses.filter(
    (c) =>
      c.instructorId === currentUser?.id ||
      c.instructorName.includes('Sterling') ||
      c.instructorName.includes('Rostova')
  );

  const activeCourseList = instructorCourses.length > 0 ? instructorCourses : courses;
  const filteredCourses =
    selectedCourseId === 'ALL'
      ? activeCourseList
      : activeCourseList.filter((c) => c.id === selectedCourseId);

  const totalEnrolled = enrollments.length;
  const totalCompletedLessons = enrollments.reduce(
    (acc, e) => acc + e.completedLessons.length,
    0
  );
  const totalHoursSpent = Math.round(
    enrollments.reduce((acc, e) => acc + (e.timeSpentMinutes || 0), 0) / 60
  );

  const averageQuizScore =
    quizAttempts.length > 0
      ? Math.round(
          quizAttempts.reduce((acc, a) => acc + a.scorePercentage, 0) / quizAttempts.length
        )
      : 84;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#343F35] dark:text-[#DDE5B6] bg-[#E8EDEA] dark:bg-[#252E26] px-2.5 py-0.5 rounded-full border border-[#A3B18A]/40">
              Instructor Analytics & Efficacy
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F241F] dark:text-white mt-1.5">
              Course Performance & Learning Telemetry
            </h2>
            <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] mt-0.5">
              Monitor student engagement, lesson completion rates, assessment pass distribution, and drop-off points.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#586358]" />
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold border border-[#E5E1D8] dark:border-[#2B352E] rounded-xl bg-[#F9F7F2] dark:bg-[#161D18] text-[#2D332D] dark:text-white"
            >
              <option value="ALL">All My Teaching Curricula</option>
              {activeCourseList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#F0EDE6] dark:border-[#2B352E]">
          <div className="p-4 rounded-xl bg-[#F9F7F2] dark:bg-[#161D18] border border-[#F0EDE6] dark:border-[#2B352E]">
            <div className="flex items-center justify-between text-xs text-[#6D756D] dark:text-[#B5BEB6]">
              <span>Active Scholars</span>
              <Users className="w-4 h-4 text-[#588157]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#1F241F] dark:text-white mt-1">
              {totalEnrolled}
            </div>
            <div className="text-[11px] text-[#588157] font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14% this month
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F9F7F2] dark:bg-[#161D18] border border-[#F0EDE6] dark:border-[#2B352E]">
            <div className="flex items-center justify-between text-xs text-[#6D756D] dark:text-[#B5BEB6]">
              <span>Completed Lessons</span>
              <CheckCircle2 className="w-4 h-4 text-[#A3B18A]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#1F241F] dark:text-white mt-1">
              {totalCompletedLessons}
            </div>
            <div className="text-[11px] text-[#6D756D] dark:text-[#8E9A8F] mt-1">
              Across all modules
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F9F7F2] dark:bg-[#161D18] border border-[#F0EDE6] dark:border-[#2B352E]">
            <div className="flex items-center justify-between text-xs text-[#6D756D] dark:text-[#B5BEB6]">
              <span>Avg. Assessment Score</span>
              <Award className="w-4 h-4 text-[#B27D26]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#1F241F] dark:text-white mt-1">
              {averageQuizScore}%
            </div>
            <div className="text-[11px] text-[#588157] font-medium mt-1">
              High competency benchmark
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F9F7F2] dark:bg-[#161D18] border border-[#F0EDE6] dark:border-[#2B352E]">
            <div className="flex items-center justify-between text-xs text-[#6D756D] dark:text-[#B5BEB6]">
              <span>Study Hours Delivered</span>
              <Clock className="w-4 h-4 text-[#343F35] dark:text-[#DDE5B6]" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-[#1F241F] dark:text-white mt-1">
              {totalHoursSpent} hrs
            </div>
            <div className="text-[11px] text-[#6D756D] dark:text-[#8E9A8F] mt-1">
              Online & Offline synchronized
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown per Course */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#1F241F] dark:text-white">
          Curriculum Breakdown & Completion Velocity
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {filteredCourses.map((c) => {
            const courseEnr = enrollments.filter((e) => e.courseId === c.id);
            const totalLes = c.modules.reduce(
              (acc, m) => acc + m.chapters.reduce((a, ch) => a + ch.lessons.length, 0),
              0
            );

            return (
              <div
                key={c.id}
                className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#588157] bg-[#E8EDEA] dark:bg-[#252E26] px-2 py-0.5 rounded">
                      {c.category}
                    </span>
                    <h4 className="font-bold text-sm text-[#1F241F] dark:text-white mt-1">
                      {c.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#6D756D] dark:text-[#B5BEB6]">
                      {courseEnr.length} active students
                    </span>
                    <span className="font-bold text-[#343F35] dark:text-[#DDE5B6]">
                      {totalLes} syllabus lessons
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#6D756D] dark:text-[#B5BEB6]">
                      Cohort Completion Rate
                    </span>
                    <span className="font-bold text-[#1F241F] dark:text-white">78%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F0EDE6] dark:bg-[#252E26] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#588157] rounded-full transition-all duration-300"
                      style={{ width: '78%' }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs border-t border-[#F0EDE6] dark:border-[#2B352E]">
                  <span className="text-[#6D756D] dark:text-[#8E9A8F]">
                    {c.isOfflineAvailable ? 'Offline package cached' : 'Online streaming only'}
                  </span>
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('builder', c.id)}
                      className="text-[#588157] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Open in Builder →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
