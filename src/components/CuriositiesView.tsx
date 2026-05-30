import { CURIOSITIES } from '../data/historyData';
import { Sparkles, GraduationCap, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import AudioNarration from './AudioNarration';

export default function CuriositiesView() {
  return (
    <div className="space-y-8">
      {/* Upper header banner */}
      <div className="bg-amber-550 text-white rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-md bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-450 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="space-y-2 max-w-xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest bg-amber-650 px-2.5 py-0.5 rounded-full border border-amber-400/35">
            Dicionário de Curiosidades
          </span>
          <h2 className="font-serif text-3xl font-bold">Mistérios, Invenções e Saberes</h2>
          <p className="text-amber-100 text-sm leading-relaxed">
            A História é tecida por fantásticas histórias que nos mostram como as pequenas decisões cotidianas ou invenções tecnológicas do passado moldaram as palavras que pronunciamos e os monumentos que nos rodeiam na atualidade.
          </p>
        </div>
        <div className="p-4 bg-white/10 rounded-full text-white shrink-0">
          <Lightbulb className="w-12 h-12" />
        </div>
      </div>

      {/* Grid of curiosities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURIOSITIES.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-900 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group overflow-hidden"
          >
            {/* Top icon and design accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/40 dark:bg-amber-950/10 rounded-full blur-xl group-hover:scale-125 transition-all duration-300 pointer-events-none" />
            
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950/45 px-2 py-0.5 rounded-md">
                  {item.era}
                </span>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500/10 opacity-60 group-hover:rotate-12 transition-all" />
              </div>

              <h4 className="font-serif text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h4>

              <p className="text-slate-600 dark:text-slate-350 text-xs leading-relaxed font-sans line-clamp-6">
                "{item.text}"
              </p>
            </div>

            {/* Impact sign and voice narration */}
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-sans relative z-10 font-medium">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>Impacto: <strong className="text-slate-700 dark:text-slate-300">{item.impact}</strong></span>
              </div>
              <AudioNarration textToSpeak={`${item.title}. ${item.text}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
