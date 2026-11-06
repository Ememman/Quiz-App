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
    <header className="quiz-navbar sticky top-0 z-50 w-full backdrop-blur-md bg-[#0f1016]/85 border-b border-white/10 px-3 sm:px-6 py-2.5 pt-[max(0.625rem,env(safe-area-inset-top))] transition-all">
      <div className="navbar-container max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo and branding */}
        <div className="navbar-brand flex items-center gap-2 sm:gap-3 cursor-pointer group">
          <div className="navbar-logo-wrap w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:-rotate-3">
            <QuizLogo className="navbar-logo w-full h-full" />
          </div>
          <div className="navbar-title-wrap flex flex-col">
            <div className="navbar-title-row flex items-center gap-1.5">
              <span className="navbar-title font-extrabold text-base sm:text-xl tracking-tight text-white">
                Quiz<span className="text-orange-500">App</span>
              </span>
              <span className="navbar-version-badge text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                v2.0
              </span>
            </div>
            <span className="navbar-tagline text-[11px] text-slate-400 font-medium hidden sm:inline-block">
              Test & Master Tech Knowledge
            </span>
          </div>
        </div>

        {/* Live HUD / Quick actions */}
        <div className="navbar-actions flex items-center gap-1.5 sm:gap-3">
          {currentView === "quiz" && (
            <>
              {/* Live Streak indicator */}
              <div
                className={`hud-badge streak-badge flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  streak > 1
                    ? "bg-orange-500/15 border-orange-500/40 text-white shadow-sm shadow-orange-500/20"
                    : "bg-[#14151e] border-white/10 text-slate-300"
                } border`}
                title="Current streak"
              >
                <Flame className="hud-icon flame-icon text-orange-500 shrink-0" size={14} />
                <span className="hud-label hidden xs:inline text-slate-400">Streak:</span>
                <span className="hud-value font-bold text-orange-400">{streak}</span>
              </div>

              {/* Live Score indicator */}
              <div
                className="hud-badge score-badge flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-[#14151e] border border-white/10 text-slate-300"
                title="Current score"
              >
                <span className="hud-label hidden xs:inline text-slate-400">Score:</span>
                <span className="hud-value font-extrabold text-orange-500">{score}</span>
              </div>

              {/* Timer indicator */}
              {timerEnabled && (
                <div
                  className="hud-badge timer-badge hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#14151e] border border-white/10 text-slate-300"
                  title="60s timer per question is active"
                >
                  <Clock className="hud-icon text-orange-500" size={13} />
                  <span className="hud-label">60s Timer</span>
                </div>
              )}
            </>
          )}

          {/* Sound Toggle */}
          <button
            type="button"
            className="navbar-btn sound-btn w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#14151e] border border-white/10 hover:border-orange-500/40 hover:bg-[#1a1b26] flex items-center justify-center transition-all cursor-pointer text-slate-300 hover:text-white"
            onClick={onToggleSound}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            {isMuted ? (
              <VolumeX size={17} className="text-slate-500" />
            ) : (
              <Volume2 size={17} className="text-orange-500" />
            )}
          </button>

          {/* Lifetime Stats Modal Trigger */}
          <button
            type="button"
            className="navbar-btn stats-btn w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#14151e] border border-white/10 hover:border-orange-500/40 hover:bg-[#1a1b26] flex items-center justify-center transition-all cursor-pointer text-amber-400 hover:text-amber-300"
            onClick={onOpenStats}
            aria-label="View lifetime quiz statistics"
            title="View Statistics & High Scores"
          >
            <Trophy size={17} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
