import React, { useState } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const OfflineStatusBar: React.FC = () => {
  const { isOffline, setIsOffline, pendingSyncCount, syncNow, lastSyncTime } = useLearning();
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const res = await syncNow();
      if (res.failedCount === 0) {
        setSyncMessage(`Synchronized ${res.successCount + res.conflictResolvedCount} event(s) successfully.`);
      } else {
        setSyncMessage(`Sync completed with ${res.failedCount} error(s).`);
      }
    } catch {
      setSyncMessage('Sync failed. Please verify connectivity.');
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncMessage(null), 4000);
    }
  };

  return (
    <div className="bg-[#262E27] text-[#E8EDEA] border-b border-[#343F35] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 font-sans">
      <div className="flex items-center gap-3">
        {/* Connectivity status toggle */}
        <div className="flex items-center gap-2">
          {isOffline ? (
            <span className="flex items-center gap-1.5 font-semibold text-[#F2CC8F] bg-[#3E2923] border border-[#E2725B]/70 px-2.5 py-0.5 rounded-full shadow-xs">
              <WifiOff className="w-3.5 h-3.5 text-[#E2725B]" />
              Offline Mode
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-semibold text-[#DDE5B6] bg-[#343F35] border border-[#588157] px-2.5 py-0.5 rounded-full shadow-xs">
              <Wifi className="w-3.5 h-3.5 text-[#DDE5B6]" />
              Online
            </span>
          )}
          <span className="text-[#E8EDEA]/70 hidden sm:inline">
            {isOffline
              ? 'Local storage active. Changes will queue until reconnected.'
              : lastSyncTime
              ? `Last synced: ${new Date(lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : 'Synchronized with platform'}
          </span>
        </div>

        {/* Pending Sync Items indicator */}
        {pendingSyncCount > 0 && (
          <span className="bg-[#343F35] text-[#F2CC8F] border border-[#F2CC8F]/50 px-2.5 py-0.5 rounded-full text-[11px] font-mono">
            {pendingSyncCount} pending change{pendingSyncCount === 1 ? '' : 's'}
          </span>
        )}

        {syncMessage && (
          <span className="text-[#DDE5B6] bg-[#343F35] border border-[#588157] px-2.5 py-0.5 rounded-full text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#A3B18A]" />
            {syncMessage}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Toggle offline simulator switch */}
        <button
          onClick={() => setIsOffline(!isOffline)}
          className="px-3 py-1 rounded-full border border-[#4A5D4E] hover:bg-[#343F35] text-[#E8EDEA] transition-colors cursor-pointer text-xs"
          title="Simulate network disconnect for offline testing"
        >
          {isOffline ? 'Simulate Reconnection (Go Online)' : 'Simulate Offline Mode'}
        </button>

        {/* Sync Now button */}
        {!isOffline && (
          <button
            onClick={handleSync}
            disabled={syncing || pendingSyncCount === 0}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer shadow-xs ${
              pendingSyncCount > 0
                ? 'bg-[#588157] hover:bg-[#476A46] text-white'
                : 'bg-[#343F35] text-[#E8EDEA]/40 cursor-not-allowed border border-[#4A5D4E]/50'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
        )}
      </div>
    </div>
  );
};
