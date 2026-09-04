import React from 'react';
import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Award,
  Download,
  FileSpreadsheet,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { detectWeakTopics, calculateEngagementRisk } from '../../services/aiEngine';

export const StudentAnalytics: React.FC = () => {
  const { currentUser } = useAuth();
  const { enrollments, courses, quizAttempts, quizzes } = useLearning();

  const userEnrollments = enrollments.filter((e) => e.userId === currentUser?.id);
  const primaryEnrollment = userEnrollments[0];

  // AI Diagnostic Metrics
  const weakTopics = currentUser
    ? detectWeakTopics(currentUser.id, quizAttempts, quizzes)
    : [];
  const riskIndicator = calculateEngagementRisk(primaryEnrollment, currentUser || undefined, quizAttempts);

  const totalStudyMinutes = userEnrollments.reduce((acc, e) => acc + e.timeSpentMinutes, 0);
  const totalLessonsDone = userEnrollments.reduce((acc, e) => acc + e.completedLessons.length, 0);

  const exportProgressCSV = () => {
    const rows = [
      ['Course Title', 'Category', 'Completed Lessons', 'Time Spent (Minutes)', 'Status'],
      ...userEnrollments.map((e) => {
        const c = courses.find((course) => course.id === e.courseId);
        return [
          `"${c?.title || e.courseId}"`,
          c?.category || 'General',
          e.completedLessons.length,
          e.timeSpentMinutes,
          e.completedAt ? 'Completed' : 'In Progress',
        ];
      }),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((r) => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LearnFlow_Student_Report_${currentUser?.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Pedagogical Data Science
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Learning Analytics & Concept Mastery
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Personalized concept diagnostics, engagement velocity indicators, and study telemetry.
            </p>
          </div>

          <button
            onClick={exportProgressCSV}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start md:self-auto"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> Export Progress Report (CSV)
          </button>
        </div>
      </div>

      {/* Engagement & Study Velocity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Study Velocity
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900 mt-1">
            {(totalStudyMinutes / 60).toFixed(1)} Hours
          </div>
          <div className="text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            {totalLessonsDone} lessons completed across all curricula
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Average Assessment Score
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 mt-1">
            {quizAttempts.length > 0
              ? `${Math.round(
                  quizAttempts.reduce((acc, a) => acc + a.scorePercentage, 0) /
                    quizAttempts.length
                )}%`
              : '90%'}
          </div>
          <div className="text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            Evaluated on official course quizzes
          </div>
        </div>

        {/* Engagement Risk Indicator */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Engagement Momentum
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  riskIndicator.level === 'LOW'
                    ? 'bg-emerald-100 text-emerald-800'
                    : riskIndicator.level === 'MEDIUM'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {riskIndicator.level} RISK
              </span>
            </div>
            <div className="text-sm font-bold text-stone-900 mt-2">
              Momentum Index: {100 - riskIndicator.score}/100
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              {riskIndicator.reasons[0] || 'Steady participation cadence recorded.'}
            </p>
          </div>
        </div>
      </div>

      {/* Weak Topic Concept Diagnostic Grid */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-800" />
            AI Weak-Topic Concept Diagnostic Breakdown
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Computed by analyzing your question responses across multiple quiz attempts and rubric criteria.
          </p>
        </div>

        <div className="divide-y divide-stone-100">
          {weakTopics.map((topic, i) => (
            <div key={i} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-stone-900">{topic.topic}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      topic.proficiency === 'STRONG'
                        ? 'bg-emerald-100 text-emerald-800'
                        : topic.proficiency === 'MODERATE'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {topic.proficiency.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-[11px] text-stone-500 leading-relaxed">
                  {topic.recommendationNote}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="w-32 bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${
                      topic.proficiency === 'STRONG'
                        ? 'bg-emerald-700'
                        : topic.proficiency === 'MODERATE'
                        ? 'bg-amber-700'
                        : 'bg-rose-700'
                    }`}
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-stone-800 w-10 text-right">
                  {topic.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
