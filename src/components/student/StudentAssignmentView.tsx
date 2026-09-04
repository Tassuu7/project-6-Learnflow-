import React, { useState } from 'react';
import {
  FileCheck,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Paperclip,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';

export const StudentAssignmentView: React.FC = () => {
  const { currentUser } = useAuth();
  const { assignments, submissions, courses, submitAssignment } = useLearning();

  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>(
    assignments[0]?.id || ''
  );
  const [submissionContent, setSubmissionContent] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [submittedAlert, setSubmittedAlert] = useState(false);

  const activeAssignment =
    assignments.find((a) => a.id === selectedAssignmentId) || assignments[0];
  const activeCourse = courses.find((c) => c.id === activeAssignment?.courseId);

  // Check if current student already submitted
  const userSubmission = submissions.find(
    (s) => s.assignmentId === activeAssignment?.id && s.userId === currentUser?.id
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAssignment || !submissionContent.trim()) return;
    submitAssignment(activeAssignment.id, submissionContent.trim(), attachmentName.trim() || undefined);
    setSubmittedAlert(true);
    setTimeout(() => setSubmittedAlert(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Assignment Selector */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
              Curriculum Coursework & Labs
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Course Assignments & Submissions
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Submit lab code, architectural designs, and review faculty rubrics and feedback.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-stone-600">Select Lab:</label>
            <select
              value={selectedAssignmentId}
              onChange={(e) => {
                setSelectedAssignmentId(e.target.value);
                setSubmittedAlert(false);
              }}
              className="px-3 py-1.5 text-xs font-semibold border border-stone-300 rounded-lg bg-stone-50 text-stone-900 focus:ring-2 focus:ring-emerald-700"
            >
              {assignments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {activeAssignment ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Instructions & Rubric (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div>
              <span className="text-[11px] font-semibold text-emerald-800">
                {activeCourse?.title}
              </span>
              <h3 className="text-lg font-bold font-serif text-stone-900 mt-0.5">
                {activeAssignment.title}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Due: {new Date(activeAssignment.dueDate).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>Max Points: {activeAssignment.maxScore}</span>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Assignment Instructions
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line font-serif">
                {activeAssignment.instructions}
              </p>
            </div>

            <div className="border-t border-stone-100 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Grading Rubric
              </h4>
              <div className="space-y-2">
                {activeAssignment.rubric.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs"
                  >
                    <span className="text-stone-800 font-medium">{r.criterion}</span>
                    <span className="font-mono font-bold text-stone-600">
                      {r.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submission Workspace (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-800" />
              Your Coursework Submission
            </h3>

            {/* If already submitted, show current status and instructor grade */}
            {userSubmission ? (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl border ${
                    userSubmission.status === 'GRADED'
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      Status: {userSubmission.status}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      Submitted: {new Date(userSubmission.submittedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {userSubmission.status === 'GRADED' && (
                    <div className="mt-3 pt-3 border-t border-emerald-200/80">
                      <div className="text-2xl font-bold font-mono text-emerald-950">
                        Score: {userSubmission.score} / {activeAssignment.maxScore}
                      </div>
                      {userSubmission.feedback && (
                        <div className="mt-2 text-xs text-emerald-900 bg-white/80 p-3 rounded-lg border border-emerald-200">
                          <span className="font-bold">Faculty Feedback: </span>
                          {userSubmission.feedback}
                        </div>
                      )}
                      <div className="text-[10px] text-stone-500 mt-1">
                        Graded by {userSubmission.gradedBy} on{' '}
                        {userSubmission.gradedAt &&
                          new Date(userSubmission.gradedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <div className="text-xs font-semibold text-stone-700 mb-1">
                    Submitted Content:
                  </div>
                  <pre className="text-xs text-stone-800 font-mono whitespace-pre-wrap bg-white p-3 rounded-lg border border-stone-200 max-h-60 overflow-y-auto">
                    {userSubmission.content}
                  </pre>
                  {userSubmission.attachmentName && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-600">
                      <Paperclip className="w-3.5 h-3.5 text-stone-400" />
                      <span>Attachment: {userSubmission.attachmentName}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Submission Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {submittedAlert && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    Assignment submitted successfully! Queued for faculty grading.
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Submission Content / Technical Report / Code
                  </label>
                  <textarea
                    rows={10}
                    required
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                    placeholder="Provide your detailed architectural analysis, code implementation, or solution answers..."
                    className="w-full p-3 text-xs border border-stone-300 rounded-lg font-mono focus:ring-2 focus:ring-emerald-700 bg-stone-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Attached Artifact / File Name (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      value={attachmentName}
                      onChange={(e) => setAttachmentName(e.target.value)}
                      placeholder="e.g. sync_queue_engine.ts or diagram.pdf"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Coursework
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-xs text-stone-500">
          No assignments active.
        </div>
      )}
    </div>
  );
};
