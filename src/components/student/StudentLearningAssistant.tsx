import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  WifiOff,
  ShieldAlert,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { queryLocalLearningAssistant, AssistantAnswer } from '../../services/aiEngine';

export const StudentLearningAssistant: React.FC<{
  onOpenLesson?: (courseId: string) => void;
}> = ({ onOpenLesson }) => {
  const { courses, isOffline, isQuizActive } = useLearning();

  const [query, setQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('ALL');
  const [conversation, setConversation] = useState<
    {
      id: string;
      sender: 'USER' | 'ASSISTANT';
      text: string;
      answerDetails?: AssistantAnswer;
    }[]
  >([
    {
      id: 'init_msg',
      sender: 'ASSISTANT',
      text: "Hello! I am your online subject learning assistant. Ask me questions about Python, Java, DBMS, or Machine Learning. I provide code explanations, architectural breakdowns, and debugging tips!",
    },
  ]);

  const quickPrompts = [
    'How do decorators work in Python with code examples?',
    'What is the difference between JVM Stack and Heap memory in Java?',
    'Explain Database Normalization: 1NF, 2NF, 3NF, and BCNF.',
    'How do we calculate Precision, Recall, and F1-Score in ML?',
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'USER' as const,
      text: q.trim(),
    };

    setConversation((prev) => [...prev, userMsg]);
    setQuery('');

    // Query local AI engine
    const answer = queryLocalLearningAssistant(
      q.trim(),
      selectedCourseId === 'ALL' ? null : selectedCourseId,
      courses
    );

    setTimeout(() => {
      const botMsg = {
        id: `bot_${Date.now()}`,
        sender: 'ASSISTANT' as const,
        text: answer.answerText,
        answerDetails: answer,
      };
      setConversation((prev) => [...prev, botMsg]);
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              On-Device Natural Language Intelligence
            </div>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Curriculum-Grounded Learning Assistant
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Strictly grounded in your accredited course texts and syllabus modules. Zero external API calls, zero hallucination.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-stone-600">Syllabus Scope:</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-semibold border border-stone-300 rounded-lg bg-stone-50 text-stone-800"
            >
              <option value="ALL">All Enrolled Courses</option>
              {courses
                .filter((c) => c.status === 'PUBLISHED')
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs flex flex-col h-[600px] overflow-hidden">
        {/* Messages list */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {conversation.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'USER' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'USER'
                    ? 'bg-emerald-800 text-white font-medium rounded-br-xs'
                    : 'bg-stone-100 text-stone-800 border border-stone-200 rounded-bl-xs'
                }`}
              >
                {msg.sender === 'ASSISTANT' && (
                  <div className="flex items-center gap-1.5 font-bold text-[10px] text-emerald-800 uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-emerald-700" />
                    LearnFlow Pedagogical Model
                  </div>
                )}

                <div className="whitespace-pre-line font-serif">{msg.text}</div>

                {msg.answerDetails?.sourceCourseTitle && (
                  <div className="mt-3 pt-2 border-t border-stone-200 text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-800">Source: </span>
                    {msg.answerDetails.sourceCourseTitle} • Lesson: {msg.answerDetails.sourceLessonTitle}
                    {msg.answerDetails.suggestedAction && (
                      <div className="text-emerald-800 font-medium mt-1">
                        💡 {msg.answerDetails.suggestedAction}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts & Query Input Footer */}
        {isQuizActive ? (
          <div className="p-6 bg-[#FDF8EE] border-t border-[#F2CC8F] text-center">
            <div className="flex items-center justify-center gap-2 text-[#8C6019] font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-[#B27D26]" />
              Exam Integrity Lock Active
            </div>
            <p className="text-xs text-[#6D756D] max-w-md mx-auto">
              The AI Subject Assistant is strictly disabled during active quiz examinations to prevent interference and maintain evaluation integrity. Please complete your quiz independently.
            </p>
          </div>
        ) : isOffline ? (
          <div className="p-6 bg-[#F4F1EA] border-t border-[#E5E1D8] text-center">
            <div className="flex items-center justify-center gap-2 text-[#2D332D] font-bold text-xs uppercase tracking-wider mb-1">
              <WifiOff className="w-4 h-4 text-[#586358]" />
              Offline Mode Active: Individual Study Policy
            </div>
            <p className="text-xs text-[#6D756D] max-w-md mx-auto">
              In offline mode, the AI chatbot is not permitted to assist with questions. Please study downloaded course materials, notes, and solve questions individually. Reconnect online to restore AI assistance.
            </p>
          </div>
        ) : (
          <>
            {/* Quick Prompts */}
            <div className="p-3 bg-stone-50 border-t border-stone-200 overflow-x-auto flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 shrink-0">
                Suggested:
              </span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white border border-stone-200 hover:border-emerald-700 hover:bg-emerald-50 text-[11px] text-stone-700 font-medium shrink-0 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Query Input Footer */}
            <div className="p-4 bg-white border-t border-stone-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask any Python, Java, DBMS, or ML question..."
                  className="flex-1 px-4 py-2.5 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" /> Ask AI
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
