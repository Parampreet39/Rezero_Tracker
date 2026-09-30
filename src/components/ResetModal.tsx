import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, X, Check, Sparkles, Flame, Skull } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetCompleteZero: () => void;
  onResetCurrentArc: () => void;
  onResetToBaseline: () => void;
  currentArcTitle: string;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onResetCompleteZero,
  onResetCurrentArc,
  onResetToBaseline,
  currentArcTitle,
}) => {
  const [selectedMode, setSelectedMode] = useState<'zero' | 'current_arc' | 'baseline'>('zero');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedMode === 'zero') {
      onResetCompleteZero();
    } else if (selectedMode === 'current_arc') {
      onResetCurrentArc();
    } else {
      onResetToBaseline();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-slate-950 border border-rose-900/60 shadow-2xl overflow-hidden text-slate-100 space-y-5 p-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-600/50 flex items-center justify-center text-rose-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Return to Zero · Timeline Rewind</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                Reset Reading Progress
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed">
          Select how you want to reset your checklist progress. This action will update your saved browser timeline.
        </p>

        {/* Options Radio List */}
        <div className="space-y-2.5 font-mono text-xs">
          {/* Option 1: Absolute Zero */}
          <div
            onClick={() => setSelectedMode('zero')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              selectedMode === 'zero'
                ? 'bg-rose-950/50 border-rose-500 text-white shadow-md shadow-rose-950/20'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
              selectedMode === 'zero' ? 'border-rose-400 bg-rose-500 text-slate-950' : 'border-slate-600'
            }`}>
              {selectedMode === 'zero' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>Start from Zero (Absolute 0% Reset)</span>
                <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.2 rounded border border-rose-800/40">
                  Total Reset
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Unchecks all chapters across all story arcs. Perfect for brand-new readers starting from Arc 1 Chapter 1.
              </div>
            </div>
          </div>

          {/* Option 2: Reset Current Arc */}
          <div
            onClick={() => setSelectedMode('current_arc')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              selectedMode === 'current_arc'
                ? 'bg-amber-950/50 border-amber-500 text-white shadow-md shadow-amber-950/20'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
              selectedMode === 'current_arc' ? 'border-amber-400 bg-amber-500 text-slate-950' : 'border-slate-600'
            }`}>
              {selectedMode === 'current_arc' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>Reset Current Arc Only</span>
                <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded border border-amber-800/40">
                  Targeted
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Resets chapter completions only in <span className="text-amber-300 font-semibold">{currentArcTitle}</span>, leaving all other arcs untouched.
              </div>
            </div>
          </div>

          {/* Option 3: Restore Default Curated Baseline */}
          <div
            onClick={() => setSelectedMode('baseline')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
              selectedMode === 'baseline'
                ? 'bg-sky-950/50 border-sky-500 text-white shadow-md shadow-sky-950/20'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
              selectedMode === 'baseline' ? 'border-sky-400 bg-sky-500 text-slate-950' : 'border-slate-600'
            }`}>
              {selectedMode === 'baseline' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <div className="space-y-0.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>Restore Curated Baseline (Arc 3 Ch 70)</span>
                <span className="text-[10px] bg-sky-950 text-sky-300 px-1.5 py-0.2 rounded border border-sky-800/40">
                  Curated
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Restores the standard default reading position right after the White Whale battle and before Petelgeuse's purge.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80 font-mono text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold shadow-lg shadow-rose-950/50 border border-rose-500 transition-all cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Confirm Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
