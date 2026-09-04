import React, { useState } from 'react';
import {
  Server,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';
import {
  getOfflineQueue,
  getProcessedLedger,
  clearSyncedEvents,
} from '../../services/syncEngine';

export const AdminSyncManagementView: React.FC = () => {
  const { isOffline, setIsOffline, syncNow, pendingSyncCount, lastSyncTime } =
    useLearning();

  const [syncInProgress, setSyncInProgress] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const queue = getOfflineQueue();
  const ledger = getProcessedLedger();

  const handleTriggerSync = async () => {
    setSyncInProgress(true);
    setSyncStatusMsg(null);
    try {
      const res = await syncNow();
      setSyncStatusMsg(
        `Reconciliation complete. Processed: ${res.totalProcessed}, Failed: ${res.failedCount}.`
      );
    } catch {
      setSyncStatusMsg('Error executing synchronization batch.');
    } finally {
      setSyncInProgress(false);
    }
  };

  const handleClearHistory = () => {
    clearSyncedEvents();
    setSyncStatusMsg('Cleaned up acknowledged envelopes from storage ledger.');
    setTimeout(() => setSyncStatusMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
              Distributed Ledger Operations
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Offline Synchronization & Event Replay Console
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Inspect offline queue envelopes, enforce idempotency keys, and monitor state convergence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isOffline
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              {isOffline ? 'Simulating Offline' : 'Network Active'}
            </button>
            <button
              onClick={handleTriggerSync}
              disabled={isOffline || syncInProgress}
              className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncInProgress ? 'animate-spin' : ''}`} />
              Run Sync Batch
            </button>
          </div>
        </div>

        {syncStatusMsg && (
          <div className="mt-4 p-3 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            {syncStatusMsg}
          </div>
        )}
      </div>

      {/* Protocol Telemetry Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Pending Queue Depth
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 mt-1">
            {pendingSyncCount} Items
          </div>
          <div className="text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            Awaiting server ACK envelope
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Processed Event Ledger
          </div>
          <div className="text-2xl font-bold font-mono text-stone-900 mt-1">
            {ledger.length} Records
          </div>
          <div className="text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            Idempotency keys preserved in local database
          </div>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Conflict Resolution Strategy
          </div>
          <div className="text-base font-bold font-serif text-stone-900 mt-1">
            Last-Write-Wins (LWW)
          </div>
          <div className="text-xs text-stone-500 mt-2 pt-2 border-t border-stone-100">
            Monotonic client timestamp reconciliation
          </div>
        </div>
      </div>

      {/* Live Event Queue Inspector */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-stone-700" />
            Active Sync Queue Envelopes
          </h3>
          {queue.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-xs text-stone-500 hover:text-stone-800 font-medium flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Prune Synced Records
            </button>
          )}
        </div>

        {queue.length === 0 ? (
          <div className="p-8 border border-stone-200 rounded-lg text-center text-xs text-stone-500 bg-stone-50/50">
            All offline actions have reached consistency with the server. No pending envelopes in flight.
          </div>
        ) : (
          <div className="divide-y divide-stone-200 border border-stone-200 rounded-lg overflow-hidden text-xs">
            {queue.map((event) => (
              <div key={event.eventId} className="p-3.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900">
                      {event.eventType}
                    </span>
                    <span className="font-mono text-[10px] text-stone-400">
                      {event.eventId}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-600">
                    User: <span className="font-mono">{event.userId}</span> • Entity:{' '}
                    <span className="font-mono">{event.entityId}</span> • Enqueued:{' '}
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      event.syncStatus === 'SYNCED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {event.syncStatus}
                  </span>
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    Retry Count: {event.retryCount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
