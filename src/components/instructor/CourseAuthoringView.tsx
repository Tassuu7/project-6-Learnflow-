import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  HardDriveDownload,
  Layers,
  FileText,
  Clock,
  HelpCircle,
  Video,
  Bell,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { Course, Module, Chapter, Lesson, LearningMaterial } from '../../types';

export const CourseAuthoringView: React.FC<{
  initialCourseId?: string;
  onNavigate?: (tab: string, contextId?: string) => void;
}> = ({ initialCourseId, onNavigate }) => {
  const { currentUser } = useAuth();
  const {
    courses,
    createCourse,
    updateCourse,
    broadcastNotification,
    notifyStudentsCourseUpdated,
  } = useLearning();

  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourseId || (courses[0]?.id ?? 'NEW')
  );

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Distributed Systems');
  const [difficulty, setDifficulty] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('INTERMEDIATE');
  const [estimatedHours, setEstimatedHours] = useState(12);
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(true);
  const [packageSizeMb, setPackageSizeMb] = useState(25);
  const [tags, setTags] = useState('system-design, offline, architecture');
  const [learningObjectives, setLearningObjectives] = useState(
    '1. Master partitioned data structures and state replication\n2. Design fault-tolerant offline clients with CRDTs'
  );

  // Modules state
  const [modules, setModules] = useState<Module[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Synchronize when initialCourseId changes
  useEffect(() => {
    if (initialCourseId) {
      handleSelectExisting(initialCourseId);
    } else if (courses.length > 0) {
      handleSelectExisting(courses[0].id);
    }
  }, [initialCourseId, courses]);

  // Load course details
  const handleSelectExisting = (id: string) => {
    setSelectedCourseId(id);
    if (id === 'NEW') {
      setTitle('');
      setDescription('');
      setCategory('Distributed Systems');
      setDifficulty('INTERMEDIATE');
      setEstimatedHours(12);
      setIsOfflineAvailable(true);
      setPackageSizeMb(25);
      setTags('system-design, distributed');
      setLearningObjectives('1. Understand core concepts\n2. Build hands-on architectures');
      setModules([
        {
          id: `mod_${Date.now()}`,
          title: 'Module 1: Foundations & Architecture',
          description: 'Fundamental principles and design models',
          order: 1,
          chapters: [
            {
              id: `chap_${Date.now()}`,
              title: 'Chapter 1: Getting Started & Core Theory',
              order: 1,
              lessons: [
                {
                  id: `les_${Date.now()}`,
                  title: 'Lesson 1: Introduction to Distributed State',
                  durationMinutes: 20,
                  order: 1,
                  summary: 'Essential terminology and baseline definitions.',
                  materials: [
                    {
                      id: `mat_${Date.now()}`,
                      title: 'Introductory Lecture & Overview',
                      type: 'VIDEO',
                      resourceUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                      content: 'Welcome to the foundational lecture. In this chapter, we explore how distributed networks manage partitions.',
                      durationMinutes: 20,
                      isDownloadable: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]);
    } else {
      const c = courses.find((crs) => crs.id === id);
      if (c) {
        setTitle(c.title);
        setDescription(c.description);
        setCategory(c.category);
        setDifficulty(c.difficulty);
        setEstimatedHours(c.estimatedHours);
        setIsOfflineAvailable(c.isOfflineAvailable);
        setPackageSizeMb(c.packageSizeMb);
        setTags(c.tags ? c.tags.join(', ') : '');
        setLearningObjectives(c.learningObjectives ? c.learningObjectives.join('\n') : '');
        setModules(c.modules || []);
      }
    }
  };

  // Module actions
  const addModule = () => {
    const newMod: Module = {
      id: `mod_${Date.now()}`,
      title: `Module ${modules.length + 1}: Applied System Modeling`,
      description: 'Extended deep-dive into practical implementation',
      order: modules.length + 1,
      chapters: [],
    };
    setModules([...modules, newMod]);
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m.id !== moduleId));
  };

  // Chapter actions
  const addChapter = (moduleId: string) => {
    setModules(
      modules.map((m) => {
        if (m.id !== moduleId) return m;
        const newChap: Chapter = {
          id: `chap_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          title: `Chapter ${m.chapters.length + 1}: Specialized Principles`,
          order: m.chapters.length + 1,
          lessons: [
            {
              id: `les_${Date.now()}`,
              title: 'Analytical Video Lecture',
              durationMinutes: 25,
              order: 1,
              summary: 'Comprehensive video lecture explaining the chapter mechanics.',
              materials: [
                {
                  id: `mat_${Date.now()}`,
                  title: 'Video Lecture & Technical Walkthrough',
                  type: 'VIDEO',
                  resourceUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  content: 'Video lecture notes and code walkthrough transcript for this chapter.',
                  durationMinutes: 25,
                  isDownloadable: true,
                },
              ],
            },
          ],
        };
        return { ...m, chapters: [...m.chapters, newChap] };
      })
    );
  };

  const deleteChapter = (moduleId: string, chapterId: string) => {
    setModules(
      modules.map((m) => {
        if (m.id !== moduleId) return m;
        return {
          ...m,
          chapters: m.chapters.filter((ch) => ch.id !== chapterId),
        };
      })
    );
  };

  // Lesson actions
  const addLesson = (moduleId: string, chapterId: string, type: 'TEXT' | 'VIDEO' = 'VIDEO') => {
    setModules(
      modules.map((m) => {
        if (m.id !== moduleId) return m;
        return {
          ...m,
          chapters: m.chapters.map((ch) => {
            if (ch.id !== chapterId) return ch;
            const newLes: Lesson = {
              id: `les_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              title: type === 'VIDEO' ? 'Interactive Video Lecture' : 'Technical Study Guide',
              durationMinutes: 20,
              order: ch.lessons.length + 1,
              summary: 'Key concepts and architectural details.',
              materials: [
                {
                  id: `mat_${Date.now()}`,
                  title: type === 'VIDEO' ? 'Lecture Video: Foundations & Code Demo' : 'Reading & Specification',
                  type: type,
                  resourceUrl:
                    type === 'VIDEO'
                      ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                      : undefined,
                  content:
                    type === 'VIDEO'
                      ? `[00:00] Overview of the lesson principles.\n[03:00] Architectural walkthrough.\n[07:00] Code implementation and edge testing.`
                      : 'Comprehensive technical notes detailing the chapter syllabus.',
                  durationMinutes: 20,
                  isDownloadable: true,
                },
              ],
            };
            return { ...ch, lessons: [...ch.lessons, newLes] };
          }),
        };
      })
    );
  };

  const deleteLesson = (moduleId: string, chapterId: string, lessonId: string) => {
    setModules(
      modules.map((m) => {
        if (m.id !== moduleId) return m;
        return {
          ...m,
          chapters: m.chapters.map((ch) => {
            if (ch.id !== chapterId) return ch;
            return {
              ...ch,
              lessons: ch.lessons.filter((l) => l.id !== lessonId),
            };
          }),
        };
      })
    );
  };

  const handleSave = (status: 'DRAFT' | 'PUBLISHED') => {
    if (!title.trim()) return;

    const courseId = selectedCourseId === 'NEW' ? `crs_${Date.now()}` : selectedCourseId;
    const courseToSave: Course = {
      id: courseId,
      title: title.trim(),
      slug: title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: description.trim(),
      category,
      subject: category,
      difficulty,
      estimatedHours: Number(estimatedHours) || 10,
      instructorId: currentUser?.id || 'usr_instructor_1',
      instructorName: currentUser?.name || 'Prof. David K. Sterling',
      thumbnailUrl: '',
      isOfflineAvailable,
      packageSizeMb: Number(packageSizeMb) || 20,
      status,
      prerequisites: [],
      learningObjectives: learningObjectives.split('\n').filter((l) => l.trim()),
      modules,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (selectedCourseId === 'NEW') {
      createCourse(courseToSave);
      setSelectedCourseId(courseId);
      broadcastNotification({
        title: `New Course Published: ${courseToSave.title}`,
        message: `Professor ${courseToSave.instructorName} released a new curriculum in ${courseToSave.category}.`,
        type: 'COURSE',
        actionUrl: 'learning',
      });
      setNotificationMsg('New course created & broadcasted to students!');
    } else {
      updateCourse(courseId, courseToSave);
      notifyStudentsCourseUpdated(
        courseId,
        `Professor ${courseToSave.instructorName} published updated chapters and video lectures for "${courseToSave.title}".`
      );
      setNotificationMsg('Chapter edits saved & live alert sent to enrolled students!');
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setNotificationMsg('');
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Curriculum Selector */}
      <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#343F35] dark:text-[#DDE5B6] bg-[#E8EDEA] dark:bg-[#252E26] px-2.5 py-0.5 rounded-full border border-[#A3B18A]/40">
              Curriculum Authoring & Video Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F241F] dark:text-white mt-1.5">
              Course & Chapter Editor
            </h2>
            <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] mt-0.5">
              Edit chapter syllabus, attach lecture videos, and synchronize updates in real time with students.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-[#586358] dark:text-[#B5BEB6]">Select Course:</label>
            <select
              value={selectedCourseId}
              onChange={(e) => handleSelectExisting(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold border border-[#E5E1D8] dark:border-[#2B352E] rounded-xl bg-[#F9F7F2] dark:bg-[#161D18] text-[#2D332D] dark:text-white"
            >
              <option value="NEW">+ Create New Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Success Alert Banner */}
        {savedSuccess && (
          <div className="mt-4 p-3.5 rounded-xl bg-[#E8EDEA] dark:bg-[#252E26] border border-[#A3B18A] text-xs font-semibold text-[#343F35] dark:text-[#DDE5B6] flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#588157]" />
              <span>{notificationMsg || 'Course changes saved successfully!'}</span>
            </div>
            <span className="text-[11px] font-normal text-[#588157]">Student notified in real-time</span>
          </div>
        )}
      </div>

      {/* Course Core Metadata */}
      <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#1F241F] dark:text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#588157]" />
          General Course Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-[#2D332D] dark:text-[#E8EDEA]">Course Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Distributed Consensus Systems & CRDTs"
              className="w-full px-3 py-2 bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] rounded-xl text-xs text-[#2D332D] dark:text-white placeholder-[#8E9A8F]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-[#2D332D] dark:text-[#E8EDEA]">Category & Domain</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Distributed Systems, Machine Learning"
              className="w-full px-3 py-2 bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] rounded-xl text-xs text-[#2D332D] dark:text-white"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="font-semibold text-[#2D332D] dark:text-[#E8EDEA]">Description & Syllabus Overview</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive academic synopsis of the curriculum..."
              className="w-full px-3 py-2 bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] rounded-xl text-xs text-[#2D332D] dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-[#2D332D] dark:text-[#E8EDEA]">Estimated Study Hours</label>
            <input
              type="number"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] rounded-xl text-xs text-[#2D332D] dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-[#2D332D] dark:text-[#E8EDEA]">Academic Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] rounded-xl text-xs text-[#2D332D] dark:text-white"
            >
              <option value="BEGINNER">BEGINNER (Undergraduate Introductory)</option>
              <option value="INTERMEDIATE">INTERMEDIATE (Core Technical)</option>
              <option value="ADVANCED">ADVANCED (Graduate Specialization)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hierarchical Syllabus Builder (Modules → Chapters → Lessons) */}
      <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#1F241F] dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#588157]" />
              Syllabus Structure (Modules → Chapters → Lessons & Videos)
            </h3>
            <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] mt-0.5">
              Edit chapters or add video resources. Edits will immediately be visible to students enrolled in this course.
            </p>
          </div>

          <button
            onClick={addModule}
            className="px-3.5 py-1.5 bg-[#343F35] hover:bg-[#262E27] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-[#A3B18A]" /> Add Module
          </button>
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          {modules.map((mod, modIdx) => (
            <div
              key={mod.id}
              className="p-5 rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] bg-[#F9F7F2]/60 dark:bg-[#161D18]/60 space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={mod.title}
                  onChange={(e) => {
                    const newMods = [...modules];
                    newMods[modIdx].title = e.target.value;
                    setModules(newMods);
                  }}
                  className="font-bold text-sm text-[#1F241F] dark:text-white bg-white dark:bg-[#1C231E] px-3 py-1.5 border border-[#E5E1D8] dark:border-[#2B352E] rounded-xl flex-1"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addChapter(mod.id)}
                    className="px-3 py-1.5 bg-[#588157] hover:bg-[#476A46] text-white rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                  >
                    <Plus className="w-3 h-3" /> Add Chapter
                  </button>
                  <button
                    onClick={() => deleteModule(mod.id)}
                    className="p-1.5 text-[#8E9A8F] hover:text-[#E2725B] cursor-pointer"
                    title="Delete Module"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chapters List */}
              <div className="space-y-4 pl-3 sm:pl-5 border-l-2 border-[#A3B18A]">
                {mod.chapters.map((chap, chapIdx) => (
                  <div
                    key={chap.id}
                    className="p-4 bg-white dark:bg-[#1C231E] rounded-xl border border-[#E5E1D8] dark:border-[#2B352E] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-[#588157] bg-[#E8EDEA] dark:bg-[#252E26] px-2 py-0.5 rounded">
                          Chapter {chapIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={chap.title}
                          onChange={(e) => {
                            const newMods = [...modules];
                            newMods[modIdx].chapters[chapIdx].title = e.target.value;
                            setModules(newMods);
                          }}
                          placeholder="Chapter Title..."
                          className="font-semibold text-xs text-[#2D332D] dark:text-white bg-[#F9F7F2] dark:bg-[#161D18] px-2.5 py-1.5 border border-[#E5E1D8] dark:border-[#2B352E] rounded-lg flex-1"
                        />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => addLesson(mod.id, chap.id, 'VIDEO')}
                          className="px-2.5 py-1 bg-[#E8EDEA] dark:bg-[#252E26] hover:bg-[#DDE5B6] dark:hover:bg-[#343F35] text-[#343F35] dark:text-[#DDE5B6] rounded-md text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Add video lesson"
                        >
                          <Video className="w-3 h-3 text-[#588157]" /> + Video
                        </button>
                        <button
                          onClick={() => addLesson(mod.id, chap.id, 'TEXT')}
                          className="px-2.5 py-1 bg-[#F4F1EA] dark:bg-[#252E26] hover:bg-[#E8EDEA] text-[#586358] dark:text-[#E8EDEA] rounded-md text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Add reading lesson"
                        >
                          <FileText className="w-3 h-3" /> + Text
                        </button>
                        <button
                          onClick={() => deleteChapter(mod.id, chap.id)}
                          className="p-1 text-[#8E9A8F] hover:text-[#E2725B] cursor-pointer"
                          title="Delete Chapter"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Chapter Explanation Video URL */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F9F7F2] dark:bg-[#161D18] rounded-lg border border-[#E5E1D8] dark:border-[#2B352E]">
                      <Video className="w-3.5 h-3.5 text-[#588157] shrink-0" />
                      <input
                        type="text"
                        value={chap.videoUrl || ''}
                        onChange={(e) => {
                          const newMods = [...modules];
                          newMods[modIdx].chapters[chapIdx].videoUrl = e.target.value;
                          setModules(newMods);
                        }}
                        placeholder="Faculty Chapter Explanation Video URL (e.g. https://www.youtube.com/embed/...)"
                        className="text-[11px] font-mono text-[#2D332D] dark:text-white bg-transparent outline-hidden flex-1"
                      />
                    </div>

                    {/* Lessons list */}
                    <div className="space-y-3 pl-3">
                      {chap.lessons.map((les, lesIdx) => {
                        const mat = les.materials[0];
                        const isVideo = mat?.type === 'VIDEO';

                        return (
                          <div
                            key={les.id}
                            className="p-3.5 rounded-xl border border-[#E5E1D8] dark:border-[#2B352E] bg-[#F9F7F2] dark:bg-[#161D18] text-xs space-y-3"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2 flex-1">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                                    isVideo
                                      ? 'bg-[#E8EDEA] text-[#343F35] border border-[#A3B18A]/50'
                                      : 'bg-[#F4F1EA] text-[#586358]'
                                  }`}
                                >
                                  {isVideo ? <Video className="w-3 h-3 text-[#588157]" /> : <FileText className="w-3 h-3" />}
                                  {isVideo ? 'VIDEO' : 'TEXT'}
                                </span>
                                <input
                                  type="text"
                                  value={les.title}
                                  onChange={(e) => {
                                    const newMods = [...modules];
                                    newMods[modIdx].chapters[chapIdx].lessons[lesIdx].title =
                                      e.target.value;
                                    setModules(newMods);
                                  }}
                                  className="font-semibold text-xs text-[#1F241F] dark:text-white bg-white dark:bg-[#1C231E] px-2.5 py-1 border border-[#E5E1D8] dark:border-[#2B352E] rounded-md flex-1"
                                />
                              </div>

                              <div className="flex items-center gap-2 text-[#586358]">
                                <Clock className="w-3 h-3" />
                                <input
                                  type="number"
                                  value={les.durationMinutes}
                                  onChange={(e) => {
                                    const newMods = [...modules];
                                    newMods[modIdx].chapters[chapIdx].lessons[
                                      lesIdx
                                    ].durationMinutes = Number(e.target.value);
                                    setModules(newMods);
                                  }}
                                  className="w-12 px-1.5 py-0.5 border border-[#E5E1D8] dark:border-[#2B352E] rounded bg-white dark:bg-[#1C231E] text-center font-mono text-xs text-[#2D332D] dark:text-white"
                                />
                                <span>min</span>
                                <button
                                  onClick={() => deleteLesson(mod.id, chap.id, les.id)}
                                  className="p-1 text-[#8E9A8F] hover:text-[#E2725B] cursor-pointer ml-1"
                                  title="Delete Lesson"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Video URL or Material details */}
                            {isVideo && (
                              <div className="space-y-1.5 p-2.5 bg-white dark:bg-[#1C231E] rounded-lg border border-[#E5E1D8] dark:border-[#2B352E]">
                                <label className="text-[11px] font-semibold text-[#2D332D] dark:text-[#E8EDEA] flex items-center justify-between">
                                  <span>Video Source URL (MP4 or YouTube link)</span>
                                  <span className="text-[10px] text-[#588157]">Auto-supported player</span>
                                </label>
                                <input
                                  type="text"
                                  value={mat?.resourceUrl || ''}
                                  onChange={(e) => {
                                    const newMods = [...modules];
                                    if (newMods[modIdx].chapters[chapIdx].lessons[lesIdx].materials[0]) {
                                      newMods[modIdx].chapters[chapIdx].lessons[lesIdx].materials[0].resourceUrl =
                                        e.target.value;
                                      setModules(newMods);
                                    }
                                  }}
                                  placeholder="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4 or YouTube link"
                                  className="w-full px-2.5 py-1.5 bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] rounded text-xs text-[#2D332D] dark:text-white font-mono"
                                />
                              </div>
                            )}

                            {/* Lesson Summary / Transcript */}
                            <div className="space-y-1">
                              <label className="text-[11px] font-semibold text-[#586358] dark:text-[#B5BEB6]">
                                {isVideo ? 'Lecture Transcript & Key Timestamps' : 'Lesson Content / Syllabus Text'}
                              </label>
                              <textarea
                                rows={2}
                                value={mat?.content || les.summary}
                                onChange={(e) => {
                                  const newMods = [...modules];
                                  const val = e.target.value;
                                  newMods[modIdx].chapters[chapIdx].lessons[lesIdx].summary = val;
                                  if (newMods[modIdx].chapters[chapIdx].lessons[lesIdx].materials[0]) {
                                    newMods[modIdx].chapters[chapIdx].lessons[lesIdx].materials[0].content = val;
                                  }
                                  setModules(newMods);
                                }}
                                placeholder="Lecture notes, topics, or timestamps..."
                                className="w-full p-2 bg-white dark:bg-[#1C231E] border border-[#E5E1D8] dark:border-[#2B352E] rounded-lg text-[#2D332D] dark:text-white text-xs leading-relaxed"
                              />
                            </div>
                          </div>
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

      {/* Save Action Footer */}
      <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-4 shadow-xs flex items-center justify-between">
        <div className="text-xs text-[#6D756D] dark:text-[#B5BEB6] flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-[#588157]" />
          <span>Publishing broadcasts real-time alerts to students.</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave('DRAFT')}
            className="px-4 py-2 border border-[#E5E1D8] dark:border-[#2B352E] hover:bg-[#F9F7F2] dark:hover:bg-[#252E26] text-[#2D332D] dark:text-[#E8EDEA] rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSave('PUBLISHED')}
            className="px-6 py-2 bg-[#343F35] hover:bg-[#262E27] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4 text-[#A3B18A]" />
            Publish Curriculum & Notify Students
          </button>
        </div>
      </div>
    </div>
  );
};
