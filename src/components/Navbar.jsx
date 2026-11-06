import React from "react";
import { QuizLogo } from "./QuizLogo";
import { Volume2, VolumeX, Trophy, Flame, Clock } from "lucide-react";

export const Navbar = ({
  score = 0,
  streak = 0,
  isMuted,
  onToggleSound,
  onOpenStats,
  timerEnabled,
  currentView,
}) => {
  return (
    <header className="quiz-navbar">
      <div className="navbar-container">
        {/* Logo and branding */}
        <div className="navbar-brand">
          <div className="navbar-logo-wrap">
            <QuizLogo className="navbar-logo" />
          </div>
          <div className="navbar-title-wrap">
            <div className="navbar-title-row">
              <span className="navbar-title">Quiz<span className="text-orange">App</span></span>
              <span className="navbar-version-badge">v2.0</span>
            </div>
            <span className="navbar-tagline">Test & Master Tech Knowledge</span>
          </div>
        </div>

        {/* Live HUD / Quick actions */}
        <div className="navbar-actions">
          {currentView === "quiz" && (
            <>
              {/* Live Streak indicator */}
              <div className={`hud-badge streak-badge ${streak > 1 ? "active" : ""}`} title="Current streak">
                <Flame className="hud-icon flame-icon" size={16} />
                <span className="hud-label">Streak:</span>
                <span className="hud-value">{streak}</span>
              </div>

              {/* Live Score indicator */}
              <div className="hud-badge score-badge" title="Current score">
                <span className="hud-label">Score:</span>
                <span className="hud-value text-orange">{score}</span>
              </div>

              {/* Timer indicator */}
              {timerEnabled && (
                <div className="hud-badge timer-badge" title="60s timer per question is active">
                  <Clock className="hud-icon text-orange" size={15} />
                  <span className="hud-label">60s Timer</span>
                </div>
              )}
            </>
          )}

          {/* Sound Toggle */}
          <button
            type="button"
            className="navbar-btn sound-btn"
            onClick={onToggleSound}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            {isMuted ? (
              <VolumeX size={18} className="text-muted" />
            ) : (
              <Volume2 size={18} className="text-orange" />
            )}
          </button>

          {/* Lifetime Stats Modal Trigger */}
          <button
            type="button"
            className="navbar-btn stats-btn"
            onClick={onOpenStats}
            aria-label="View lifetime quiz statistics"
            title="View Statistics & High Scores"
          >
            <Trophy size={18} className="text-amber" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
