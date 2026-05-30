import { useState } from 'react';
import { HISTORY_THEMES, ThemeUnit, HistoryTheme } from '../data/historyData';
import { BookOpen, Map, HelpCircle, FileText, ChevronLeft, ChevronRight, CheckCircle2, RotateCw, Lightbulb, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AudioNarration from './AudioNarration';

interface ContentsViewProps {
  onAddPoints: (points: number) => void;
  completedThemes: string[];
  onCompleteTheme: (themeId: string) => void;
  studentName: string;
}

export default function ContentsView({ onAddPoints, completedThemes, onCompleteTheme, studentName }: ContentsViewProps) {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(HISTORY_THEMES[0].id);
  const [activeTab, setActiveTab] = useState<'read' | 'map' | 'cards' | 'exercise'>('read');
  
  // Theme state
  const activeTheme = HISTORY_THEMES.find(t => t.id === selectedThemeId) || HISTORY_THEMES[0];
  const [activeUnitIndex, setActiveUnitIndex] = useState(0);
  const activeUnit = activeTheme.units[activeUnitIndex] || activeTheme.units[0];

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quick exercises state
  const [answeredTF, setAnsweredTF] = useState<Record<number, boolean>>({});
  const [tfSelection, setTfSelection] = useState<Record<number, boolean>>({});
  const [fbAnswers, setFbAnswers] = useState<Record<number, string>>({});
  const [fbChecked, setFbChecked] = useState<Record<number, boolean>>({});
  const [reflectionRevealed, setReflectionRevealed] = useState(false);

  const handleNextUnit = () => {
    if (activeUnitIndex < activeTheme.units.length - 1) {
      setActiveUnitIndex(activeUnitIndex + 1);
      setReflectionRevealed(false);
    }
  };

  const handlePrevUnit = () => {
    if (activeUnitIndex > 0) {
      setActiveUnitIndex(activeUnitIndex - 1);
      setReflectionRevealed(false);
    }
  };

  // True/False exercise validation
  const handleTfChoice = (idx: number, chooseTrue: boolean, isTrue: boolean) => {
    if (answeredTF[idx]) return;
    setTfSelection(prev => ({ ...prev, [idx]: chooseTrue }));
    setAnsweredTF(prev => ({ ...prev, [idx]: true }));
    if (chooseTrue === isTrue) {
      onAddPoints(20);
    }
  };

  // Fill in blanks validation
  const handleFbCheck = (idx: number, userVal: string, correctVal: string) => {
    if (fbChecked[idx]) return;
    const isCorrect = userVal.toLowerCase().trim() === correctVal.toLowerCase().trim();
    setFbChecked(prev => ({ ...prev, [idx]: true }));
    if (isCorrect) {
      onAddPoints(30);
    }
  };

  const handleCompleteTheme = () => {
    if (!completedThemes.includes(activeTheme.id)) {
      onCompleteTheme(activeTheme.id);
      onAddPoints(100);
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector of Themes in high visual quality layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-100 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
        {HISTORY_THEMES.map((theme) => {
          const isSelected = theme.id === selectedThemeId;
          const isCompleted = completedThemes.includes(theme.id);
          return (
            <button
              key={theme.id}
              onClick={() => {
                setSelectedThemeId(theme.id);
                setActiveUnitIndex(0);
                setActiveTab('read');
                setCardIndex(0);
                setIsFlipped(false);
                setAnsweredTF({});
                setTfSelection({});
                setFbAnswers({});
                setFbChecked({});
                setReflectionRevealed(false);
              }}
              className={`p-3 text-left rounded-xl border text-xs transition-all relative flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#1A2B3C] border-[#1A2B3C] text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-950 dark:border-slate-850 dark:text-slate-350'
              }`}
            >
              <div>
                <span className={`inline-block px-1.5 py-0.5 rounded font-mono font-bold text-[9px] mb-1.5 ${
                  isSelected ? 'bg-amber-500 text-[#1A2B3C]' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  TEMA {theme.number}
                </span>
                <p className="font-sans font-bold leading-tight line-clamp-2">
                  {theme.title}
                </p>
              </div>

              {isCompleted && (
                <div className={`mt-2 text-[9px] font-bold flex items-center gap-1 ${
                  isSelected ? 'text-amber-400 font-extrabold' : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  <CheckCircle2 className="w-3 h-3 text-amber-500" /> Concluído (+100 XP)
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Core content widget container block */}
      <div className="bg-white dark:bg-[#121E2C] border border-slate-205 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        
        {/* Navigation Tabs bar inside the container */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          {[
            { id: 'read', label: 'Estudo Teórico', icon: BookOpen },
            { id: 'map', label: 'Mapa Interativo', icon: Map },
            { id: 'cards', label: 'Flashcards Rememorativos', icon: Lightbulb },
            { id: 'exercise', label: 'Treino de Consolidação', icon: HelpCircle },
          ].map((tb) => {
            const ActiveIco = tb.icon;
            const active = tb.id === activeTab;
            return (
              <button
                key={tb.id}
                onClick={() => {
                  setActiveTab(tb.id as any);
                  setIsFlipped(false);
                }}
                className={`py-4 px-6 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all shrink-0 cursor-pointer ${
                  active
                    ? 'border-amber-500 text-[#1A2B3C] dark:text-amber-400 bg-slate-50/50 dark:bg-slate-900/10'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }`}
              >
                <ActiveIco className="w-4 h-4" />
                {tb.label}
              </button>
            );
          })}
        </div>

        {/* Tab contents window */}
        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            
            {/* TAB: READ - The text lecture block */}
            {activeTab === 'read' && (
              <motion.div
                key="read-unit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Unit sub-pagination */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-3 flex-wrap gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                      Unidade {activeUnitIndex + 1} de {activeTheme.units.length}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white leading-tight">
                      {activeUnit.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Audio reader button */}
                    <AudioNarration textToSpeak={`${activeUnit.title}. ${activeUnit.paragraphs.join(' ')}`} />

                    <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-lg p-1 bg-slate-50 dark:bg-slate-900">
                      <button
                        onClick={handlePrevUnit}
                        disabled={activeUnitIndex === 0}
                        className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-950 disabled:opacity-40 transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextUnit}
                        disabled={activeUnitIndex === activeTheme.units.length - 1}
                        className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-950 disabled:opacity-40 transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Summary box and core reading paragraphs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="col-span-2 space-y-4">
                    {activeUnit.paragraphs.map((para, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed font-sans"
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Summary / Educational takeaway sidebar panel */}
                  <div className="bg-slate-50 dark:bg-[#1C2C3E]/40 p-5 rounded-xl border border-slate-200 dark:border-slate-800 h-fit space-y-4 shadow-sm">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-550 dark:text-slate-400 flex items-center gap-1.5 underline decoration-amber-500/50">
                      <FileText className="w-4 h-4 text-amber-500" /> RESUMO_RÁPIDO
                    </h4>
                    <p className="text-xs text-slate-655 text-slate-600 dark:text-slate-350 leading-relaxed font-serif">
                      "{activeUnit.summary}"
                    </p>
                    <div className="pt-2 text-[10px] text-slate-400 italic">
                      Dica: Tenta ler todos os parágrafos em voz alta para reteres os conceitos operatórios centrais.
                    </div>
                  </div>
                </div>

                {/* Reflection box */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="bg-[#1A2B3C]/5 dark:bg-[#1A2B3C]/20 rounded-xl p-6 border border-slate-200 dark:border-slate-800/40 border-l-4 border-l-amber-500">
                    <h4 className="font-sans font-bold text-sm text-[#1A2B3C] dark:text-amber-400 flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-amber-500" /> Pergunta de Reflexão Crítica
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300 text-sm font-serif mb-4 leading-relaxed">
                      "{activeUnit.reflectionQuestion}"
                    </p>

                    {reflectionRevealed ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-white dark:bg-[#121E2C] p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-sans space-y-1 block shadow-sm border-l-4 border-l-amber-500"
                      >
                        <strong className="text-amber-600 dark:text-amber-400 text-[10px] uppercase block font-mono">Orientação da Professora Carla Oliveira:</strong>
                        <p>{activeUnit.reflectionAnswer}</p>
                      </motion.div>
                    ) : (
                      <button
                        onClick={() => {
                          setReflectionRevealed(true);
                          onAddPoints(15);
                        }}
                        className="px-4 py-2.5 text-xs font-bold bg-[#1A2B3C] text-white rounded-xl hover:bg-[#203449] transition-all shadow-sm cursor-pointer"
                      >
                        Penso no assunto e quero Revelar Sugestão de Resposta (+15 XP)
                      </button>
                    )}
                  </div>
                </div>

                {/* Finish and earn XP */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-900 flex justify-end">
                  <button
                    onClick={handleCompleteTheme}
                    disabled={completedThemes.includes(activeTheme.id)}
                    className="px-6 py-3 cursor-pointer text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-900 rounded-xl shadow-xs transition-all flex items-center gap-1"
                  >
                    {completedThemes.includes(activeTheme.id) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Tema Concluído por {studentName}
                      </>
                    ) : (
                      'Concluir Leitura deste Tema (+100 XP!)'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB: MAP - Interactive vector SVGs representing geographical areas */}
            {activeTab === 'map' && (
              <motion.div
                key="map-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                    Cartografia Histórica Interativa
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    Clica em cima das localizações marcadas no mapa esquemático para compreender as dinâmicas de espaço do 7.º Ano.
                  </p>
                </div>

                {/* Stylized vector map simulators */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: Interactive Visual Canvas */}
                  <div className="lg:col-span-2 relative bg-[#1A2B3C] text-white rounded-xl h-80 flex items-center justify-center p-4 overflow-hidden border border-slate-700/50">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    {/* Skeletons based on selectedTheme */}
                    {activeTheme.id === 'sociedades-recoletoras' ? (
                      <div className="relative text-center w-full max-w-sm space-y-4 font-sans">
                        <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase">Crescente Fértil & Rios Célebres</span>
                        <svg className="w-full h-36 border border-white/5 bg-slate-900/40 rounded-lg mx-auto" viewBox="0 0 400 150">
                          {/* Nile River */}
                          <path d="M50,140 Q 50,70 120,40" stroke="#38bdf8" strokeWidth="5" fill="none" className="animate-pulse" />
                          {/* Tigre & Eufrates */}
                          <path d="M250,140 Q 240,80 320,30" stroke="#38bdf8" strokeWidth="3" fill="none" />
                          <path d="M280,140 Q 270,90 340,40" stroke="#38bdf8" strokeWidth="3" fill="none" />
                          
                          {/* Annotations */}
                          <circle cx="50" cy="110" r="6" fill="#f59e0b" className="animate-ping" />
                          <circle cx="50" cy="110" r="4" fill="#f59e0b" />
                          <text x="55" y="105" fill="#fef08a" fontSize="8" fontFamily="sans-serif">Baixo Egito (Nilo)</text>

                          <circle cx="280" cy="80" r="4" fill="#f59e0b" />
                          <text x="210" y="75" fill="#fef08a" fontSize="8" fontFamily="sans-serif">Mesopotâmia (Tigre)</text>
                        </svg>
                        <p className="text-xs text-slate-300 px-4">
                          <strong>Foco do Tema 1:</strong> As civilizações egípcia (bacia do Nilo) e mesopotâmica instalaram-se junto a estes rios para a agricultura e excedentes!
                        </p>
                      </div>
                    ) : activeTheme.id === 'heranca-meditarraneo' ? (
                      <div className="relative text-center w-full max-w-sm space-y-4 font-sans">
                        <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase">Mare Nostrum: Império Romano</span>
                        <svg className="w-full h-36 border border-white/5 bg-slate-900/40 rounded-lg mx-auto" viewBox="0 0 400 150">
                          {/* Mediterranean Sea outline shape simulation */}
                          <rect x="50" y="30" width="300" height="90" rx="40" fill="#152331" stroke="#2c3e50" strokeWidth="2" />
                          
                          {/* Rome marker */}
                          <circle cx="160" cy="50" r="5" fill="#ef4444" className="animate-ping" />
                          <circle cx="160" cy="50" r="4" fill="#ef4444" />
                          <text x="170" y="53" fill="white" fontSize="9" fontWeight="bold">Roma</text>

                          {/* Athens marker */}
                          <circle cx="220" cy="80" r="4" fill="#10b981" />
                          <text x="230" y="83" fill="#6ee7b7" fontSize="8">Atenas</text>

                          {/* Conímbriga */}
                          <circle cx="90" cy="65" r="4" fill="#f59e0b" />
                          <text x="98" y="68" fill="#fde047" fontSize="8">Conímbriga</text>
                        </svg>
                        <p className="text-xs text-slate-300 px-4">
                          <strong>Mare Nostrum:</strong> O mar Mediterrâneo unificava a Grécia e todo o Império Romano do Ocidente do séc. II ao III d.C.
                        </p>
                      </div>
                    ) : activeTheme.id === 'cristandade-ocidental' ? (
                      <div className="relative text-center w-full max-w-sm space-y-4 font-sans">
                        <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase">Condado Portucalense e Reconquista</span>
                        <svg className="w-full h-36 border border-white/5 bg-slate-900/40 rounded-lg mx-auto" viewBox="0 0 400 150">
                          {/* Portugal West boundary line */}
                          <path d="M100,20 L100,130 L160,130" stroke="#f59e0b" strokeWidth="4" fill="none" />
                          
                          {/* Guimarães and Coimbra */}
                          <circle cx="100" cy="40" r="5" fill="#3b82f6" className="animate-ping" />
                          <circle cx="100" cy="40" r="4" fill="#3b82f6" />
                          <text x="110" y="43" fill="white" fontSize="10">Guimarães (Cradle)</text>

                          <circle cx="100" cy="80" r="4" fill="#ef4444" />
                          <text x="110" y="83" fill="#fca5a5" fontSize="8">Mondego / Coimbra</text>

                          {/* South Moor lands */}
                          <rect x="70" y="100" width="120" height="40" fill="#064e3b" opacity="0.4" />
                          <text x="95" y="125" fill="#a7f3d0" fontSize="9" fontWeight="bold">Terras do Sul (Al-Andalus)</text>
                        </svg>
                        <p className="text-xs text-slate-300 px-4">
                          <strong>Ibéria Medieval:</strong> O Condado Portucalense expandiu-se de norte (Guimarães) para sul (linha do Mondego) empurrando o Al-Gharb muçulmano!
                        </p>
                      </div>
                    ) : (
                      <div className="relative text-center w-full max-w-sm space-y-4 font-sans">
                        <span className="text-[9px] font-mono tracking-widest text-amber-400 block uppercase">Rotas Mercantis da Lisboa Medieval</span>
                        <svg className="w-full h-36 border border-white/5 bg-slate-900/30 rounded-lg mx-auto" viewBox="0 0 400 150">
                          {/* Ocean background */}
                          <path d="M120,10 L120,140 Q 200,90 320,130" stroke="#0ea5e9" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                          
                          {/* Commercial cities */}
                          <circle cx="120" cy="80" r="5" fill="#f59e0b" />
                          <text x="130" y="83" fill="white" fontSize="11" fontWeight="bold">Lisboa</text>

                          <circle cx="280" cy="20" r="4" fill="#ef4444" />
                          <text x="290" y="23" fill="#6ee7b7" fontSize="8">Flandres (Bélgica)</text>
                        </svg>
                        <p className="text-xs text-slate-300 px-4">
                          <strong>Rotas Atlânticas do Séc. XIII:</strong> Lisboa tornou-se um porto central de ligação fundamental entre o Mar do Norte europeu de Flandres e o sul Mediterrâneo!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Educational cards explaining maps */}
                  <div className="bg-slate-50 dark:bg-[#1C2C3E]/40 p-5 rounded-xl border border-slate-200 dark:border-slate-800 h-fit space-y-4 shadow-sm">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-500 underline decoration-amber-500/50">
                      Análise Espacial do 7.º Ano
                    </h4>
                    <ul className="text-xs space-y-3 font-sans leading-relaxed text-slate-600 dark:text-slate-350 font-sans">
                      <li className="flex gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span><strong>Geografia e Clima:</strong> Os espaços naturais (rios férteis, portos marítimos protegidos) facilitam a fixação humana e as economias produtivas de sucesso.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span><strong>Mudanças Espaciais:</strong> As invasões ou rotas de comércio alteram o desenho das maiores metrópoles, ruralizando ou urbanizando impérios inteiros em poucos séculos.</span>
                      </li>
                    </ul>
                    <div className="pt-2 text-[10px] text-slate-400 italic">
                      Todos estes mapas esquemáticos ilustram os termos constantes do documento curricular oficial.
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB: CARDS - Flashcards carousels with flips */}
            {activeTab === 'cards' && (
              <motion.div
                key="cards-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 max-w-xl mx-auto"
              >
                <div className="text-center space-y-1">
                  <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                    Flashcards de Memorização Ativa
                  </h3>
                  <p className="text-slate-550 dark:text-slate-400 text-xs text-center">
                    Clica em cima do cartão para virar e rememorar definições exigidas pela Professora Carla de forma dinâmica!
                  </p>
                </div>

                {/* Animated card flip viewport */}
                <div className="h-72 flex items-center justify-center">
                  <motion.div
                    onClick={() => setIsFlipped(!isFlipped)}
                    style={{ perspective: 1000 }}
                    className="w-full max-w-sm h-56 cursor-pointer"
                  >
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="w-full h-full relative"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Front text card (Concept) */}
                      <div
                        className="absolute inset-0 bg-linear-to-tr from-[#1A2B3C]/5 to-[#1A2B3C]/10 dark:from-[#1A2B3C]/20 dark:to-[#1A2B3C]/30 border-2 border-slate-205 dark:border-[#1A2B3C] rounded-xl flex flex-col justify-between p-6 shadow-xs"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold text-amber-500">
                          <span>Conceito Operatório</span>
                          <span>FRENTE</span>
                        </div>
                        <h4 className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-white text-center pb-4">
                          {activeTheme.flashcards[cardIndex]?.concept}
                        </h4>
                        <span className="text-[10px] text-center text-[#1A2B3C] dark:text-amber-400 font-bold flex items-center justify-center gap-1">
                          <RotateCw className="w-3.5 h-3.5" /> CLICA PARA REVELAR DEFINIÇÃO
                        </span>
                      </div>

                      {/* Back text card (Definition) */}
                      <div
                        className="absolute inset-0 bg-white dark:bg-slate-950 border-2 border-amber-500 rounded-xl flex flex-col justify-between p-6 shadow-sm"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold text-amber-500">
                          <span>Significado Letivo</span>
                          <span>VERSO</span>
                        </div>
                        <p className="font-sans text-slate-700 dark:text-slate-350 text-sm leading-relaxed text-center py-2 flex items-center justify-center h-full">
                          {activeTheme.flashcards[cardIndex]?.definition}
                        </p>
                        <span className="text-[10px] text-center text-[#1A2B3C] dark:text-amber-400 font-bold flex items-center justify-center gap-1">
                          <RotateCw className="w-3.5 h-3.5" /> CLICA PARA VER CONCEITO OUTRA VEZ
                        </span>
                      </div>

                    </motion.div>
                  </motion.div>
                </div>

                {/* Carousel indicators */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (cardIndex > 0) {
                        setCardIndex(cardIndex - 1);
                        setIsFlipped(false);
                      }
                    }}
                    disabled={cardIndex === 0}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-40 cursor-pointer"
                  >
                    Anterior
                  </button>

                  <span className="text-xs font-mono font-bold text-slate-500">
                    Cartão {cardIndex + 1} de {activeTheme.flashcards.length}
                  </span>

                  <button
                    onClick={() => {
                      if (cardIndex < activeTheme.flashcards.length - 1) {
                        setCardIndex(cardIndex + 1);
                        setIsFlipped(false);
                      }
                    }}
                    disabled={cardIndex === activeTheme.flashcards.length - 1}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-40 cursor-pointer"
                  >
                    Próximo
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB: EXERCISE - Consolidation challenges for XP rewards */}
            {activeTab === 'exercise' && (
              <motion.div
                key="exerc-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                    Exercícios de Consolidação Prática
                  </h3>
                  <p className="text-slate-550 dark:text-slate-400 text-xs">
                    Testa os teus conhecimentos em tempo real neste tema! Acerta e adiciona pontos diretamente ao teu progresso de Doutorado.
                  </p>
                </div>

                {/* Sub-block 1: Verdadeiro ou Falso */}
                <div className="space-y-4">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-400">
                    Secção A — Desafio Verdadeiro ou Falso (+20 XP por acerto)
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeTheme.games.trueFalse.map((tf, iIdx) => {
                      const done = !!answeredTF[iIdx];
                      const chosenVal = tfSelection[iIdx];

                      return (
                        <div
                          key={iIdx}
                          className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-3"
                        >
                          <p className="text-slate-800 dark:text-slate-200 font-sans text-sm font-medium leading-relaxed">
                            {tf.question}
                          </p>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleTfChoice(iIdx, true, tf.isTrue)}
                              disabled={done}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-all ${
                                done && tf.isTrue
                                  ? 'bg-emerald-650 text-white'
                                  : done && chosenVal === true && !tf.isTrue
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                              }`}
                            >
                              Verdadeiro
                            </button>
                            <button
                              onClick={() => handleTfChoice(iIdx, false, tf.isTrue)}
                              disabled={done}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-all ${
                                done && !tf.isTrue
                                  ? 'bg-emerald-650 text-white'
                                  : done && chosenVal === false && tf.isTrue
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                              }`}
                            >
                              Falso
                            </button>
                          </div>

                          {done && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                              {tf.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-block 2: Completar Frases */}
                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-900">
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-400">
                    Secção B — Completar Espaços Semânticos (+30 XP por acerto)
                  </h4>

                  <div className="space-y-4">
                    {activeTheme.games.fillBlanks.map((fb, idx) => {
                      const checked = !!fbChecked[idx];
                      const userVal = fbAnswers[idx] || '';
                      const correct = userVal.toLowerCase().trim() === fb.blankValue.toLowerCase().trim();

                      return (
                        <div
                          key={idx}
                          className="bg-slate-50/70 dark:bg-slate-900/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-3"
                        >
                          <div className="flex flex-wrap items-center gap-1.5 text-sm text-slate-700 dark:text-slate-350">
                            <span>{fb.sentenceBefore}</span>
                            <input
                              type="text"
                              value={fbAnswers[idx] || ''}
                              disabled={checked}
                              onChange={(e) => setFbAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                              placeholder="Completa aqui..."
                              className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-amber-500 text-xs w-48 text-center"
                            />
                            <span>{fb.sentenceAfter}</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleFbCheck(idx, userVal, fb.blankValue)}
                              disabled={checked || !userVal.trim()}
                              className="px-4 py-1.5 text-xs font-bold bg-[#1A2B3C] hover:bg-[#203449] text-white rounded-lg disabled:opacity-50 cursor-pointer"
                            >
                              Verificar Resposta
                            </button>
                            <span className="text-[11px] text-slate-400 self-center">
                              Ajuda: <strong>{fb.hint}</strong>
                            </span>
                          </div>

                          {checked && (
                            <p className={`text-xs font-bold font-sans flex items-center gap-1 ${
                              correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                            }`}>
                              {correct ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />Excelente! Completaste "{fb.blankValue}" corretamente e ganhaste +30 XP!
                                </>
                              ) : (
                                `Quase lá! A resposta correta estipulada pela Professora Carla era "${fb.blankValue}".`
                              )}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
