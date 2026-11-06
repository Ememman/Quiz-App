import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { QuizLogo } from "./QuizLogo";
import {
  RotateCcw,
  Sliders,
  Share2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  Award,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import sounds from "../utils/soundEffects";

export const ResultsScreen = ({
  score,
  results,
  totalQuestions,
  bestStreak,
  totalTimeSeconds,
  onRestart,
  onResetSettings,
}) => {
  const [filter, setFilter] = useState("all"); // 'all' | 'correct' | 'incorrect'
  const [copied, setCopied] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const correctCount = results.filter((r) => r.isCorrect).length;
  const incorrectCount = results.filter((r) => !r.isCorrect && !r.isTimedOut).length;
  const timedOutCount = results.filter((r) => r.isTimedOut).length;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // Performance Rank
  let rank = { title: "Code Apprentice", color: "#F97316", badge: "🌱" };
  if (accuracy >= 90) {
    rank = { title: "Web Mastermind", color: "#FF7A00", badge: "👑" };
  } else if (accuracy >= 75) {
    rank = { title: "Senior Architect", color: "#FB923C", badge: "⚡" };
  } else if (accuracy >= 50) {
    rank = { title: "Proficient Developer", color: "#FBBF24", badge: "🚀" };
  }

  // Trigger confetti on mount if score is good (> 50%)
  useEffect(() => {
    sounds.playFanfare();

    if (accuracy >= 50) {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#F97316", "#FB923C", "#FBBF24", "#FFFFFF"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#EA580C", "#FF7A00", "#10B981", "#FFF2E8"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [accuracy]);

  const handleShare = () => {
    const text = `🏆 Quiz App Score: ${score} pts (${accuracy}% Accuracy)\n✅ Correct: ${correctCount}/${totalQuestions}\n🔥 Best Streak: ${bestStreak}\nRank: ${rank.badge} ${rank.title}\nTested on Dark & Orange Quiz App!`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const filteredResults = results.filter((r) => {
    if (filter === "correct") return r.isCorrect;
    if (filter === "incorrect") return !r.isCorrect;
    return true;
  });

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins > 0 ? `${mins}m ` : ""}${remaining}s`;
  };

  return (
    <div className="results-container animate-fade-in">
      {/* Top Banner Card */}
      <div className="results-hero-card">
        <div className="results-logo-badge">
          <QuizLogo className="w-16 h-16" />
        </div>

        <div className="results-hero-info">
          <div className="rank-tag">
            <span>{rank.badge}</span>
            <span>{rank.title}</span>
          </div>
          <h1 className="results-title">Quiz Completed!</h1>
          <p className="results-subtitle">
            Here is your final score breakdown and comprehensive review.
          </p>
        </div>

        {/* Big Score Display */}
        <div className="results-score-dial">
          <div className="score-number-display">
            <span className="score-value">{score}</span>
            <span className="score-units">PTS</span>
          </div>
          <div className="score-accuracy-sub">
            {accuracy}% Accuracy
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card metric-correct">
          <CheckCircle2 size={20} className="text-emerald" />
          <div className="metric-info">
            <span className="metric-num">{correctCount}</span>
            <span className="metric-label">Correct</span>
          </div>
        </div>

        <div className="metric-card metric-wrong">
          <XCircle size={20} className="text-red" />
          <div className="metric-info">
            <span className="metric-num">{incorrectCount}</span>
            <span className="metric-label">Incorrect</span>
          </div>
        </div>

        {timedOutCount > 0 && (
          <div className="metric-card metric-timeout">
            <AlertTriangle size={20} className="text-amber" />
            <div className="metric-info">
              <span className="metric-num">{timedOutCount}</span>
              <span className="metric-label">Timed Out</span>
            </div>
          </div>
        )}

        <div className="metric-card metric-streak">
          <Flame size={20} className="text-orange" />
          <div className="metric-info">
            <span className="metric-num">{bestStreak}</span>
            <span className="metric-label">Best Streak</span>
          </div>
        </div>

        <div className="metric-card metric-time">
          <Award size={20} className="text-orange" />
          <div className="metric-info">
            <span className="metric-num">{formatTime(totalTimeSeconds)}</span>
            <span className="metric-label">Time Taken</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="results-actions-bar">
        <button
          type="button"
          className="btn-action-primary"
          onClick={onRestart}
        >
          <RotateCcw size={17} />
          <span>Play Again</span>
        </button>

        <button
          type="button"
          className="btn-action-secondary"
          onClick={onResetSettings}
        >
          <Sliders size={17} />
          <span>Change Settings</span>
        </button>

        <button
          type="button"
          className="btn-action-share"
          onClick={handleShare}
        >
          {copied ? <Check size={17} /> : <Share2 size={17} />}
          <span>{copied ? "Copied Score!" : "Share Results"}</span>
        </button>
      </div>

      {/* Detailed Review Section */}
      <div className="results-review-card">
        <div className="review-header-bar">
          <h2 className="review-section-title">
            All Questions Review ({results.length})
          </h2>

          <div className="filter-pills">
            <button
              type="button"
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All ({results.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === "correct" ? "active" : ""}`}
              onClick={() => setFilter("correct")}
            >
              Correct ({correctCount})
            </button>
            <button
              type="button"
              className={`filter-btn ${filter === "incorrect" ? "active" : ""}`}
              onClick={() => setFilter("incorrect")}
            >
              Missed ({incorrectCount + timedOutCount})
            </button>
          </div>
        </div>

        <div className="review-list">
          {filteredResults.map((item, idx) => {
            const isExpanded =
              expandedId === item.question.id || filter !== "all";

            return (
              <div
                key={item.question.id}
                className={`review-item ${
                  item.isCorrect
                    ? "status-ok"
                    : item.isTimedOut
                    ? "status-timeout"
                    : "status-err"
                }`}
              >
                <div
                  className="review-item-header"
                  onClick={() =>
                    setExpandedId(
                      expandedId === item.question.id ? null : item.question.id
                    )
                  }
                >
                  <div className="review-status-col">
                    {item.isCorrect ? (
                      <CheckCircle2 size={20} className="icon-correct" />
                    ) : item.isTimedOut ? (
                      <AlertTriangle size={20} className="icon-timeout" />
                    ) : (
                      <XCircle size={20} className="icon-incorrect" />
                    )}
                  </div>

                  <div className="review-title-col">
                    <div className="review-meta-line">
                      <span className="q-badge">Q{idx + 1}</span>
                      <span className="cat-badge">{item.question.category}</span>
                      <span className="diff-badge">
                        {item.question.difficulty}
                      </span>
                      {item.isTimedOut && (
                        <span className="timeout-badge">Timed Out (-1 pt)</span>
                      )}
                    </div>
                    <p className="review-question-text">
                      {item.question.question}
                    </p>
                  </div>

                  <div className="review-toggle-col">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="review-details animate-fade-in">
                    {/* User's response vs Correct answer */}
                    <div className="answers-comparison-box">
                      <div className="answer-row">
                        <span className="answer-label">Your Answer:</span>
                        <span
                          className={`answer-value ${
                            item.isCorrect
                              ? "text-emerald"
                              : item.isTimedOut
                              ? "text-amber"
                              : "text-red"
                          }`}
                        >
                          {item.isTimedOut
                            ? "No answer chosen (Time expired)"
                            : item.question.options[item.selectedAnswerIndex]}
                        </span>
                      </div>

                      {!item.isCorrect && (
                        <div className="answer-row">
                          <span className="answer-label">Correct Answer:</span>
                          <span className="answer-value text-emerald font-semibold">
                            {item.question.options[item.question.correctIndex]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Explanation */}
                    <div className="review-explanation">
                      <strong>Concept Explanation:</strong>
                      <p>{item.question.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
