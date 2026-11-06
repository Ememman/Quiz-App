import React from "react";
import { Trophy, Flame, CheckCircle2, Award, X, Trash2 } from "lucide-react";

export const StatsModal = ({ isOpen, onClose, stats, onResetStats }) => {
  if (!isOpen) return null;

  const totalAttempted = stats.totalCorrect + stats.totalIncorrect + stats.totalTimedOut;
  const lifetimeAccuracy = totalAttempted > 0
    ? Math.round((stats.totalCorrect / totalAttempted) * 100)
    : 0;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="modal-card w-full max-w-md bg-[#0f1016] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 flex items-center justify-between">
          <div className="modal-title-row flex items-center gap-2">
            <Trophy className="text-amber-400 shrink-0" size={20} />
            <h2 className="modal-title font-extrabold text-sm sm:text-base text-white">Lifetime Statistics</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 overflow-y-auto">
          <div className="stats-grid-2x2 grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="stat-box rounded-xl bg-[#14151e] border border-white/10 p-3 sm:p-4 flex flex-col gap-1">
              <span className="stat-label text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">High Score</span>
              <span className="stat-val text-xl sm:text-2xl font-black text-orange-500">{stats.highScore}</span>
            </div>

            <div className="stat-box rounded-xl bg-[#14151e] border border-white/10 p-3 sm:p-4 flex flex-col gap-1">
              <span className="stat-label text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Completed</span>
              <span className="stat-val text-xl sm:text-2xl font-black text-white">{stats.gamesPlayed}</span>
            </div>

            <div className="stat-box rounded-xl bg-[#14151e] border border-white/10 p-3 sm:p-4 flex flex-col gap-1">
              <span className="stat-label text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Accuracy</span>
              <span className="stat-val text-xl sm:text-2xl font-black text-emerald-400">{lifetimeAccuracy}%</span>
            </div>

            <div className="stat-box rounded-xl bg-[#14151e] border border-white/10 p-3 sm:p-4 flex flex-col gap-1">
              <span className="stat-label text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Best Streak</span>
              <span className="stat-val text-xl sm:text-2xl font-black text-amber-400 flex items-center gap-1">
                <Flame size={18} className="text-orange-500" />
                {stats.bestStreak}
              </span>
            </div>
          </div>

          <div className="stats-breakdown-row rounded-xl bg-[#14151e] border border-white/10 p-3 sm:p-4 flex flex-col sm:flex-row justify-between gap-2 text-xs sm:text-sm text-slate-300">
            <div className="breakdown-item flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>{stats.totalCorrect} Correct answers</span>
            </div>
            <div className="breakdown-item flex items-center gap-2">
              <Award size={16} className="text-orange-400 shrink-0" />
              <span>{stats.totalScore} Total points</span>
            </div>
          </div>
        </div>

        <div className="modal-footer px-4 sm:px-6 py-3 border-t border-white/10 flex items-center justify-between gap-2">
          <button
            type="button"
            className="btn-reset-stats px-3 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/15 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer touch-manipulation select-none active:scale-95"
            onClick={() => {
              if (window.confirm("Reset all stored quiz statistics?")) {
                onResetStats();
              }
            }}
          >
            <Trash2 size={13} />
            <span>Reset History</span>
          </button>

          <button
            type="button"
            className="btn-modal-close px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer touch-manipulation select-none active:scale-95 min-h-[38px]"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
