import React, { useState } from 'react';
import {
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Clock,
  Send,
  Code2,
  BookOpen,
  Sparkles,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { UserAvatar } from '../common/UserAvatar';

export const StudentDoubtsView: React.FC<{
  onOpenCourse?: (courseId: string) => void;
}> = ({ onOpenCourse }) => {
  const { currentUser } = useAuth();
  const { courses, doubts, askDoubt } = useLearning();

  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [chapterTitle, setChapterTitle] = useState<string>('');
  const [questionText, setQuestionText] = useState<string>('');
  const [codeSnippet, setCodeSnippet] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('ALL');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Student's doubts
  const myDoubts = doubts.filter((d) => d.studentId === currentUser?.id);
  const filteredDoubts = myDoubts.filter((d) => {
    if (filterStatus === 'ALL') return true;
    return d.status === filterStatus;
  });

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId || !questionText.trim()) return;

    setIsSubmitting(true);
    try {
      await askDoubt(
        selectedCourseId,
        chapterTitle.trim() || 'General Curriculum Concept',
        questionText.trim(),
        codeSnippet.trim() || undefined
      );

      setQuestionText('');
      setCodeSnippet('');
      setChapterTitle('');
      setSuccessMessage('Your question has been sent directly to your course faculty!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#588157] text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5 text-[#588157]" />
              Direct Faculty Mentorship & Doubts Solver
            </div>
            <h1 className="text-xl font-bold text-[#1F241F] mt-1">
              Ask Faculty & Academic Doubts
            </h1>
            <p className="text-xs text-[#6D756D] mt-0.5 max-w-2xl">
              Post questions on Python, Java, DBMS, or ML concepts directly to your course faculty.
              Your professors provide in-depth solutions, code reviews, and direct academic feedback.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#E8EDEA]/50 px-3.5 py-2 rounded-xl border border-[#A3B18A]/40">
            <UserAvatar name={currentUser?.name || 'Student'} role="STUDENT" size="sm" />
            <div>
              <div className="text-xs font-bold text-[#1F241F]">{currentUser?.name}</div>
              <div className="text-[10px] text-[#588157] font-medium">
                {myDoubts.filter((d) => d.status === 'RESOLVED').length} of {myDoubts.length} Doubts Solved
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Ask Question Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs sticky top-20">
            <h2 className="text-sm font-bold text-[#1F241F] flex items-center gap-2 pb-3 border-b border-[#F0EDE6]">
              <HelpCircle className="w-4 h-4 text-[#588157]" />
              Submit Question to Faculty
            </h2>

            {successMessage && (
              <div className="mt-3 p-3 rounded-xl bg-[#E8EDEA] border border-[#A3B18A] text-[#1F241F] text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#588157] shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#586358] uppercase tracking-wider mb-1">
                  Select Course / Subject *
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E1D8] rounded-xl bg-[#F9F7F2] text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
                  required
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.subject})
                    </option>
                  ))}
                </select>
                {selectedCourse && (
                  <p className="text-[10px] text-[#A3B18A] mt-1 font-medium">
                    Faculty: {selectedCourse.instructorName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#586358] uppercase tracking-wider mb-1">
                  Chapter or Topic
                </label>
                <input
                  type="text"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  placeholder="e.g. Chapter 1: Dynamic Typing or Joins"
                  className="w-full px-3 py-2 text-xs border border-[#E5E1D8] rounded-xl text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#586358] uppercase tracking-wider mb-1">
                  Your Question / Doubt *
                </label>
                <textarea
                  rows={4}
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Describe what concept or problem you are stuck on..."
                  className="w-full px-3 py-2 text-xs border border-[#E5E1D8] rounded-xl text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#586358] uppercase tracking-wider mb-1">
                  Optional Code Snippet / Error
                </label>
                <textarea
                  rows={3}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="Paste relevant code or error messages here..."
                  className="w-full px-3 py-2 text-xs font-mono border border-[#E5E1D8] rounded-xl text-[#2D332D] bg-[#F9F7F2] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-[#4A5D4E] hover:bg-[#343F35] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Sending to Faculty...' : 'Submit Question to Faculty'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: List of Doubts & Faculty Answers */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E1D8]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1F241F]">My Questions ({myDoubts.length})</span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#E8EDEA]/40 p-1 rounded-xl border border-[#E5E1D8]">
              {(['ALL', 'PENDING', 'RESOLVED'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    filterStatus === tab
                      ? 'bg-white text-[#1F241F] shadow-xs font-semibold'
                      : 'text-[#6D756D] hover:text-[#1F241F]'
                  }`}
                >
                  {tab === 'ALL' ? 'All' : tab === 'PENDING' ? 'Pending' : 'Solved'}
                </button>
              ))}
            </div>
          </div>

          {filteredDoubts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E1D8] p-12 text-center">
              <MessageCircle className="w-10 h-10 text-[#A3B18A] mx-auto mb-3" />
              <h3 className="font-bold text-sm text-[#1F241F]">No Questions Found</h3>
              <p className="text-xs text-[#6D756D] mt-1 max-w-sm mx-auto">
                {filterStatus === 'ALL'
                  ? 'You have not submitted any questions yet. Use the form on the left to ask your faculty about Python, Java, DBMS, or ML!'
                  : `No questions currently in "${filterStatus}" status.`}
              </p>
            </div>
          ) : (
            filteredDoubts.map((doubt) => (
              <div
                key={doubt.id}
                className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs space-y-4 transition-all hover:border-[#A3B18A]"
              >
                {/* Doubt Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0EDE6]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E8EDEA] text-[#343F35] border border-[#A3B18A]/40">
                      {doubt.courseTitle}
                    </span>
                    {doubt.chapterTitle && (
                      <span className="text-xs text-[#6D756D] font-medium">
                        • {doubt.chapterTitle}
                      </span>
                    )}
                  </div>

                  <div>
                    {doubt.status === 'RESOLVED' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E8EDEA] text-[#2E3B31] border border-[#A3B18A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#588157]" />
                        Solved by Faculty
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FDF8EE] text-[#8C6019] border border-[#F2CC8F]">
                        <Clock className="w-3.5 h-3.5 text-[#B27D26]" />
                        Pending Faculty Response
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Content */}
                <div>
                  <div className="text-xs font-bold text-[#586358] uppercase tracking-wider mb-1">
                    Your Question:
                  </div>
                  <p className="text-xs text-[#1F241F] leading-relaxed whitespace-pre-line font-medium">
                    {doubt.question}
                  </p>
                  {doubt.codeSnippet && (
                    <div className="mt-2 p-3 bg-[#1F241F] rounded-xl text-[11px] font-mono text-[#DDE5B6] overflow-x-auto border border-[#343F35]">
                      <pre>{doubt.codeSnippet}</pre>
                    </div>
                  )}
                  <div className="text-[10px] text-[#A3B18A] mt-2 font-mono">
                    Asked on {new Date(doubt.createdAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {/* Faculty Solution Block */}
                {doubt.status === 'RESOLVED' && doubt.answer ? (
                  <div className="p-4 rounded-xl bg-[#E8EDEA]/50 border border-[#A3B18A] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserAvatar name={doubt.facultyName} role="INSTRUCTOR" size="xs" />
                        <div>
                          <div className="text-xs font-bold text-[#1F241F]">
                            {doubt.facultyName} (Course Faculty)
                          </div>
                          <div className="text-[10px] text-[#588157] font-medium">
                            Verified Faculty Solution & Guidance
                          </div>
                        </div>
                      </div>
                      {doubt.answeredAt && (
                        <span className="text-[10px] text-[#6D756D] font-mono">
                          {new Date(doubt.answeredAt).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#2D332D] leading-relaxed whitespace-pre-line pt-1 border-t border-[#A3B18A]/30">
                      {doubt.answer}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-[#FDF8EE] border border-[#F2CC8F]/60 text-xs text-[#8C6019] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B27D26] shrink-0" />
                    <span>
                      Assigned to <strong>{doubt.facultyName}</strong>. You will receive an in-app notification when the solution is posted.
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
