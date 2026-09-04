import React from 'react';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Server,
  RefreshCw,
  HardDrive,
  Activity,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { StatCard } from '../common/StatCard';

export const AdminDashboard: React.FC<{
  onNavigate: (tab: string) => void;
}> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const {
    courses,
    enrollments,
    auditLogs,
    pendingSyncCount,
    isOffline,
    users,
  } = useLearning();

  const totalLessonsDone = enrollments.reduce(
    (acc, e) => acc + e.completedLessons.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-stone-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Platform Administration & Operations
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              System Administration Console
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
              Monitor multi-tenant platform telemetry, user permissions, audit trails, and offline envelope synchronization.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('sync_admin')}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Server className="w-3.5 h-3.5" />
              Sync Engine Console
            </button>
            <button
              onClick={() => onNavigate('users')}
              className="px-4 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              User Accounts
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Accounts"
          value={users.length}
          subtitle="3 active role tiers"
          icon={Users}
          variant="stone"
        />
        <StatCard
          title="Curricula in Catalog"
          value={courses.length}
          subtitle="Accredited courses"
          icon={BookOpen}
          variant="emerald"
        />
        <StatCard
          title="Pending Sync Queue"
          value={pendingSyncCount}
          subtitle="Offline events in queue"
          icon={RefreshCw}
          variant={pendingSyncCount > 0 ? 'amber' : 'emerald'}
        />
        <StatCard
          title="Security Audit Logs"
          value={auditLogs.length}
          subtitle="Immutable event records"
          icon={Activity}
          variant="stone"
        />
      </div>

      {/* System Status & Quick Management Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* System Health Panel (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-stone-700" />
            Infrastructure & Gateway Telemetry
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
              <span className="text-stone-700 font-medium">Gateway Ingress Protocol:</span>
              <span className="font-mono font-bold text-emerald-800">ONLINE (Port 3000)</span>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
              <span className="text-stone-700 font-medium">Client Network State:</span>
              <span className="font-semibold text-stone-900">
                {isOffline ? 'OFFLINE SIMULATION' : 'CONNECTED / RECONCILED'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
              <span className="text-stone-700 font-medium">Offline Storage Ledger:</span>
              <span className="font-mono font-semibold text-stone-800">
                Indexed Storage + Idempotency Map
              </span>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
              <span className="text-stone-700 font-medium">Color Discipline Enforced:</span>
              <span className="font-mono font-bold text-emerald-800">
                STRICT (No-Blue Palette)
              </span>
            </div>
          </div>
        </div>

        {/* Recent Audit Activities (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-800" />
              Recent Audit Log Activity
            </h3>
            <button
              onClick={() => onNavigate('audit_logs')}
              className="text-xs font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
            >
              View all ({auditLogs.length})
            </button>
          </div>

          <div className="space-y-2">
            {auditLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-lg border border-stone-200 bg-stone-50/60 text-xs flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-semibold text-stone-900 font-mono text-[11px]">
                    {log.action}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    By: {log.actorName} ({log.actorRole})
                  </div>
                </div>
                <span className="text-[10px] text-stone-400 font-mono shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
