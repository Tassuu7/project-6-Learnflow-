import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Search,
  ShieldCheck,
  Calendar,
  User,
  Printer,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { Certificate } from '../../types';

export const StudentCertificates: React.FC = () => {
  const { currentUser } = useAuth();
  const { certificates, verifyCertificate } = useLearning();

  const [verifyInput, setVerifyInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<Certificate | null | 'NOT_FOUND'>(null);
  const [activeCertificateModal, setActiveCertificateModal] = useState<Certificate | null>(null);

  const studentCertificates = certificates.filter(
    (c) => c.userId === currentUser?.id
  );

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInput.trim()) return;
    const cert = verifyCertificate(verifyInput.trim());
    setVerificationResult(cert || 'NOT_FOUND');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Verified Academic Credentials
            </span>
            <h2 className="text-xl font-bold font-serif text-stone-900 mt-1">
              Official Certificates & Accreditations
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Certificates awarded upon 100% syllabus completion and passing scores on required assessments.
            </p>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleVerify} className="flex gap-2">
            <input
              type="text"
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
              placeholder="Verify code (e.g. LF-2026-...)"
              className="px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 w-56 font-mono"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" /> Verify
            </button>
          </form>
        </div>

        {/* Verification Result Banner */}
        {verificationResult && (
          <div className="mt-4 pt-4 border-t border-stone-100">
            {verificationResult === 'NOT_FOUND' ? (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
                No certificate found matching the verification token. Please verify the credentials.
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Valid Credential: <strong>{verificationResult.courseTitle}</strong> awarded to{' '}
                    <strong>{verificationResult.userName}</strong> on{' '}
                    {new Date(verificationResult.issueDate).toLocaleDateString()}.
                  </span>
                </div>
                <button
                  onClick={() => setActiveCertificateModal(verificationResult)}
                  className="text-xs font-bold text-emerald-900 underline cursor-pointer"
                >
                  View Document
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studentCertificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs hover:border-emerald-700/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {cert.certificateNumber}
                </span>
                <span className="text-xs font-bold font-mono text-stone-600">
                  Grade: {cert.scorePercentage}%
                </span>
              </div>

              <h3 className="text-base font-bold font-serif text-stone-900">
                {cert.courseTitle}
              </h3>

              <div className="mt-3 space-y-1 text-xs text-stone-600">
                <div>Recipient: <span className="font-semibold text-stone-900">{cert.userName}</span></div>
                <div>Faculty Instructor: {cert.instructorName}</div>
                <div>Issued: {new Date(cert.issueDate).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[10px] font-mono text-stone-400">
                Auth: {cert.verificationCode}
              </span>
              <button
                onClick={() => setActiveCertificateModal(cert)}
                className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Award className="w-3.5 h-3.5" /> View Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {studentCertificates.length === 0 && (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center text-xs text-stone-500">
          <Award className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-stone-800">No Certificates Earned Yet</h4>
          <p className="mt-1">
            Complete 100% of a course's lessons and pass the final assessment to earn your official credential.
          </p>
        </div>
      )}

      {/* Official Certificate Modal */}
      {activeCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-300 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700">Official Certificate Preview</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
                <button
                  onClick={() => setActiveCertificateModal(null)}
                  className="text-stone-400 hover:text-stone-600 cursor-pointer p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Certificate Parchment Layout */}
            <div className="p-8 sm:p-12 text-center border-8 border-double border-emerald-900 m-4 rounded-xl bg-stone-50/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-800 text-white font-serif font-bold text-xl mb-4">
                LF
              </div>

              <div className="text-xs font-bold uppercase tracking-widest text-emerald-900">
                LearnFlow Institute of Advanced Studies
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900 mt-2">
                Certificate of Academic Achievement
              </h2>

              <p className="text-xs text-stone-500 mt-4">
                This credential is officially conferred upon
              </p>

              <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1 border-b border-stone-300 pb-1 inline-block min-w-[280px]">
                {activeCertificateModal.userName}
              </div>

              <p className="text-xs text-stone-600 mt-4 max-w-md mx-auto leading-relaxed">
                for successful completion and comprehensive mastery of all academic and practical requirements in:
              </p>

              <div className="text-base sm:text-lg font-bold font-serif text-emerald-950 mt-2">
                {activeCertificateModal.courseTitle}
              </div>

              <div className="mt-8 pt-6 border-t border-stone-300 grid grid-cols-2 gap-4 text-xs text-stone-600 text-left">
                <div>
                  <div className="font-semibold text-stone-900">
                    {activeCertificateModal.instructorName}
                  </div>
                  <div className="text-[10px] text-stone-400">Lead Faculty Architect</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[11px] font-bold text-stone-800">
                    {activeCertificateModal.certificateNumber}
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Issued: {new Date(activeCertificateModal.issueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
