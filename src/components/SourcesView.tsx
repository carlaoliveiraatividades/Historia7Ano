import { useState } from 'react';
import { HISTORICAL_SOURCES } from '../data/historyData';
import { ArrowRight, BookOpen, Clock, HelpCircle, Eye, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AudioNarration from './AudioNarration';

export default function SourcesView() {
  const [selectedSourceId, setSelectedSourceId] = useState<string>(HISTORICAL_SOURCES[0].id);
  const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});

  const activeSource = HISTORICAL_SOURCES.find(s => s.id === selectedSourceId) || HISTORICAL_SOURCES[0];

  const toggleAnswer = (key: string) => {
    setVisibleAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Intro descriptor */}
      <div className="bg-indigo-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-indigo-750 text-indigo-200 px-3 py-1 rounded-full border border-indigo-700">
            Laboratório do Historiador
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight">Análise de Fontes Históricas</h2>
          <p className="text-indigo-150 text-sm leading-relaxed">
            Como um detetive do tempo, o historiador estuda vestígios do passado (fontes textuais, iconográficas e arqueológicas) para obter conhecimento verídico. Seleciona uma fonte e exercita o teu pensamento crítico respondendo às perguntas orientadoras.
          </p>
        </div>
      </div>

      {/* Grid of sources list and analyzer block */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Source Selector (Left column) */}
        <div className="space-y-3">
          <h3 className="font-sans font-bold text-slate-800 dark:text-slate-300 text-xs uppercase tracking-wider mb-2 pl-1">
            Fontes Disponíveis
          </h3>
          <div className="grid grid-cols-1 gap-2.5">
            {HISTORICAL_SOURCES.map((src) => {
              const active = src.id === selectedSourceId;
              return (
                <button
                  key={src.id}
                  onClick={() => {
                    setSelectedSourceId(src.id);
                    setVisibleAnswers({}); // reset expanded answers
                  }}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all focus:outline-none cursor-pointer ${
                    active
                      ? 'bg-white border-indigo-500 shadow-md dark:bg-slate-950 dark:border-indigo-400'
                      : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-950'
                  }`}
                >
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold mb-2 uppercase ${
                    src.type === 'Textual' ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300' :
                    src.type === 'Iconográfica' ? 'bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-300' :
                    'bg-emerald-100 text-emerald-900'
                  }`}>
                    Fonte {src.type}
                  </span>
                  <p className="font-serif font-bold text-slate-800 dark:text-slate-250 leading-snug">
                    {src.title}
                  </p>
                  <div className="mt-2 text-[11px] text-slate-400 font-sans italic truncate">
                    {src.theme}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Analyzer Display (Right column, occupies 3 cells) */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSource.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-900 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200 dark:border-slate-850 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full font-bold">
                      Tipo: {activeSource.type}
                    </span>
                    <AudioNarration textToSpeak={`${activeSource.title}. ${activeSource.content}`} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A2B3C] dark:text-white">
                    {activeSource.title}
                  </h3>
                </div>
                {activeSource.authorAndDate && (
                  <div className="text-right sm:text-right text-xs text-slate-500 dark:text-slate-400 font-sans">
                    <span className="block italic text-slate-400 font-light">Datação / Local:</span>
                    <strong className="text-slate-700 dark:text-slate-300">{activeSource.authorAndDate}</strong>
                  </div>
                )}
              </div>

              {/* The source itself (Visual simulation) */}
              <div className="relative p-6 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/40 dark:border-amber-950/20 rounded-2xl">
                {activeSource.type === 'Textual' ? (
                  <div className="font-serif text-slate-800 dark:text-slate-300 text-base leading-relaxed pl-4 border-l-4 border-amber-300 italic min-h-[100px]">
                    {activeSource.content}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Visual box simulator */}
                    <div className="w-full h-56 bg-slate-100 dark:bg-slate-900 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 overflow-hidden relative">
                      <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-900/60 flex flex-col justify-end p-4 text-white">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-300">Representação Historiográfica</span>
                        <h4 className="font-serif font-bold text-xs">{activeSource.title}</h4>
                      </div>
                      
                      {/* Stylized representation details */}
                      <div className="p-8 text-center max-w-sm space-y-2">
                        <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto animate-pulse" />
                        <p className="text-xs text-slate-400 uppercase tracking-widest">Gravuras / Artefactos do 7.º Ano</p>
                        <p className="text-[11px] text-slate-500 italic">"Simulando vestígio fotográfico de arquivo nacional"</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-900/40 p-3 rounded-lg leading-relaxed font-sans">
                      <strong className="text-slate-700 dark:text-slate-350 block text-[10px] uppercase font-mono mb-0.5">Descrição da Imagem:</strong>
                      {activeSource.content}
                    </p>
                  </div>
                )}
              </div>

              {/* Historiographical commentary */}
              <div className="space-y-2.5">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-400">
                  Comentário Crítico do Historiador
                </h4>
                <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed font-sans">
                  {activeSource.commentary}
                </p>
              </div>

              {/* Guiding Questions (Interactive checklist) */}
              <div className="border-t border-slate-100 dark:border-slate-900 pt-6 space-y-5">
                <h4 className="font-sans font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-650 dark:text-indigo-400" />
                  Roteiro de Análise Guiada
                </h4>

                <div className="space-y-4">
                  {activeSource.guidingQuestions.map((gq, i) => {
                    const ansKey = `${activeSource.id}-ans-${i}`;
                    const expanded = !!visibleAnswers[ansKey];

                    return (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/30 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-sans font-semibold text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                            <span className="text-indigo-600 dark:text-indigo-400 mr-1">{i + 1}.</span> {gq.question}
                          </p>
                          <button
                            onClick={() => toggleAnswer(ansKey)}
                            className="text-xs font-semibold px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-150 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900 transition-all shrink-0 cursor-pointer"
                          >
                            {expanded ? 'Ocultar' : 'Revelar Solução'}
                          </button>
                        </div>

                        {/* Animated reveal box for proper Portuguese study assistance */}
                        <AnimatePresence>
                          {expanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2 pl-4 border-l-2 border-emerald-500 text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-serif space-y-1 bg-emerald-50/30 dark:bg-emerald-950/10 p-3 rounded-r-lg">
                                <strong className="text-emerald-700 dark:text-emerald-400 text-[10px] font-sans uppercase flex items-center gap-1 mb-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Solução Letiva de Sucesso:
                                </strong>
                                <p>{gq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
