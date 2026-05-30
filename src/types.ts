export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  period: 'pre-historia' | 'antiguidade' | 'idade-media' | 'portugal-medieval';
  imagePlaceholder?: string;
  curiosity?: string;
}

export interface HistoricalSource {
  id: string;
  title: string;
  theme: string;
  type: 'Textual' | 'Arqueológica' | 'Iconográfica' | 'Cartográfica';
  authorAndDate?: string;
  content: string; // text or description of the image/object
  imageUrl?: string;
  commentary: string;
  guidingQuestions: {
    question: string;
    answer: string;
  }[];
}

export interface Flashcard {
  id: string;
  concept: string;
  definition: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of options
  explanation: string;
}

export interface FillBlankQuestion {
  id: string;
  sentenceWithBlank: string; // e.g., "O Homo Sapiens desenvolveu a arte ________ no Paleolítico."
  blankValue: string; // "rupestre"
  hints: string[];
}

export interface MatchPair {
  id: string;
  term: string;
  definition: string;
}

export interface EscapeRoomStep {
  id: string;
  title: string;
  clue: string;
  riddle: string;
  answerOptions: string[];
  correctIndex: number;
  successMessage: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAtPoints: number;
}

export interface StudentProgress {
  studentName: string;
  points: number;
  completedQuizzes: string[]; // question ids or quiz ids list
  completedGames: string[]; // game type ids list
  completedThemes: string[]; // theme index as string
  unlockedBadges: string[]; // badged ids list
}

export interface Curio {
  id: string;
  title: string;
  author: string;
  era: string;
  text: string;
  impact: string;
}
