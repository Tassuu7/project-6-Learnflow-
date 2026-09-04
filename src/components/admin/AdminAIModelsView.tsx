import React, { useState } from 'react';
import {
  Cpu,
  Sparkles,
  Zap,
  Sliders,
  CheckCircle2,
  HardDrive,
  Activity,
  RefreshCw,
  Server,
  KeyRound,
} from 'lucide-react';

export const AdminAIModelsView: React.FC = () => {
  const [activeModel, setActiveModel] = useState('gemini-2.5-flash');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [offlineFallback, setOfflineFallback] = useState(true);
  const [saved, setSaved] = useState(false);

  const models = [
    {
      id: 'gemini-2.5-flash',
      name: 'Gemini 2.5 Flash',
      provider: 'Google DeepMind',
      type: 'Primary Tutor Engine',
      latency: '180ms',
      status: 'ACTIVE_DEFAULT',
      costPer1k: '$0.00015',
    },
    {
      id: 'gemini-2.5-pro',
      name: 'Gemini 2.5 Pro (Analytical)',
      provider: 'Google DeepMind',
      type: 'Socratic Code & Logic Evaluator',
      latency: '450ms',
      status: 'AVAILABLE',
      costPer1k: '$0.00125',
    },
    {
      id: 'local-gemma-embedded',
      name: 'Gemma 2B Quantized (Local WASM/ONNX)',
      provider: 'Local Device Runtime',
      type: 'Offline Classroom Synthesizer',
      latency: '35ms',
      status: 'EMBEDDED_READY',
      costPer1k: '$0.00000',
    },
  ];

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
              Cognitive Infrastructure
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1F241F] dark:text-white mt-1.5">
              AI Tutor Engines & Intelligent Services
            </h2>
            <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] mt-0.5">
              Configure pedagogical AI models, token quotas, local embedding fallbacks, and Socratic evaluation pipelines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#E8EDEA] dark:bg-[#252E26] text-[#343F35] dark:text-[#DDE5B6] rounded-xl text-xs font-bold flex items-center gap-1.5 border border-[#A3B18A]/40">
              <Activity className="w-3.5 h-3.5 text-[#588157]" />
              Inference Ready
            </span>
          </div>
        </div>

        {saved && (
          <div className="mt-4 p-3 rounded-xl bg-[#E8EDEA] dark:bg-[#252E26] border border-[#A3B18A] text-xs font-semibold text-[#343F35] dark:text-[#DDE5B6] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#588157]" />
            AI orchestration settings updated successfully across cluster!
          </div>
        )}
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {models.map((m) => (
          <div
            key={m.id}
            onClick={() => setActiveModel(m.id)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
              activeModel === m.id
                ? 'bg-white dark:bg-[#1C231E] border-[#588157] shadow-sm ring-1 ring-[#588157]'
                : 'bg-[#F9F7F2]/80 dark:bg-[#161D18] border-[#E5E1D8] dark:border-[#2B352E] hover:border-[#A3B18A]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-[#588157] bg-[#E8EDEA] dark:bg-[#252E26] px-2 py-0.5 rounded">
                {m.provider}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  m.status === 'ACTIVE_DEFAULT'
                    ? 'bg-[#E8EDEA] text-[#343F35] border border-[#A3B18A]/50'
                    : 'bg-[#F4F1EA] dark:bg-[#252E26] text-[#586358] dark:text-[#B5BEB6]'
                }`}
              >
                {m.status}
              </span>
            </div>

            <h4 className="font-bold text-sm text-[#1F241F] dark:text-white mt-1">
              {m.name}
            </h4>
            <p className="text-xs text-[#6D756D] dark:text-[#B5BEB6] leading-relaxed">
              {m.type}
            </p>

            <div className="pt-2 border-t border-[#F0EDE6] dark:border-[#2B352E] flex items-center justify-between text-xs text-[#6D756D] dark:text-[#8E9A8F]">
              <span>Avg. Latency: {m.latency}</span>
              <span className="font-mono">{m.costPer1k}/1k tok</span>
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Parameters */}
      <div className="bg-white dark:bg-[#1C231E] rounded-2xl border border-[#E5E1D8] dark:border-[#2B352E] p-6 shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-[#1F241F] dark:text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#588157]" />
          Engine Hyperparameters & Offline Fallbacks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between font-semibold text-[#2D332D] dark:text-[#E8EDEA]">
              <span>Tutor Temperature (Creativity vs. Determinism):</span>
              <span className="font-mono text-[#588157]">{temperature}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-[#588157]"
            />
            <p className="text-[11px] text-[#6D756D] dark:text-[#8E9A8F]">
              Lower values ensure strict alignment with course syllabus; higher values offer more conversational analogies.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between font-semibold text-[#2D332D] dark:text-[#E8EDEA]">
              <span>Max Response Length:</span>
              <span className="font-mono text-[#588157]">{maxTokens} tokens</span>
            </div>
            <input
              type="range"
              min="512"
              max="4096"
              step="256"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="w-full accent-[#588157]"
            />
            <p className="text-[11px] text-[#6D756D] dark:text-[#8E9A8F]">
              Balances concise explanations with deep structural breakdowns.
            </p>
          </div>
        </div>

        {/* Offline Toggle */}
        <div className="p-4 rounded-xl bg-[#F9F7F2] dark:bg-[#161D18] border border-[#E5E1D8] dark:border-[#2B352E] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#1F241F] dark:text-white block">
              Offline Local Fallback (IndexedDB Embeddings & Quantized Inference)
            </span>
            <span className="text-[11px] text-[#6D756D] dark:text-[#8E9A8F]">
              Allows students to continue querying course summaries even when fully disconnected from the internet.
            </span>
          </div>

          <button
            onClick={() => setOfflineFallback(!offlineFallback)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              offlineFallback ? 'bg-[#588157]' : 'bg-stone-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                offlineFallback ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="flex justify-end pt-3">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#343F35] hover:bg-[#262E27] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-[#A3B18A]" />
            Save Model Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
