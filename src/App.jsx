import React, { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { StartScreen } from "./components/StartScreen";
import { QuestionCard } from "./components/QuestionCard";
import { ResultsScreen } from "./components/ResultsScreen";
import { StatsModal } from "./components/StatsModal";
import { getFilteredQuestions } from "./data/quizQuestions";
import sounds from "./utils/soundEffects";
import "./App.css";

const STORAGE_KEY_STATS = "quiz_app_lifetime_stats";

const DEFAULT_STATS = {
  highScore: 0,
  gamesPlayed: 0,
  totalScore: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  totalTimedOut: 0,
  bestStreak: 0,
};

export function App() {
  // Navigation / View
  const [currentView, setCurrentView] = useState("start"); // 'start' | 'quiz' | 'results'

  // Quiz Configuration
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [questionCount, setQuestionCount] = useState(5);

  // Active Quiz State
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [resultsHistory, setResultsHistory] = useState([]);
  const quizStartTimeRef = useRef(0);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState(0);

  // Sound State
  const [isMuted, setIsMuted] = useState(() => sounds.getMuted());

  // Stats Modal
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [stats, setStats] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_STATS);
      return stored ? JSON.parse(stored) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  // Calculate available pool for selected filter
  const availableCount = getFilteredQuestions(category, difficulty).length;

  // Sound Toggle Handler
  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  // Start Quiz Handler
  const handleStartQuiz = () => {
    const limit = questionCount === "all" ? undefined : questionCount;
    const pool = getFilteredQuestions(category, difficulty, limit);

    setQuestions(pool);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSelectedAnswerIndex(null);
    setHasAnswered(false);
    setIsTimedOut(false);
    setTimeRemaining(60);
    setResultsHistory([]);
    quizStartTimeRef.current = Date.now();
    setCurrentView("quiz");
  };

  // Handle Timeout (Score decremented by 1 point, skip to next feedback)
  const handleQuestionTimeout = useCallback(() => {
    setIsTimedOut(true);
    sounds.playTimeout();

    // Score decrement by 1 as specified in requirements
    setScore((prev) => Math.max(0, prev - 1));
    setStreak(0);

    const currentQ = questions[currentIndex];
    if (currentQ) {
      setResultsHistory((prev) => [
        ...prev,
        {
          question: currentQ,
          selectedAnswerIndex: null,
          isCorrect: false,
          isTimedOut: true,
        },
      ]);
    }
  }, [questions, currentIndex]);

  // Timer Effect for active question
  useEffect(() => {
    if (currentView !== "quiz") return;
    if (!timerEnabled) return;
    if (hasAnswered || isTimedOut) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuestionTimeout();
          return 0;
        }

        // Ticking audio when time is critically low
        if (prev <= 10) {
          sounds.playTick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentView, timerEnabled, hasAnswered, isTimedOut, handleQuestionTimeout]);

  // Handle Answer Selection
  const handleAnswer = (optionIndex) => {
    if (hasAnswered || isTimedOut) return;

    setHasAnswered(true);
    setSelectedAnswerIndex(optionIndex);

    const currentQ = questions[currentIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;

    if (isCorrect) {
      sounds.playCorrect();
      setScore((prev) => prev + 10);
      setStreak((prev) => {
        const next = prev + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      sounds.playWrong();
      setStreak(0);
    }

    setResultsHistory((prev) => [
      ...prev,
      {
        question: currentQ,
        selectedAnswerIndex: optionIndex,
        isCorrect,
        isTimedOut: false,
      },
    ]);
  };

  // Update Lifetime Stats in localStorage
  const updateLifetimeStats = useCallback((finalScore) => {
    setStats((prev) => {
      const correct = resultsHistory.filter((r) => r.isCorrect).length;
      const incorrect = resultsHistory.filter(
        (r) => !r.isCorrect && !r.isTimedOut
      ).length;
      const timedOut = resultsHistory.filter((r) => r.isTimedOut).length;

      const updated = {
        highScore: Math.max(prev.highScore, finalScore),
        gamesPlayed: prev.gamesPlayed + 1,
        totalScore: prev.totalScore + finalScore,
        totalCorrect: prev.totalCorrect + correct,
        totalIncorrect: prev.totalIncorrect + incorrect,
        totalTimedOut: prev.totalTimedOut + timedOut,
        bestStreak: Math.max(prev.bestStreak, bestStreak),
      };

      try {
        localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(updated));
      } catch {
        // ignore
      }

      return updated;
    });
  }, [resultsHistory, bestStreak]);

  // Next Question / Complete Quiz
  const handleNext = useCallback(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswerIndex(null);
      setHasAnswered(false);
      setIsTimedOut(false);
      setTimeRemaining(60);
    } else {
      // Quiz finished!
      const elapsed = Math.round((Date.now() - quizStartTimeRef.current) / 1000);
      setTotalTimeSeconds(elapsed);
      setCurrentView("results");
      updateLifetimeStats(score);
    }
  }, [currentIndex, questions.length, score, updateLifetimeStats]);

  // Reset Lifetime Stats
  const handleResetStats = () => {
    setStats(DEFAULT_STATS);
    try {
      localStorage.removeItem(STORAGE_KEY_STATS);
    } catch {
      // ignore
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-app-root">
      {/* Dynamic Background Glow Elements */}
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      {/* Top Navigation Bar */}
      <Navbar
        score={score}
        streak={streak}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onOpenStats={() => setIsStatsOpen(true)}
        timerEnabled={timerEnabled}
        currentView={currentView}
      />

      {/* Main View Container */}
      <main className="main-content-layout w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex-1 flex flex-col justify-center">
        {currentView === "start" && (
          <StartScreen
            category={category}
            setCategory={setCategory}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            timerEnabled={timerEnabled}
            setTimerEnabled={setTimerEnabled}
            questionCount={questionCount}
            setQuestionCount={setQuestionCount}
            availableCount={availableCount}
            onStart={handleStartQuiz}
          />
        )}

        {currentView === "quiz" && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            timerEnabled={timerEnabled}
            timeRemaining={timeRemaining}
            isTimedOut={isTimedOut}
            selectedAnswerIndex={selectedAnswerIndex}
            hasAnswered={hasAnswered}
            onNext={handleNext}
            isLastQuestion={currentIndex + 1 === questions.length}
          />
        )}

        {currentView === "results" && (
          <ResultsScreen
            score={score}
            results={resultsHistory}
            totalQuestions={questions.length}
            bestStreak={bestStreak}
            totalTimeSeconds={totalTimeSeconds}
            onRestart={handleStartQuiz}
            onResetSettings={() => setCurrentView("start")}
          />
        )}
      </main>

      {/* Lifetime Stats Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        onResetStats={handleResetStats}
      />
    </div>
  );
}

export default App;
