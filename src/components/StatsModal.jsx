import React from "react";
import { Trophy, Flame, CheckCircle2, Award, X, Trash2 } from "lucide-react";

export const StatsModal = ({ isOpen, onClose, stats, onResetStats }) => {
  if (!isOpen) return null;

  const totalAttempted = stats.totalCorrect + stats.totalIncorrect + stats.totalTimedOut;
  const lifetimeAccuracy = totalAttempted > 0
    ? Math.round((stats.totalCorrect / totalAttempted) * 100)
    : 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Trophy className="text-amber" size={22} />
            <h2 className="modal-title">Lifetime Quiz Statistics</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="stats-grid-2x2">
            <div className="stat-box">
              <span className="stat-label">High Score</span>
              <span className="stat-val text-orange">{stats.highScore}</span>
            </div>

            <div className="stat-box">
              <span className="stat-label">Quizzes Completed</span>
              <span className="stat-val">{stats.gamesPlayed}</span>
            </div>

            <div className="stat-box">
              <span className="stat-label">Lifetime Accuracy</span>
              <span className="stat-val text-emerald">{lifetimeAccuracy}%</span>
            </div>

            <div className="stat-box">
              <span className="stat-label">Best Streak</span>
              <span className="stat-val text-amber">
                <Flame size={18} className="inline mr-1" />
                {stats.bestStreak}
              </span>
            </div>
          </div>

          <div className="stats-breakdown-row">
            <div className="breakdown-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>{stats.totalCorrect} Correct answers</span>
            </div>
            <div className="breakdown-item">
              <Award size={15} className="text-orange" />
              <span>{stats.totalScore} Total points earned</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-reset-stats"
            onClick={() => {
              if (window.confirm("Reset all stored quiz statistics?")) {
                onResetStats();
              }
            }}
          >
            <Trash2 size={14} />
            <span>Reset History</span>
          </button>

          <button
            type="button"
            className="btn-modal-close"
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
