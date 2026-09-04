import React, { useState } from 'react';
import {
  Activity,
  Search,
  Download,
  Filter,
  Shield,
  FileSpreadsheet,
} from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

export const AdminAuditLogsView: React.FC = () => {
  const { auditLogs } = useLearning();

  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const actions = ['ALL', ...Array.from(new Set(auditLogs.map((l) => l.action)))];

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'ALL' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const exportAuditCSV = () => {
    const headers = ['Timestamp', 'Action', 'Entity', 'EntityId', 'Actor', 'Role', 'Result', 'Details'];
    const rows = filteredLogs.map((l) => [
      `"${l.timestamp}"`,
      `"${l.action}"`,
      `"${l.entity}"`,
      `"${l.entityId}"`,
      `"${l.actorName}"`,
      `"${l.actorRole}"`,
      `"${l.result}"`,
      `"${l.details.replace(/"/g, '""')}"`,
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `LearnFlow_Audit_Log_${Date.now()}.csv`);
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
              Compliance & Security
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Immutable Platform Audit Log
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Chronological security ledger capturing permissions, grade assignments, course publications, and synchronization events.
            </p>
          </div>

          <button
            onClick={exportAuditCSV}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start md:self-auto"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> Export Audit CSV
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3 text-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by action, user, or details..."
            className="px-3 py-1.5 border border-stone-300 rounded-lg w-64"
          />

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-2.5 py-1.5 border border-stone-300 rounded-lg bg-stone-50 text-stone-800"
          >
            {actions.map((act) => (
              <option key={act} value={act}>
                {act === 'ALL' ? 'All Event Types' : act}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Entity</th>
                <th className="p-3.5">Actor</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50 transition-colors font-sans">
                  <td className="p-3.5 text-stone-500 font-mono text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-800 font-mono text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-600 font-mono text-[11px]">
                    {log.entity}:{log.entityId.substring(0, 12)}
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-stone-900">{log.actorName}</span>
                    <span className="text-stone-400 text-[10px] ml-1">({log.actorRole})</span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        log.result === 'SUCCESS'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.result === 'FAILURE'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {log.result}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-600 text-xs">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
