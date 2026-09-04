import React from 'react';
import { Bookmark, FileText, Trash2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';

export const StudentNotesView: React.FC<{
  onOpenLesson: (courseId: string) => void;
}> = ({ onOpenLesson }) => {
  const { currentUser } = useAuth();
  const { notes, bookmarks, toggleBookmark, courses } = useLearning();

  const userNotes = notes.filter((n) => n.userId === currentUser?.id);
  const userBookmarks = bookmarks.filter((b) => b.userId === currentUser?.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <h2 className="text-xl font-bold font-serif text-stone-900">
          Personal Notes & Bookmarked Lessons
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Access your private technical study notes and bookmarked curriculum chapters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookmarked Lessons */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-emerald-800" />
            Bookmarked Lessons ({userBookmarks.length})
          </h3>

          {userBookmarks.length === 0 ? (
            <div className="text-center py-8 text-xs text-stone-400">
              No lessons bookmarked yet. Click the bookmark icon in any lesson to pin it here.
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {userBookmarks.map((bm) => {
                const c = courses.find((crs) => crs.id === bm.courseId);
                return (
                  <div
                    key={bm.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-stone-900">{bm.lessonTitle}</div>
                      <div className="text-[11px] text-stone-500">{c?.title || bm.courseId}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenLesson(bm.courseId)}
                        className="px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-800 font-medium cursor-pointer"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => toggleBookmark(bm.courseId, bm.lessonId, bm.lessonTitle)}
                        className="p-1 text-stone-400 hover:text-rose-600 cursor-pointer"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Private Study Notes */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-800" />
            Study Notes ({userNotes.length})
          </h3>

          {userNotes.length === 0 ? (
            <div className="text-center py-8 text-xs text-stone-400">
              No notes written yet. Use the "Private Study Notes" tab in any lesson to document insights.
            </div>
          ) : (
            <div className="space-y-3">
              {userNotes.map((note) => {
                const c = courses.find((crs) => crs.id === note.courseId);
                return (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-stone-900">{note.lessonTitle}</span>
                      <span className="text-stone-400">
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-stone-700 leading-relaxed font-serif whitespace-pre-wrap">
                      {note.content}
                    </p>
                    <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-[10px] text-stone-400">
                      <span>Course: {c?.title}</span>
                      <button
                        onClick={() => onOpenLesson(note.courseId)}
                        className="text-emerald-800 font-semibold hover:underline cursor-pointer"
                      >
                        Go to Lesson →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
