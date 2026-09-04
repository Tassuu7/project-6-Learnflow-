import React, { useState } from 'react';
import {
  Settings,
  Shield,
  HardDrive,
  Bell,
  CheckCircle2,
  Lock,
  Globe,
  Database,
  RefreshCw,
} from 'lucide-react';

export const AdminSystemSettingsView: React.FC = () => {
  const [platformName, setPlatformName] = useState('Academia Learning Platform');
  const [allowPublicRegistration, setAllowPublicRegistration] = useState(true);
  const [maxOfflineCacheMb, setMaxOfflineCacheMb] = useState(500);
  const [require2FA, setRequire2FA] = useState(false);
  const [autoSyncOnReconnection, setAutoSyncOnReconnection] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#343F35] dark:text-[#DDE5B6] bg-[#E8EDEA] dark:bg-[#252E26] px-2.5 py-0.5 rounded-full border border-[#A3B18A]/40">
              System Operations
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F241F] dark:text-white mt-1.5">
              Enterprise LMS Configuration & Policies
            </h2>
            <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] mt-0.5">
              Platform identity, security standards, offline storage limits, and background synchronization rules.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#343F35] hover:bg-[#262E27] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-[#A3B18A]" />
            Save Configuration
          </button>
        </div>

        {saved && (
          <div className="mt-4 p-3 rounded-xl bg-[#E8EDEA] dark:bg-[#252E26] border border-[#A3B18A] text-xs font-semibold text-[#343F35] dark:text-[#DDE5B6] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#588157]" />
            System parameters successfully persisted to institutional cluster!
          </div>
        )}
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General & Identity */}
        <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#1F241F] dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#588157]" />
            Institutional Identity & Access
          </h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#2D332D] dark:text-[#E8EDEA]">
                Platform Brand Name
              </label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] rounded-xl text-xs text-[#2D332D] dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-semibold text-[#2D332D] dark:text-[#E8EDEA] block">
                  Open Scholar Registration
                </span>
                <span className="text-[11px] text-[#6D756D] dark:text-[#8E9A8F]">
                  Permit new students to self-enroll in public catalog courses.
                </span>
              </div>
              <button
                onClick={() => setAllowPublicRegistration(!allowPublicRegistration)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  allowPublicRegistration ? 'bg-[#588157]' : 'bg-stone-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    allowPublicRegistration ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Storage & Offline Synchronizer */}
        <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#1F241F] dark:text-white flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#588157]" />
            Offline Storage & Cache Quotas
          </h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#2D332D] dark:text-[#E8EDEA]">
                Max Local Offline Cache per Scholar (MB)
              </label>
              <input
                type="number"
                value={maxOfflineCacheMb}
                onChange={(e) => setMaxOfflineCacheMb(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] rounded-xl text-xs text-[#2D332D] dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-semibold text-[#2D332D] dark:text-[#E8EDEA] block">
                  Automatic Sync on Reconnection
                </span>
                <span className="text-[11px] text-[#6D756D] dark:text-[#8E9A8F]">
                  Push pending quizzes and notes immediately upon network restoration.
                </span>
              </div>
              <button
                onClick={() => setAutoSyncOnReconnection(!autoSyncOnReconnection)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  autoSyncOnReconnection ? 'bg-[#588157]' : 'bg-stone-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    autoSyncOnReconnection ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
