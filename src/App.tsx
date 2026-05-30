import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  BookOpen,
  Gamepad2,
  Calendar,
  Image as ImageIcon,
  Scroll,
  Lightbulb,
  Award,
  Trophy,
  Moon,
  Sun,
  Type,
  Menu,
  X,
  Compass,
  Star,
  Users,
  MessageCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

// Modular views imports
import WelcomeModal from './components/WelcomeModal';
import ContentsView from './components/ContentsView';
import GamesView from './components/GamesView';
import TimelineView from './components/TimelineView';
import GalleryView from './components/GalleryView';
import SourcesView from './components/SourcesView';
import CuriositiesView from './components/CuriositiesView';
import QuizFinalView from './components/QuizFinalView';
import ProgressView from './components/ProgressView';

export default function App() {
  // Personalisation states
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('hist_student_name') || '';
  });
  const [showWelcome, setShowWelcome] = useState<boolean>(!studentName);

  // States synchronized using localStorage to allow data preservation across activities!
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem('hist_student_points');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [completedThemes, setCompletedThemes] = useState<string[]>(() => {
    const saved = localStorage.getItem('hist_completed_themes');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedGames, setCompletedGames] = useState<string[]>(() => {
    const saved = localStorage.getItem('hist_completed_games');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>(() => {
    const saved = localStorage.getItem('hist_completed_quizzes');
    return saved ? JSON.parse(saved) : [];
  });

  // Layout navigation toggle
  const [currentSection, setCurrentSection] = useState<string>('inicio');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Accessibility toggle states
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('hist_theme_dark') === 'true';
  });
  const [isLargeText, setIsLargeText] = useState<boolean>(() => {
    return localStorage.getItem('hist_font_large') === 'true';
  });

  // Sync state modifications to localStorage
  useEffect(() => {
    if (studentName) {
      localStorage.setItem('hist_student_name', studentName);
    }
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('hist_student_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('hist_completed_themes', JSON.stringify(completedThemes));
  }, [completedThemes]);

  useEffect(() => {
    localStorage.setItem('hist_completed_games', JSON.stringify(completedGames));
  }, [completedGames]);

  useEffect(() => {
    localStorage.setItem('hist_completed_quizzes', JSON.stringify(completedQuizzes));
  }, [completedQuizzes]);

  // Dark mode effect setup
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hist_theme_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hist_theme_dark', 'false');
    }
  }, [isDarkMode]);

  // Large Text effect setup
  useEffect(() => {
    if (isLargeText) {
      document.documentElement.classList.add('accessible-text-large');
      localStorage.setItem('hist_font_large', 'true');
    } else {
      document.documentElement.classList.remove('accessible-text-large');
      localStorage.setItem('hist_font_large', 'false');
    }
  }, [isLargeText]);

  const handleSetName = (name: string) => {
    setStudentName(name);
    setShowWelcome(false);
  };

  const handleAddPoints = (add: number) => {
    setPoints((prev) => prev + add);
  };

  const handleCompleteTheme = (themeId: string) => {
    setCompletedThemes((prev) => {
      if (prev.includes(themeId)) return prev;
      return [...prev, themeId];
    });
  };

  const handleCompleteGame = (gameId: string) => {
    setCompletedGames((prev) => {
      if (prev.includes(gameId)) return prev;
      return [...prev, gameId];
    });
  };

  const handleCompleteQuiz = (score: number) => {
    setCompletedQuizzes((prev) => {
      if (prev.includes('final')) return prev;
      return [...prev, 'final'];
    });
    // Add grading points
    handleAddPoints(score * 40);
  };

  const resetAllProgress = () => {
    if (window.confirm('Queres mesmo apagar todo o teu progresso para reiniciar a aventura?')) {
      localStorage.clear();
      setStudentName('');
      setPoints(0);
      setCompletedThemes([]);
      setCompletedGames([]);
      setCompletedQuizzes([]);
      setCurrentSection('inicio');
      setShowWelcome(true);
    }
  };

  // Nav categories items definitions
  const MENU_ITEMS = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'conteudos', label: 'Conteúdos do Programa', icon: BookOpen },
    { id: 'jogos', label: 'Jogos e Desafios', icon: Gamepad2 },
    { id: 'timeline', label: 'Linha do Tempo', icon: Calendar },
    { id: 'gallery', label: 'Galeria Histórica', icon: ImageIcon },
    { id: 'sources', label: 'Fontes Históricas', icon: Scroll },
    { id: 'curiosities', label: 'Curiosidades', icon: Lightbulb },
    { id: 'quiz-final', label: 'Quiz Final', icon: Award },
    { id: 'progress', label: 'O Meu Progresso', icon: Trophy }
  ];

  return (
    <div className={`min-h-screen font-sans bg-[#F4F7F9] dark:bg-[#0B131E] text-slate-800 dark:text-slate-100 transition-colors duration-300 ${
      isLargeText ? 'accessible-text-large' : ''
    }`}>
      
      {/* Dynamic Welcome Modal overlay if name untracked */}
      {showWelcome && (
        <WelcomeModal
          onSetName={handleSetName}
          savedName={studentName}
        />
      )}

      {/* Top Header navbar banner */}
      <header className="sticky top-0 z-40 bg-white dark:bg-[#121E2C] border-b border-slate-200 dark:border-slate-800 w-full h-20 px-4 lg:px-8 flex items-center justify-between gap-4 print:hidden">
        
        {/* Brand identity & Left-hand welcome profile bar */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
          >
            <Menu className="w-5 h-5 text-slate-705 dark:text-slate-300" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-850 border-2 border-amber-500 flex items-center justify-center text-lg shadow-xs select-none">
              👦
            </div>
            <div className="text-left font-sans">
              <h2 className="font-bold text-sm lg:text-base text-slate-800 dark:text-white leading-tight">
                Olá, {studentName || 'Estudante'}!
              </h2>
              <p className="text-[11px] lg:text-xs text-slate-500 dark:text-slate-400">
                Pronto para explorar o passado?
              </p>
            </div>
          </div>
        </div>

        {/* Action center header shortcuts */}
        <div className="flex items-center gap-3">
          
          {/* Points indicator tracker in gold pill format */}
          {studentName && (
            <div className="flex items-center gap-2 bg-slate-108 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 font-sans text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs shrink-0 select-none">
              <span className="text-amber-500 font-normal">🥇</span>
              <span>{points} XP</span>
            </div>
          )}

          {/* Accessibility toggle - LARGE TEXT */}
          <button
            onClick={() => setIsLargeText(!isLargeText)}
            title={isLargeText ? "Reduzir tamanho da letra" : "Aumentar tamanho da letra (Acessibilidade)"}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isLargeText
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-white hover:bg-slate-100 text-slate-705 border-slate-200 dark:bg-[#121E2C] dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-300'
            }`}
          >
            <Type className="w-4.5 h-4.5" />
          </button>

          {/* Accessibility toggle - DARK MODE */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Ligar Modo Claro" : "Ligar Modo Escuro (Acessibilidade)"}
            className="p-2.5 rounded-xl border bg-white hover:bg-slate-100 dark:bg-[#121E2C] dark:hover:bg-slate-800 dark:border-slate-800 text-slate-705 dark:text-slate-300 transition-all cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

        </div>
      </header>

      {/* Primary body frame containing side bar and main core content panel */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto min-h-[calc(100vh-68px)]">
        
        {/* RESPONSIVE DRAWER SIDEBAR NAVIGATION FRAME (exclude from print) */}
        <aside className={`fixed lg:sticky top-0 lg:top-20 left-0 z-30 h-screen lg:h-[calc(100vh-80px)] w-72 bg-[#1A2B3C] dark:bg-[#0E1724] text-white p-6 flex flex-col justify-between transition-transform duration-300 shrink-0 border-r border-[#152331] dark:border-[#090f18] print:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          
          <div className="space-y-6">
            {/* Header within drawer with 7.º banner and close button */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 text-[#1A2B3C] rounded-lg flex items-center justify-center font-black text-xl shrink-0">
                  7.º
                </div>
                <h1 className="text-sm font-bold leading-tight text-white font-serif">
                  História 7.º Ano<br/>
                  <span className="text-[10px] font-normal text-slate-400 underline decoration-amber-500/50">
                    Prof.ª Carla Oliveira
                  </span>
                </h1>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile status widget in geometric progress layout */}
            {studentName && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2 font-sans select-none">
                <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">O Meu Progresso</p>
                <div className="flex justify-between text-xs text-slate-200">
                  <span className="font-medium truncate max-w-[120px]">{studentName}</span>
                  <span className="font-mono font-bold text-amber-400 shrink-0">{points} XP</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (points / 1500) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Scrolling Navigation anchors list with flat amber borders */}
            <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-270px)] pr-1">
              {MENU_ITEMS.map((item) => {
                const ItemIcon = item.icon;
                const active = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentSection(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-left transition-all border-l-4 cursor-pointer rounded-r-lg ${
                      active
                        ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                        : 'text-slate-300 border-transparent hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <ItemIcon className="w-4.5 h-4.5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Reset progression trigger */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={resetAllProgress}
              className="w-full py-2.5 text-center text-[10px] uppercase font-mono font-bold text-slate-400 hover:text-red-400 transition-colors border border-dashed border-white/10 hover:border-red-500/50 rounded-xl cursor-pointer"
            >
              Reiniciar Aventura Nacional
            </button>
          </div>

        </aside>

        {/* CLICK-AWAY CLOSE DRAWERS ON MOBILE */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/25 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* MAIN PRIMARY CORE CONTENTS VIEW BOX (with viewport animations) */}
        <main className="flex-1 p-6 lg:p-10 w-full overflow-hidden print:p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >              {/* SECTION 1: INÍCIO (Educational Welcome Dashboard) */}
              {currentSection === 'inicio' && (
                <div className="space-y-8">
                  {/* Hero banner title - Deep Navy & Amber details */}
                  <div className="bg-[#1A2B3C] text-white rounded-xl p-8 relative overflow-hidden border border-slate-205 dark:border-slate-800 shadow-sm">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-slate-800/20 rounded-full blur-3xl -mr-28 -mt-28 pointer-events-none" />
                    
                    <div className="relative z-10 space-y-4 max-w-2xl">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 px-3 py-1 rounded-md border border-amber-500/20">
                        Bem-vinda(o) à Disciplina de História
                      </span>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight tracking-tight text-white">
                        Viagem no Tempo de Portugal e do Mundo
                      </h2>
                      <p className="text-slate-350 text-xs md:text-sm leading-relaxed">
                        Olá, <strong className="text-amber-400 font-bold">{studentName || 'Estudante'}</strong>! Bem-vinda(o) às aulas de História da professora <strong className="text-white underline decoration-amber-500">Carla Oliveira</strong>. Explora os conteúdos programados alinhados às Aprendizagens Essenciais, vence os jogos e desbloqueia o teu diploma oficial!
                      </p>
                    </div>
                  </div>

                  {/* Quick features Grid - structured layout with solid geometric status lines */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Feature 1: Study center shortcut */}
                    <div className="bg-white dark:bg-[#121E2C] border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-amber-500 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 text-[#1A2B3C] dark:text-amber-400 rounded-lg w-fit">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="font-sans font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Unidades de Estudo</h3>
                          <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                            Lê os textos adequados ao 7.º ano divididos nos 4 temas do programa curricular. Usa a leitura falada por voz!
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCurrentSection('conteudos')}
                        className="text-xs font-bold text-[#1A2B3C] dark:text-amber-450 dark:text-amber-400 flex items-center gap-1 hover:gap-2 pt-2 transition-all cursor-pointer w-fit"
                      >
                        Estudar Matéria <ArrowRight className="w-4 h-4 text-amber-500" />
                      </button>
                    </div>

                    {/* Feature 2: Games Center shortcut */}
                    <div className="bg-white dark:bg-[#121E2C] border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 text-[#1A2B3C] dark:text-amber-400 rounded-lg w-fit">
                          <Gamepad2 className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="font-sans font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">Laboratório de Jogos</h3>
                          <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                            Enfrenta o Escape Room histórico, ordena eventos cronológicos e emparelha conceitos curriculares.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCurrentSection('jogos')}
                        className="text-xs font-bold text-[#1A2B3C] dark:text-amber-450 dark:text-amber-400 flex items-center gap-1 hover:gap-2 pt-2 transition-all cursor-pointer w-fit"
                      >
                        Jogar e Amealhar XP <ArrowRight className="w-4 h-4 text-blue-505 text-blue-550 text-blue-500" />
                      </button>
                    </div>

                    {/* Feature 3: Progress & Diploma */}
                    <div className="bg-white dark:bg-[#121E2C] border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-4 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-[#1A2B3C] dark:border-l-amber-500 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 text-[#1A2B3C] dark:text-amber-400 rounded-lg w-fit">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="font-sans font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">O Meu Progresso</h3>
                          <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                            Acompanha o teu saldo de pontos, as medalhas conquistadas e gera o teu Certificado oficial ao atingires 1000 XP!
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCurrentSection('progress')}
                        className="text-xs font-bold text-[#1A2B3C] dark:text-amber-450 dark:text-amber-400 flex items-center gap-1 hover:gap-2 pt-2 transition-all cursor-pointer w-fit"
                      >
                        Ver Doutorado <ArrowRight className="w-4 h-4 text-amber-505 text-amber-500" />
                      </button>
                    </div>

                  </div>

                  {/* Letter from teacher Carla section */}
                  <div className="p-6 rounded-xl bg-white dark:bg-[#121E2C] border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-6 items-center shadow-sm">
                    <div className="md:col-span-3 space-y-3">
                      <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-[#1A2B3C] dark:text-amber-450 dark:text-amber-400 underline decoration-amber-500/50">Mensagem da Professora Carla Oliveira:</h4>
                      <p className="font-serif text-sm italic text-slate-650 dark:text-slate-300 leading-relaxed">
                        "Estudar História do 7.º ano não se resume a catalogar datas ou dinastias esquecidas no tempo. Compreender História é desvendar o porquê de vivermos em sociedades democráticas com isonomia, sabermos o latim que gerou as nossas palavras e reconhecermos a arte dos nossos monumentos. Convido-te a avançar nesta jornada autónoma e interativa com afinco!"
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-[#1C2C3E]/50 rounded-xl flex flex-col items-center justify-center text-center space-y-1 self-stretch border border-slate-200 dark:border-slate-800 shadow-inner">
                      <Users className="w-7 h-7 text-[#1A2B3C] dark:text-amber-400" />
                      <span className="block text-xs font-sans font-bold pt-1 text-slate-850 dark:text-slate-200">Prof.ª Carla Oliveira</span>
                      <span className="block text-[10px] text-slate-400 italic">Tutora de História</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 2: CONTEÚDOS */}
              {currentSection === 'conteudos' && (
                <ContentsView
                  onAddPoints={handleAddPoints}
                  completedThemes={completedThemes}
                  onCompleteTheme={handleCompleteTheme}
                  studentName={studentName}
                />
              )}

              {/* SECTION 3: JOGOS & DESAFIOS */}
              {currentSection === 'jogos' && (
                <GamesView
                  onAddPoints={handleAddPoints}
                  completedGames={completedGames}
                  onCompleteGame={handleCompleteGame}
                  studentName={studentName}
                />
              )}

              {/* SECTION 4: TIMELINE */}
              {currentSection === 'timeline' && (
                <TimelineView />
              )}

              {/* SECTION 5: GALLERY */}
              {currentSection === 'gallery' && (
                <GalleryView />
              )}

              {/* SECTION 6: SOURCES */}
              {currentSection === 'sources' && (
                <SourcesView />
              )}

              {/* SECTION 7: CURIOSITIES */}
              {currentSection === 'curiosities' && (
                <CuriositiesView />
              )}

              {/* SECTION 8: QUIZ FINAL */}
              {currentSection === 'quiz-final' && (
                <QuizFinalView
                  onAddPoints={handleAddPoints}
                  onCompleteQuiz={handleCompleteQuiz}
                  studentName={studentName}
                />
              )}

              {/* SECTION 9: PROGRESS */}
              {currentSection === 'progress' && (
                <ProgressView
                  studentName={studentName}
                  points={points}
                  completedThemes={completedThemes}
                  completedGames={completedGames}
                  completedQuizzes={completedQuizzes}
                />
              )}

            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
