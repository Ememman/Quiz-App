import questionsData from "./quizQuestions.json";

export const ALL_QUESTIONS = questionsData;

export const CATEGORIES = [
  "All",
  "HTML",
  "CSS",
  "JavaScript",
  "Frameworks",
];

export const DIFFICULTIES = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
];

export function getFilteredQuestions(
  category = "All",
  difficulty = "All",
  limit
) {
  let list = [...ALL_QUESTIONS];

  if (category !== "All") {
    list = list.filter((q) => q.category.toLowerCase() === category.toLowerCase());
  }

  if (difficulty !== "All") {
    list = list.filter(
      (q) => q.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }

  // Shuffle order for fresh experience
  list = list.sort(() => Math.random() - 0.5);

  if (limit && limit > 0) {
    list = list.slice(0, limit);
  }

  return list;
}
