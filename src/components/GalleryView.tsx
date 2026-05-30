import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Image as ImageIcon } from 'lucide-react';
import AudioNarration from './AudioNarration';

import imgFozCoa from '../assets/images/foz_coa_rupestre_1780145579672.png';
import imgParthenon from '../assets/images/parthenon_athens_1780145598263.png';
import imgAqueduct from '../assets/images/roman_aqueduct_1780145617767.png';
import imgSeVelha from '../assets/images/se_velha_coimbra_1780145636508.png';
import imgMosteiro from '../assets/images/mosteiro_alcobaca_1780145657546.png';

interface GalleryItem {
  id: string;
  title: string;
  era: string;
  description: string;
  architecturalStyle?: string;
  visualCue: string;
  imageUrl: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Arte Rupestre de Foz Côa',
    era: 'Paleolítico Superior',
    description: 'Xistos finos riscados ao ar livre com silhuetas de cervos no nordeste de Portugal, provando que a arte não se restringia à escuridão profunda de grutas.',
    visualCue: 'Gravuras ao ar livre',
    architecturalStyle: 'Espiritismo primitivo mágico',
    imageUrl: imgFozCoa
  },
  {
    id: 'gal-2',
    title: 'O Partenon de Atenas',
    era: 'Grécia Clássica (Séc. V a.C.)',
    description: 'Templo supremo edificado no topo da Acrópole ateniense consagrado a Atena Pallas. Simetria matemática, colunas dóricas e equilíbrio proporcional.',
    visualCue: 'Proporção áurea simétrica',
    architecturalStyle: 'Estilo Clássico Helénico',
    imageUrl: imgParthenon
  },
  {
    id: 'gal-3',
    title: 'O Aqueduto de Segóvia / Conímbriga',
    era: 'Império Romano (Séc. I-II)',
    description: 'Impasses de arcos de volta inteira construídos sem cimento, unindo precisão com utilidade pública para transportar caudal de água para as termas urbanas.',
    visualCue: 'Arco de volta inteira romano',
    architecturalStyle: 'Arquitetura Utilitária Romana',
    imageUrl: imgAqueduct
  },
  {
    id: 'gal-4',
    title: 'A Sé Velha de Coimbra',
    era: 'Reconquista Cristã (Séc. XII)',
    description: 'Catedral românica monumental de pedra de feição defensiva medieval. Muros de feição blindada, frestas pequenas para atirar flechas e ameias superiores.',
    visualCue: 'Aspeto de castelo-fortaleza',
    architecturalStyle: 'Arquitetura Românica',
    imageUrl: imgSeVelha
  },
  {
    id: 'gal-5',
    title: 'Mosteiro de Alcobaça (Cister)',
    era: 'Gótico Português (Séc. XIII)',
    description: 'Grandiosa nava de pedra do gótico inicial, marcada por coberturas elevadas ao céu que inundam de luz o transepto religioso através de vitrais e rosáceas.',
    visualCue: 'Arco em ogiva quebrado e luz divina',
    architecturalStyle: 'Arquitetura Gótica Inicial',
    imageUrl: imgMosteiro
  }
];

export default function GalleryView() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(GALLERY_ITEMS[0]);

  return (
    <div className="space-y-8">
      {/* Upper overview header */}
      <div className="bg-white dark:bg-[#121E2C] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-[#1A2B3C] dark:text-white flex items-center gap-2 mb-2">
          <ImageIcon className="w-6 h-6 text-amber-500" />
          Galeria de Maravilhas Estéticas e Históricas
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm underline decoration-amber-500/30">
          Clica em cima de qualquer monumento ou vestígio para visualizar o seu estudo arqueológico e estético. Todo o conteúdo é programado em consonância com as metas letivas do 7.º Ano.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {GALLERY_ITEMS.map((item) => {
          const isSelected = selectedItem?.id === item.id;
          return (
            <motion.div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`rounded-xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'bg-amber-500/5 border-amber-500 shadow-md ring-1 ring-amber-500/20'
                  : 'bg-white border-slate-200 hover:bg-slate-50 dark:bg-[#121E2C] dark:border-slate-800 dark:hover:bg-slate-800/80'
              }`}
            >
              {/* Card Image Thumbnail */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#1A2B3C] bg-amber-400 px-2.5 py-1 rounded shadow-sm">
                    {item.era}
                  </span>
                </div>
              </div>

              {/* Card Content body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-[#1A2B3C] dark:text-slate-100 text-sm lg:text-base leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-550 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.architecturalStyle && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-405 font-sans flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-500" />
                    <span>Estilo: <strong className="text-slate-700 dark:text-slate-300">{item.architecturalStyle}</strong></span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Item Drawer */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="bg-[#1A2B3C]/5 dark:bg-[#1A2B3C]/20 border border-slate-200 dark:border-slate-800 p-6 rounded-xl"
          >
            {/* Header detail */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                    Caderno de Campo de Arqueologia
                  </span>
                  <AudioNarration textToSpeak={`${selectedItem.title}. ${selectedItem.description}`} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A2B3C] dark:text-white mt-1">
                  {selectedItem.title}
                </h3>
              </div>
              <span className="inline-block px-3.5 py-1.5 bg-[#1A2B3C] text-white rounded-lg text-xs font-semibold self-start sm:self-auto">
                {selectedItem.era}
              </span>
            </div>

            {/* Structured details with responsive columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
              {/* Left Column: Big high quality image */}
              <div className="lg:col-span-4 h-48 lg:h-auto min-h-[220px] rounded-xl overflow-hidden border border-slate-205 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-sm relative">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Middle Column: Detailed analysis */}
              <div className="lg:col-span-5 space-y-3">
                <h4 className="font-sans font-bold text-xs uppercase text-slate-400 tracking-wider">Descrição Temática Detalhada</h4>
                <p className="text-slate-655 dark:text-slate-300 text-sm leading-relaxed font-serif">
                  {selectedItem.description}
                </p>
              </div>

              {/* Right Column: Educational focus box */}
              <div className="lg:col-span-3 p-4 bg-white dark:bg-[#121E2C] rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 block shadow-sm border-l-4 border-l-amber-500">
                <h4 className="font-sans font-bold text-xs uppercase text-[#1A2B3C] dark:text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Foco do Historiador
                </h4>
                <div className="text-xs space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  <div>
                    <span className="block text-[9px] uppercase font-mono text-slate-400">Pormenor Estético:</span>
                    <strong className="text-slate-800 dark:text-slate-250 dark:text-slate-200">{selectedItem.visualCue}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-mono text-slate-400">Estilo Letivo:</span>
                    <strong className="text-slate-800 dark:text-slate-250 dark:text-slate-200">{selectedItem.architecturalStyle}</strong>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
