import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  PhoneCall, 
  Bot, 
  Presentation, 
  Users, 
  CheckCircle2, 
  Zap, 
  Menu,
  X,
  ChevronDown,
  AlertTriangle,
  Timer,
  Smartphone,
  Mail,
  ExternalLink,
  CalendarCheck,
  Rocket,
  LayoutDashboard,
  Server,
  ShieldCheck,
  Activity,
  Headphones,
  Infinity as InfinityIcon,
  FileText,
  Plus
} from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PillarCard } from './components/PillarCard';
import { Logo } from './components/Logo';
import { GrappeLogo } from './components/GrappeLogo';
import { Pillar, ChartData, WinConditionItem, PaymentPhase } from './types';

// --- Data Definition ---

const PILLARS: Pillar[] = [
  {
    id: 1,
    title: "Website Premium",
    subtitle: "Autoridade e Conversão",
    hours: "48h dedicadas",
    description: "O centro da operação digital. Arquitetura UX/UI premium projetada para transmitir confiança imediata e educar o investidor high-ticket.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    icon: Building2,
    features: [
      "Arquitetura UX/UI Premium e Responsiva",
      "Otimização Lighthouse >90 (Velocidade)",
      "Copywriting Persuasivo e de Autoridade",
      "Documentação completa para escalabilidade"
    ]
  },
  {
    id: 2,
    title: "Agente de Voz IA",
    subtitle: "Velocity & Qualificação",
    hours: "Incluído nas 68h de IA",
    description: "Elimina o maior gargalo do setor: a resposta lenta. O agente liga minutos após o interesse, qualifica e agenda.",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: PhoneCall,
    features: [
      "Chamada ativa minutos após o lead",
      "Conversa natural e humanizada",
      "Qualificação profunda automática",
      "Agendamento direto no CRM"
    ]
  },
  {
    id: 3,
    title: "Agente Web IA",
    subtitle: "Atendimento 24/7",
    hours: "Incluído nas 68h de IA",
    description: "Um especialista imobiliário virtual que vive no seu site. Responde dúvidas complexas sobre licenças, ROI e imóveis 24 horas por dia.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Bot,
    features: [
      "FAQ Avançado e Contextual",
      "Roteamento inteligente de leads",
      "Integração total com CRM",
      "Captura de leads fora do horário comercial"
    ]
  },
  {
    id: 4,
    title: "Apresentação Premium",
    subtitle: "Institucional High-End",
    hours: "24h (Bônus 100% Off)",
    description: "Reconstrução do storytelling da empresa. Design refinado que alinha a apresentação comercial ao novo padrão do website.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Presentation,
    isBonus: true,
    features: [
      "Storytelling estratégico",
      "Design System compatível com o site",
      "Versão PDF e Editável",
      "Reforço de percepção de valor"
    ]
  },
  {
    id: 5,
    title: "Sessões Estratégicas",
    subtitle: "Consultoria & Facetime",
    hours: "6h (Bônus 100% Off)",
    description: "Acompanhamento próximo para garantir que a tecnologia se traduza em negócios reais. Ajustes finos semanais.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Users,
    isBonus: true,
    features: [
      "Sessões semanais de 30min",
      "Direção estratégica de implementação",
      "Otimização contínua de funil",
      "Suporte direto da Grappe"
    ]
  }
];

const CHART_DATA: ChartData[] = [
  { name: 'Website Premium', value: 48, fill: '#1e293b' }, // Slate 800
  { name: 'Inteligência Artificial', value: 68, fill: '#d97706' }, // Amber 600
  { name: 'Bônus (Grátis)', value: 30, fill: '#fbbf24' }, // Amber 400
];

const WIN_CONDITIONS: WinConditionItem[] = [
  { id: 1, text: "Agente IA populando CRM com leads qualificados", checked: true },
  { id: 2, text: "Notificações de 'Hot Lead' em tempo real", checked: true },
  { id: 3, text: "Apresentação Institucional entregue e aprovada", checked: true },
  { id: 4, text: "Agente de Voz validado em chamadas reais", checked: true },
];

const MARKET_STATS = [
  {
    id: 1,
    value: "Impacto no Carregamento",
    label: "-7% Conversão",
    description: "Um segundo a mais no carregamento reduz a conversão em 7%.",
    source: "Retail TouchPoints",
    icon: Timer
  },
  {
    id: 2,
    value: "2-3s",
    label: "Tempo Limite",
    description: "Páginas que carregam acima dessa faixa perdem leads exponencialmente.",
    source: "Cloudflare",
    icon: AlertTriangle
  },
  {
    id: 3,
    value: "21x",
    label: "A Regra dos 5 Minutos",
    description: "Responder a um lead em 5min aumenta em 21x a chance de qualificação.",
    source: "Harvard Business Review",
    icon: Zap
  }
];

// Based on Total Investment of $8,088
const PAYMENT_PHASES: PaymentPhase[] = [
  {
    id: 1,
    percent: "30%",
    value: "US$ 2.426",
    title: "Kickoff & Estruturação",
    description: "Libera: Planejamento estratégico, início do website, arquitetura dos agentes.",
    trigger: "Contrato Assinado",
    icon: LayoutDashboard,
    psychology: "Eu só pago a entrada para colocar em movimento."
  },
  {
    id: 2,
    percent: "40%",
    value: "US$ 3.235",
    title: "Entregas Principais",
    description: "Liberada quando você entregar: Website funcional, Estrutura IA configurada, Testes de integração.",
    trigger: "Website Funcional",
    icon: Rocket,
    psychology: "Estou pagando pelo que já existe e consigo ver."
  },
  {
    id: 3,
    percent: "30%",
    value: "US$ 2.427",
    title: "Go-Live & Otimização",
    description: "Liberada na entrega final: Agentes operacionais, Apresentação institucional, Validação completa.",
    trigger: "Entrega Final",
    icon: CalendarCheck,
    psychology: "Pagamento final na conclusão do projeto."
  }
];

const RECURRING_FEATURES = [
  {
    title: "1.000 Minutos de Voz IA",
    description: "Cobertura completa. Voz de alta definição e baixa latência. Equivalente a centenas de chamadas mensais.",
    icon: PhoneCall
  },
  {
    title: "IA de Texto Ilimitada",
    description: "Chat 24/7 interpretando contexto, dúvidas e objeções. Inclui ajustes de prompt e expansão de conhecimento.",
    icon: InfinityIcon
  },
  {
    title: "Hosting Premium",
    description: "Hospedagem de alta performance (CDN global), uptime >99,9% e segurança contínua inclusos.",
    icon: Server
  },
  {
    title: "Manutenção Evolutiva",
    description: "Ajustes de conteúdo, navegação e correções técnicas sem limite de microajustes.",
    icon: ShieldCheck
  },
  {
    title: "Treinamento da IA",
    description: "Aprimoramento constante com base em conversas reais (Machine Learning supervisionado).",
    icon: Bot
  },
  {
    title: "Suporte VIP",
    description: "Acesso direto à equipe técnica com tempo de resposta reduzido.",
    icon: Headphones
  },
  {
    title: "Relatórios Mensais",
    description: "Analytics de performance, dúvidas comuns e insights estratégicos do comportamento dos leads.",
    icon: Activity
  }
];

// --- Main App Component ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useScroll({
    axis: "y",
  }).scrollYProgress;

  // Header Scroll Effect
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll Handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-amber-500/30 font-sans">
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <a href="#problem" onClick={(e) => scrollToSection(e, 'problem')} className="hover:text-amber-500 transition-colors">O Desafio</a>
            <a href="#ecosystem" onClick={(e) => scrollToSection(e, 'ecosystem')} className="hover:text-amber-500 transition-colors">O Ecossistema</a>
            <a href="#investment" onClick={(e) => scrollToSection(e, 'investment')} className="hover:text-amber-500 transition-colors">Investimento</a>
            <a href="#schedule" onClick={(e) => scrollToSection(e, 'schedule')} className="hover:text-amber-500 transition-colors">Cronograma</a>
            <a href="#recurring" onClick={(e) => scrollToSection(e, 'recurring')} className="hover:text-amber-500 transition-colors">Recorrência</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-30 bg-slate-950 flex flex-col items-center justify-center space-y-8 md:hidden"
        >
          <a href="#problem" onClick={(e) => scrollToSection(e, 'problem')} className="text-2xl font-serif hover:text-amber-500">O Desafio</a>
          <a href="#ecosystem" onClick={(e) => scrollToSection(e, 'ecosystem')} className="text-2xl font-serif hover:text-amber-500">O Ecossistema</a>
          <a href="#investment" onClick={(e) => scrollToSection(e, 'investment')} className="text-2xl font-serif hover:text-amber-500">Investimento</a>
          <a href="#schedule" onClick={(e) => scrollToSection(e, 'schedule')} className="text-2xl font-serif hover:text-amber-500">Cronograma</a>
          <a href="#recurring" onClick={(e) => scrollToSection(e, 'recurring')} className="text-2xl font-serif hover:text-amber-500">Recorrência</a>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Real Estate Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>

        <div className="container mx-auto px-6 z-10 text-center relative h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <span className="inline-block py-1 px-3 border border-amber-500/30 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold tracking-widest uppercase mb-6">
              Proposta Comercial Exclusiva
            </span>
            <h1 className="serif text-4xl md:text-7xl lg:text-8xl font-medium leading-tight mb-6 tracking-tight">
              O Novo Padrão de <br />
              <span className="gold-gradient italic">Captação High-Ticket</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              Um ecossistema integrado para eliminar atritos, acelerar o time-to-action e consolidar a Invision Investments como autoridade absoluta.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
            onClick={(e) => scrollToSection(e as any, 'problem')}
          >
            <span className="text-[10px] uppercase tracking-widest text-slate-500">Explore</span>
            <ChevronDown className="text-amber-500" size={24} />
          </motion.div>
        </div>
      </section>

      {/* The Problem / Evidence Section */}
      <section id="problem" className="py-24 bg-slate-900 relative">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="serif text-4xl md:text-5xl mb-6 text-center"
            >
              Evidências de Mercado
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center text-slate-400 max-w-2xl mx-auto"
            >
              A ineficiência digital não é apenas um incômodo — é um prejuízo mensurável. Dados de mercado comprovam o custo da baixa performance.
            </motion.p>
          </div>

          {/* Market Stats Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {MARKET_STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-colors group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-500 transition-colors">{stat.value}</span>
                  <stat.icon className="text-slate-500 group-hover:text-amber-500 transition-colors" size={24} />
                </div>
                <h4 className="text-lg font-medium text-white mb-2">{stat.label}</h4>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{stat.description}</p>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                  Fonte: {stat.source}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="serif text-3xl mb-8">O Custo da "Resposta Lenta"</h3>
              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-slate-700">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-red-500"></div>
                  <h4 className="text-xl font-medium text-white mb-2">Primeiro Contato Crítico</h4>
                  <p className="text-slate-400">
                    O "first response" define a confiança. Se falha ou demora, o lead assume desorganização. 
                    <span className="text-amber-500 block mt-2 text-sm font-medium">Fonte: Voiso</span>
                  </p>
                </div>
                <div className="relative pl-8 border-l-2 border-slate-700">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-red-500"></div>
                  <h4 className="text-xl font-medium text-white mb-2">Perda para Concorrência</h4>
                  <p className="text-slate-400">
                    Leads avaliam múltiplas opções. Quem responde em minutos tem chance exponencialmente maior de converter.
                    <span className="text-amber-500 block mt-2 text-sm font-medium">Fonte: Podium</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-8 rounded-3xl bg-slate-800 border border-slate-700 shadow-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <h3 className="text-2xl font-serif text-white mb-6 relative z-10">A Solução Grappe</h3>
              <p className="text-slate-300 mb-8 leading-relaxed relative z-10">
                Transformamos o processo reativo em uma <strong className="text-amber-500">máquina proativa</strong>. 
                Não é apenas um site novo; é uma infraestrutura de captura onde o lead é atendido instantaneamente, 24/7.
              </p>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-slate-900 p-4 rounded-xl text-center border border-slate-700/50">
                  <span className="block text-3xl font-bold text-white mb-1">24/7</span>
                  <span className="text-xs uppercase tracking-wider text-slate-500">Disponibilidade</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl text-center border border-slate-700/50">
                  <span className="block text-3xl font-bold text-amber-500 mb-1">0s</span>
                  <span className="text-xs uppercase tracking-wider text-slate-500">Fricção</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Ecosystem (Pillars) */}
      <section id="ecosystem" className="py-32 relative">
         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
         
         <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-4 block">Arquitetura de Conversão</span>
              <h2 className="serif text-4xl md:text-6xl text-white">O Ecossistema Completo</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* First 3 Core Pillars */}
               {PILLARS.slice(0, 3).map((pillar, index) => (
                 <PillarCard key={pillar.id} pillar={pillar} index={index} />
               ))}
               
               {/* Bonus Section */}
               <div className="md:col-span-2 lg:col-span-3 mt-12">
                 <div className="text-center mb-10">
                   <h3 className="serif text-3xl text-white inline-flex items-center gap-4">
                     <span className="h-px w-12 bg-amber-500/50"></span>
                     Bônus Estratégicos (30h)
                     <span className="h-px w-12 bg-amber-500/50"></span>
                   </h3>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    {PILLARS.slice(3, 5).map((pillar, index) => (
                      <PillarCard key={pillar.id} pillar={pillar} index={index + 3} />
                    ))}
                 </div>
               </div>
            </div>
         </div>
      </section>

      {/* Investment & Value */}
      <section id="investment" className="py-24 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Chart Side */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                 <h3 className="text-xl font-medium text-slate-300">Distribuição de Esforço</h3>
                 <span className="text-sm text-slate-500 uppercase tracking-widest">Alocação de Horas Técnicas</span>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CHART_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(255,255,255,0.05)" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} 
                      itemStyle={{ color: '#fbbf24' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Team Badge */}
              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800 rounded-full border border-slate-700 shadow-lg">
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-800 flex items-center justify-center text-xs">UX</div>
                      <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-slate-800 flex items-center justify-center text-xs">AI</div>
                      <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-slate-800 flex items-center justify-center text-xs">Dev</div>
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-bold border-2 border-slate-800 flex items-center justify-center text-xs">+1</div>
                   </div>
                   <span className="text-sm font-medium text-slate-300">Equipe de 4 Especialistas</span>
                </div>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <h2 className="serif text-4xl md:text-5xl mb-6">Investimento Inteligente</h2>
               
               <div className="flex flex-col items-start gap-1 mb-8">
                 <div className="text-slate-400 text-lg line-through decoration-red-500/50 decoration-2">Valor Real: US$ 9.528</div>
                 <div className="text-6xl md:text-7xl font-light text-white">
                   US$ 8.088
                 </div>
                 <p className="text-amber-500 font-medium tracking-wide uppercase mt-2">
                   Pacote Aceleração de Portfólio
                 </p>
               </div>

               <div className="space-y-4 border-t border-slate-700 pt-6">
                  {/* Detailed Breakdown */}
                  <div className="flex justify-between items-center text-slate-300 py-2 border-b border-slate-800">
                    <span>Website Premium (48h)</span>
                    <span className="font-semibold text-white">US$ 2.784</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 py-2 border-b border-slate-800">
                    <span>IA & Agentes (68h)</span>
                    <span className="font-semibold text-white">US$ 5.304</span>
                  </div>
                  <div className="flex justify-between items-center text-amber-400 font-medium py-2 border-b border-slate-800/50 bg-amber-500/5 px-3 -mx-3 rounded">
                    <span>Apresentação (Bônus)</span>
                    <span className="line-through decoration-amber-500/50">US$ 840</span>
                  </div>
                  <div className="flex justify-between items-center text-amber-400 font-medium py-2 bg-amber-500/5 px-3 -mx-3 rounded">
                    <span>Consultoria Estratégica (Bônus)</span>
                    <span className="line-through decoration-amber-500/50">US$ 600</span>
                  </div>

                  <div className="flex justify-between items-center text-lg text-white pt-4 mt-4 border-t border-slate-700">
                    <span>Horas Entregues</span>
                    <div className="text-right">
                      <span className="block font-bold text-2xl">146h</span>
                      <span className="text-xs text-slate-500 font-normal uppercase tracking-wider">116h Pagas + 30h Bônus</span>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Schedule (Cronograma) */}
      <section id="schedule" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-amber-500 font-bold tracking-widest text-sm uppercase mb-4 block">Segurança para o Cliente</span>
            <h2 className="serif text-4xl md:text-5xl mb-4 text-white">Cronograma de Desembolso</h2>
            <p className="text-slate-400">Pagamento atrelado a entregas claras e verificáveis.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PAYMENT_PHASES.map((phase, idx) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-amber-500/30 transition-all duration-300 group flex flex-col"
              >
                {/* Connector Line (Mobile hidden, Desktop visible except last) */}
                {idx !== PAYMENT_PHASES.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-slate-800 z-0"></div>
                )}

                <div className="mb-6 flex justify-between items-center">
                  <div className="p-3 bg-slate-800 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors shadow-lg">
                    <phase.icon size={24} />
                  </div>
                  <span className="text-3xl font-bold text-slate-700 group-hover:text-slate-600 transition-colors">0{phase.id}</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-white">{phase.percent}</span>
                    <span className="text-amber-500 font-medium">{phase.value}</span>
                  </div>
                  <h3 className="serif text-xl text-white">{phase.title}</h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow border-b border-slate-800 pb-4">
                  {phase.description}
                </p>

                <div>
                   <div className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-bold">Gatilho</div>
                   <div className="text-sm text-slate-200 font-medium bg-slate-800/50 py-2 px-3 rounded border border-slate-700/50 inline-block">
                     {phase.trigger}
                   </div>
                   
                   <div className="mt-4 pt-4 border-t border-slate-800/50">
                     <p className="text-xs text-slate-500 italic">"{phase.psychology}"</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recurring & Maintenance Plan */}
      <section id="recurring" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="serif text-4xl md:text-5xl mb-6">Recorrência & Performance</h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              Este plano garante que todo o ecossistema opere com estabilidade, segurança e performance contínua, 
              sem que a Invision precise se preocupar com aspectos técnicos.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Features Grid */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {RECURRING_FEATURES.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 p-5 bg-slate-800/30 rounded-xl border border-slate-700/30 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="text-amber-500 mt-1 flex-shrink-0">
                    <feature.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">{feature.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Price Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between group hover:border-amber-500/20 transition-all duration-300">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <InfinityIcon size={120} />
                </div>
                
                <div>
                  <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full uppercase tracking-wider mb-6 border border-amber-500/30">
                    All-in-One
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2">Mensalidade</h3>
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-5xl font-bold text-white">US$ 400</span>
                    <span className="text-slate-400 mb-1">/mês</span>
                  </div>
                  <p className="text-slate-400 text-sm border-t border-slate-700 pt-6 leading-relaxed">
                    Inclui infraestrutura, suporte VIP, relatórios e 1.000 minutos de voz premium.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-dashed border-slate-700">
                  <div className="flex items-start gap-3">
                    <Plus size={16} className="text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white text-sm font-medium block">Minuto Excedente</span>
                      <span className="text-slate-500 text-xs">Apenas US$ 0,19/min para voz (valor competitivo de mercado).</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Win Condition */}
      <section className="py-24 relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="serif text-4xl md:text-5xl mb-4">Win Condition</h2>
            <p className="text-slate-400">O projeto só termina quando a máquina estiver rodando.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
             {WIN_CONDITIONS.map((condition, idx) => (
               <motion.div
                 key={condition.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.15 }}
                 className="flex items-center p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl"
               >
                 <div className="p-2 rounded-full bg-green-500/20 text-green-400 mr-4">
                   <CheckCircle2 size={24} />
                 </div>
                 <span className="text-lg text-slate-200 font-light">{condition.text}</span>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Brand Positioning Statement */}
      <section className="bg-slate-950 py-32 border-t border-slate-900 flex flex-col items-center justify-center">
        <div className="mb-12 transform scale-125 opacity-100 hover:opacity-100 transition-all duration-700">
           <Logo />
        </div>
        <div className="container mx-auto px-6 text-center">
           <p className="serif italic text-3xl md:text-4xl text-slate-400 font-light max-w-5xl mx-auto leading-normal">
             "Posicionando a marca como referência em real estate de luxo no Sul da Flórida."
           </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Left: Empty for balance or could be simple copyright */}
             <div className="flex flex-col items-center md:items-start">
               <span className="text-slate-500 font-bold tracking-widest text-lg">GRAPPE</span>
               <span className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">Intelligence</span>
            </div>

            {/* Right: Contact Links */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-slate-400 font-medium">
               <a href="https://grappeai.com" className="hover:text-amber-500 transition-colors flex items-center gap-2">
                 <ExternalLink size={14} />
                 grappeai.com
               </a>
               <a href="mailto:matheus@grappeai.com" className="hover:text-amber-500 transition-colors flex items-center gap-2">
                 <Mail size={14} />
                 matheus@grappeai.com
               </a>
               <a href="https://wa.me/16203098929" className="hover:text-amber-500 transition-colors flex items-center gap-2">
                 <Smartphone size={14} />
                 +1 620 309 8929
               </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-900 text-center text-slate-700 text-xs">
             <p>&copy; {new Date().getFullYear()} Grappe Technologies. Proposta confidencial para Invision Investments.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;