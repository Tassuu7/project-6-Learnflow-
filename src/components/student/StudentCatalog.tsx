import React, { useState } from 'react';
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  GraduationCap,
  HardDriveDownload,
  CheckCircle2,
  ArrowRight,
  X,
  Layers,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { Course } from '../../types';

export const StudentCatalog: React.FC<{
  onOpenCourse: (courseId: string) => void;
}> = ({ onOpenCourse }) => {
  const { currentUser } = useAuth();
  const { courses, enrollments, enrollInCourse } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [onlyOffline, setOnlyOffline] = useState(false);
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  // Filter logic
  const publishedCourses = courses.filter((c) => c.status === 'PUBLISHED');

  const categories = ['ALL', ...Array.from(new Set(publishedCourses.map((c) => c.category)))];

  const filteredCourses = publishedCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === 'ALL' || course.category === selectedCategory;
    const matchesDiff =
      selectedDifficulty === 'ALL' || course.difficulty === selectedDifficulty;
    const matchesOffline = !onlyOffline || course.isOfflineAvailable;

    return matchesSearch && matchesCat && matchesDiff && matchesOffline;
  });

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (e) => e.userId === currentUser?.id && e.courseId === courseId
    );
  };

  const handleEnroll = async (courseId: string) => {
    setEnrollingId(courseId);
    try {
      await enrollInCourse(courseId);
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-stone-900">
              Institutional Course Catalog
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Explore accredited technical curricula with offline-first synchronization capabilities.
            </p>
          </div>

          {/* Search box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, topics, tags..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 border border-stone-300 rounded-lg bg-stone-50 text-stone-700 font-medium focus:ring-1 focus:ring-emerald-700 text-xs"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'ALL' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-2.5 py-1.5 border border-stone-300 rounded-lg bg-stone-50 text-stone-700 font-medium focus:ring-1 focus:ring-emerald-700 text-xs"
          >
            <option value="ALL">All Difficulties</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>

          {/* Offline Toggle */}
          <label className="flex items-center gap-2 px-2.5 py-1.5 border border-stone-200 rounded-lg cursor-pointer bg-stone-50 hover:bg-stone-100 text-stone-700">
            <input
              type="checkbox"
              checked={onlyOffline}
              onChange={(e) => setOnlyOffline(e.target.checked)}
              className="rounded text-emerald-700 focus:ring-emerald-700"
            />
            <span className="flex items-center gap-1 font-medium">
              <HardDriveDownload className="w-3.5 h-3.5 text-emerald-700" />
              Offline Downloadable Only
            </span>
          </label>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const enrolled = isEnrolled(course.id);
          const totalLessons = course.modules.reduce(
            (acc, m) => acc + m.chapters.reduce((a, ch) => a + ch.lessons.length, 0),
            0
          );

          return (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-stone-200 shadow-xs hover:border-emerald-700/50 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                    {course.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {course.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold font-serif text-stone-900 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px] text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {course.estimatedHours} Hours
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-stone-400" />
                    {totalLessons} Lessons
                  </div>
                </div>

                {course.isOfflineAvailable && (
                  <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 font-medium">
                    <HardDriveDownload className="w-3 h-3 text-emerald-700" />
                    Offline package available ({course.packageSizeMb} MB)
                  </div>
                )}
              </div>

              <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCourseForDetail(course)}
                  className="text-xs font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
                >
                  Syllabus Details
                </button>

                {enrolled ? (
                  <button
                    onClick={() => onOpenCourse(course.id)}
                    className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Open Course
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    disabled={enrollingId === course.id}
                    className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {enrollingId === course.id ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-stone-800">No courses match your criteria</h4>
          <p className="text-xs text-stone-500 mt-1">
            Try adjusting your search query or reset your filters.
          </p>
        </div>
      )}

      {/* Course Details Modal */}
      {selectedCourseForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-stone-200 flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2 inline-block">
                  {selectedCourseForDetail.category} • {selectedCourseForDetail.difficulty}
                </span>
                <h3 className="text-xl font-bold font-serif text-stone-900">
                  {selectedCourseForDetail.title}
                </h3>
                <div className="text-xs text-stone-500 mt-1">
                  Instructor: {selectedCourseForDetail.instructorName} • {selectedCourseForDetail.estimatedHours} Estimated Hours
                </div>
              </div>
              <button
                onClick={() => setSelectedCourseForDetail(null)}
                className="text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-700 flex-1">
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">Course Description</h4>
                <p className="leading-relaxed text-stone-600">
                  {selectedCourseForDetail.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2">Learning Objectives</h4>
                <ul className="space-y-1 text-stone-600">
                  {selectedCourseForDetail.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2">Curriculum Syllabus Structure</h4>
                <div className="space-y-3">
                  {selectedCourseForDetail.modules.map((mod, idx) => (
                    <div key={mod.id} className="border border-stone-200 rounded-lg p-3 bg-stone-50/60">
                      <div className="font-semibold text-stone-900">
                        {mod.title}
                      </div>
                      <div className="text-stone-500 text-[11px] mt-0.5">
                        {mod.description}
                      </div>
                      <div className="mt-2 space-y-1.5 pl-3 border-l-2 border-emerald-700">
                        {mod.chapters.map((chap) => (
                          <div key={chap.id}>
                            <div className="font-medium text-stone-800 text-[11px]">
                              {chap.title}
                            </div>
                            <div className="text-stone-500 text-[10px] pl-2">
                              {chap.lessons.map((l) => (
                                <div key={l.id}>• {l.title} ({l.durationMinutes} mins)</div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-mono">
                Course ID: {selectedCourseForDetail.id}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCourseForDetail(null)}
                  className="px-3 py-1.5 border border-stone-300 rounded-lg text-xs text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  Close
                </button>
                {isEnrolled(selectedCourseForDetail.id) ? (
                  <button
                    onClick={() => {
                      onOpenCourse(selectedCourseForDetail.id);
                      setSelectedCourseForDetail(null);
                    }}
                    className="px-4 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                  >
                    Open Learning Center
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      await handleEnroll(selectedCourseForDetail.id);
                      setSelectedCourseForDetail(null);
                    }}
                    className="px-4 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                  >
                    Enroll in Course
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
