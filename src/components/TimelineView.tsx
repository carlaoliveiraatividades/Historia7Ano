import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Compass, Star, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { TimelineEvent } from '../types';

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't-paleolitico',
    year: '40 000 a.C.',
    title: 'O Homem do Paleolítico Superior',
    description: 'Estilo de vida nómada centrado na caça de grandes mamíferos e na recoleção de vegetais silvestres. Fabricação pioneira das primeiras chaves de caça com pedra lascada e ossos.',
    period: 'pre-historia',
    curiosity: 'O domínio do fogo há centenas de milhares de anos permitiu cozinhar a carne e afastar perigosos predadores!'
  },
  {
    id: 't-neolitico',
    year: '8 000 a.C.',
    title: 'A Revolução Agrícola do Neolítico',
    description: 'Nascimento da agricultura e domesticação. As populações tornam-se sedentárias, estabelecendo as primeiras aldeias de pedra e argila e elevando monumentos megalíticos.',
    period: 'pre-historia',
    curiosity: 'A cerâmica e a tecelagem surgiram neste período para armazenar o excedente do trigo cultivado.'
  },
  {
    id: 't-escrita',
    year: '3 500 a.C.',
    title: 'Invenção da Escrita e Cidades-Templo',
    description: 'Aparecimento dos primeiros caracteres de escrita figurativa na Mesopotâmia (cuneiforme) e no Egito (hieróglifos), dividindo a Pré-História e a História.',
    period: 'antiguidade',
    curiosity: 'A escrita era mantida por escribas reais privilegiados que cobravam os cereais devidos ao Faraó ou Rei!'
  },
  {
    id: 't-atenas',
    year: 'Século V a.C.',
    title: 'A Idade de Ouro de Atenas',
    description: 'Neste "século de Péricles", a democracia direta floresceu na assembleia da Eclésia, defendendo a igualdade jurídica teórica de todos os cidadãos atenienses.',
    period: 'antiguidade',
    curiosity: 'O teatro grego, tragédias e comédias cívicas nasceram aqui como parte espiritual das festas ao deus Dionísio!'
  },
  {
    id: 't-roma',
    year: 'Séculos II e III d.C.',
    title: 'Apogeu Imperial e Pax Romana',
    description: 'O Império Romano unifica todo o mar Mediterrâneo. Difusão mundial do estilo de vida romano baseado nas termas, latim, estradas seguras e Direito.',
    period: 'antiguidade',
    curiosity: 'O cimento de cinzas vulcânicas romanas era tão duradouro que muitos aquedutos ainda de pé retêm água!'
  },
  {
    id: 't-cristo',
    year: 'Século I d.C.',
    title: 'Surgimento e Difusão do Cristianismo',
    description: 'Mensagem de monoteísmo ético e fraternidade divina pregada por Jesus de Nazaré na Palestina, que viria a tornar-se a religião oficial romana em 380 d.C.',
    period: 'antiguidade',
    curiosity: 'As estradas de pedra facilitaram o tráfego dos apóstolos, que disseminaram as escrituras sagradas!'
  },
  {
    id: 't-babaros',
    year: '476 d.C.',
    title: 'Queda do Império Romano e Invasões Bárbaras',
    description: 'O último imperador de Roma é deposto por chefes de tribos bárbaras germânicas. Ruralização económica intensa e fragmentação no Ocidente.',
    period: 'idade-media',
    curiosity: 'Na falta de moedas romanas centralizadas, a Europa recuou para uma economia de trocas diretas de trigo.'
  },
  {
    id: 't-islam',
    year: '622 d.C.',
    title: 'A Hégira e o Nascimento do Islão',
    description: 'O profeta Maomé foge de Meca para Medina, estabelecendo as bases morais do Islão registadas no Corão. Início de uma expansão comercial sem paralelo.',
    period: 'idade-media',
    curiosity: 'Os matemáticos muçulmanos unificaram o conhecimento asiático e legaram ao Ocidente o algarismo zero!'
  },
  {
    id: 't-feudal',
    year: 'Século IX',
    title: 'Instalação do Feudalismo Europeu',
    description: 'Instabilidade das invasões Vikings obriga os reis a descentralizar a proteção militar. Instauração das obrigações feudais de servidão e vassalagem.',
    period: 'idade-media',
    curiosity: 'A sociedade dividia-se entre o clero sagrado, a nobreza guerreira e os servos camponeses.'
  },
  {
    id: 't-condado',
    year: '1096 d.C.',
    title: 'Doação do Condado Portucalense',
    description: 'O Rei de Leão concede o Condado ao Conde D. Henrique de Borgonha pelo seu bravura heróica na cruzada militar contra o domínio muçulmano.',
    period: 'portugal-medieval',
    curiosity: 'O Condado estendia-se originalmente da beira do rio Minho até às margens lamacentas do rio Mondego!'
  },
  {
    id: 't-zamora',
    year: '1143 d.C.',
    title: 'O Tratado de Zamora e a Fundação',
    description: 'D. Afonso Henriques alcança a independência do reino. O seu primo D. Afonso VII reconhece Portugal como um termo soberano autónomo.',
    period: 'portugal-medieval',
    curiosity: 'D. Afonso Henriques teve de lutar contra a própria mãe na batalha campal de S. Mamede em Guimarães em 1128!'
  },
  {
    id: 't-bula',
    year: '1179 d.C.',
    title: 'Bula Papal Manifestis Probatum',
    description: 'O Papa Alexandre III emite a bula diplomática formal de reconhecimento mundial do título de Rei a D. Afonso Henriques e ao solo português.',
    period: 'portugal-medieval',
    curiosity: 'A bula original selada a chumbo espiritual encontra-se guardada na Torre do Tombo em Lisboa!'
  },
  {
    id: 't-dinis',
    year: '1290 d.C.',
    title: 'Fundação da Primeira Universidade Portuguesa',
    description: 'D. Dinis ("O Lavrador") assina o decreto fundador do Estudo Geral em Lisboa, que mais tarde se transfere definitivamente para as colinas de Coimbra.',
    period: 'portugal-medieval',
    curiosity: 'D. Dinis foi também o criador das maiores feiras francas livres e plantou o grandioso pinhal de Leiria!'
  },
  {
    id: 't-peste',
    year: '1348 d.C.',
    title: 'A Catástrofe sanitária da Peste Negra',
    description: 'A terrível epidemia da Peste Bubónica de cariz asiático ceifa mais de um terço de todas as vidas agrícolas e urbanas portuguesas e europeias.',
    period: 'portugal-medieval',
    curiosity: 'Paralelamente, a falta de higiene faz a peste propagar-se de navios comerciais carregados de cereais.'
  },
  {
    id: 't-aljubarrota',
    year: '1385 d.C.',
    title: 'Vitória Real em Aljubarrota',
    description: 'Para travar a anexação espanhola por Castela, frotas populares lideradas por D. João I vencem na batalha de Aljubarrota, instalando a Dinastia de Avis.',
    period: 'portugal-medieval',
    curiosity: 'O glorioso Mosteiro da Batalha foi edificado para comemorar esta vitória épica sobre as forças reais castelhanas!'
  }
];

export default function TimelineView() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pre-historia' | 'antiguidade' | 'idade-media' | 'portugal-medieval'>('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(TIMELINE_EVENTS[0]);

  const filteredEvents = TIMELINE_EVENTS.filter(
    (ev) => activeFilter === 'all' || ev.period === activeFilter
  );

  return (
    <div className="space-y-8">
      {/* Upper header */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
          <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          Linha do Tempo Interativa
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          A História cronológica corre da esquerda para a direita. Escolhe um período e clica nos pontos luminosos para desvendar imagens, curiosidades e segredos de cada acontecimento curricular.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: 'all', label: 'Todos os Períodos' },
            { id: 'pre-historia', label: 'Pré-História' },
            { id: 'antiguidade', label: 'Antiguidade Média' },
            { id: 'idade-media', label: 'Idade Média Europeia' },
            { id: 'portugal-medieval', label: 'Reino de Portugal (XI-XIV)' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeFilter === btn.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-850'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* The visual line list (Left/Main scroll) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900 pl-6 ml-3 py-2 space-y-8 max-h-[500px] overflow-y-auto pr-2">
            {filteredEvents.map((ev, idx) => {
              const works = selectedEvent?.id === ev.id;
              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => setSelectedEvent(ev)}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                    works
                      ? 'bg-indigo-50/70 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900 shadow-sm'
                      : 'bg-white border-slate-150 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-900'
                  }`}
                >
                  {/* Glowing bubble anchor */}
                  <div className={`absolute -left-[31px] top-7 w-4 h-4 rounded-full border-2 transition-all ${
                    works
                      ? 'bg-indigo-600 border-indigo-100 dark:border-indigo-950 scale-125 animate-pulse'
                      : 'bg-slate-300 border-white dark:border-slate-950 hover:bg-indigo-400'
                  }`} />

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-full">
                      {ev.year}
                    </span>
                    <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-slate-400">
                      {ev.period === 'pre-historia' ? 'Pré-História' :
                       ev.period === 'antiguidade' ? 'Antiguidade' :
                       ev.period === 'idade-media' ? 'Idade Média' : 'Portugal'}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center justify-between">
                    {ev.title}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Event Card Details (Right panel) */}
        <div className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-900 rounded-2xl p-6 shadow-sm self-start">
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  Acontecimento Destaque
                </div>

                <div className="border-b border-slate-100 dark:border-slate-900 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedEvent.title}
                  </h3>
                  <span className="inline-block mt-2 text-xs font-mono font-semibold bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 px-3 py-1 rounded-md">
                    Ano / Época: {selectedEvent.year}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed font-sans">
                  {selectedEvent.description}
                </p>

                {selectedEvent.curiosity && (
                  <div className="p-4 bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100/40 dark:border-indigo-900/10 rounded-xl">
                    <h4 className="font-sans font-semibold text-xs text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> CURIOSIDADE EXTRA_
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                      "{selectedEvent.curiosity}"
                    </p>
                  </div>
                )}
                
                <div className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-4 text-center">
                  Tudo alinhado com as Aprendizagens Essenciais do 7.º Ano.
                </div>
              </motion.div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                <p className="text-sm">Clica num acontecimento na lista esquerda para veres o estudo estético e histórico.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
