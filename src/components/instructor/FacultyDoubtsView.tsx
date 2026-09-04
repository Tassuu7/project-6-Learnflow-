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
  UserCheck,
  Edit3,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { UserAvatar } from '../common/UserAvatar';

export const FacultyDoubtsView: React.FC = () => {
  const { currentUser } = useAuth();
  const { doubts, courses, answerDoubt } = useLearning();

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('PENDING');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('ALL');
  const [answeringDoubtId, setAnsweringDoubtId] = useState<string | null>(null);
  const [answerDraft, setAnswerDraft] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Doubts assigned to this faculty or all platform doubts if viewing general desk
  const relevantDoubts = doubts.filter((d) => {
    // If instructor has specific courses, show their courses or all
    const matchesCourse = selectedCourseFilter === 'ALL' || d.courseId === selectedCourseFilter;
    const matchesStatus = activeFilter === 'ALL' || d.status === activeFilter;
    return matchesCourse && matchesStatus;
  });

  const pendingCount = doubts.filter((d) => d.status === 'PENDING').length;
  const resolvedCount = doubts.filter((d) => d.status === 'RESOLVED').length;

  const handleStartAnswering = (doubtId: string, currentAnswer?: string) => {
    setAnsweringDoubtId(doubtId);
    setAnswerDraft(currentAnswer || '');
  };

  const handleSaveAnswer = (doubtId: string) => {
    if (!answerDraft.trim()) return;
    answerDoubt(doubtId, answerDraft.trim());
    setAnsweringDoubtId(null);
    setAnswerDraft('');
    setSuccessToast('Solution dispatched to student and marked as Solved!');
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#B27D26] text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5 text-[#B27D26]" />
              Faculty Academic Mentorship & Doubts Solver
            </div>
            <h1 className="text-xl font-bold text-[#1F241F] mt-1">
              Student Questions & Doubt Resolution Desk
            </h1>
            <p className="text-xs text-[#6D756D] mt-0.5 max-w-2xl">
              Solve questions submitted by students studying your Python, Java, DBMS, and ML curriculums.
              Post technical explanations and code solutions to clear conceptual blockers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FDF8EE] rounded-xl border border-[#F2CC8F] text-center min-w-[90px]">
              <div className="text-lg font-bold text-[#8C6019] leading-none">{pendingCount}</div>
              <div className="text-[10px] text-[#6D756D] font-medium uppercase mt-1">Pending</div>
            </div>
            <div className="p-3 bg-[#E8EDEA] rounded-xl border border-[#A3B18A] text-center min-w-[90px]">
              <div className="text-lg font-bold text-[#2E3B31] leading-none">{resolvedCount}</div>
              <div className="text-[10px] text-[#6D756D] font-medium uppercase mt-1">Solved</div>
            </div>
          </div>
        </div>
      </div>

      {successToast && (
        <div className="p-3.5 rounded-xl bg-[#E8EDEA] border border-[#A3B18A] text-[#1F241F] text-xs flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-[#588157] shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-[#F9F7F2] p-1 rounded-xl border border-[#E5E1D8]">
          {(['PENDING', 'RESOLVED', 'ALL'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeFilter === status
                  ? 'bg-white text-[#1F241F] shadow-xs font-semibold'
                  : 'text-[#6D756D] hover:text-[#1F241F]'
              }`}
            >
              {status === 'PENDING' ? `Pending (${pendingCount})` : status === 'RESOLVED' ? `Solved (${resolvedCount})` : 'All Questions'}
            </button>
          ))}
        </div>

        {/* Course Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[#586358]">Filter Course:</label>
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium border border-[#E5E1D8] rounded-xl bg-[#F9F7F2] text-[#2D332D] focus:outline-hidden focus:ring-2 focus:ring-[#4A5D4E]"
          >
            <option value="ALL">All Subjects (Python, Java, DBMS, ML)</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {relevantDoubts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-12 text-center">
            <CheckCircle2 className="w-10 h-10 text-[#588157] mx-auto mb-3" />
            <h3 className="font-bold text-sm text-[#1F241F]">Inbox Zero! No Questions in this Filter</h3>
            <p className="text-xs text-[#6D756D] mt-1 max-w-sm mx-auto">
              All student inquiries in this category have been answered and resolved.
            </p>
          </div>
        ) : (
          relevantDoubts.map((doubt) => {
            const isEditing = answeringDoubtId === doubt.id;
            return (
              <div
                key={doubt.id}
                className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs space-y-4 hover:border-[#A3B18A] transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0EDE6]">
                  <div className="flex items-center gap-2.5">
                    <UserAvatar name={doubt.studentName} role="STUDENT" size="sm" />
                    <div>
                      <div className="text-xs font-bold text-[#1F241F]">
                        {doubt.studentName}
                      </div>
                      <div className="text-[10px] text-[#6D756D]">
                        Student Scholar • Asked on {new Date(doubt.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E8EDEA] text-[#343F35] border border-[#A3B18A]/40">
                      {doubt.courseTitle}
                    </span>
                    {doubt.status === 'RESOLVED' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E8EDEA] text-[#2E3B31] border border-[#A3B18A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#588157]" />
                        Solved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FDF8EE] text-[#8C6019] border border-[#F2CC8F]">
                        <Clock className="w-3.5 h-3.5 text-[#B27D26]" />
                        Awaiting Faculty Solution
                      </span>
                    )}
                  </div>
                </div>

                {/* Chapter & Question */}
                <div>
                  {doubt.chapterTitle && (
                    <div className="text-[11px] font-bold text-[#586358] uppercase tracking-wider mb-1">
                      Context: {doubt.chapterTitle}
                    </div>
                  )}
                  <p className="text-xs text-[#1F241F] font-medium leading-relaxed whitespace-pre-line bg-[#F9F7F2] p-3 rounded-xl border border-[#E5E1D8]">
                    {doubt.question}
                  </p>

                  {doubt.codeSnippet && (
                    <div className="mt-2.5 p-3 bg-[#1F241F] rounded-xl text-[11px] font-mono text-[#DDE5B6] overflow-x-auto border border-[#343F35]">
                      <div className="text-[9px] uppercase tracking-wider text-[#A3B18A] font-bold mb-1 font-sans">
                        Student Code Snippet:
                      </div>
                      <pre>{doubt.codeSnippet}</pre>
                    </div>
                  )}
                </div>

                {/* Answer Display or Answer Editor */}
                {isEditing ? (
                  <div className="p-4 rounded-xl bg-[#FDF8EE] border border-[#F2CC8F] space-y-3">
                    <label className="block text-xs font-bold text-[#8C6019] uppercase tracking-wider">
                      Write Faculty Solution & Academic Guidance:
                    </label>
                    <textarea
                      rows={5}
                      value={answerDraft}
                      onChange={(e) => setAnswerDraft(e.target.value)}
                      placeholder="Explain the concept clearly, provide corrected code snippets, and guidance..."
                      className="w-full px-3 py-2 text-xs border border-[#E5E1D8] rounded-xl bg-white text-[#1F241F] focus:outline-hidden focus:ring-2 focus:ring-[#8C6019]"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAnsweringDoubtId(null);
                          setAnswerDraft('');
                        }}
                        className="px-3 py-1.5 text-xs text-[#6D756D] hover:text-[#1F241F] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveAnswer(doubt.id)}
                        className="px-4 py-2 bg-[#4A5D4E] hover:bg-[#343F35] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Submit Solution & Mark as Solved
                      </button>
                    </div>
                  </div>
                ) : doubt.status === 'RESOLVED' && doubt.answer ? (
                  <div className="p-4 rounded-xl bg-[#E8EDEA]/60 border border-[#A3B18A] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserAvatar name={doubt.facultyName} role="INSTRUCTOR" size="xs" />
                        <span className="text-xs font-bold text-[#1F241F]">
                          Your Solution ({doubt.facultyName})
                        </span>
                      </div>
                      <button
                        onClick={() => handleStartAnswering(doubt.id, doubt.answer)}
                        className="text-xs text-[#4A5D4E] hover:text-[#343F35] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit Answer
                      </button>
                    </div>
                    <p className="text-xs text-[#2D332D] leading-relaxed whitespace-pre-line pt-1 border-t border-[#A3B18A]/30">
                      {doubt.answer}
                    </p>
                  </div>
                ) : (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleStartAnswering(doubt.id)}
                      className="px-4 py-2 bg-[#4A5D4E] hover:bg-[#343F35] text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Solve Student Doubt
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
