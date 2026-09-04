import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Clock,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { Quiz, Question, QuestionType } from '../../types';

export const QuizBuilderView: React.FC = () => {
  const { currentUser } = useAuth();
  const { courses, quizzes, createQuiz } = useLearning();

  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);
  const [passingScorePercentage, setPassingScorePercentage] = useState(70);
  const [isOfflinePermitted, setIsOfflinePermitted] = useState(true);

  // Questions state
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: `q_${Date.now()}_1`,
      type: 'MULTIPLE_CHOICE',
      text: 'Which consistency model provides the strongest guarantee in distributed systems?',
      options: [
        'Eventual Consistency',
        'Linearizability (Strict Serializability)',
        'Causal Consistency',
        'Read-After-Write Consistency',
      ],
      correctAnswers: [1],
      explanation: 'Linearizability ensures every read sees the most recent write in global real-time order.',
      points: 10,
      topicTag: 'Distributed Consistency',
    },
  ]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const addQuestion = (type: QuestionType) => {
    const newQ: Question = {
      id: `q_${Date.now()}_${questions.length + 1}`,
      type,
      text: 'New Question Prompt',
      options:
        type === 'TRUE_FALSE'
          ? ['True', 'False']
          : type === 'FILL_BLANK'
          ? []
          : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswers: [0],
      correctTextAnswer: type === 'FILL_BLANK' ? 'keyword' : undefined,
      explanation: 'Explanation for why this is the correct answer.',
      points: 10,
      topicTag: 'Core Concepts',
    };
    setQuestions([...questions, newQ]);
  };

  const handleSave = () => {
    if (!title.trim() || !selectedCourseId) return;

    const quiz: Quiz = {
      id: `quiz_${Date.now()}`,
      courseId: selectedCourseId,
      title: title.trim(),
      description: description.trim(),
      timeLimitMinutes: Number(timeLimitMinutes) || 15,
      passingScorePercentage: Number(passingScorePercentage) || 70,
      maxAttempts: 3,
      isOfflinePermitted,
      questions,
      createdAt: new Date().toISOString(),
    };

    createQuiz(quiz);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
              Assessment Design Suite
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Quiz & Assessment Builder
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Author timed evaluations with diagnostic answer explanations and offline assessment capabilities.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" /> Publish Assessment
          </button>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Quiz saved and published to student syllabus!
          </div>
        )}
      </div>

      {/* Quiz Meta Form */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4 text-xs">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-800" />
          Quiz Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-semibold text-stone-700">Bound Course</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 bg-stone-50"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-700">Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Midterm Evaluation: Consensus & Sharding"
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900 font-serif font-bold text-sm"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="font-semibold text-stone-700">Instructions / Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Instructions for students regarding time limits, passing requirements, etc."
              className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-800"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-700">Time Limit (Minutes)</label>
            <input
              type="number"
              value={timeLimitMinutes}
              onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-stone-700">Passing Threshold (%)</label>
            <input
              type="number"
              value={passingScorePercentage}
              onChange={(e) => setPassingScorePercentage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-stone-900"
            />
          </div>
        </div>
      </div>

      {/* Questions List & Add Buttons */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Assessment Items ({questions.length})
            </h3>
            <p className="text-xs text-stone-500">
              Add multiple choice, multiple answer, true/false, or fill-in-the-blank questions.
            </p>
          </div>

          {/* Question type buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => addQuestion('MULTIPLE_CHOICE')}
              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium cursor-pointer"
            >
              + Multiple Choice
            </button>
            <button
              onClick={() => addQuestion('MULTIPLE_ANSWER')}
              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium cursor-pointer"
            >
              + Multi-Answer
            </button>
            <button
              onClick={() => addQuestion('TRUE_FALSE')}
              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium cursor-pointer"
            >
              + True/False
            </button>
            <button
              onClick={() => addQuestion('FILL_BLANK')}
              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium cursor-pointer"
            >
              + Fill Blank
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, qIdx) => (
            <div
              key={q.id}
              className="p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-4 text-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-bold text-xs uppercase tracking-wider text-stone-500">
                  Item #{qIdx + 1} • {q.type.replace('_', ' ')}
                </span>
                <button
                  onClick={() => setQuestions(questions.filter((_, i) => i !== qIdx))}
                  className="text-stone-400 hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Question Prompt</label>
                <input
                  type="text"
                  value={q.text}
                  onChange={(e) => {
                    const newQs = [...questions];
                    newQs[qIdx].text = e.target.value;
                    setQuestions(newQs);
                  }}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white font-medium text-stone-900"
                />
              </div>

              {/* Options for Choice types */}
              {q.type !== 'FILL_BLANK' ? (
                <div className="space-y-2">
                  <label className="font-semibold text-stone-700">Answer Options & Correct Key</label>
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct_${q.id}`}
                        checked={q.correctAnswers.includes(optIdx)}
                        onChange={() => {
                          const newQs = [...questions];
                          newQs[qIdx].correctAnswers = [optIdx];
                          setQuestions(newQs);
                        }}
                        className="text-emerald-700 focus:ring-emerald-700"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newQs = [...questions];
                          newQs[qIdx].options[optIdx] = e.target.value;
                          setQuestions(newQs);
                        }}
                        className="flex-1 px-2.5 py-1.5 border border-stone-300 rounded bg-white text-stone-900 text-xs"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Expected Text Answer</label>
                  <input
                    type="text"
                    value={q.correctTextAnswer || ''}
                    onChange={(e) => {
                      const newQs = [...questions];
                      newQs[qIdx].correctTextAnswer = e.target.value;
                      setQuestions(newQs);
                    }}
                    placeholder="Exact correct answer string"
                    className="w-full sm:w-80 px-3 py-1.5 border border-stone-300 rounded bg-white text-stone-900"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Topic Diagnostic Tag</label>
                  <input
                    type="text"
                    value={q.topicTag}
                    onChange={(e) => {
                      const newQs = [...questions];
                      newQs[qIdx].topicTag = e.target.value;
                      setQuestions(newQs);
                    }}
                    placeholder="e.g. Consensus Algorithms"
                    className="w-full px-3 py-1.5 border border-stone-300 rounded bg-white text-stone-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Pedagogical Explanation</label>
                  <input
                    type="text"
                    value={q.explanation}
                    onChange={(e) => {
                      const newQs = [...questions];
                      newQs[qIdx].explanation = e.target.value;
                      setQuestions(newQs);
                    }}
                    placeholder="Why this answer is scientifically correct"
                    className="w-full px-3 py-1.5 border border-stone-300 rounded bg-white text-stone-900"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
