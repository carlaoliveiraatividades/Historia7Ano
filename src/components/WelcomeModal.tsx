import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, ShieldAlert, Check } from 'lucide-react';

interface WelcomeModalProps {
  onSetName: (name: string) => void;
  savedName?: string;
}

export default function WelcomeModal({ onSetName, savedName }: WelcomeModalProps) {
  const [inputName, setInputName] = useState('');
  const [step, setStep] = useState(savedName ? 2 : 1);
  const [name, setName] = useState(savedName || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    const formatted = inputName.trim();
    setName(formatted);
    setStep(2);
  };

  const handleStart = () => {
    onSetName(name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 text-center"
          >
            <div className="inline-flex items-center justify-center p-3.5 mb-6 bg-slate-100 dark:bg-slate-800 rounded-full text-[#1A2B3C] dark:text-amber-400">
              <Compass className="w-8 h-8 animate-spin-slow" />
            </div>

            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1A2B3C] dark:text-white mb-2">
              História 7.º Ano
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 underline decoration-amber-500/50">
              Plataforma de Exploração de Aprendizagens Essenciais
            </p>

            <div className="p-4 mb-6 bg-amber-50 dark:bg-amber-950/25 rounded-xl border border-amber-200 dark:border-amber-900/40 text-slate-700 dark:text-slate-300 border-l-4 border-l-amber-500 text-left">
              <h2 className="font-sans font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5 text-xs uppercase tracking-wider mb-1.5">
                <Sparkles className="w-4 h-4 text-amber-505" /> Sabias disso?
              </h2>
              <p className="text-xs leading-relaxed">
                Estás prestes a viajar desde a Idade do Fogo no Paleolítico até às intrigas civis da Crise Dinástica de 1383!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs uppercase tracking-wider text-left mb-2">
                  Olá! Bem-vindo(a) à disciplina de História do 7.º Ano. Como te chamas?
                </label>
                <input
                  type="text"
                  required
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Digita o teu nome aqui..."
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-[#1A2B3C]/10 text-slate-850 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A2B3C] text-sm shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={!inputName.trim()}
                className="w-full py-3 px-5 text-white bg-[#1A2B3C] hover:bg-[#2C3E50] disabled:opacity-50 disabled:hover:bg-[#1A2B3C] font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                Prosseguir <Check className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md p-8 bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 text-center"
          >
            <div className="inline-flex items-center justify-center p-3.5 mb-6 bg-amber-50 dark:bg-amber-950/40 rounded-full text-amber-500 dark:text-amber-400">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>

            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1A2B3C] dark:text-white mb-4">
              Olá, <span className="text-amber-600 dark:text-amber-400 font-sans font-bold">{name}</span>!
            </h2>

            <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed mb-6">
              Bem-vindo(a) às aulas de História da professora <strong className="text-slate-800 dark:text-slate-200 underline decoration-amber-500/50">Carla Oliveira</strong>.
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              O teu percurso está prestes a começar! Completa resumos, desafia o teu cérebro com jogos integrados e ganha medalhas brilhantes para provares que és um verdadeiro historiador.
            </p>

            <button
              onClick={handleStart}
              className="w-full py-3 px-5 text-white bg-amber-505 bg-amber-500 hover:bg-amber-600 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              Começar Aventura!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
