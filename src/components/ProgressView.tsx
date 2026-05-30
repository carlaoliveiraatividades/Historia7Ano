import { APP_BADGES } from '../data/historyData';
import { Award, Compass, Star, Lock, Check, Printer, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgressViewProps {
  studentName: string;
  points: number;
  completedQuizzes: string[];
  completedGames: string[];
  completedThemes: string[];
}

export default function ProgressView({
  studentName,
  points,
  completedQuizzes,
  completedGames,
  completedThemes
}: ProgressViewProps) {
  
  // Calculate Level
  let level = 1;
  let title = 'Aprendiz de Arqueólogo';
  let nextGoal = 200;

  if (points >= 1500) {
    level = 5;
    title = 'Doutor Summa Cum Laude';
    nextGoal = points; // Max level reached
  } else if (points >= 1000) {
    level = 4;
    title = 'Condestável de Portugal';
    nextGoal = 1500;
  } else if (points >= 500) {
    level = 3;
    title = 'Centurião do Império';
    nextGoal = 1000;
  } else if (points >= 200) {
    level = 2;
    title = 'Escriba do Crescente Fértil';
    nextGoal = 500;
  }

  const levelProgressPct = Math.min(100, Math.floor((points / nextGoal) * 100));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:p-0">
      
      {/* Visual Level Banner (exclude from print) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:hidden">
        
        {/* Left Side: Stats circular metric */}
        <div className="md:col-span-2 bg-gradient-to-r from-[#1A2B3C] to-[#111C28] text-white p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-slate-700/40">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3 w-full">
            <span className="text-[9px] font-mono tracking-widest uppercase text-amber-400">Resumo de Progressão</span>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-amber-500 text-[#1A2B3C] font-bold font-mono rounded">NÍVEL {level}</span>
              <h3 className="font-serif text-xl font-bold tracking-tight text-white">{title}</h3>
            </div>

            {/* Slider bar */}
            <div className="space-y-1 w-full">
              <div className="flex justify-between text-xs text-amber-200">
                <span>XP Acumulado: {points} pontos</span>
                {level < 5 && <span>Próximo Nível: {nextGoal} XP</span>}
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Totals Card */}
        <div className="bg-white dark:bg-[#121E2C] border border-slate-205 dark:border-slate-800 p-6 rounded-xl shadow-sm space-y-4">
          <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-400">Atividades Realizadas</h4>
          <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-350">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-900 pb-1.5">
              <span>Temas de Leitura Clériga:</span>
              <strong className="text-slate-800 dark:text-slate-200">{completedThemes.length} / 4</strong>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-900 pb-1.5">
              <span>Aventuras e Jogos de Elite:</span>
              <strong className="text-slate-800 dark:text-slate-200">{completedGames.length} / 3</strong>
            </div>
            <div className="flex justify-between">
              <span>Testes Avaliativos Realizados:</span>
              <strong className="text-slate-800 dark:text-slate-200">{completedQuizzes.length > 0 ? 'Concluído' : 'Pedente'}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Badges showcase (exclude from print) */}
      <div className="space-y-4 print:hidden">
        <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-650" />
          Galeria de Medalhas e Distintivos Académicos
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {APP_BADGES.map((badge) => {
            const unlocked = points >= badge.unlockedAtPoints;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center relative overflow-hidden flex flex-col items-center justify-between transition-all ${
                  unlocked
                    ? 'bg-linear-to-b from-amber-50 to-amber-100/30 border-amber-300 dark:from-amber-950/20 dark:border-amber-900/60 shadow-xs scale-102'
                    : 'bg-slate-50 border-slate-150 dark:bg-slate-900/40 dark:border-slate-850 opacity-45'
                }`}
              >
                {unlocked ? (
                  <span className="absolute top-2 right-2 text-[8px] font-bold text-amber-700 bg-amber-200 px-1.5 py-0.5 rounded-full uppercase">
                    Unloc
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 text-slate-400">
                    <Lock className="w-3 h-3" />
                  </span>
                )}

                <div className={`p-3.5 rounded-full mb-3 ${
                  unlocked ? 'bg-amber-100 text-amber-600 dark:bg-amber-950' : 'bg-slate-200 text-slate-400 dark:bg-slate-800'
                }`}>
                  <Compass className="w-6 h-6 animate-spin-slow" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-xs text-slate-905 dark:text-slate-200 leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-snug line-clamp-2 px-1">
                    {badge.description}
                  </p>
                </div>

                <span className="text-[9px] font-mono font-bold mt-4 text-slate-450 block">
                  Requer: {badge.unlockedAtPoints} XP
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* DIGITAL CERTIFICATE CARD */}
      <div className="space-y-4">
        <div className="flex items-center justify-between print:hidden">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500" />
            Certificação Oficial de Historiador
          </h3>
          {points >= 1000 && (
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Imprimir Diploma
            </button>
          )}
        </div>

        {points >= 1000 ? (
          /* GORGEOUS PARCHMENT STYLE CERTIFICATE FRAME */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-8 border-amber-600/50 bg-[#fdfaf2] p-8 md:p-12 text-slate-900 rounded-3xl shadow-lg relative text-center space-y-8 select-none max-w-2xl mx-auto"
            style={{ backgroundImage: 'radial-gradient(rgba(180,120,40,0.03) 1px, transparent 0)' }}
          >
            {/* Elegant seals decorative layouts */}
            <div className="absolute top-6 left-6 border-2 border-amber-800/10 p-1.5 text-xs font-serif italic text-amber-805/40 opacity-30 select-none pointer-events-none">
              7.º Ano Letivo
            </div>

            <div className="space-y-4">
              <ShieldCheck className="w-16 h-16 text-amber-800 mx-auto" strokeWidth={1.2} />
              
              <span className="block text-xs uppercase font-mono tracking-[0.25em] text-amber-800/80 font-bold">
                República Portuguesa • Ministério do Conhecimento
              </span>
              
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-amber-950 italic capitalize leading-tight">
                Diploma de Doutor em História
              </h1>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <p className="text-xs uppercase text-slate-500 font-sans tracking-widest font-semibold">
                Certifica-se com honra pelo presente termo que
              </p>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1A2B3C] dark:text-amber-400 py-1 border-b border-amber-800/20">
                {studentName}
              </h2>
              <p className="text-sm font-sans text-slate-650 leading-relaxed italic pt-2">
                unificou todos os saberes curriculares das Aprendizagens Essenciais, decifrou enigmas pré-históricos rítmicos, compreendeu o Direito de Roma e defendeu as encostas da Batalha de Aljubarrota com excelência exemplar sob classificação Summa Cum Laude.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-6 max-w-lg mx-auto">
              <div className="text-center sm:text-left space-y-1">
                <span className="block text-[11px] font-sans uppercase tracking-widest text-slate-400">Pelo Ministério Escolar</span>
                <strong className="block text-xs font-serif text-slate-800 font-bold border-b border-amber-800/20 pb-1">Prof. Carla Oliveira</strong>
                <span className="block text-[9px] text-slate-400 italic">Historiadora e Tutora Pedagógica</span>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <span className="block text-[11px] font-sans uppercase tracking-widest text-slate-400">Registo Letivo Unificado</span>
                <strong className="block text-xs font-mono text-emerald-700 font-bold">XP TOTAL: {points} / 1600</strong>
                <span className="block text-[9px] text-slate-400 font-sans uppercase font-medium">Reconhecimento Autónomo 2026</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Locked indicator card */
          <div className="border border-dashed border-slate-300 dark:border-slate-850 bg-slate-50/50 dark:bg-[#121E2C] p-8 rounded-xl text-center max-w-md mx-auto space-y-4">
            <Lock className="w-10 h-10 text-slate-400 mx-auto animate-pulse" />
            <h4 className="font-serif text-lg font-bold text-slate-800 dark:text-white">Diploma Digital Bloqueado</h4>
            <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed">
              Precisas de alcançar pelo menos <strong className="text-amber-500 dark:text-amber-400">1000 pontos XP</strong> para desbloquear a emissão do teu Certificado oficial assinado pela professora Carla Oliveira. Lê os conteúdos e joga nos desafios do menu lateral para somares pontos rapidamente!
            </p>
            <div className="text-xs font-mono font-bold text-slate-400">
              O teu XP atual: {points} XP
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
