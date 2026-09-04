import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  FileText,
  Bookmark,
  MessageSquare,
  HelpCircle,
  FileCheck,
  Award,
  Clock,
  ChevronRight,
  HardDriveDownload,
  AlertCircle,
  Send,
  Save,
  Video,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { Course, Lesson, LearningMaterial } from '../../types';
import { VideoPlayer } from '../common/VideoPlayer';
import { UserAvatar } from '../common/UserAvatar';

export const StudentCourseView: React.FC<{
  initialCourseId?: string;
  onNavigateTab: (tab: string, courseId?: string) => void;
}> = ({ initialCourseId, onNavigateTab }) => {
  const { currentUser } = useAuth();
  const {
    courses,
    enrollments,
    markLessonComplete,
    isLessonCompleted,
    getCourseProgressPercentage,
    quizzes,
    assignments,
    discussions,
    addDiscussionQuestion,
    addDiscussionReply,
    notes,
    saveNote,
    bookmarks,
    toggleBookmark,
    isOffline,
  } = useLearning();

  const userEnrollments = enrollments.filter((e) => e.userId === currentUser?.id);
  const enrolledCourses = courses.filter((c) =>
    userEnrollments.some((e) => e.courseId === c.id)
  );

  const [selectedCourseId, setSelectedCourseId] = useState<string>(() => {
    if (initialCourseId && courses.some((c) => c.id === initialCourseId)) {
      return initialCourseId;
    }
    return enrolledCourses[0]?.id || courses[0]?.id || '';
  });

  // Keep selectedCourseId in sync whenever initialCourseId changes from navigation
  useEffect(() => {
    if (initialCourseId && courses.some((c) => c.id === initialCourseId)) {
      setSelectedCourseId(initialCourseId);
    }
  }, [initialCourseId, courses]);

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || enrolledCourses[0] || courses[0];

  // Find first lesson of active course as default
  const defaultLesson =
    activeCourse?.modules[0]?.chapters[0]?.lessons[0] || null;

  const [activeLessonId, setActiveLessonId] = useState<string>(
    defaultLesson?.id || ''
  );

  // When selectedCourseId changes, auto-select its first lesson
  useEffect(() => {
    if (activeCourse?.modules[0]?.chapters[0]?.lessons[0]) {
      const firstLes = activeCourse.modules[0].chapters[0].lessons[0];
      setActiveLessonId(firstLes.id);
    }
  }, [selectedCourseId]);

  // Tabs within lesson view
  const [activeTab, setActiveTab] = useState<'CONTENT' | 'NOTES' | 'DISCUSSION'>('CONTENT');

  // Discussion input
  const [newQuestionText, setNewQuestionText] = useState('');
  const [replyInput, setReplyInput] = useState<Record<string, string>>({});

  // Note text state for current lesson
  const currentLessonNote = notes.find(
    (n) => n.userId === currentUser?.id && n.lessonId === activeLessonId
  );
  const [noteContent, setNoteContent] = useState<string>(currentLessonNote?.content || '');
  const [noteSavedAlert, setNoteSavedAlert] = useState(false);

  // Locate active lesson
  let activeLesson: Lesson | null = null;
  let activeChapterTitle = '';
  let activeModuleTitle = '';

  if (activeCourse) {
    for (const mod of activeCourse.modules) {
      for (const chap of mod.chapters) {
        for (const les of chap.lessons) {
          if (les.id === activeLessonId) {
            activeLesson = les;
            activeChapterTitle = chap.title;
            activeModuleTitle = mod.title;
            break;
          }
        }
      }
    }
  }

  // Fallback to first lesson if not found
  if (!activeLesson && defaultLesson) {
    activeLesson = defaultLesson;
  }

  const isCompleted = activeLesson && activeCourse
    ? isLessonCompleted(activeCourse.id, activeLesson.id)
    : false;

  const isBookmarked = bookmarks.some(
    (b) => b.userId === currentUser?.id && b.lessonId === activeLessonId
  );

  const courseDiscussions = discussions.filter(
    (d) => d.courseId === activeCourse?.id
  );

  const courseQuiz = quizzes.find((q) => q.courseId === activeCourse?.id);
  const courseAssignment = assignments.find((a) => a.courseId === activeCourse?.id);

  const handleSaveNote = () => {
    if (!activeCourse || !activeLesson) return;
    saveNote(activeCourse.id, activeLesson.id, activeLesson.title, noteContent);
    setNoteSavedAlert(true);
    setTimeout(() => setNoteSavedAlert(false), 2000);
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCourse || !newQuestionText.trim()) return;
    addDiscussionQuestion(activeCourse.id, newQuestionText.trim());
    setNewQuestionText('');
  };

  const handlePostReply = (discussionId: string) => {
    const text = replyInput[discussionId];
    if (!text || !text.trim()) return;
    addDiscussionReply(discussionId, text.trim());
    setReplyInput((prev) => ({ ...prev, [discussionId]: '' }));
  };

  if (!activeCourse) {
    return (
      <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
        <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-stone-900">No Enrolled Courses</h3>
        <p className="text-xs text-stone-500 mt-1">
          Enroll in courses from the catalog to access the learning center.
        </p>
        <button
          onClick={() => onNavigateTab('catalog')}
          className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
        >
          Browse Course Catalog
        </button>
      </div>
    );
  }

  const progress = getCourseProgressPercentage(activeCourse.id);

  return (
    <div className="space-y-6">
      {/* Course Selector & Progress Top Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <select
              value={selectedCourseId}
              onChange={(e) => {
                setSelectedCourseId(e.target.value);
                const c = courses.find((crs) => crs.id === e.target.value);
                const firstLes = c?.modules[0]?.chapters[0]?.lessons[0];
                if (firstLes) setActiveLessonId(firstLes.id);
              }}
              className="px-3 py-2 text-xs font-bold font-serif border border-stone-300 rounded-lg bg-stone-50 text-stone-900 focus:ring-2 focus:ring-emerald-700"
            >
              {enrolledCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <span className="text-xs text-stone-500 hidden sm:inline">
              Instructor: {activeCourse.instructorName}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-xs font-bold text-stone-900 font-mono">
                  {progress}%
                </div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">
                  Course Completion
                </div>
              </div>
              <div className="w-24 bg-stone-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-700 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Quick Assessment Shortcuts */}
            {courseQuiz && (
              <button
                onClick={() => onNavigateTab('quizzes')}
                className="px-2.5 py-1.5 border border-stone-300 hover:border-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-medium text-stone-700 flex items-center gap-1.5 cursor-pointer"
                title="Open Course Quiz"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">Take Quiz</span>
              </button>
            )}

            {courseAssignment && (
              <button
                onClick={() => onNavigateTab('assignments')}
                className="px-2.5 py-1.5 border border-stone-300 hover:border-amber-700 hover:bg-amber-50 rounded-lg text-xs font-medium text-stone-700 flex items-center gap-1.5 cursor-pointer"
                title="Open Course Assignment"
              >
                <FileCheck className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Assignment</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Learning Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Syllabus Tree (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 p-4 shadow-xs max-h-[750px] overflow-y-auto">
          <div className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-3 flex items-center justify-between">
            <span>Course Syllabus</span>
            <span className="text-[11px] font-mono lowercase">
              {activeCourse.modules.length} modules
            </span>
          </div>

          <div className="space-y-4">
            {activeCourse.modules.map((mod) => (
              <div key={mod.id} className="border border-stone-200 rounded-lg overflow-hidden">
                <div className="p-2.5 bg-stone-100 font-semibold text-xs text-stone-800 border-b border-stone-200">
                  {mod.title}
                </div>
                <div className="p-2 space-y-2 bg-stone-50/40">
                  {mod.chapters.map((chap) => (
                    <div key={chap.id} className="space-y-1">
                      <div className="text-[11px] font-medium text-stone-600 px-2 py-0.5">
                        {chap.title}
                      </div>
                      <div className="space-y-1 pl-2">
                        {chap.lessons.map((les) => {
                          const done = isLessonCompleted(activeCourse.id, les.id);
                          const isCurrent = les.id === activeLessonId;

                          return (
                            <button
                              key={les.id}
                              onClick={() => {
                                setActiveLessonId(les.id);
                                const noteForLes = notes.find(
                                  (n) => n.userId === currentUser?.id && n.lessonId === les.id
                                );
                                setNoteContent(noteForLes?.content || '');
                              }}
                              className={`w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                                isCurrent
                                  ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                                  : 'hover:bg-stone-200/70 text-stone-800'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate pr-2">
                                {done ? (
                                  <CheckCircle2
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isCurrent ? 'text-emerald-300' : 'text-emerald-700'
                                    }`}
                                  />
                                ) : (
                                  <Circle
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isCurrent ? 'text-stone-300' : 'text-stone-400'
                                    }`}
                                  />
                                )}
                                <span className="truncate">{les.title}</span>
                              </div>
                              <span
                                className={`text-[10px] shrink-0 font-mono ${
                                  isCurrent ? 'text-stone-200' : 'text-stone-400'
                                }`}
                              >
                                {les.durationMinutes}m
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Lesson View & Tabs (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Context breadcrumb & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <div className="text-[11px] text-stone-500 font-medium">
                  {activeModuleTitle} • {activeChapterTitle}
                </div>
                <h2 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
                  {activeLesson?.title || 'Select a lesson'}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {/* Ask Faculty Button */}
                <button
                  onClick={() => onNavigateTab('doubts', activeCourse.id)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#E8EDEA] hover:bg-[#DDE5B6] text-[#343F35] border border-[#A3B18A] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Ask Faculty a question about this course"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#588157]" />
                  <span className="hidden sm:inline">Ask Faculty</span>
                </button>

                {/* Bookmark Toggle */}
                {activeLesson && (
                  <button
                    onClick={() =>
                      toggleBookmark(activeCourse.id, activeLesson.id, activeLesson.title)
                    }
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isBookmarked
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'text-stone-500 border-stone-300 hover:bg-stone-100'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                )}

                {/* Mark Complete Button */}
                {activeLesson && (
                  <button
                    onClick={() => markLessonComplete(activeCourse.id, activeLesson.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-[#4A5D4E] hover:bg-[#343F35] text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {isCompleted ? 'Completed' : 'Mark Complete'}
                  </button>
                )}
              </div>
            </div>

            {/* Sub-tabs: Lesson Content / Notes / Discussions */}
            <div className="flex items-center gap-6 mt-4 border-b border-stone-100 text-xs">
              <button
                onClick={() => setActiveTab('CONTENT')}
                className={`pb-2.5 font-semibold cursor-pointer border-b-2 transition-colors ${
                  activeTab === 'CONTENT'
                    ? 'border-emerald-800 text-emerald-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Lesson Material
              </button>
              <button
                onClick={() => setActiveTab('NOTES')}
                className={`pb-2.5 font-semibold cursor-pointer border-b-2 transition-colors ${
                  activeTab === 'NOTES'
                    ? 'border-emerald-800 text-emerald-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Private Study Notes
              </button>
              <button
                onClick={() => setActiveTab('DISCUSSION')}
                className={`pb-2.5 font-semibold cursor-pointer border-b-2 transition-colors ${
                  activeTab === 'DISCUSSION'
                    ? 'border-emerald-800 text-emerald-900'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                Course Discussion ({courseDiscussions.length})
              </button>
            </div>

            {/* Tab 1: Lesson Material */}
            {activeTab === 'CONTENT' && activeLesson && (
              <div className="mt-5 space-y-6">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-700">
                  <span className="font-semibold text-stone-900">Summary: </span>
                  {activeLesson.summary}
                </div>

                <div className="space-y-6">
                  {activeLesson.materials.map((mat) => {
                    const isVideo =
                      mat.type === 'VIDEO' ||
                      Boolean(mat.resourceUrl?.includes('video') || mat.resourceUrl?.includes('youtu') || mat.resourceUrl?.includes('.mp4') || mat.title.toLowerCase().includes('lecture') || mat.title.toLowerCase().includes('video'));

                    if (isVideo) {
                      return (
                        <div key={mat.id} className="border border-stone-200 rounded-2xl p-5 bg-white space-y-3">
                          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-[#E8EDEA] text-[#343F35] flex items-center gap-1 border border-[#A3B18A]/50">
                                <Video className="w-3 h-3 text-[#588157]" />
                                VIDEO LECTURE
                              </span>
                              <h4 className="font-bold text-stone-900 text-sm">{mat.title}</h4>
                            </div>
                            <span className="text-xs text-stone-500 font-mono">
                              {mat.durationMinutes} min runtime
                            </span>
                          </div>

                          <VideoPlayer
                            src={mat.resourceUrl}
                            title={mat.title}
                            durationMinutes={mat.durationMinutes}
                            transcript={mat.content}
                            onComplete={() => markLessonComplete(activeCourse.id, activeLesson.id)}
                            isCompleted={isCompleted}
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={mat.id} className="border border-stone-200 rounded-xl p-5 bg-white">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700">
                              {mat.type}
                            </span>
                            <h4 className="font-bold text-stone-900 text-sm">{mat.title}</h4>
                          </div>
                          <span className="text-xs text-stone-400 font-mono">
                            {mat.durationMinutes} min read
                          </span>
                        </div>

                        {/* Content renderer with markdown formatting */}
                        <div className="text-xs text-stone-700 leading-relaxed space-y-3 whitespace-pre-line font-serif">
                          {mat.content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Private Notes */}
            {activeTab === 'NOTES' && (
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-stone-600">
                    Your personal notes for this lesson are saved locally and synced across sessions.
                  </p>
                  {noteSavedAlert && (
                    <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Note Saved!
                    </span>
                  )}
                </div>

                <textarea
                  rows={8}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Record your takeaways, formula derivations, or architectural questions..."
                  className="w-full p-3 border border-stone-300 rounded-lg text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 font-sans leading-relaxed"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Lesson Notes
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Discussion Board */}
            {activeTab === 'DISCUSSION' && (
              <div className="mt-5 space-y-5">
                {/* Ask a question form */}
                <form onSubmit={handlePostQuestion} className="space-y-2">
                  <label className="block text-xs font-semibold text-stone-700">
                    Ask a question about this course
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="e.g. Can you clarify how Lamport timestamps order concurrent events?"
                      className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Post
                    </button>
                  </div>
                </form>

                {/* Discussions list */}
                <div className="space-y-4 pt-4 border-t border-stone-200">
                  {courseDiscussions.length === 0 ? (
                    <div className="text-center py-6 text-xs text-stone-500">
                      No discussions started yet. Be the first to ask!
                    </div>
                  ) : (
                    courseDiscussions.map((disc) => (
                      <div
                        key={disc.id}
                        className="border border-stone-200 rounded-lg p-4 bg-stone-50/50 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-xs font-bold text-stone-900">
                              {disc.userName} ({disc.userRole})
                            </div>
                            <p className="text-xs text-stone-800 mt-1">{disc.question}</p>
                          </div>
                          <span className="text-[10px] text-stone-400">
                            {new Date(disc.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Replies */}
                        {disc.replies.length > 0 && (
                          <div className="space-y-2 pl-3 border-l-2 border-emerald-700 mt-2">
                            {disc.replies.map((rep) => (
                              <div key={rep.id} className="text-xs bg-white p-2.5 rounded border border-stone-200">
                                <div className="flex items-center justify-between text-[11px] font-semibold text-stone-900">
                                  <span>
                                    {rep.userName}
                                    {rep.isInstructorEndorsed && (
                                      <span className="ml-1.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                                        Faculty Reply
                                      </span>
                                    )}
                                  </span>
                                  <span className="text-[10px] text-stone-400">
                                    {new Date(rep.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                <p className="text-stone-700 mt-1">{rep.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply input */}
                        <div className="flex gap-2 mt-2 pt-2 border-t border-stone-200">
                          <input
                            type="text"
                            value={replyInput[disc.id] || ''}
                            onChange={(e) =>
                              setReplyInput((prev) => ({ ...prev, [disc.id]: e.target.value }))
                            }
                            placeholder="Write a response..."
                            className="flex-1 px-2.5 py-1.5 text-xs border border-stone-300 rounded focus:ring-1 focus:ring-emerald-700"
                          />
                          <button
                            onClick={() => handlePostReply(disc.id)}
                            className="px-3 py-1.5 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 cursor-pointer"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
