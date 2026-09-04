import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  Clock,
  User,
  Paperclip,
  Save,
  Filter,
  X,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { AssignmentSubmission, Assignment } from '../../types';

export const GradingCenterView: React.FC = () => {
  const { currentUser } = useAuth();
  const { submissions, assignments, courses, gradeSubmission } = useLearning();

  const [selectedCourseFilter, setSelectedCourseFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeGradingSubmission, setActiveGradingSubmission] = useState<AssignmentSubmission | null>(null);

  // Grade inputs
  const [scoreInput, setScoreInput] = useState<number>(0);
  const [feedbackInput, setFeedbackInput] = useState<string>('');

  const filteredSubmissions = submissions.filter((sub) => {
    const assignment = assignments.find((a) => a.id === sub.assignmentId);
    const matchesCourse =
      selectedCourseFilter === 'ALL' || assignment?.courseId === selectedCourseFilter;
    const matchesStatus =
      selectedStatusFilter === 'ALL' || sub.status === selectedStatusFilter;
    return matchesCourse && matchesStatus;
  });

  const handleOpenGrading = (sub: AssignmentSubmission) => {
    setActiveGradingSubmission(sub);
    const assignment = assignments.find((a) => a.id === sub.assignmentId);
    setScoreInput(sub.score || assignment?.maxScore || 100);
    setFeedbackInput(sub.feedback || '');
  };

  const handleSaveGrade = () => {
    if (!activeGradingSubmission) return;
    gradeSubmission(
      activeGradingSubmission.id,
      scoreInput,
      feedbackInput.trim()
    );
    setActiveGradingSubmission(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
              Academic Evaluation
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Faculty Grading Center & Rubrics
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Review student coursework submissions, assign criteria scores, and author pedagogical feedback.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-stone-300 rounded-lg bg-stone-50 text-stone-800"
            >
              <option value="ALL">All Courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-stone-300 rounded-lg bg-stone-50 text-stone-800"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Needs Grading (Pending)</option>
              <option value="GRADED">Graded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="divide-y divide-stone-100">
          {filteredSubmissions.map((sub) => {
            const assignment = assignments.find((a) => a.id === sub.assignmentId);
            const course = courses.find((c) => c.id === assignment?.courseId);

            return (
              <div
                key={sub.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sub.status === 'GRADED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {sub.status}
                    </span>
                    <h4 className="font-bold text-sm text-stone-900 font-serif">
                      {assignment?.title}
                    </h4>
                  </div>
                  <div className="text-xs text-stone-500">
                    Course: <span className="text-stone-800 font-medium">{course?.title}</span> • Student: <span className="text-stone-800 font-medium">{sub.studentName}</span>
                  </div>
                  <div className="text-[11px] text-stone-400">
                    Submitted on {new Date(sub.submittedAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {sub.status === 'GRADED' ? (
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-emerald-800">
                        {sub.score} / {assignment?.maxScore} pts
                      </div>
                      <button
                        onClick={() => handleOpenGrading(sub)}
                        className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                      >
                        Edit Grade
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenGrading(sub)}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <FileCheck className="w-3.5 h-3.5" /> Grade Submission
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="p-12 text-center text-xs text-stone-500">
            No student submissions match the active filters.
          </div>
        )}
      </div>

      {/* Grading Modal */}
      {activeGradingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                  Faculty Assessment Panel
                </span>
                <h3 className="text-base font-bold font-serif text-stone-900 mt-1">
                  Evaluating {activeGradingSubmission.userName}
                </h3>
              </div>
              <button
                onClick={() => setActiveGradingSubmission(null)}
                className="text-stone-400 hover:text-stone-600 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-700 flex-1">
              <div>
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">
                  Student's Written Submission
                </h4>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 font-mono text-xs text-stone-900 whitespace-pre-wrap leading-relaxed">
                  {activeGradingSubmission.content}
                </div>
                {activeGradingSubmission.attachmentName && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-600">
                    <Paperclip className="w-3.5 h-3.5 text-stone-400" />
                    <span>Attachment: {activeGradingSubmission.attachmentName}</span>
                  </div>
                )}
              </div>

              {/* Score Input */}
              <div className="space-y-1">
                <label className="font-bold text-stone-900 text-xs">
                  Awarded Score (Points out of{' '}
                  {assignments.find((a) => a.id === activeGradingSubmission.assignmentId)
                    ?.maxScore || 100}
                  )
                </label>
                <input
                  type="number"
                  value={scoreInput}
                  onChange={(e) => setScoreInput(Number(e.target.value))}
                  className="w-32 px-3 py-1.5 border border-stone-300 rounded-lg text-sm font-bold font-mono text-stone-900 focus:ring-2 focus:ring-amber-700"
                />
              </div>

              {/* Feedback Input */}
              <div className="space-y-1">
                <label className="font-bold text-stone-900 text-xs">
                  Faculty Pedagogical Feedback & Constructive Critique
                </label>
                <textarea
                  rows={4}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  placeholder="Provide precise architectural comments, code quality feedback, and areas for improvement..."
                  className="w-full p-3 border border-stone-300 rounded-lg text-xs text-stone-800 font-sans focus:ring-2 focus:ring-amber-700"
                />
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveGradingSubmission(null)}
                className="px-3.5 py-1.5 border border-stone-300 rounded-lg text-xs text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGrade}
                className="px-5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Save className="w-3.5 h-3.5" /> Save & Release Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
