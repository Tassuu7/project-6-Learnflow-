import React, { useState } from 'react';
import { useLearning } from '../../context/LearningContext';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  XCircle,
  BookOpen,
  User,
  Layers,
  FileText,
  AlertCircle,
  Eye,
} from 'lucide-react';

export const AdminCourseApprovalsView: React.FC<{
  onNavigate?: (tab: string, contextId?: string) => void;
}> = ({ onNavigate }) => {
  const { courses, approveCourse, rejectCourse, broadcastNotification } = useLearning();

  const [reviewNote, setReviewNote] = useState<Record<string, string>>({});
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const pendingCourses = courses.filter(
    (c) => c.status === 'SUBMITTED' || c.status === 'DRAFT'
  );

  const handleApprove = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    approveCourse(courseId, reviewNote[courseId] || 'Curriculum passed academic quality standards.');
    if (course) {
      broadcastNotification({
        title: `Course Approved & Live: ${course.title}`,
        message: `The syllabus for "${course.title}" has been verified and released to the catalog.`,
        type: 'COURSE',
        actionUrl: 'catalog',
      });
    }
  };

  const handleReject = (courseId: string) => {
    rejectCourse(
      courseId,
      reviewNote[courseId] || 'Please expand chapter lesson summaries and specify prerequisite competencies.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#343F35] dark:text-[#DDE5B6] bg-[#E8EDEA] dark:bg-[#252E26] px-2.5 py-0.5 rounded-full border border-[#A3B18A]/40">
              Academic Governance
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F241F] dark:text-white mt-1.5">
              Course Verification & Quality Approvals
            </h2>
            <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] mt-0.5">
              Review curricula submitted by faculty, verify academic standards, and publish verified courses to scholars.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#E8EDEA] dark:bg-[#252E26] text-[#343F35] dark:text-[#DDE5B6] rounded-xl text-xs font-bold border border-[#A3B18A]/40">
              {pendingCourses.length} Pending Review
            </span>
          </div>
        </div>
      </div>

      {/* Pending Courses List */}
      <div className="space-y-4">
        {pendingCourses.length === 0 ? (
          <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-12 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-[#588157] mx-auto" />
            <h3 className="font-bold text-sm text-[#1F241F] dark:text-white">
              All Submitted Curricula Verified
            </h3>
            <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] max-w-md mx-auto">
              There are no courses waiting in the approval queue. New submissions from instructors will appear here automatically.
            </p>
          </div>
        ) : (
          pendingCourses.map((c) => {
            const totalLessons = c.modules.reduce(
              (acc, m) => acc + m.chapters.reduce((a, ch) => a + ch.lessons.length, 0),
              0
            );

            return (
              <div
                key={c.id}
                className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-[#588157] bg-[#E8EDEA] dark:bg-[#252E26] px-2 py-0.5 rounded">
                        {c.category}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FDF8EE] text-[#8C6019] border border-[#F2CC8F]">
                        Status: {c.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1F241F] dark:text-white">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] leading-relaxed">
                      {c.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="text-right text-xs shrink-0 space-y-1">
                    <div className="font-semibold text-[#1F241F] dark:text-white flex items-center gap-1.5 justify-end">
                      <User className="w-3.5 h-3.5 text-[#588157]" />
                      {c.instructorName}
                    </div>
                    <div className="text-[#6D756D] dark:text-[#8E9A8F]">
                      {c.modules.length} modules • {totalLessons} lessons • {c.estimatedHours}h
                    </div>
                  </div>
                </div>

                {/* Review Notes Input */}
                <div className="p-3.5 rounded-xl bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] space-y-2">
                  <label className="text-[11px] font-semibold text-[#2D332D] dark:text-[#E8EDEA] block">
                    Institutional Feedback / Review Decision Notes:
                  </label>
                  <input
                    type="text"
                    value={reviewNote[c.id] || ''}
                    onChange={(e) =>
                      setReviewNote({ ...reviewNote, [c.id]: e.target.value })
                    }
                    placeholder="Enter approval note or specific revisions required by faculty..."
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#1C231E] border border-[#E5E1D8] dark:border-[#2B352E] rounded-lg text-xs text-[#2D332D] dark:text-white"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#F0EDE6] dark:border-[#2B352E]">
                  <button
                    onClick={() => handleReject(c.id)}
                    className="px-4 py-2 border border-[#E5E1D8] dark:border-[#2B352E] hover:bg-[#F9F7F2] dark:hover:bg-[#252E26] text-[#E2725B] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <XCircle className="w-4 h-4" /> Request Revisions
                  </button>

                  <button
                    onClick={() => handleApprove(c.id)}
                    className="px-5 py-2 bg-[#343F35] hover:bg-[#262E27] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#A3B18A]" /> Approve & Publish Live
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
