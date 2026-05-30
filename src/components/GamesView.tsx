import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Key, Star, Trophy, ArrowRight, ShieldAlert, CheckCircle2, RefreshCw, Layers } from 'lucide-react';

interface GamesViewProps {
  onAddPoints: (points: number) => void;
  completedGames: string[];
  onCompleteGame: (gameId: string) => void;
  studentName: string;
}

// ----------------- CONFIG FOR SORTING GAME -----------------
interface SortEvent {
  id: string;
  yearNum: number;
  yearStr: string;
  title: string;
}

const SCRAMBLED_EVENTS: SortEvent[] = [
  { id: 'sc1', yearNum: -10000, yearStr: 'c. 10 000 a.C.', title: 'Revolução Agrícola no Neolítico' },
  { id: 'sc2', yearNum: -3500, yearStr: 'c. 3 500 a.C.', title: 'Surgimento da Escrita Figurada' },
  { id: 'sc3', yearNum: -400, yearStr: 'Séc. V a.C.', title: 'Democracia Direta de Atenas' },
  { id: 'sc4', yearNum: 476, yearStr: '476 d.C.', title: 'Invasões Bárbaras e Queda de Roma' },
  { id: 'sc5', yearNum: 1143, yearStr: '1143 d.C.', title: 'Independência e Tratado de Zamora' },
  { id: 'sc6', yearNum: 1385, yearStr: '1385 d.C.', title: 'Vitória Real em Aljubarrota' }
];

// ----------------- CONFIG FOR ESCAPE ROOM -----------------
interface EscapeRoomChallenge {
  roomNum: number;
  scenario: string;
  intro: string;
  riddle: string;
  options: string[];
  correctIdx: number;
  clue: string;
}

const ESCAPE_CHALLENGES: EscapeRoomChallenge[] = [
  {
    roomNum: 1,
    scenario: 'A Gruta Primitiva de Altamira (Paleolítico)',
    intro: 'Foste transportado por magia escolar para uma gruta escura com pinturas rupestres. A porta está trancada por um mecanismo de pedra pesada!',
    riddle: 'Para acender o fogo sagrado e abrir a saída de pedra, responde: que modo de subsistência caracterizava as comunidades nómadas do Paleolítico Superior?',
    options: ['Modo de vida industrial', 'Modo de vida produtor agropastoril', 'Modo de vida recoletor caçador', 'Modo de vida cibernético comercial'],
    correctIdx: 2,
    clue: 'Eles dependiam unicamente daquilo que colhiam da natureza e das presas que caçavam!'
  },
  {
    roomNum: 2,
    scenario: 'O Pórtico Imperial Latino (Romanização)',
    intro: 'Vês-te cercado por guardas centuriões junto a um aqueduto romano funcional. Exigem que recites a herança unificadora de Roma!',
    riddle: 'Qual das seguintes opções agrupa as três principais heranças imperiais romanas que unificaram a Europa ocidental?',
    options: [
      'A língua alemã, a religião muçulmana e a escrita cuneiforme',
      'A rede urbana, a língua latina e o Direito Romano',
      'As moedas chinesas, o teatro grego e o moinho de vento',
      'A eletricidade, os carros de ferro e o pergaminho de Cister'
    ],
    correctIdx: 1,
    clue: 'Começa com cidades (urbanismo), língua da missa (latim) e corpo de leis escritas.'
  },
  {
    roomNum: 3,
    scenario: 'As Cortes Parlamentares de Coimbra (D. Dinis)',
    intro: 'Entraste na sala de trono cheia de monges, mercadores e barões. O Rei D. Dinis solicita a confirmação da maior instituição de saber secular que acaba de criar!',
    riddle: 'No ano 1290 d.C., para formar legistas civis, os estudos de que instituição de ensino superior de grande renome foram fundados em Portugal?',
    options: ['A Escola Secundária de Braga', 'O Colégio de Belas Artes de Lisboa', 'A Universidade de Coimbra (Estudo Geral)', 'O Mosteiro de Lorvão'],
    correctIdx: 2,
    clue: '"Scientiae thesaurus mirabilis" em Coimbra!'
  }
];

export default function GamesView({ onAddPoints, completedGames, onCompleteGame, studentName }: GamesViewProps) {
  const [activeGame, setActiveGame] = useState<'escape' | 'sort' | 'pairs'>('escape');

  // GAME: Escape states
  const [escapeRoom, setEscapeRoom] = useState(1);
  const [escapeFeedback, setEscapeFeedback] = useState<string | null>(null);
  const [escapeSelection, setEscapeSelection] = useState<number | null>(null);
  const [escapeCompleted, setEscapeCompleted] = useState(false);

  // GAME: Sort states
  const [sortedList, setSortedList] = useState<SortEvent[]>(SCRAMBLED_EVENTS);
  const [sortChecked, setSortChecked] = useState(false);
  const [sortResult, setSortResult] = useState<string | null>(null);

  // GAME: Pairs states
  const [matches, setMatches] = useState<Record<string, string>>({
    'Megalitismo': 'Antas e menires do Neolítico',
    'Cidadão Ateniense': 'Homem livre natural de Atenas',
    'Direito Romano': 'Leis escritas unificadoras',
    'Vassalo': 'Cavalheiro fiel ao suserano',
    'Feudo': 'Propriedade rústica cedida',
    'Burguês': 'Comerciante rico dos burgos'
  });
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [pairedTerms, setPairedTerms] = useState<string[]>([]);
  const [pairFeedback, setPairFeedback] = useState<string | null>(null);

  // Restart Escape Room game
  const resetEscape = () => {
    setEscapeRoom(1);
    setEscapeSelection(null);
    setEscapeFeedback(null);
    setEscapeCompleted(false);
  };

  // Check Escape Riddle
  const checkEscape = () => {
    const active = ESCAPE_CHALLENGES.find(c => c.roomNum === escapeRoom);
    if (!active || escapeSelection === null) return;

    if (escapeSelection === active.correctIdx) {
      setEscapeFeedback('Correto! A porta trancada de pedra emitiu um estrondo e abriu-se ao teu comando!');
      onAddPoints(40);
      
      setTimeout(() => {
        if (escapeRoom < ESCAPE_CHALLENGES.length) {
          setEscapeRoom(escapeRoom + 1);
          setEscapeSelection(null);
          setEscapeFeedback(null);
        } else {
          setEscapeCompleted(true);
          if (!completedGames.includes('escape-room')) {
            onCompleteGame('escape-room');
            onAddPoints(120);
          }
        }
      }, 2500);

    } else {
      setEscapeFeedback('Incorreto! A fechadura bloqueou com eletricidade mágica. Olha para a dica da professora!');
    }
  };

  // Reorder sorting lists logic (move element up or down)
  const moveEvent = (index: number, direction: 'up' | 'down') => {
    if (sortChecked) return;
    const newList = [...sortedList];
    if (direction === 'up' && index > 0) {
      const temp = newList[index];
      newList[index] = newList[index - 1];
      newList[index - 1] = temp;
    } else if (direction === 'down' && index < newList.length - 1) {
      const temp = newList[index];
      newList[index] = newList[index + 1];
      newList[index + 1] = temp;
    }
    setSortedList(newList);
  };

  // Check chronological sorting
  const checkSort = () => {
    let isCorrect = true;
    for (let i = 0; i < sortedList.length - 1; i++) {
      if (sortedList[i].yearNum > sortedList[i + 1].yearNum) {
        isCorrect = false;
        break;
      }
    }
    setSortChecked(true);
    if (isCorrect) {
      setSortResult('Perfeito! Colocaste a fita cronológica em ordem impecável e encontraste o tesouro escondido!');
      onAddPoints(150);
      if (!completedGames.includes('sorting-chronology')) {
        onCompleteGame('sorting-chronology');
      }
    } else {
      setSortResult('Sequência de tempo incorreta. Lembra-te de colocar a Pré-história (números a.C.) primeiro, e depois avançar até ao século XIV!');
    }
  };

  const resetSort = () => {
    setSortedList([...SCRAMBLED_EVENTS].sort(() => Math.random() - 0.5));
    setSortChecked(false);
    setSortResult(null);
  };

  // Match Pair click logic
  const handlePairClick = (term: string, isDef: boolean) => {
    if (pairedTerms.includes(term)) return;

    if (!isDef) {
      // selecting a concept
      setSelectedTerm(term);
      setPairFeedback(null);
    } else {
      // clicked a definition
      if (!selectedTerm) {
        setPairFeedback('Por favor, seleciona primeiro um conceito amarelo no lado esquerdo!');
        return;
      }

      if (matches[selectedTerm] === term) {
        setPairedTerms(prev => [...prev, selectedTerm]);
        setSelectedTerm(null);
        setPairFeedback('Estupendo! Par emparelhado com sucesso!');
        onAddPoints(20);

        // Check if all are matched
        if (pairedTerms.length + 1 === Object.keys(matches).length) {
          if (!completedGames.includes('pairs')) {
            onCompleteGame('pairs');
            onAddPoints(80);
          }
        }
      } else {
        setPairFeedback('Não combina! Tenta ler atentamente a definição teórica.');
      }
    }
  };

  const resetPairs = () => {
    setPairedTerms([]);
    setSelectedTerm(null);
    setPairFeedback(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header section with tab toggle */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-emerald-650" />
            Parque de Jogos e Desafios
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Ganha medalhas exclusivas e amealha centenas de pontos de XP jogando nas nossas aventuras curriculares.
          </p>
        </div>

        {/* Game Mode switchers */}
        <div className="flex bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
          {[
            { id: 'escape', label: 'Escape Room' },
            { id: 'sort', label: 'Tempus Cracking' },
            { id: 'pairs', label: 'Pares Conceituais' }
          ].map((gm) => (
            <button
              key={gm.id}
              onClick={() => setActiveGame(gm.id as any)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeGame === gm.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-650 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-900'
              }`}
            >
              {gm.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Display window */}
      <div className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-900 rounded-3xl p-6 lg:p-8 shadow-xs">
        <AnimatePresence mode="wait">
          
          {/* GAME 1: ESCAPE ROOM */}
          {activeGame === 'escape' && (
            <motion.div
              key="escape-game"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {!escapeCompleted ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left scenario display panel */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase">
                      <Key className="w-4 h-4 animate-bounce" /> Sala {escapeRoom} de {ESCAPE_CHALLENGES.length}
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                      {ESCAPE_CHALLENGES[escapeRoom - 1].scenario}
                    </h3>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-850 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      "{ESCAPE_CHALLENGES[escapeRoom - 1].intro}"
                    </div>

                    <div className="p-5 bg-amber-50/40 dark:bg-amber-950/15 rounded-2xl border border-amber-100/40 text-sm italic font-serif text-slate-800 dark:text-slate-200">
                      <strong>Enigma:</strong> {ESCAPE_CHALLENGES[escapeRoom - 1].riddle}
                    </div>

                    {/* Interactive answers list */}
                    <div className="grid grid-cols-1 gap-2">
                      {ESCAPE_CHALLENGES[escapeRoom - 1].options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => setEscapeSelection(oIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                            escapeSelection === oIdx
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-300'
                              : 'bg-white hover:bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2.5 pt-4">
                      <button
                        onClick={checkEscape}
                        disabled={escapeSelection === null}
                        className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all disabled:opacity-40 cursor-pointer shadow-md"
                      >
                        Aplicar Chave Segredo
                      </button>
                      <button
                        onClick={resetEscape}
                        className="px-4 py-2 text-xs font-medium border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-400 rounded-xl hover:bg-slate-50 cursor-pointer"
                      >
                        Reiniciar
                      </button>
                    </div>

                    {escapeFeedback && (
                      <p className={`p-3 rounded-lg text-xs font-semibold ${
                        escapeFeedback.startsWith('Correto') ? 'bg-emerald-100 text-emerald-950' : 'bg-red-100 text-red-950'
                      }`}>
                        {escapeFeedback}
                      </p>
                    )}
                  </div>

                  {/* Sidebar stats/cheat guide panel */}
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-850 h-fit space-y-4">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-emerald-500" /> DIRETIVA_AJUDA
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-serif">
                      "{ESCAPE_CHALLENGES[escapeRoom - 1].clue}"
                    </p>
                    <div className="pt-2 text-[10px] text-slate-400 italic">
                      Completar o Escape Room total garante medalha de grande honra!
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center space-y-4 max-w-md mx-auto">
                  <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    Escapaste com Sucesso, {studentName}!
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Decifraste todos os enigmas históricos instalados nos laboratórios da professora Carla Oliveira. Soma extraordinários +120 pontos à tua carteira de XP!
                  </p>
                  <button
                    onClick={resetEscape}
                    className="px-6 py-2.5 bg-emerald-600 font-semibold text-white text-xs rounded-xl hover:bg-emerald-700 cursor-pointer"
                  >
                    Jogar Novamente!
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* GAME 2: CHRONOLOGICAL SORTING GAME */}
          {activeGame === 'sort' && (
            <motion.div
              key="sorting-game"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  Caça ao Tesouro: Tempus Cracking
                </h3>
                <p className="text-slate-500 text-xs">
                  Usa as setas para ordenar os eventos de História do 7.º Ano do mais ANTIGO (topo) para o mais RECENTE (fundo). Desvenda o mapa do tesouro!
                </p>
              </div>

              {/* Scrambled events list with sorting controls */}
              <div className="space-y-2 max-w-xl mx-auto">
                {sortedList.map((ev, index) => (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                  >
                    <div className="space-y-1">
                      <span className="font-mono font-bold text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
                        Época: {sortChecked ? ev.yearStr : '???'}
                      </span>
                      <p className="font-sans font-bold text-slate-800 dark:text-slate-200">{ev.title}</p>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => moveEvent(index, 'up')}
                        disabled={index === 0 || sortChecked}
                        className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border border-slate-150 disabled:opacity-40 rounded cursor-pointer font-bold"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveEvent(index, 'down')}
                        disabled={index === sortedList.length - 1 || sortChecked}
                        className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border border-slate-150 disabled:opacity-40 rounded cursor-pointer font-bold"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={checkSort}
                  disabled={sortChecked}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-650 hover:bg-indigo-700 disabled:opacity-50 rounded-xl cursor-pointer"
                >
                  Verificar Alinhamento Temporal
                </button>
                <button
                  onClick={resetSort}
                  className="px-4 py-2.5 text-xs font-semibold border border-slate-200 rounded-xl text-slate-650 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-350 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" /> Baralhar
                </button>
              </div>

              {sortResult && (
                <p className={`p-4 rounded-xl text-xs font-semibold text-center max-w-md mx-auto ${
                  sortResult.startsWith('Perfeito') ? 'bg-emerald-100 text-emerald-950' : 'bg-rose-100 text-rose-950'
                }`}>
                  {sortResult}
                </p>
              )}
            </motion.div>
          )}

          {/* GAME 3: CONCEPTS MATCHING PAIRS */}
          {activeGame === 'pairs' && (
            <motion.div
              key="pairs-game"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1 text-center">
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  Correspondência de Pares Conceituais
                </h3>
                <p className="text-slate-500 text-xs text-center">
                  Clica primeiro num termo amarelo do lado esquerdo e, de seguida, na definição correspondente do lado direito!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {/* Left side items (Terms) */}
                <div className="space-y-2">
                  <h4 className="font-sans font-bold text-xs uppercase text-amber-600 text-center">Conceitos</h4>
                  {Object.keys(matches).map((term) => {
                    const matched = pairedTerms.includes(term);
                    const selected = selectedTerm === term;
                    return (
                      <button
                        key={term}
                        disabled={matched}
                        onClick={() => handlePairClick(term, false)}
                        className={`w-full p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                          matched
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200 opacity-40 line-through'
                            : selected
                            ? 'bg-amber-400 border-amber-500 text-amber-950 scale-102 font-heavy'
                            : 'bg-amber-50 hover:bg-amber-100/50 border-amber-200 text-amber-950 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900'
                        }`}
                      >
                        {term}
                      </button>
                    );
                  })}
                </div>

                {/* Right side items (Definitions) */}
                <div className="space-y-2">
                  <h4 className="font-sans font-bold text-xs uppercase text-indigo-650 text-center">Definições Baralhadas</h4>
                  {(Object.values(matches) as string[])
                    // shuffle definitions pseudo-deterministically to avoid constant shifting but maintain engagement
                    .sort((a, b) => a.length - b.length)
                    .map((def) => {
                      const keys = Object.keys(matches);
                      const keyForThisDef = keys.find(k => matches[k] === def) || '';
                      const matched = pairedTerms.includes(keyForThisDef);
                      return (
                        <button
                          key={def}
                          disabled={matched}
                          onClick={() => handlePairClick(def, true)}
                          className={`w-full p-3 rounded-xl border text-xs text-center font-medium leading-relaxed transition-all cursor-pointer ${
                            matched
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-200 opacity-40'
                              : 'bg-white hover:bg-indigo-50/30 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {def}
                        </button>
                      );
                    })}
                </div>
              </div>

              {pairFeedback && (
                <p className={`p-3 text-xs font-semibold text-center max-w-xs mx-auto rounded-lg ${
                  pairFeedback.startsWith('Estupendo') ? 'bg-emerald-100 text-emerald-950' : 'bg-amber-100 text-amber-950'
                }`}>
                  {pairFeedback}
                </p>
              )}

              <div className="pt-4 flex justify-center">
                <button
                  onClick={resetPairs}
                  className="px-4 py-2.5 text-xs font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-650 dark:border-slate-800 cursor-pointer"
                >
                  Apagar e Reiniciar Pares
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
