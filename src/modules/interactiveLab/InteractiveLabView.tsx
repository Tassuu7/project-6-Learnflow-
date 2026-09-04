import React, { useState } from 'react';
import { PythonEnvironment, PythonRuntimeInterpreter } from '../pythonSandbox/pythonInterpreter';
import { JVMHeapManager } from '../javaSandbox/jvmMemoryModel';
import { BPlusTree } from '../dbmsEngine/bTreeIndex';
import { RelationalSchema } from '../dbmsEngine/normalizationValidator';
import { ModelEvaluator } from '../mlEngine/modelEvaluation';
import { PYTHON_EXERCISES } from '../pythonSandbox/pythonChallenges';
import { JAVA_EXERCISES } from '../javaSandbox/javaChallenges';
import { DBMS_EXERCISES } from '../dbmsEngine/dbmsChallenges';
import { ML_EXERCISES } from '../mlEngine/mlChallenges';
import { Play, CheckCircle2, Terminal, Database, Cpu, BrainCircuit } from 'lucide-react';

export const InteractiveLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PYTHON' | 'JAVA' | 'DBMS' | 'ML'>('PYTHON');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [pythonCode, setPythonCode] = useState('x = 42\nprint("Computed result:", x * 2)');

  const runPythonSimulation = () => {
    const interpreter = new PythonRuntimeInterpreter();
    const lines = pythonCode.split('\n');
    for (const line of lines) {
      interpreter.executeLine(line);
    }
    setConsoleOutput(interpreter.getStdout());
  };

  const runJvmSimulation = () => {
    const heap = new JVMHeapManager();
    heap.allocate('StudentSession', { id: 101, status: 'ENROLLED' }, 128);
    heap.allocate('CourseBuffer', { courseId: 'crs_py_101', bufferSize: 2048 }, 512);
    const metrics = heap.getMemoryMetrics();
    setConsoleOutput([
      '=== JVM Generational Garbage Collection Metrics ===',
      `Eden Objects Active: ${metrics.edenObjects}`,
      `Survivor Space Objects: ${metrics.survivorObjects}`,
      `Tenured Space Objects: ${metrics.tenuredObjects}`,
      `Total Heap Allocated: ${metrics.totalHeapUsedMb} MB / ${metrics.maxHeapMb} MB`,
      'Status: Garbage Collector operating in nominal parameters.',
    ]);
  };

  const runDbmsSimulation = () => {
    const bTree = new BPlusTree<number, string>(3);
    bTree.insert(10, 'Record #10: Aria Montgomery');
    bTree.insert(20, 'Record #20: Marcus Vance');
    bTree.insert(5, 'Record #5: Elena Rostova');
    bTree.insert(15, 'Record #15: David Sterling');

    const schema = new RelationalSchema('Enrollments', ['studentId', 'courseId', 'grade'], [
      { determinant: ['studentId', 'courseId'], dependent: ['grade'] },
    ]);
    const bcnf = schema.isBCNF();

    setConsoleOutput([
      '=== DBMS Relational Engine & B+ Tree Diagnostics ===',
      `B+ Tree Point Query key=15: ${bTree.search(15)}`,
      `B+ Tree Range Scan [5..20]: ${JSON.stringify(bTree.rangeScan(5, 20))}`,
      `Schema 'Enrollments' BCNF Compliant: ${bcnf.isBCNF ? 'TRUE (In BCNF)' : 'FALSE (Violations detected)'}`,
    ]);
  };

  const runMlSimulation = () => {
    const yTrue = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1];
    const yPred = [1, 0, 1, 0, 0, 1, 0, 1, 1, 1];
    const metrics = ModelEvaluator.evaluateBinaryClassification(yTrue, yPred);

    setConsoleOutput([
      '=== Machine Learning Evaluation Pipeline ===',
      `Model Accuracy: ${(metrics.accuracy * 100).toFixed(1)}%`,
      `Precision: ${(metrics.precision * 100).toFixed(1)}%`,
      `Recall: ${(metrics.recall * 100).toFixed(1)}%`,
      `F1-Score: ${(metrics.f1Score * 100).toFixed(1)}%`,
      `True Positives: ${metrics.confusionMatrix.truePositives}, False Positives: ${metrics.confusionMatrix.falsePositives}`,
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Engineering Interactive Laboratory
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Simulate Python PVM execution, JVM memory profiling, B+ Tree indexing, and ML model evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('PYTHON')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'PYTHON'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Python ({PYTHON_EXERCISES.length})
          </button>
          <button
            onClick={() => setActiveTab('JAVA')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'JAVA'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Java ({JAVA_EXERCISES.length})
          </button>
          <button
            onClick={() => setActiveTab('DBMS')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'DBMS'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            DBMS ({DBMS_EXERCISES.length})
          </button>
          <button
            onClick={() => setActiveTab('ML')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'ML'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            ML ({ML_EXERCISES.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
              <Terminal className="w-4 h-4 text-emerald-500" />
              Runtime Sandbox Simulator
            </h2>
            <button
              onClick={() => {
                if (activeTab === 'PYTHON') runPythonSimulation();
                else if (activeTab === 'JAVA') runJvmSimulation();
                else if (activeTab === 'DBMS') runDbmsSimulation();
                else if (activeTab === 'ML') runMlSimulation();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              Run Simulation
            </button>
          </div>

          {activeTab === 'PYTHON' && (
            <textarea
              value={pythonCode}
              onChange={(e) => setPythonCode(e.target.value)}
              rows={8}
              className="w-full font-mono text-xs p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter Python code..."
            />
          )}

          {activeTab === 'JAVA' && (
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <p className="font-medium text-slate-900 dark:text-white">JVM Memory Manager Simulation</p>
              <p>Simulates Young/Old generation object allocations, Eden mark-and-sweep, and tenuring thresholds.</p>
            </div>
          )}

          {activeTab === 'DBMS' && (
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <p className="font-medium text-slate-900 dark:text-white">B+ Tree & Relational Normalizer</p>
              <p>Demonstrates B+ Tree index insertion, range scans, and functional dependency BCNF validation.</p>
            </div>
          )}

          {activeTab === 'ML' && (
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <p className="font-medium text-slate-900 dark:text-white">Machine Learning Metrics Pipeline</p>
              <p>Computes Confusion Matrix, Precision, Recall, and F1-Score on test vectors.</p>
            </div>
          )}
        </div>

        <div className="bg-slate-950 text-slate-100 rounded-xl border border-slate-800 p-5 shadow-sm flex flex-col font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Engine Output Console
            </span>
            <button
              onClick={() => setConsoleOutput([])}
              className="text-slate-500 hover:text-slate-300 text-[11px]"
            >
              Clear
            </button>
          </div>

          <div className="flex-1 space-y-1.5 overflow-y-auto min-h-[160px]">
            {consoleOutput.length === 0 ? (
              <p className="text-slate-600 italic">Click &quot;Run Simulation&quot; to execute the runtime engine.</p>
            ) : (
              consoleOutput.map((line, idx) => (
                <p key={idx} className="text-slate-300">
                  {line}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
