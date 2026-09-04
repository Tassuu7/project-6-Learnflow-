import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { Quiz, QuizAttempt, Question } from '../../types';

export const StudentQuizView: React.FC = () => {
  const { currentUser } = useAuth();
  const { quizzes, quizAttempts, courses, submitQuiz, setIsQuizActive } = useLearning();

  const [selectedQuizId, setSelectedQuizId] = useState<string>(quizzes[0]?.id || '');
  const [activeAttempt, setActiveAttempt] = useState<QuizAttempt | null>(null);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);

  // Active quiz session answers state
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);

  const activeQuiz = quizzes.find((q) => q.id === selectedQuizId) || quizzes[0];
  const activeCourse = courses.find((c) => c.id === activeQuiz?.courseId);

  // Ensure AI lock is released when unmounting
  useEffect(() => {
    return () => {
      setIsQuizActive(false);
    };
  }, [setIsQuizActive]);

  // Past attempts for this quiz
  const userAttempts = quizAttempts.filter(
    (a) => a.quizId === activeQuiz?.id && a.userId === currentUser?.id
  );
  const latestAttempt = userAttempts[0] || null;

  const handleStartQuiz = () => {
    setUserAnswers({});
    setActiveAttempt(null);
    setIsTakingQuiz(true);
    setIsQuizActive(true);
  };

  const handleSelectOption = (questionId: string, optionIndex: number, isMulti: boolean) => {
    if (isMulti) {
      const currentList: number[] = userAnswers[questionId] || [];
      if (currentList.includes(optionIndex)) {
        setUserAnswers({
          ...userAnswers,
          [questionId]: currentList.filter((i) => i !== optionIndex),
        });
      } else {
        setUserAnswers({
          ...userAnswers,
          [questionId]: [...currentList, optionIndex],
        });
      }
    } else {
      setUserAnswers({
        ...userAnswers,
        [questionId]: optionIndex,
      });
    }
  };

  const handleTextAnswerChange = (questionId: string, text: string) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: text,
    });
  };

  const handleSubmit = async () => {
    if (!activeQuiz) return;
    setSubmitting(true);
    try {
      const attempt = await submitQuiz(activeQuiz.id, userAnswers);
      setActiveAttempt(attempt);
      setIsTakingQuiz(false);
      setIsQuizActive(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Selector */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Academic Assessment Engine
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Course Quizzes & Knowledge Checks
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Comprehensive assessments with auto-grading, diagnostic feedback, and offline replay validation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-stone-600">Select Quiz:</label>
            <select
              value={selectedQuizId}
              onChange={(e) => {
                setSelectedQuizId(e.target.value);
                setIsTakingQuiz(false);
                setActiveAttempt(null);
              }}
              className="px-3 py-1.5 text-xs font-semibold border border-stone-300 rounded-lg bg-stone-50 text-stone-900 focus:ring-2 focus:ring-emerald-700"
            >
              {quizzes.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeQuiz ? (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
          {!isTakingQuiz && !activeAttempt ? (
            /* Quiz Overview Screen */
            <div className="max-w-2xl mx-auto py-6 space-y-6">
              <div className="text-center">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  {activeCourse?.title}
                </span>
                <h3 className="text-2xl font-bold font-serif text-stone-900 mt-1">
                  {activeQuiz.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {activeQuiz.description}
                </p>
              </div>

              {/* Quiz metadata rules */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <div>
                  <div className="text-xs text-stone-500">Time Limit</div>
                  <div className="text-sm font-bold text-stone-900 font-mono mt-0.5">
                    {activeQuiz.timeLimitMinutes} mins
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Passing Score</div>
                  <div className="text-sm font-bold text-stone-900 font-mono mt-0.5">
                    {activeQuiz.passingScorePercentage}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-stone-500">Questions</div>
                  <div className="text-sm font-bold text-stone-900 font-mono mt-0.5">
                    {activeQuiz.questions.length} items
                  </div>
                </div>
              </div>

              {/* Latest Attempt Review if available */}
              {latestAttempt && (
                <div
                  className={`p-4 rounded-xl border ${
                    latestAttempt.passed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold">
                      {latestAttempt.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-700" />
                      )}
                      Previous Attempt: {latestAttempt.scorePercentage}% (
                      {latestAttempt.passed ? 'PASSED' : 'NOT PASSED'})
                    </div>
                    <span className="text-[11px] text-stone-500">
                      {new Date(latestAttempt.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs mt-1">
                    {latestAttempt.passed
                      ? 'You have satisfied the assessment criteria for certificate credentialing.'
                      : 'You may retake this quiz to achieve the required passing score.'}
                  </p>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  {latestAttempt ? 'Retake Assessment' : 'Begin Assessment'}
                </button>
              </div>
            </div>
          ) : isTakingQuiz ? (
            /* Active Taking Mode */
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    {activeQuiz.title}
                  </h3>
                  <div className="text-xs text-stone-500">
                    Answer all {activeQuiz.questions.length} questions before submitting.
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200 text-xs font-mono font-bold text-stone-800">
                  <Clock className="w-3.5 h-3.5 text-stone-600" />
                  {activeQuiz.timeLimitMinutes}:00
                </div>
              </div>

              {/* Questions list */}
              <div className="space-y-6">
                {activeQuiz.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="border border-stone-200 rounded-xl p-5 bg-stone-50/40 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-bold text-sm text-stone-900 flex items-start gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{q.text}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-200 text-stone-700 shrink-0">
                        {q.points} pts
                      </span>
                    </div>

                    {/* Question Input by Type */}
                    {q.type === 'MULTIPLE_CHOICE' || q.type === 'TRUE_FALSE' ? (
                      <div className="space-y-2 pl-8">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userAnswers[q.id] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectOption(q.id, optIdx, false)}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center gap-3 cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold'
                                  : 'bg-white border-stone-300 hover:bg-stone-100 text-stone-800'
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                  isSelected
                                    ? 'border-emerald-700 bg-emerald-700 text-white'
                                    : 'border-stone-400'
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : q.type === 'MULTIPLE_ANSWER' ? (
                      <div className="space-y-2 pl-8">
                        <div className="text-[11px] text-stone-500 mb-1 italic">
                          (Select all choices that apply)
                        </div>
                        {q.options.map((opt, optIdx) => {
                          const selectedList: number[] = userAnswers[q.id] || [];
                          const isSelected = selectedList.includes(optIdx);
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectOption(q.id, optIdx, true)}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center gap-3 cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold'
                                  : 'bg-white border-stone-300 hover:bg-stone-100 text-stone-800'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                                  isSelected
                                    ? 'bg-emerald-700 border-emerald-700 text-white'
                                    : 'border-stone-400'
                                }`}
                              >
                                {isSelected && '✓'}
                              </div>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      /* FILL_BLANK */
                      <div className="pl-8 pt-1">
                        <input
                          type="text"
                          value={userAnswers[q.id] || ''}
                          onChange={(e) => handleTextAnswerChange(q.id, e.target.value)}
                          placeholder="Type your exact answer here..."
                          className="w-full sm:w-96 px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 bg-white"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit footer */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsTakingQuiz(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs hover:bg-stone-50 cursor-pointer"
                >
                  Cancel & Exit
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Evaluating...' : 'Submit Assessment for Grading'}
                </button>
              </div>
            </div>
          ) : (
            /* Results & Diagnostic Review Screen */
            <div className="space-y-6">
              <div
                className={`p-6 rounded-xl border text-center ${
                  activeAttempt?.passed
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-2 bg-white shadow-xs">
                  {activeAttempt?.passed ? (
                    <Award className="w-6 h-6 text-emerald-700" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-amber-700" />
                  )}
                </div>
                <h3 className="text-xl font-bold font-serif">
                  {activeAttempt?.passed ? 'Assessment Passed!' : 'Review & Practice Recommended'}
                </h3>
                <div className="text-3xl font-extrabold font-mono mt-2">
                  {activeAttempt?.scorePercentage}%
                </div>
                <p className="text-xs mt-1 text-stone-600">
                  Earned {activeAttempt?.earnedPoints} of {activeAttempt?.totalPoints} points (Passing threshold: {activeQuiz.passingScorePercentage}%)
                </p>

                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveAttempt(null);
                      setIsTakingQuiz(false);
                    }}
                    className="px-4 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 hover:bg-stone-50 cursor-pointer"
                  >
                    Back to Overview
                  </button>
                  <button
                    onClick={handleStartQuiz}
                    className="px-4 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>

              {/* Pedagogical Explanation Review */}
              <div className="space-y-4">
                <h4 className="font-bold text-stone-900 text-sm">Detailed Question Diagnostics</h4>
                {activeQuiz.questions.map((q, idx) => {
                  const userAnswer = activeAttempt?.userAnswers[q.id];
                  let isCorrect = false;

                  if (q.type === 'MULTIPLE_CHOICE' || q.type === 'TRUE_FALSE') {
                    isCorrect = userAnswer === q.correctAnswers[0];
                  } else if (q.type === 'MULTIPLE_ANSWER') {
                    if (Array.isArray(userAnswer)) {
                      isCorrect =
                        JSON.stringify([...userAnswer].sort()) ===
                        JSON.stringify([...q.correctAnswers].sort());
                    }
                  } else if (q.type === 'FILL_BLANK') {
                    isCorrect =
                      typeof userAnswer === 'string' &&
                      q.correctTextAnswer &&
                      userAnswer.trim().toLowerCase() === q.correctTextAnswer.trim().toLowerCase();
                  }

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50/40'
                          : 'border-rose-200 bg-rose-50/40'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="font-semibold text-stone-900 flex items-center gap-2">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-700" />
                          )}
                          Question {idx + 1}: {q.text}
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {q.topicTag}
                        </span>
                      </div>

                      <div className="pl-6 text-stone-700">
                        <div>
                          <span className="font-semibold">Your Answer: </span>
                          {q.type === 'FILL_BLANK'
                            ? userAnswer || '(empty)'
                            : Array.isArray(userAnswer)
                            ? userAnswer.map((i) => q.options[i]).join(', ')
                            : q.options[userAnswer] || '(no answer)'}
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-800 font-semibold mt-0.5">
                            Correct Solution:{' '}
                            {q.type === 'FILL_BLANK'
                              ? q.correctTextAnswer
                              : q.correctAnswers.map((i) => q.options[i]).join(', ')}
                          </div>
                        )}
                        <div className="mt-2 p-2 rounded bg-white border border-stone-200 text-stone-600 leading-relaxed">
                          <span className="font-semibold text-stone-900">Pedagogical Explanation: </span>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-xs text-stone-500">
          No quizzes configured for your enrolled courses.
        </div>
      )}
    </div>
  );
};
