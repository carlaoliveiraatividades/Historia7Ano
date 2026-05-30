import { TimelineEvent, HistoricalSource, Flashcard, QuizQuestion, Curio, MatchPair, EscapeRoomStep } from '../types';

export interface ThemeUnit {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  reflectionQuestion: string;
  reflectionAnswer: string;
}

export interface HistoryTheme {
  id: string;
  number: number;
  title: string;
  units: ThemeUnit[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  games: {
    trueFalse: { question: string; isTrue: boolean; explanation: string }[];
    fillBlanks: { sentenceBefore: string; blankValue: string; sentenceAfter: string; hint: string }[];
    matching: MatchPair[];
    escapeRoom: EscapeRoomStep[];
  };
}

export const APP_BADGES = [
  { id: 'recoletor', title: 'Curioso Pré-Histórico', description: 'Exploraste a vida no Paleolítico!', iconName: 'Flame', unlockedAtPoints: 50 },
  { id: 'escriba', title: 'Escriba do Nilo', description: 'Dominaste as primeiras escritas e excedentes agrícolas!', iconName: 'PenTool', unlockedAtPoints: 150 },
  { id: 'cidadao', title: 'Cidadão de Atenas', description: 'Aprendeste as regras da Democracia e do Teatro!', iconName: 'Scroll', unlockedAtPoints: 300 },
  { id: 'centuriao', title: 'Centurião Romano', description: 'Compreendeste a Romanização, o Direito e as Cidades!', iconName: 'Shield', unlockedAtPoints: 500 },
  { id: 'vassalo', title: 'Fiel Vassalo', description: 'Entendeste a vassalagem e o feudalismo medieval!', iconName: 'Sword', unlockedAtPoints: 750 },
  { id: 'fundador', title: 'Fundador do Reino', description: 'Acompanhaste a Reconquista de D. Afonso Henriques!', iconName: 'Crown', unlockedAtPoints: 1000 },
  { id: 'burgues', title: 'Burguês de Lisboa', description: 'Fizeste comércio nas Feiras medievais!', iconName: 'Coins', unlockedAtPoints: 1300 },
  { id: 'mestre', title: 'Mestre da Revolução', description: 'Concluíste todas as aventuras da crise de 1383-1385!', iconName: 'Award', unlockedAtPoints: 1600 }
];

export const HISTORY_THEMES: HistoryTheme[] = [
  {
    id: 'sociedades-recoletoras',
    number: 1,
    title: 'Das Sociedades Recoletoras às Primeiras Civilizações',
    units: [
      {
        id: 'sociedades-produtoras',
        title: 'Das Sociedades Recoletoras às Primeiras Sociedades Produtoras',
        summary: 'A transição revolucionária do Paleolítico (recoleção) para o Neolítico (produção), com sedentarização e novos rituais.',
        paragraphs: [
          'Durante o Paleolítico, os seres humanos tinham um modo de vida recoletor: dependiam inteiramente do que recolhiam da Natureza (caça, pesca, frutos e raízes). Por não produzirem alimentos, eram obrigados a deslocar-se constantemente em busca de recursos, praticando o nomadismo.',
          'Neste período, a Arqueologia revela-nos que o fabrico de instrumentos de pedra lascada e o domínio do fogo foram momentos cruciais de sobrevivência e adaptação. Além disso, as primeiras manifestações artísticas, como a arte rupestre (gravuras e pinturas nas paredes de rocha ou grutas), estavam ligadas a ritos mágicos e funerários para favorecer a caça e a fertilidade.',
          'Há cerca de 10 000 anos, no Neolítico, dá-se uma profunda transição: a revolução agrícola. Com a domesticação de plantas (agricultura) e animais (pecuária), os humanos passam a ter um modo de vida produtor. Isto permitiu a sedentarização (estabelecimento definitivo no mesmo local), o surgimento das primeiras aldeias, além de manifestações monumentais associadas ao culto dos mortos e dos astros, conhecidas como Megalitismo (menires, dólmenes ou antas, e cromeleques).'
        ],
        reflectionQuestion: 'Como é que a passagem do nomadismo para a sedentarização alterou a vida social dos seres humanos?',
        reflectionAnswer: 'Ao tornarem-se sedentários no Neolítico, os seres humanos criaram as primeiras comunidades permanentes (aldeias). Isto levou à divisão do trabalho, ao aumento populacional, ao aparecimento da cerâmica e da tecelagem, e à organização de formas de poder e rituais sociais complexos.'
      },
      {
        id: 'primeiras-civilizacoes',
        title: 'Os Contributos das Primeiras Civilizações',
        summary: 'A fixação humana junto das grandes bacias hidrográficas e a revolução urbana que deu origem ao Estado, à escrita e à estratificação.',
        paragraphs: [
          'Por volta do 4.º milénio a.C., algumas comunidades agrícolas que habitavam as margens de grandes rios (como o Nilo no Egito, o Tigre e o Eufrates na Mesopotâmia, o Indo na Índia e o Amarelo na China) desenvolveram técnicas de irrigação e diques para controlar as cheias estacionais.',
          'A fertilidade excecional destas terras permitiu a acumulação de excedentes agrícolas. Esta riqueza incentivou a divisão do trabalho, gerando artesãos, mercadores, guerreiros e sacerdotes. Deste modo, surgiram os primeiros núcleos urbanos (cidades) e uma sociedade altamente estratificada (dividida em classes sociais com deveres e privilégios desiguais).',
          'Para administrar estas sociedades complexas, organizou-se um poder sacralizado (governantes vistos como deuses ou representantes divinos). Duas invenções essenciais para a cobrança de impostos e registo das leis foram a escrita figurativa (como a hieroglífica egípcia ou cuneiforme mesopotâmica) e, mais tarde, a escrita alfabética criada pelos Fenícios, simplificando os registos comerciais.'
        ],
        reflectionQuestion: 'Por que razão a escrita foi um marco de divisão entre a Pré-História e a História?',
        reflectionAnswer: 'Porque a escrita permitiu registar permanentemente códigos de leis, transações comerciais, tributos, crenças religiosas e narrativas. Com as fontes escritas, os historiadores passaram a aceder a testemunhos diretos dos pensamentos e da administração das civilizações antigas.'
      }
    ],
    flashcards: [
      { id: '1-1', concept: 'Modo de Vida Recoletor', definition: 'Estilo de vida em que as populações dependem inteiramente da caça, pesca e recoleção de vegetais para sobreviver, sem cultivar a terra.' },
      { id: '1-2', concept: 'Nomadismo', definition: 'Necessidade de deslocação sistemática de grupos humanos de um lugar para outro devido à escassez de recursos alimentares.' },
      { id: '1-3', concept: 'Sedentarização', definition: 'Fixação de uma comunidade num local definitivo de forma permanente, proporcionada pela agricultura e domesticação animal no Neolítico.' },
      { id: '1-4', concept: 'Megalitismo', definition: 'Construção de grandes monumentos de pedra (menires, dólmenes/antas) no Neolítico, ligados ao culto dos antepassados e ritos agrários.' },
      { id: '1-5', concept: 'Acumulação de Excedentes', definition: 'Armazenamento de alimentos produzidos para além das necessidades imediatas de consumo, permitindo o comércio e a especialização do trabalho.' },
      { id: '1-6', concept: 'Arqueologia', definition: 'Ciência que estuda as sociedades humanas através dos seus vestígios materiais (utensílios, monumentos, ossadas) preservados no tempo.' }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Qual das seguintes opções caracteriza o modo de vida do período Paleolítico?',
        options: [
          'Sedentarismo, agricultura e metalurgia',
          'Nomadismo, recoleção de alimentos e instrumentos de pedra lascada',
          'Surgimento das primeiras grandes cidades e escrita cuneiforme',
          'Construção de grandes dólmenes para habitação familiar'
        ],
        correctAnswer: 1,
        explanation: 'No Paleolítico, os seres humanos eram recolectores e nómadas, lascando a pedra para fabricar bifaces, arpões e raspadores.'
      },
      {
        id: 'q1-2',
        question: 'Que grande inovação marca a passagem para o período do Neolítico, há cerca de 10 mil anos?',
        options: [
          'O domínio do fogo',
          'A invenção da escrita alfabética',
          'A descoberta da agricultura e domesticação de animais',
          'A criação do Direito Romano'
        ],
        correctAnswer: 2,
        explanation: 'A descoberta da agricultura e a domesticação de animais (revolução agrícola) permitiram que o ser humano passasse a produzir o seu próprio sustento.'
      },
      {
        id: 'q1-3',
        question: 'As primeiras civilizações da Antiguidade desenvolveram-se principalmente junto de:',
        options: [
          'Altas montanhas de difícil acesso para proteção militar',
          'Margens de grandes rios (como o Nilo, Tigre e Eufrates)',
          'Grandes oceanos para pescar baleias',
          'Grandes florestas densas'
        ],
        correctAnswer: 1,
        explanation: 'Estas regiões eram chamadas de civilizações dos Grandes Rios (ou Crescente Fértil) porque a água permitia a irrigação dos solos e enormes colheitas.'
      }
    ],
    games: {
      trueFalse: [
        { question: 'No Paleolítico, o ser humano já era sedentário graças à descoberta da agricultura.', isTrue: false, explanation: 'Falso. A agricultura e a sedentarização ocorreram no Neolítico. No Paleolítico eram nómadas.' },
        { question: 'A arte rupestre tinha fins puramente decorativos para embelezar as cabanas paleolíticas.', isTrue: false, explanation: 'Falso. Crê-se que estava ligada a ritos mágicos e funerários relacionados com a caça e sobrevivência.' },
        { question: 'A escrita mesopotâmica gravada em tábuas de argila mole chama-se cuneiforme.', isTrue: true, explanation: 'Verdadeiro! Chamava-se cuneiforme porque os caracteres tinham forma de cunha.' }
      ],
      fillBlanks: [
        { sentenceBefore: 'A ciência que estuda o passado humano através dos vestígios materiais chama-se ', blankValue: 'Arqueologia', sentenceAfter: '.', hint: 'Começa com A e estuda fósseis, ruínas e artefactos.' }
      ],
      matching: [
        { id: '1', term: 'Menir', definition: 'Monólito vertical de pedra associado ao culto da fertilidade e força da natureza.' },
        { id: '2', term: 'Dólmen', definition: 'Câmara constituída por esteios de pedra, coberta por uma laje, usada como sepultura coletiva.' }
      ],
      escapeRoom: [
        {
          id: 'esc1-1',
          title: 'O Desafio da Fogueira Paleolítica',
          clue: 'Vês pinturas rupestres de bisontes na parede da gruta. Ao fundo, brilha uma chave ao lado de cinzas de uma fogueira antiga.',
          riddle: 'Que material usavam principalmente os caçadores do Paleolítico para registar estas pinturas rupestres?',
          answerOptions: ['Tintas a óleo modernas', 'Pigmentos minerais naturais misturados com gordura animal', 'Canetas de tinta permanente', 'Tinta acrílica de resina'],
          correctIndex: 1,
          successMessage: 'Correto! Os ancestrais misturavam carvão, terra vermelha (óxido de ferro) e gordura animal para criar tintas duradouras!'
        }
      ]
    }
  },
  {
    id: 'heranca-meditarraneo',
    number: 2,
    title: 'A Herança do Mediterrâneo Antigo',
    units: [
      {
        id: 'gregos-atenas',
        title: 'Os Gregos no Século V a.C. e o Exemplo de Atenas',
        summary: 'O nascimento da democracia, as suas virtudes cívicas e as limitações na cidadania ateniense.',
        paragraphs: [
          'No século V a.C. (chamado Século de Péricles), a cidade-estado (pólis) de Atenas desenvolveu um sistema político inédito: a Democracia. Na soberana Assembleia do Povo (Eclésia), reunida na colina da Pnyx, os cidadãos tomavam decisões sobre as leis, a paz e a guerra por voto direto.',
          'Esta democracia baseava-se em princípios de isonomia (igualdade de todos perante a lei) e isegoria (direito ao uso igual da palavra). Contudo, a cidadania ateniense tinha severas restrições: apenas eram considerados cidadãos os homens livres, maiores de idade, filhos de pai e mãe atenienses. Estavam excluídas as mulheres, os escravos e os metecos (estrangeiros residentes).',
          'Atenas legou também contributos estéticos determinantes: a arte clássica, visível nos templos da Acrópole (como o Partenon), que procuravam a harmonia, equilíbrio e proporção ideal de simetria cívica e religiosa.'
        ],
        reflectionQuestion: 'Quais eram as limites da democracia ateniense quando comparada com a democracia atual?',
        reflectionAnswer: 'A democracia ateniense era direta (votada por cada cidadão na praça) mas muito elitista (excluía mulheres, escravos e estrangeiros, representando apenas cerca de 10% da população). Atualmente, as democracias são representativas e universais, onde todos os cidadãos (incluindo mulheres e estrangeiros naturalizados com idade legal) têm igual direito ao voto.'
      },
      {
        id: 'mundo-romano',
        title: 'O Mundo Romano no Apogeu do Império',
        summary: 'A unidade imperial fundada na língua, no Direito Romano, no urbanismo prático e no processo de Romanização.',
        paragraphs: [
          'Durante os séculos II e III d.C., o Império Romano atingiu o seu apogeu territorial, político e económico ao redor do mar Mediterrâneo (o "Mare Nostrum"). Esta impressionante imensidão territorial acolhia uma enorme diversidade de povos e recursos administrados racionalmente a partir de Roma.',
          'A economia romana era essencialmente urbana, comercial, monetária e baseada no trabalho esclavagista. As províncias imperiais forneciam bens agrícolas e metais, facilitados por uma maravilhosa rede de estradas pavimentadas e rotas marítimas seguras.',
          'A integração destas províncias no modo de vida romano designa-se por Romanização. Este processo de unificação assentou em três pilares fundamentais: a rede urbana (com infraestruturas padrão como termas, aquedutos, fóruns, anfiteatros e templos), a adoção da língua latina (o latim) e a introdução do Direito Romano (corpo de leis escritas que garantia a ordem pública).'
        ],
        reflectionQuestion: 'Como é que a arquitetura romana se diferenciava da grega em termos práticos?',
        reflectionAnswer: 'Enquanto a arquitetura grega privilegiava templos para contemplação exterior com precisão simétrica, a arquitetura romana focava-se no utilitarismo urbano. Usando arcos de volta inteira, abóbadas de berço e o cimento/betão, os romanos construíram estruturas funcionais colossais (como termas, aquedutos e estradas).'
      },
      {
        id: 'cristianismo',
        title: 'Origem e Difusão do Cristianismo',
        summary: 'O surgimento de uma nova fé na Judeia ocupada, a sua pregação monoteísta e a sua expansão pelas infraestruturas imperiais.',
        paragraphs: [
          'Sob a ocupação romana da Palestina (Judeia), na época de Augusto e Tibério, surgiu Jesus de Nazaré, cuja mensagem revolucionou a moral da Antiguidade. Jesus pregava um monoteísmo radical, o amor ao próximo, a igualdade de todos perante Deus e a promessa de salvação na vida eterna.',
          'Após a sua crucificação, os discípulos disseminaram a sua mensagem, coligindo os textos fundamentais no Novo Testamento (que somado ao Antigo Testamento judaico forma a Bíblia Cristã). Os primeiros cristãos foram perseguidos pelos imperadores por recusarem o culto imperial divinizado, mas a religião continuou a expandir-se.',
          'A difusão do Cristianismo foi extremamente impulsionada pelas próprias infraestruturas romanas: a segurança do império, a excelente rede de estradas e a unidade da língua latina. Em 313 d.C., Constantino proclamou o Édito de Milão de liberdade de culto, e em 380 d.C., Teodósio elevou-o a religião oficial do Estado.'
        ],
        reflectionQuestion: 'Como é que a conversão do Império Romano ao Cristianismo transformou o futuro da Europa?',
        reflectionAnswer: 'Este processo uniu a tradição jurídica e administrativa romana à mundividência moral e espiritual judaico-cristã. Quando o Império colapsou no Ocidente, a Igreja Católica permaneceu como a única instituição organizada herdeira duma rede burocrática capaz de reter o latim, as leis e a literatura latina na Idade Média.'
      }
    ],
    flashcards: [
      { id: '2-1', concept: 'Pólis', definition: 'Designação grega para Cidade-Estado: uma comunidade autónoma com leis, exército, governo, moedas e território próprios.' },
      { id: '2-2', concept: 'Isonomia', definition: 'Princípio democrático grego que declara a igualdade de todos os cidadãos perante a lei do Estado.' },
      { id: '2-3', concept: 'Meteco', definition: 'Estrangeiro livre residente em Atenas. Pagava impostos especiais e trabalhava no comércio, mas não tinha direitos políticos.' },
      { id: '2-4', concept: 'Romanização', definition: 'Processo de aculturação focado na adoção dos costumes, leis, língua (latim) e arquitetura romana pelas populações dominadas.' },
      { id: '2-5', concept: 'Direito Romano', definition: 'Conjunto de leis e jurisprudências criadas para regular as relações no Império Romano, base da justiça civil moderna do Ocidente.' },
      { id: '2-6', concept: 'Monoteísmo', definition: 'Crença na existência de um único Deus supremo, característica fundamental do Judaísmo, Cristianismo e Islamismo.' }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Quem eram os únicos indivíduos considerados cidadãos na Atenas do século V a.C.?',
        options: [
          'Todos os homens, mulheres, escravos e estrangeiros que vivessem na pólis',
          'Os proprietários ricos e intelectuais como Sócrates, independentemente de onde nasceram',
          'Homens livres, maiores de idade, filhos de pai e mãe atenienses',
          'Apenas os guerreiros espartanos integrados nas magistraturas'
        ],
        correctAnswer: 2,
        explanation: 'A cidadania ateniense excluía ativamente a maioria esmagadora da população residente (mulheres, metecos e escravos).'
      },
      {
        id: 'q2-2',
        question: 'Qual destes fatores NÃO facilitou diretamente a expansão e a unificação do Império Romano?',
        options: [
          'A imposição do latim como língua oficial administrativa',
          'A magnífica rede de estradas calçadas romanas',
          'O Direito Romano regulando crimes e contratos civis',
          'A adoção universal e imediata de moedas de papel impressas em celulose'
        ],
        correctAnswer: 3,
        explanation: 'O Império Romano usava moedas metálicas (denários, sestércios), não existindo na Antiguidade moedas de papel celulose modernas.'
      },
      {
        id: 'q2-3',
        question: 'O Édit de Milão promulgado pelo Imperador Constantino em 313 d.C. declarou:',
        options: [
          'A destruição de todos os templos gregos',
          'A liberdade de culto para os cristãos, terminando as perseguições',
          'A língua alemã como substituta do latim',
          'A proibição do culto dos deuses tradicionais de Roma'
        ],
        correctAnswer: 1,
        explanation: 'O Édito de Milão garantiu liberdade religiosa no Império, cessando a longa era de execuções violentas de cristãos.'
      }
    ],
    games: {
      trueFalse: [
        { question: 'A democracia de Atenas funcionava por sufrágio universal secreto para todos os habitantes.', isTrue: false, explanation: 'Falso. Excluía mulheres, escravos e estrangeiros (metecos).' },
        { question: 'O arco de volta inteira é um elemento típico da engenharia arquitetónica dos Romanos.', isTrue: true, explanation: 'Verdadeiro! Revolucionou as pontes, aquedutos e basílicas!' },
        { question: 'Jesus de Nazaré pregou que o Imperador de Roma era o único Deus vivo acima do céu.', isTrue: false, explanation: 'Falso. Jesus ensinava o monoteísmo e a separação entre a esfera de Deus e o poder do César ("Dai a César o que é de César").' }
      ],
      fillBlanks: [
        { sentenceBefore: 'A unificação romana consistia na divulgação cultural, língua latina e estradas, fenómeno designado ', blankValue: 'Romanização', sentenceAfter: '.', hint: 'Palavra derivada de Roma.' }
      ],
      matching: [
        { id: '1', term: 'Eclésia', definition: 'Assembleia popular ateniense onde se votavam as leis da pólis.' },
        { id: '2', term: 'Aristocracia', definition: 'Governo exercido pelo topo da nobreza ou proprietários rústicos.' }
      ],
      escapeRoom: [
        {
          id: 'esc2-1',
          title: 'Decifra o Mosaico Romano',
          clue: 'Estás nas ruínas de Conímbriga a ler as leis imperiais para ultrapassar os guardas. Uma inscrição no chão cita o pilar do ordenamento social romano.',
          riddle: 'Como se designava o grande monumento legislativo romano que reuniu as leis civis unificadoras e codificadas?',
          answerOptions: ['Código de Hamurabi', 'O Alcorão sagrado', 'Direito Romano', 'Cortes de Coimbra'],
          correctIndex: 2,
          successMessage: 'Brilhante! O Direito Romano é a fundação jurídica da maior parte da Europa moderna!'
        }
      ]
    }
  },
  {
    id: 'cristandade-ocidental',
    number: 3,
    title: 'A Formação da Cristandade Ocidental e Expansão Islâmica',
    units: [
      {
        id: 'europa-VI-IX',
        title: 'A Europa dos Séculos VI a IX: A Idade Média Fragmentada',
        summary: 'As invasões bárbaras que destruíram as estradas comerciais de Roma, dando lugar a feudos de autossubsistência sob a única rede espiritual da Igreja Católica.',
        paragraphs: [
          'No ano 476 d.C., a queda do Império Romano do Ocidente, enfraquecido por problemas internos e pressionado pelas vagas das invasões bárbaras (bárbaros eram todos os povos vindos de fora das fronteiras romanas, sem latim), quebrou a unidade política europeia.',
          'Esta brutal instabilidade militar e política gerou uma profunda regressão económica e demográfica. As estradas comerciais romanas tornaram-se inseguras, provocando um recuo para os campos. Estabeleceu-se uma economia de subsistência, assente na agricultura rústica sem moedas, onde cada comunidade produzia apenas o necessário para sobreviver.',
          'Nesta Europa partida em dezenas de pequenos territórios, a única autoridade capaz de preservar a cultura literária e o sentimento de unidade moral transfronteiriça foi a Igreja Católica Romana, através dos sacramentos, do latim litúrgico e das ordens religiosas.'
        ],
        reflectionQuestion: 'Como é que as invasões bárbaras mudaram o centro de gravidade da sociedade na Europa?',
        reflectionAnswer: 'A insegurança generalizada fez com que a população abandonasse as grandes cidades costeiras e imperiais romanas, fugindo para o campo para escapar à violência de pilhagens. O centro do poder e da economia deslocou-se das cidades para as grandes propriedades rurais, iniciando o processo de feudalismo agrícola medieval.'
      },
      {
        id: 'mundo-muculmano',
        title: 'O Mundo Muçulmano em Expansão',
        summary: 'A revelação do Islão na Arábia por Maomé, a pregação ética do Corão e o desenvolvimento urbano focado no comércio global.',
        paragraphs: [
          'No início do século VII, na Península Arábica, o profeta Maomé unificou as tribos árabes ao revelar uma nova religião monoteísta: o Islamismo (cujos crentes são os muçulmanos). O livro sagrado do Islão é o Corão, que prescreve cinco pilares de fé, incluindo a profissão de fé, as orações diárias, a caridade, o jejum no Ramadão e a peregrinação a Meca.',
          'A rápida expansão islâmica pelos califas uniu a Arábia, a Síria, o Norte de África e, em 711 d.C., atingiu a Península Ibérica. As forças muçulmanas foram impulsionadas por um ideal de guerra santa e respeito às "Gentes do Livro" (cristãos e judeus, tolerados mediante taxas tributárias).',
          'Ao contrário da Europa medieval ruralizada, o mundo muçulmano desenvolveu um caráter cosmopolita, comercial e intensamente urbano, promovendo um extraordinário desenvolvimento científico (medicina, matemática na introdução dos algarismos árabes, astronomia e agronomia).'
        ],
        reflectionQuestion: 'Qual foi o principal contributo científico dos muçulmanos para a Europa cristã?',
        reflectionAnswer: 'Os muçulmanos serviram de ponte cultural. Traduziram e refinaram obras de filosofia grega clássica, criaram técnicas matemáticas fundamentais (como a álgebra e a divulgação dos algarismos indo-arábicos com o zero) e transmitiram instrumentos de navegação como o astrolábio.'
      },
      {
        id: 'sociedade-feudal',
        title: 'A Sociedade Europeia dos Séculos IX a XII',
        summary: 'A estrutura tripartida do Feudalismo assente em obrigações de fidelidade e submissão senhorial.',
        paragraphs: [
          'Nos séculos IX a XII, as novas invasões (Vikings, Magiares e Sarracenos) impuseram o Feudalismo. Como o rei não conseguia defender todo o território de forma célere, concedeu vastos territórios (os feudos, compostos pelo castelo, terras aráveis e aldeias) aos guerreiros nobres em troca de auxílio militar permanente.',
          'Surgiu uma sociedade rigidamente tripartida e estratificada baseada nas três funções sociais essenciais: o Clero (os que oram), a Nobreza (os que combatem e protegem) e o Povo/Servos (os que trabalham e pagam pesados tributos agrários).',
          'O elo político era a vassalagem: o vassalo jurava fidelidade, obediência e serviço militar ao suserano numa cerimónia solene (homenagem, juramento de amizade e investidura). Em contrapartida, o suserano concedia o feudo para usufruto do vassalo.'
        ],
        reflectionQuestion: 'Como é que se explica que o poder régio fosse tão fraco no auge do Feudalismo?',
        reflectionAnswer: 'Como as invasões militares eram constantes, as populações rurais dependiam dos senhores feudais locais que comandavam as milícias armadas nos castelos adjacentes. O rei, não tendo um exército centralizado permanente, via-se obrigado a delegar poderes fiscais, jurídicos e militares diretos a duques e condes vassalos.'
      },
      {
        id: 'peninsula-iberica-portugal',
        title: 'A Península Ibérica dos Séculos IX a XII e a Fundação de Portugal',
        summary: 'A coexistência dinâmica na Ibéria islâmica, a Reconquista Cristã e a autonomia coroada de D. Afonso Henriques.',
        paragraphs: [
          'A Península Ibérica assistiu a séculos de coexistência dinâmica entre cristãos, muçulmanos e judeus. Contudo, os reinos cristãos do norte da península organizaram movimentos militares de expulsão islâmica, a chamada Reconquista Cristã, auxiliados pelos cruzados europeus.',
          'Como prémio de bravura militar, D. Afonso VI de Leão atribuiu o Condado Portucalense ao cruzado Henrique de Borgonha. Com a morte do Conde D. Henrique, o seu jovem filho, D. Afonso Henriques, assumiu os desígnios para atingir a autonomia plena.',
          'D. Afonso Henriques travou uma guerra civil contra a mãe (Batalha de S. Mamede, 1128) e exigiu a coroa régia. O processo de autonomia política e reconhecimento papal da independência consagrou-se com o Tratado de Zamora (1143) com o primo Afonso VII, consolidando-se em 1179 com a Bula papal Manifestis Probatum.'
        ],
        reflectionQuestion: 'Qual o papel da Bula Manifestis Probatum na fundação de Portugal?',
        reflectionAnswer: 'Foi o documento em que o Papa Alexandre III reconheceu formalmente a legitimidade régia de D. Afonso Henriques e a soberania do Reino de Portugal. Na Idade Média cristã, a legitimação pontifícia papal era equivalente ao reconhecimento internacional diplomático definitivo.'
      }
    ],
    flashcards: [
      { id: '3-1', concept: 'Feudo', definition: 'Território rústico que incluía castelo, terras e camponeses, doado por um suserano ao vassalo em troca de obrigações políticas e militares.' },
      { id: '3-2', concept: 'Servidão', definition: 'Vínculo jurídico e agrário que ligava o camponês (servo) à terra do senhor feudal, impedindo-o de abandonar o feudo e obrigando-o a pagar taxas.' },
      { id: '3-3', concept: 'Hégira', definition: 'Fuga de Maomé de Meca para Medina no ano 622 d.C., acontecimento histórico que marca o início do calendário muçulmano.' },
      { id: '3-4', concept: 'Condado Portucalense', definition: 'Território atribuído ao Conde D. Henrique pelo rei de Leão em 1096, que viria a servir de berço territorial à independência de Portugal.' },
      { id: '3-5', concept: 'Reconquista Cristã', definition: 'Movimento militar empreendido pelos reinos ibéricos do norte para reconquistar as terras aos muçulmanos.' },
      { id: '3-6', concept: 'Cortes', definition: 'Assembleias consultivas convocadas pelo monarca com representantes do Clero, Nobreza e, mais tarde (1254), do Povo.' }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Durante a Idade Média primitiva, na ausência de comércio regular, a economia europeia assentava em:',
        options: [
          'Produção industrial de teares mecânicos em grandes fábricas da Alemanha',
          'Exportação metalúrgica no mar Báltico para a América',
          'Uma economia de subsistência, agrária e essencialmente desmonetizada',
          'Bancos de papéis capitais centralizados em Roma'
        ],
        correctAnswer: 2,
        explanation: 'As invasões medievais destruíram o fluxo comercial contínuo de longa distância, obrigando a que os feudos passassem a produzir quase tudo no próprio local.'
      },
      {
        id: 'q3-2',
        question: 'O que consistia o ato de vassalagem feudal?',
        options: [
          'Um contrato público de aluguer de barcos mercantes',
          'Um juramento sagrado de fidelidade recíproca entre um senhor mais poderoso (suserano) e um guerreiro (vassalo)',
          'Uma lei romana que proibia cavalos nas aldeias',
          'Um exame escrito sobre teologia grega clássica'
        ],
        correctAnswer: 1,
        explanation: 'A vassalagem era um laço de honra militar recíproca em que se dava proteção em troca de serviço.'
      },
      {
        id: 'q3-3',
        question: 'Qual o ano e o tratado de oficialização da independência de Portugal pelo primo de D. Afonso Henriques?',
        options: [
          '1128, Batalha de S. Mamede',
          '1139, Batalha de Ourique',
          '1143, Tratado de Zamora',
          '1179, Bula Manifestis Probatum'
        ],
        correctAnswer: 2,
        explanation: 'A independência diplomática face ao senhorio dos reinos de Leão foi acordada no Tratado de Zamora em 1143.'
      }
    ],
    games: {
      trueFalse: [
        { question: 'A Hégira corresponde à data em que Maomé conquistou a Península Ibérica.', isTrue: false, explanation: 'Falso. A Hégira é a fuga de Maomé de Meca para Medina no ano 622 d.C.' },
        { question: 'D. Afonso Henriques era filho de Henrique de Borgonha e D. Teresa.', isTrue: true, explanation: 'Verdadeiro! Herdou a vontade de autonomia para o Condado Portucalense!' },
        { question: 'O feudalismo representava uma forma de poder político muito centralizado nos reis.', isTrue: false, explanation: 'Falso. O feudalismo fragmentava o poder político nas mãos de múltiplos nobres locais e detentores de castelos.' }
      ],
      fillBlanks: [
        { sentenceBefore: 'A dinastia fundadora de Portugal, inaugurada por D. Afonso Henriques, chama-se dinastia ', blankValue: 'Afonsina', sentenceAfter: ' ou de Borgonha.', hint: 'Derivado do nome do próprio Rei Afonso.' }
      ],
      matching: [
        { id: '1', term: 'Suserano', definition: 'Senhor nobre de poder superior que concedia feudos em troca de fidelidade.' },
        { id: '2', term: 'Vassalo', definition: 'Nobre guerreiro submetido que aceitava obrigações de auxílio militar.' }
      ],
      escapeRoom: [
        {
          id: 'esc3-1',
          title: 'A Batalha das Portas de Zamora',
          clue: 'Vês escudos heráldicos e batinas sagradas. Para obteres o Tratado que confirma que Portugal é um reino livre, tens de responder ao clérigo legista.',
          riddle: 'Quem promulgou o reconhecimento eclesiástico final da coroa portuguesa através da Bula Manifestis Probatum em 1179?',
          answerOptions: ['O Imperador Carlos Magno', 'O Papa Alexandre III', 'O Califa cordovês Abderramão III', 'O Rei D. Fernando de Aragão'],
          correctIndex: 1,
          successMessage: 'Excecional! O Papa Alexandre III conferiu a Bula papal que selou o destino diplomático português!'
        }
      ]
    }
  },
  {
    id: 'portugal-seculos-XII-XIV',
    number: 4,
    title: 'Portugal no Contexto Europeu dos Séculos XII a XIV',
    units: [
      {
        id: 'desenvolvimento-economico',
        title: 'Desenvolvimento Económico, Relações Sociais e Poder Político',
        summary: 'A ascensão da burguesia mercantil, dinamização dos concelhos, cartas de foral e a importância mercantil de Lisboa.',
        paragraphs: [
          'A partir de meados do século XII, a Europa conheceu novidades tecnológicas na agricultura (como o arado de ferro, rotação trienal de culturas e moinhos de vento) que causaram um crescimento demográfico. O recuo da guerra e o excedente permitiram reativar a economia baseada na moeda.',
          'Esta dinâmica impulsionou os mercados e feiras anuais, onde a nova classe social urbana — a burguesia (comerciantes e artesãos livres) — acumulava riqueza e notoriedade civil, rompendo a prepotência dos nobres locais.',
          'Os reis, com o objetivo de povoar as terras e lutar contra o poder senhorial abusivo, criaram concelhos (comunidades livres dotadas de autonomia administrativa regidas por uma Carta de Foral). Para além disso, cidades como Lisboa cresceram devido à sua excecional posição costeira no comércio marítimo atlântico.',
          'Simultaneamente, os monarcas convocaram as Cortes (parlamentos consultivos) para ouvir os três estados de forma a reter leis nacionais centralizadoras de fortalecimento régio.'
        ],
        reflectionQuestion: 'Qual a importância de um concelho ser agraciado com uma Carta de Foral pelo Rei?',
        reflectionAnswer: 'A Carta de Foral estipulava os impostos fixos, multas civis e privilégios que a população daquele concelho devia cumprir. Dava liberdade jurídica face à nobreza vizinha, estimulando as feiras locais, o comércio livre e a fixação de pessoas para lavrar a terra em paz.'
      },
      {
        id: 'cultura-romantico-gotico',
        title: 'Cultura Portuguesa Face aos Modelos Europeus',
        summary: 'As transformações culturais nas catedrais religiosas, a arquitetura do Românico e Gótico e as faculdades universitárias.',
        paragraphs: [
          'Durante os séculos XII a XIV, as instituições monásticas medievais (como a Ordem de Cister em Alcobaça) e as cortes régias e senhoriais eram os polos dinâmicos de produção escrita e literária, fomentando as cantigas de amor, de amigo e de escárnio e maldizer.',
          'Foi nesta altura que surgiram as primeiras Universidades em Coimbra e Lisboa (fundadas por D. Dinis no ano 1290), democratizando de forma escolástica os saberes de Direito civil, de Cânones canónicos, Medicina e Artes.',
          'No campo artístico, desenvolveram-se dois grandes estilos arquitetónicos europeus: o Românico (séculos XI-XII), marcado por construções de pedra com muros espessos, poucas janelas e aspeto de fortaleza guerreira; e o Gótico (séculos XII-XIV), de verticalidade elegante, abóbadas cruzadas e vitrais policromados brilhantes que inundavam as naves de luz divina.'
        ],
        reflectionQuestion: 'Como é que as igrejas góticas expressavam uma mundividência diferente das igrejas românicas?',
        reflectionAnswer: 'O Românico refletia um período inseguro e guerreiro, com igrejas maciças e escuras que faziam o fiel recolher-se sob o medo do juízo divino. Já o Gótico simbolizava a reativação urbana e as riquezas materiais: as catedrais subiam alto em direção ao céu, usando vitrais coloridos para inspirar a alma a elevar-se pela beleza e calor da luz.'
      },
      {
        id: 'crises-revolucao',
        title: 'As Crises e Revolução no Século XIV',
        summary: 'A Peste Negra sob a carência de trigo, a guerra dinástica fernandina e a revolução civil de 1383-1385.',
        paragraphs: [
          'O século XIV europeu foi de terríveis catástrofes, rotulado como a "Trilogia do Apocalipse": más colheitas causavam fome, e em 1348 irrompeu a Peste Negra (peste bubónica transmissível de ratos e pulgas), dizimando um terço da população ocidental e abrindo crises económicas agudas por falta de braços no campo.',
          'Em Portugal, esta turbulência sociopolítica agravou-se na sucessão de D. Fernando. Com a sua morte em 1383, a herdeira do trono era D. Beatriz, casada com o monarca D. Juan I de Castela. Esta união ameaçava gravemente a soberania de Portugal, indignando a burguesia e as massas populares de Lisboa.',
          'Irrompeu a Revolução de 1383-1385. O povo e a burguesia aclamaram o Mestre de Avis (D. João) como Regedor e Defensor do Reino. Sob a liderança militar estratégica do jovem condestável D. Nuno Álvares Pereira, os soldados portugueses venceram a milícia espanhola na monumental Batalha de Aljubarrota (1385), assegurando a independência perpetuada nas Cortes de Coimbra com a eleição de D. João I.'
        ],
        reflectionQuestion: 'Qual foi o papel decisivo da burguesia no triunfo da revolução de 1383-1385?',
        reflectionAnswer: 'A burguesia de Lisboa, Porto e de concelhos litorais financiou a aquisição de armaduras e mercenários estrangeiros para D. João, Mestre de Avis. Eles temiam que a unificação ao reino de Castela fizesse os monarcas castelhanos dar primazia política à nobreza tradicional agrária, prejudicando os privilégios mercantis burgueses portugueses.'
      }
    ],
    flashcards: [
      { id: '4-1', concept: 'Peste Negra', definition: 'Pandemia bubónica iniciada na Europa em 1348 que matou entre 30% a 50% dos habitantes em centros urbanos e campos.' },
      { id: '4-2', concept: 'Carta de Foral', definition: 'Documento solene assinado pelo rei (ou senhor) que instituía um Concelho e definia os deveres tributários e privilégios civis dos habitantes.' },
      { id: '4-3', concept: 'Burguês', definition: 'Habitante livre do burgo (cidade) que se dedicava principalmente ao comércio mercantil, à produção manufatureira e ao intercâmbio bancário.' },
      { id: '4-4', concept: 'Estilo Românico', definition: 'Arte medieval europeia caracterizada pela robustez maciça, paredes espessas, coberturas volumosas e janelas semelhantes a frestas.' },
      { id: '4-5', concept: 'Estilo Gótico', definition: 'Arquitetura definida por arcos quebrados de lanceta, abóbadas ogivais e vitrais que filtravam a luz solar para o interior das naves das catedrais.' },
      { id: '4-6', concept: 'Batalha de Aljubarrota', definition: 'Confronto ocorrido em 14 de agosto de 1385 que confirmou militarmente a soberania e independência nacional contra Castela, elegendo D. João I.' }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Quem fundou os estudos universitários em Portugal (Lisboa, depois Coimbra) no ano de 1290?',
        options: [
          'D. Afonso Henriques para formar cavaleiros cruzados',
          'D. Sancho I para treinar marinheiros da pesca',
          'D. Dinis, cognominado o Lavrador ou Poeta',
          'D. Fernando, no termo da Guerra dos Cem Anos'
        ],
        correctAnswer: 2,
        explanation: 'O rei D. Dinis assinou o documento "Scientiae thesaurus mirabilis" em 1290, fundando o Estudo Geral Universitário.'
      },
      {
        id: 'q4-2',
        question: 'O desenvolvimento mercantil de Lisboa no século XIII deveu-se em larga parte:',
        options: [
          'Às estradas rústicas feitas de mármore grego',
          'À sua excelente bacia portuária ideal para frotas de ligação ao mar do Norte e ao Mediterrâneo',
          'Ao cultivo exclusivo de cacau e plantas exóticas das Américas',
          'À abolição de todos os impostos sobre comerciantes estrangeiros'
        ],
        correctAnswer: 1,
        explanation: 'Lisboa acolhia frotas mercantis que viajavam da bacia do Mediterrâneo italiano para Flandres e Inglaterra de forma segura.'
      },
      {
        id: 'q4-3',
        question: 'A Batalha de Aljubarrota em 14 de agosto de 1385 colocou em confronto:',
        options: [
          'As milícias da professora Carla contra as invasões romanas',
          'D. João I (Mestre de Avis) auxiliado por soldados ingleses contra o Exército de Castela',
          'D. Afonso Henriques contra cavaleiros templários muçulmanos',
          'Três reinos Vikings no norte da Península Ibérica'
        ],
        correctAnswer: 1,
        explanation: 'Foi o maior confronto militar de defesa armada da independência nacional portuguesa, selando o início da Dinastia de Avis.'
      }
    ],
    games: {
      trueFalse: [
        { question: 'A Peste Negra era transmitida ao ser humano apenas pelo vento frio das montanhas.', isTrue: false, explanation: 'Falso. Era provocada pela bactéria Yersinia pestis, alojada em pulgas que viajavam nas carapaças de ratos provenientes dos porões de barcos mercantes.' },
        { question: 'A Universidade de Coimbra foi uma das pioneiras na Europa medieval.', isTrue: true, explanation: 'Verdadeiro! Fundada em 1290, é uma das mais antigas universidades em operação contínua no mundo.' },
        { question: 'D. Beatriz casou com D. João, Mestre de Avis, no início da revolução.', isTrue: false, explanation: 'Falso. Casou-se com o Rei D. Juan I de Castela, desencadeando o receio de anexação territorial!' }
      ],
      fillBlanks: [
        { sentenceBefore: 'O general estrategista que comandou a resistência militar em Aljubarrota foi D. Nuno ', blankValue: 'Álvares Pereira', sentenceAfter: '.', hint: 'Também conhecido como o Santo Condestável.' }
      ],
      matching: [
        { id: '1', term: 'Concelho', definition: 'Comunidade territorial livre dotada de autonomia própria administrada por foral régio.' },
        { id: '2', term: 'Gótico', definition: 'Arquitetura catedralícia com abóbada de cruzamento e grandes vitrais iluminados.' }
      ],
      escapeRoom: [
        {
          id: 'esc4-1',
          title: 'O Cerco de Aljubarrota',
          clue: 'Estás no cimo de uma duna tática do planalto de Aljubarrota com D. Nuno Álvares Pereira. Deves decifrar o nome do engenhoso sistema defensivo utilizado para travar os cavaleiros espanhóis.',
          riddle: 'Que tática militar, inspirada nas táticas inglesas de trincheiras em forma de armadilhas escavadas no solo, permitiu desorganizar a carga militar de cavalaria de Castela?',
          answerOptions: ['Uso de canhões nucleares', 'O Sistema de Quadra com covas de lobo defensivas', 'Um tratado de rendição pacífica rápida', 'O envio de barcos fluviais no mar de Leiria'],
          correctIndex: 1,
          successMessage: 'Brilhante! O sistema de covas de lobo desequilibrou a investida violenta da infantaria espanhola!'
        }
      ]
    }
  }
];

export const HISTORICAL_SOURCES: HistoricalSource[] = [
  {
    id: 'src-rupestre',
    title: 'Gravura de Arte Rupestre do Vale do Côa',
    theme: 'Das Sociedades Recoletoras às Primeiras Civilizações',
    type: 'Iconográfica',
    authorAndDate: 'Paleolítico Superior (Cerca de 20 000 a.C.), Portugal',
    content: 'Gravura incisa na rocha rústica de xisto representando um auroque (boi selvagem ancestral) e um cavalo sobrepostos. Através de linhas geométricas fluidas e firmes, o homem pré-histórico esculpiu com quartzito estes mamíferos gigantes numa encosta rochosa exposta ao ar livre.',
    imageUrl: 'rupestre',
    commentary: 'As gravuras rupestres do Vale do Côa, em Portugal, constituem um espetacular conjunto de arte paleolítica ao ar livre único no mundo. Ocupando margens de rios locais, provam que o ser humano partilhava uma necessidade comunicacional intemporal associada a rituais mágicos de caça ou de marcação de territórios estacionais de reprodução da fauna.',
    guidingQuestions: [
      { question: 'Que espécies de animais são identificáveis nesta gravura paleolítica e com que fins se pensa que seriam gravadas?', answer: 'São representados animais de grande porte como cavalos selvagens, cabras montesas e auroques (antepassados dos bois atuais). Pensa-se que seriam gravados para realizar rituais divinos que assegurassem a multiplicação das espécies e o sucesso das tarefas diárias de caça cooperativa.' },
      { question: 'Por que razão o Vale do Côa em Portugal é tão importante a nível mundial para a Arqueologia?', answer: 'Porque quebra a antiga crença de que a arte rupestre do Paleolítico só existia escondida no fundo de grutas escuras. O Vale do Côa revelou milhares de gravuras expostas diretamente nas rochas de xisto ao ar livre, provando uma ocupação humana ao longo de dezenas de milhares de anos.' }
    ]
  },
  {
    id: 'src-atenas',
    title: 'O Discurso Fúnebre de Péricles (Tucídides)',
    theme: 'A Herança do Mediterrâneo Antigo',
    type: 'Textual',
    authorAndDate: 'Péricles citado pelo historiador Tucídides, Século V a.C.',
    content: '"Temos uma forma de governo que não imita as leis das cidades vizinhas; servimos antes de modelo a outros. O nosso governo chama-se democracia, porque a sua administração não pertence a um pequeno número de cidadãos, mas sim à maioria. Segundo a lei, todos os cidadãos são iguais no que respeita às suas divergências privadas..."',
    commentary: 'Este famoso excerto, proferido em honra das vítimas da Guerra do Peloponeso, é o monumento filosófico mais sublime de exaltação dos princípios democráticos de igualdade de expressão e governação popular ateniense.',
    guidingQuestions: [
      { question: 'Segundo Péricles, qual é a principal característica que fundamenta o nome "Democracia"?', answer: 'O governo chama-se democracia porque a sua administração pertence à maioria dos cidadãos, e não a um punhado exclusivo de governantes dinásticos ricos.' },
      { question: 'Qual seria a principal crítica e contradição histórica que podemos apontar a este teor de igualdade jurídica proferido em Atenas?', answer: 'A contradição reside no facto de que na Atenas daquela época de ouro, a verdadeira igualdade legal estava reservada unicamente a homens ricos e livres naturais de Atenas. Cerca de 90% da população total (mulheres, escravos trabalhadores domésticos e de minas, e metecos) estava impedida de usufruir de qualquer direito político ou representativo.' }
    ]
  },
  {
    id: 'src-foral',
    title: 'Carta de Foral de Sintra (D. Afonso Henriques)',
    theme: 'Portugal no Contexto Europeu dos Séculos XII a XIV',
    type: 'Textual',
    authorAndDate: 'D. Afonso Henriques, Rei de Portugal, Ano de 1154 d.C.',
    content: '"Em nome de Deus. Eu, D. Afonso, rei de Portugal, por este documento faço carta de foral aos homens de Sintra e de todo o seu termo. Dou-vos pela vossa segurança jurídica que não paguem as pesadas vassalagens nobres; se algum vizinho for julgado no castelo de Sintra, pagará tributos apenas de acordo com este foral..."',
    commentary: 'As Cartas de Foral medievais escritas em pergaminhos em latim eram decretos repletos de isenções que criavam Concelhos, unindo o povo livre em torno da estabilização territorial da Coroa.',
    guidingQuestions: [
      { question: 'Com que objetivo político D. Afonso Henriques subscreveu a Carta de Foral de Sintra em 1154?', answer: 'O objetivo era incentivar o povoamento e a segurança do território contra eventuais novos confrontos islâmicos, bem como fortalecer os laços de obediência direta das comunidades à coroa real de Portugal, impedindo a intrusão dos barões da nobreza feudal.' },
      { question: 'O que representava no plano fiscal e pessoal para os habitantes locais o cumprimento do foral?', answer: 'Representava um avanço excecional: pagavam tributos fixos sabendo que ficavam imunes à exploração arbitrária dos nobres, tendo a sua própria assembleia de homens-bons que regulava o mercado diário e as feiras locais.' }
    ]
  }
];

export const CURIOSITIES: Curio[] = [
  {
    id: 'cur-1',
    title: 'O Fogo: A Primeira Grande Invenção',
    author: 'Equipa de História do 7.º Ano',
    era: 'Paleolítico Inferior',
    text: 'A descoberta e domesticação do fogo alterou radicalmente a evolução biológica e social. Permitiu cozinhar os alimentos (facilitando a digestão e o crescimento cerebral), afastar feras assassinas em cavernas, iluminar a escuridão da noite (incentivando debates alargados do bando) e temperar pontas de lança de madeira para caçadas eficientes.',
    impact: 'Sobrevivência humana num planeta de predadores'
  },
  {
    id: 'cur-2',
    title: 'O Ostracismo Ateniense',
    author: 'Pólis de Atenas',
    era: 'Atenas Clássica (Século V a.C.)',
    text: 'Em Atenas, se um cidadão fosse visto como uma séria ameaça para a democracia e pretendesse assumir poderes ditatoriais (tirania), os seus concidadãos podiam votar o seu banimento por dez anos escrevendo o nome numa concha de argila chamada ostrako. Daí deriva o termo ostracismo!',
    impact: 'Defesa comunitária da estabilidade livre'
  },
  {
    id: 'cur-3',
    title: 'Veteranos do Império e as Cidades Romanas',
    author: 'Legiões Imperiais',
    era: 'Império Romano (Século I a III)',
    text: 'Muitas das maiores cidades atuais do Sul da Europa foram fundadas originalmente como colónias de pensão militar para soldados reformados das legiões romanas. O planeamento das ruas em grelha imitava exatamente o perímetro retangular acampado das suas frentes de batalha.',
    impact: 'Urbanismo ordenador e ordenamento de estradas'
  },
  {
    id: 'cur-4',
    title: 'De Onde Vem o Nome "Algarve"?',
    author: 'Al-Andalus',
    era: 'Al-Andalus (Idade Média)',
    text: 'A prolongada influência da cultura islâmica na atual cultura portuguesa é gigantesca! A palavra "Algarve" vem diretamente do termo árabe "Al-Gharb", que significa "O Ocidente" (a província que ficava no canto ocidental da Ibéria muçulmana). Inúmeras outras palavras começadas por "al" provêm desta mesma raiz.',
    impact: 'Língua, arquitetura de chaminés e agronomia'
  },
  {
    id: 'cur-5',
    title: 'A Receita Brutal de Cola de Pergaminho',
    author: 'Copistas e Iluminadores',
    era: 'Mosteiros Medievais (Portugal)',
    text: 'Para criar os manuscritos medievais repletos de ouro tridimensional e iluminuras sagradas, os monges copistas raspavam peles de ovelha ou de bezerro que secavam sob enorme tensão. Uma capa de Bíblia inteira podia custar o sacrifício de um rebanho inteiro de ovelhas!',
    impact: 'Preservação física de livros e conhecimentos'
  }
];
