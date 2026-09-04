import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import {
  BookOpen,
  Users,
  Clock,
  Edit3,
  Eye,
  Plus,
  CheckCircle2,
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Video,
} from 'lucide-react';
import { Course } from '../../types';

export const InstructorCoursesView: React.FC<{
  onNavigate: (tab: string, contextId?: string) => void;
}> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { courses, enrollments, notifyStudentsCourseUpdated } = useLearning();

  const [filter, setFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Instructor courses or all courses if demo
  const instructorCourses = courses.filter((c) => {
    // Show courses by instructor or all for demo flexibility
    return (
      c.instructorId === currentUser?.id ||
      c.instructorName.includes('Sterling') ||
      c.instructorName.includes('Rostova')
    );
  });

  const displayCourses = (
    instructorCourses.length > 0 ? instructorCourses : courses
  ).filter((c) => {
    const matchesFilter = filter === 'ALL' || c.status === filter;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getEnrollmentCount = (courseId: string) => {
    return enrollments.filter((e) => e.courseId === courseId).length;
  };

  const getTotalChapters = (course: Course) => {
    return course.modules.reduce((acc, m) => acc + m.chapters.length, 0);
  };

  const getTotalLessons = (course: Course) => {
    return course.modules.reduce(
      (acc, m) => acc + m.chapters.reduce((a, ch) => a + ch.lessons.length, 0),
      0
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#343F35] dark:text-[#DDE5B6] bg-[#E8EDEA] dark:bg-[#252E26] px-2.5 py-0.5 rounded-full border border-[#A3B18A]/40">
              Curriculum Management
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F241F] dark:text-white mt-1.5">
              My Teaching Courses & Syllabus
            </h2>
            <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] mt-0.5">
              Manage your active curricula, edit chapters, upload video lectures, and broadcast live notifications to enrolled students.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate('builder', 'NEW')}
              className="px-4 py-2 bg-[#343F35] hover:bg-[#262E27] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#A3B18A]" />
              Create New Course
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6 pt-5 border-t border-[#F0EDE6] dark:border-[#2B352E]">
          <div className="flex items-center gap-2">
            {(['ALL', 'PUBLISHED', 'DRAFT'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  filter === status
                    ? 'bg-[#343F35] text-white shadow-xs'
                    : 'bg-[#F4F1EA] dark:bg-[#252E26] text-[#586358] dark:text-[#B5BEB6] hover:bg-[#E8EDEA]'
                }`}
              >
                {status === 'ALL'
                  ? 'All Courses'
                  : status === 'PUBLISHED'
                  ? 'Published Live'
                  : 'Drafts in Progress'}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search course title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] rounded-lg text-xs text-[#2D332D] dark:text-white placeholder-[#8E9A8F]"
            />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {displayCourses.map((course) => {
          const enrollCount = getEnrollmentCount(course.id);
          const chaptersCount = getTotalChapters(course);
          const lessonsCount = getTotalLessons(course);

          return (
            <div
              key={course.id}
              className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#A3B18A] transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#588157] bg-[#E8EDEA] dark:bg-[#252E26] px-2.5 py-0.5 rounded-md">
                    {course.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      course.status === 'PUBLISHED'
                        ? 'bg-[#E8EDEA] text-[#343F35] border border-[#A3B18A]/50'
                        : 'bg-[#FDF8EE] text-[#8C6019] border border-[#F2CC8F]'
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1F241F] dark:text-white mt-2 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] mt-1 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-[#F9F7F2] dark:bg-[#161D18] border border-[#F0EDE6] dark:border-[#2B352E] text-xs">
                  <div>
                    <span className="text-[10px] text-[#6D756D] dark:text-[#8E9A8F] block">
                      Enrolled
                    </span>
                    <span className="font-bold text-[#1F241F] dark:text-white flex items-center gap-1 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-[#588157]" />
                      {enrollCount} scholars
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D756D] dark:text-[#8E9A8F] block">
                      Curriculum
                    </span>
                    <span className="font-bold text-[#1F241F] dark:text-white flex items-center gap-1 mt-0.5">
                      <Layers className="w-3.5 h-3.5 text-[#A3B18A]" />
                      {chaptersCount} ch • {lessonsCount} les
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6D756D] dark:text-[#8E9A8F] block">
                      Est. Hours
                    </span>
                    <span className="font-bold text-[#1F241F] dark:text-white flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#588157]" />
                      {course.estimatedHours}h
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#F0EDE6] dark:border-[#2B352E]">
                <button
                  onClick={() => {
                    notifyStudentsCourseUpdated(
                      course.id,
                      `Faculty has verified and updated lesson materials for "${course.title}".`
                    );
                  }}
                  className="text-xs text-[#4A5D4E] dark:text-[#A3B18A] hover:underline font-medium cursor-pointer"
                  title="Notify enrolled students now"
                >
                  Send Student Alert
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('builder', course.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#343F35] hover:bg-[#262E27] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#A3B18A]" />
                    Edit in Builder
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
