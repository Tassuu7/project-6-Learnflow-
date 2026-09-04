import React, { useState } from 'react';
import {
  HardDriveDownload,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import { getOfflineQueue, clearSyncedEvents } from '../../services/syncEngine';

export const StudentOfflineCenter: React.FC<{
  onOpenCourse?: (courseId: string) => void;
}> = ({ onOpenCourse }) => {
  const {
    courses,
    offlinePackages,
    downloadCourseOffline,
    deleteOfflinePackage,
    isOffline,
    setIsOffline,
    syncNow,
    pendingSyncCount,
    lastSyncTime,
  } = useLearning();

  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [syncOutcome, setSyncOutcome] = useState<string | null>(null);

  // Read raw offline queue
  const queue = getOfflineQueue();

  const handleDownload = async (courseId: string) => {
    setDownloadingId(courseId);
    setDownloadProgress(20);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    try {
      await downloadCourseOffline(courseId);
      setDownloadProgress(100);
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setDownloadingId(null);
        setDownloadProgress(0);
      }, 400);
    }
  };

  const handleManualSync = async () => {
    setSyncInProgress(true);
    setSyncOutcome(null);
    try {
      const res = await syncNow();
      if (res.failedCount === 0) {
        setSyncOutcome(`Successfully synced ${res.totalProcessed} pending change(s).`);
      } else {
        setSyncOutcome(`Completed with ${res.failedCount} error(s).`);
      }
    } catch {
      setSyncOutcome('Network exception during synchronization.');
    } finally {
      setSyncInProgress(false);
      setTimeout(() => setSyncOutcome(null), 5000);
    }
  };

  // Calculate total offline storage
  const totalStorageMb = offlinePackages.reduce((acc, p) => acc + p.sizeMb, 0).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Offline-First Architecture
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Offline Learning Center & Sync Engine
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Download complete syllabi, practice without internet connectivity, and reconcile pending actions safely upon reconnection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isOffline
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
              }`}
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-700" />
                  Currently Offline (Click to Reconnect)
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-700" />
                  Currently Online (Click to Go Offline)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Metric overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
            Downloaded Packages
          </div>
          <div className="text-2xl font-bold font-serif text-stone-900 mt-1">
            {offlinePackages.length} Courses
          </div>
          <div className="text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            Storage footprint: <span className="font-semibold text-stone-800">{totalStorageMb} MB</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
            Pending Sync Actions
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 mt-1">
            {pendingSyncCount} Events
          </div>
          <div className="text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            {isOffline ? 'Queued in local storage' : 'All local queues synced with server'}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
              Last State Reconciliation
            </div>
            <div className="text-sm font-semibold text-stone-800 mt-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-stone-400" />
              {lastSyncTime
                ? new Date(lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : 'Not yet synced'}
            </div>
          </div>

          <button
            onClick={handleManualSync}
            disabled={isOffline || syncInProgress || pendingSyncCount === 0}
            className={`mt-3 w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              pendingSyncCount > 0 && !isOffline
                ? 'bg-emerald-800 hover:bg-emerald-700 text-white'
                : 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncInProgress ? 'animate-spin' : ''}`} />
            {syncInProgress ? 'Processing Sync...' : 'Synchronize Pending Events'}
          </button>
        </div>
      </div>

      {syncOutcome && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          {syncOutcome}
        </div>
      )}

      {/* Downloadable Courses Grid */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <HardDriveDownload className="w-5 h-5 text-emerald-800" />
          Available Offline Curriculum Packages
        </h3>
        <p className="text-xs text-stone-500">
          Curriculum packages include full module text, transcripts, quizzes, rubrics, and offline schemas.
        </p>

        <div className="divide-y divide-stone-100">
          {courses
            .filter((c) => c.status === 'PUBLISHED')
            .map((course) => {
              const isDownloaded = offlinePackages.some((p) => p.courseId === course.id);
              const isDownloading = downloadingId === course.id;

              return (
                <div
                  key={course.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700">
                        {course.category}
                      </span>
                      <h4 className="font-bold text-sm text-stone-900 font-serif">
                        {course.title}
                      </h4>
                    </div>
                    <div className="text-xs text-stone-500 mt-1 flex items-center gap-3">
                      <span>Package Size: ~{course.packageSizeMb} MB</span>
                      <span>•</span>
                      <span>Instructor: {course.instructorName}</span>
                    </div>

                    {isDownloading && (
                      <div className="mt-2 w-48 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-700 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isDownloaded ? (
                      <>
                        <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          Downloaded
                        </span>
                        {onOpenCourse && (
                          <button
                            onClick={() => onOpenCourse(course.id)}
                            className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium cursor-pointer"
                          >
                            Open
                          </button>
                        )}
                        <button
                          onClick={() => deleteOfflinePackage(course.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 rounded cursor-pointer"
                          title="Delete local package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : course.isOfflineAvailable ? (
                      <button
                        onClick={() => handleDownload(course.id)}
                        disabled={isDownloading || isOffline}
                        className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <HardDriveDownload className="w-3.5 h-3.5" />
                        {isDownloading ? `Downloading ${downloadProgress}%` : 'Download Package'}
                      </button>
                    ) : (
                      <span className="text-xs text-stone-400 italic">
                        Online Only (Live lab requirement)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Offline Event Queue Inspector */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Offline Activity Queue Inspector
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Review idempotent events queued locally on this device before upload.
            </p>
          </div>
          {queue.length > 0 && (
            <button
              onClick={() => clearSyncedEvents()}
              className="text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
            >
              Clear Synced Items
            </button>
          )}
        </div>

        {queue.length === 0 ? (
          <div className="p-8 border border-stone-200 rounded-lg text-center text-xs text-stone-500 bg-stone-50/40">
            Queue is currently empty. Complete lessons, notes, or quizzes in offline mode to inspect synchronization envelopes.
          </div>
        ) : (
          <div className="divide-y divide-stone-200 border border-stone-200 rounded-lg overflow-hidden text-xs">
            {queue.map((event) => (
              <div
                key={event.eventId}
                className="p-3 flex items-center justify-between gap-4 bg-white hover:bg-stone-50"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-800">
                      {event.eventType}
                    </span>
                    <span className="font-mono text-[10px] text-stone-400">
                      ID: {event.eventId.substring(0, 16)}...
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Entity: {event.entityId} • Enqueued: {new Date(event.timestamp).toLocaleTimeString()}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      event.syncStatus === 'SYNCED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : event.syncStatus === 'FAILED'
                        ? 'bg-rose-100 text-rose-800'
                        : event.syncStatus === 'CONFLICT_RESOLVED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-200 text-stone-800'
                    }`}
                  >
                    {event.syncStatus}
                  </span>
                  {event.retryCount > 0 && (
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      Retries: {event.retryCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
