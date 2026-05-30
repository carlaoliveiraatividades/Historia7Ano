import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Check, X, ShieldAlert, BookOpen, RefreshCw, Star } from 'lucide-react';

interface QuizFinalViewProps {
  onAddPoints: (points: number) => void;
  onCompleteQuiz: (score: number) => void;
  studentName: string;
}

interface Question {
  id: string;
  theme: string;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const FINAL_QUIZ_QUESTIONS: Question[] = [
  {
    id: 'fq-1',
    theme: 'Das Sociedades Recoletoras às Primeiras Civilizações',
    question: 'Qual a principal característica das populações nómadas do Paleolítico Superior?',
    options: [
      'Produção agrícola e permanência fixa nas primeiras vilas',
      'Modo de sobrevivência baseado na caça e recoleção de recursos naturais',
      'Uso intensivo de moedas romanas para comércio costeiro',
      'Fabrico de barcos gigantes para ligar a herança de Cister'
    ],
    correctIdx: 1,
    explanation: 'No Paleolítico, os seres humanos dependiam daquilo que a terra espontaneamente lhes oferecia, obrigando-os ao nomadismo.'
  },
  {
    id: 'fq-2',
    theme: 'Das Sociedades Recoletoras às Primeiras Civilizações',
    question: 'Por que razão as primeiras grandes civilizações humanas se fixaram na bacia dos Grandes Rios?',
    options: [
      'Porque a abundância de peixes gigantes era a única fonte de ferro',
      'Para facilitar a irrigação de excedentes de trigo graças às cheias estacionais férteis',
      'Para evitar o poder sacralizado de governantes imperiais de fardas de ferro',
      'Porque as invasões bárbaras só ocorriam nas encostas altas da montanha'
    ],
    correctIdx: 1,
    explanation: 'As cheias dos grandes rios fertilizavam as margens, possibilitando o cultivo em grande escala e a acumulação de excedentes.'
  },
  {
    id: 'fq-3',
    theme: 'A Herança do Mediterrâneo Antigo',
    question: 'Em que consistiam as principais exclusões na democracia de Atenas no século V a.C.?',
    options: [
      'Estavam impedidos os ricos e camponeses proprietários de olivais',
      'Metecos, escravos e as mulheres de todos os quadrantes sociais não detinham qualquer direito político',
      'Apenas os guerreiros da milícia templária de Castela podiam pronunciar-se',
      'As moedas tradicionais podiam banir imperadores pelo sistema do ostracismo'
    ],
    correctIdx: 1,
    explanation: 'A cidadania ateniense excluía ativamente a esmagadora maioria dos residentes livres ou servos.'
  },
  {
    id: 'fq-4',
    theme: 'A Herança do Mediterrâneo Antigo',
    question: 'O que consistia o longo processo de Romanização levado a cabo pelos Romanos?',
    options: [
      'A proibição das leis civis gerais do Mediterrâneo',
      'A aculturação e adoção uniforme do estilo de vida romano, do latim, cidades e do Direito',
      'A conversão forçada de todos ao Islão de Maomé',
      'A dispersão dos mosteiros de Cister pelas províncias agrícolas gregas'
    ],
    correctIdx: 1,
    explanation: 'A Romanização integrava e assimilava os reinos e povos dominados sob pilares jurídicos e urbanísticos.'
  },
  {
    id: 'fq-5',
    theme: 'A Formação da Cristandade Ocidental',
    question: 'Como se estruturava o laço de vassalagem na Idade Média feudal européia?',
    options: [
      'Pagamento de impostos e renda ao clero em grandes bancos modernos de Roma',
      'Um tratado militar e pessoal solene que ligava suserano e vassalo em obrigações bilaterais de auxílio',
      'Ostracismo de banimento de nobres que construíssem castelos no Minho',
      'Um sorteio popular de dólmenes e menires no dia da feira'
    ],
    correctIdx: 1,
    explanation: 'O suserano concedia o feudo para exploração agrícola e o vassalo jurava apoio militar caso houvesse invasões.'
  },
  {
    id: 'fq-6',
    theme: 'A Formação da Cristandade Ocidental',
    question: 'Como se consumou plenamente o reconhecimento internacional papal da soberania de Portugal?',
    options: [
      'Com o juramento da mãe de D. Afonso Henriques no condado de Zamora',
      'Através da Bula papal Manifestis Probatum de 1179 pelo Papa Alexandre III',
      'Com a fundação da Universidade de Coimbra na época de D. Dinis',
      'Pela assinatura das pazes de Aljubarrota com o monarca de Castela'
    ],
    correctIdx: 1,
    explanation: 'A bula pontifícia "Manifestis Probatum" coroou legalmente e de forma diplomática a soberania de Portugal no Ocidente medieval romano.'
  },
  {
    id: 'fq-7',
    theme: 'Portugal nos Séculos XII a XIV',
    question: 'Qual o papel fundamental da Carta de Foral dada pelos Reis medievais?',
    options: [
      'Declarar guerra global aos povos Vikings dinamarqueses',
      'Criar concelhos livres dotados de limites fiscais fixos face ao poder dos nobres vizinhos',
      'Construir fortificações do estilo Gótico dotadas de grandes vitrais policromados',
      'Fundar colégios imperiais de legistas aéreos no Porto'
    ],
    correctIdx: 1,
    explanation: 'As cartas de foral atraíam pessoas para as fronteiras desabitadas, dando estabilidade fiscal e tributária livre.'
  },
  {
    id: 'fq-8',
    theme: 'Portugal nos Séculos XII a XIV',
    question: 'Qual a causa da crise sucessória que gerou a Revolução Civil portuguesa de 1383-1385?',
    options: [
      'A terrível falta de braços pela peste nos pinhais de D. Dinis',
      'O risco de perda da independência após a herdeira D. Beatriz casar com o Rei de Castela',
      'A proibição das Cortes de Coimbra convocarem o clero militar',
      'O roubo do ouro real dos mosteiros de Cister por frotas da França'
    ],
    correctIdx: 1,
    explanation: 'O povo e a burguesia temiam ser controlados por Castela e perder vantagens, aliando-se ao Mestre de Avis.'
  }
];

export default function QuizFinalView({ onAddPoints, onCompleteQuiz, studentName }: QuizFinalViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeQuestion = FINAL_QUIZ_QUESTIONS[currentIdx];

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOpt === null || isAnswered) return;
    setIsAnswered(true);

    const isCorrect = selectedOpt === activeQuestion.correctIdx;
    if (isCorrect) {
      setNumCorrect((prev) => prev + 1);
      onAddPoints(50); // Generous reward for final exam questions!
    }
  };

  const handleNext = () => {
    if (currentIdx < FINAL_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      onCompleteQuiz(numCorrect);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setNumCorrect(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quiz Intro Title Card */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-black uppercase text-indigo-500 tracking-wider">
            Exame Avaliativo Escolar
          </span>
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-indigo-650" />
            Quiz Final de História
          </h2>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-mono font-bold px-3 py-1.5 rounded-lg border border-indigo-105">
            Questão {currentIdx + 1} / {FINAL_QUIZ_QUESTIONS.length}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-900 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6"
          >
            {/* The theme category tag */}
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest bg-yellow-100 text-yellow-905 dark:bg-yellow-950/40 dark:text-yellow-350 px-2.5 py-1 rounded-md">
                Tópico: {activeQuestion.theme}
              </span>
              <h3 className="font-serif text-lg lg:text-xl font-bold text-slate-900 dark:text-white mt-3 leading-relaxed">
                {activeQuestion.question}
              </h3>
            </div>

            {/* Multiple Choice options */}
            <div className="grid grid-cols-1 gap-3">
              {activeQuestion.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const showCorrection = isAnswered;
                const isCorrectOption = idx === activeQuestion.correctIdx;
                const isIncorrectSelection = isSelected && !isCorrectOption;

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                      showCorrection
                        ? isCorrectOption
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 dark:bg-emerald-950/20 dark:text-emerald-300'
                          : isIncorrectSelection
                          ? 'bg-rose-50 border-rose-400 text-rose-950 dark:bg-rose-950/20 dark:text-rose-300'
                          : 'bg-slate-50 border-slate-100 dark:bg-slate-900 dark:border-slate-900 opacity-50'
                        : isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-950 dark:bg-indigo-950/30'
                        : 'bg-white hover:bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{opt}</span>
                    
                    {/* Visual icons indicators for school correction */}
                    {showCorrection && isCorrectOption && (
                      <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {showCorrection && isIncorrectSelection && (
                      <X className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-900">
              {!isAnswered ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedOpt === null}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 disabled:opacity-50 hover:bg-indigo-700 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Confirmar Resposta (+50 XP se acertar!)
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1"
                >
                  {currentIdx === FINAL_QUIZ_QUESTIONS.length - 1 ? 'Concluir Exame' : 'Próxima Questão'} <Check className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Explanation card */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-2 overflow-hidden"
                >
                  <p className="font-sans font-bold text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" /> Correção Detalhada da Professora:
                  </p>
                  <p className="font-serif text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-light">
                    {activeQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        ) : (
          <motion.div
            key="finished-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-900 rounded-3xl p-8 text-center space-y-6"
          >
            <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce pb-2" strokeWidth={1.5} />
            <h3 className="font-serif text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Parabéns, {studentName}!
            </h3>
            
            <div className="max-w-md mx-auto p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="block text-xs uppercase font-mono tracking-widest text-slate-400 mb-1">Resultado Final do Teste</span>
              <strong className="text-4xl font-mono text-indigo-600 dark:text-indigo-400">
                {numCorrect} / {FINAL_QUIZ_QUESTIONS.length}
              </strong>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed font-sans">
                {numCorrect >= 6 
                  ? 'Fabuloso! Demonstras um domínio exemplar de todas as Competências Curriculares do 7.º Ano.'
                  : 'Bom esforço! Aconselhamos reveres os livros e releres as Unidades de Estudo no menu lateral.'}
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={restartQuiz}
                className="px-5 py-2.5 text-xs font-bold bg-indigo-650 text-white rounded-xl hover:bg-indigo-700 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" /> Tentar de Novo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

const Trophy = ({ className, strokeWidth }: { className?: string, strokeWidth?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
  </svg>
);
