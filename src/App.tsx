import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Stethoscope, 
  ShieldCheck, 
  XCircle, 
  ChevronDown, 
  MapPin, 
  MessageCircle,
  Menu,
  X,
  Send,
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const WHATSAPP_NUMBER = "56926282933";
const WHATSAPP_MESSAGE = "Hola Dr. Sabah, vi su página y quiero agendar una consulta.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function Carousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((curr) => (curr === 0 ? images.length - 1 : curr - 1));
  const next = () => setCurrentIndex((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  return (
    <div className="relative w-full h-[500px] bg-gray-100 rounded-2xl overflow-hidden group shadow-lg">
      <div 
        className="flex transition-transform ease-out duration-500 h-full" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Caso ${i + 1}`} className="w-full h-full object-cover flex-shrink-0" />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={prev} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <div key={i} className={`transition-all w-2 h-2 bg-white rounded-full ${currentIndex === i ? "p-1" : "bg-opacity-50"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img src="https://lh3.googleusercontent.com/d/1oRK12fMcZrdeH71Tw_Gwf8f2xNif4vXo" alt="Dr. Sabah Logo" className="h-12 w-auto" />
    </div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      q: "¿Qué es la cirugía mínimamente invasiva?",
      a: "Es una técnica quirúrgica que utiliza incisiones muy pequeñas (de milímetros) para tratar patologías como el Hallux Valgus (juanetes). Esto resulta en menos dolor postoperatorio, menor daño a los tejidos y una recuperación más rápida."
    },
    {
      q: "¿Atienden por Fonasa?",
      a: "Sí, contamos con convenio Fonasa para consultas y procedimientos quirúrgicos, incluyendo el Bono PAD para ciertas patologías como la luxofractura de tobillo."
    },
    {
      q: "¿En qué clínicas atiende?",
      a: "Atiendo en Clínica Indisa, tanto en la sede de Providencia (Av. Santa María 1810) como en la nueva sede de Maipú (Av. Los Pajaritos 1948)."
    },
    {
      q: "¿Cuánto tiempo dura la recuperación de una cirugía de juanetes?",
      a: "Con la técnica mínimamente invasiva, los pacientes suelen caminar el mismo día de la cirugía con un zapato especial. La recuperación total y el alta definitiva varían, pero generalmente es mucho más rápida que con la cirugía tradicional."
    },
    {
      q: "¿Qué debo llevar a mi primera consulta?",
      a: "Idealmente, trae cualquier radiografía, resonancia magnética o examen previo relacionado con tu dolencia, además de un resumen de tratamientos anteriores si los has tenido."
    }
  ];

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre');
    const motivo = formData.get('motivo');
    const mensaje = formData.get('mensaje');
    
    const text = `Hola Dr. Sabah, mi nombre es ${nombre}. Me gustaría consultar por: ${motivo}. ${mensaje ? `Mensaje adicional: ${mensaje}` : ''}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-dark selection:bg-secondary selection:text-dark">
      {/* HEADER FIJO */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <a href="#" className="z-50">
            <Logo />
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#especialidades" className="text-sm font-medium text-dark hover:text-primary transition-colors">Especialidades</a>
            <a href="#dr-sabah" className="text-sm font-medium text-dark hover:text-primary transition-colors">Dr. Sabah</a>
            <a href="#casos-clinicos" className="text-sm font-medium text-dark hover:text-primary transition-colors">Casos Clínicos</a>
            <a href="#faq" className="text-sm font-medium text-dark hover:text-primary transition-colors">Preguntas</a>
            <a href="#contacto" className="text-sm font-medium text-dark hover:text-primary transition-colors">Contacto</a>
          </nav>

          <div className="hidden lg:block">
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden z-50 p-2 text-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
            <a href="#especialidades" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-dark">Especialidades</a>
            <a href="#dr-sabah" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-dark">Dr. Sabah</a>
            <a href="#casos-clinicos" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-dark">Casos Clínicos</a>
            <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-dark">Preguntas</a>
            <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-dark">Contacto</a>
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-full font-medium w-full max-w-xs"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Agendar Consulta</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-primary overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000" 
              alt="Cirugía ortopédica" 
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-8">
                <MapPin className="w-4 h-4" />
                <span>Clínica Indisa: Providencia y Maipú</span>
              </div>
              
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                Dr. Sabah <br className="hidden sm:block" />
                <span className="text-secondary text-3xl sm:text-4xl lg:text-5xl block mt-2">Especialista en Tobillo y Pie</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-accent mb-10 max-w-2xl leading-relaxed">
                Más de 10 años de experiencia devolviendo la movilidad y calidad de vida a mis pacientes mediante técnicas quirúrgicas avanzadas.
              </p>

              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-lg">Especialista en <strong>Cirugía Mínimamente Invasiva</strong></span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-lg">Tratamiento integral con <strong>Convenio Fonasa</strong></span>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="text-lg">Resolución de <strong>fracturas, hallux valgus y lesiones deportivas</strong></span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Agendar Consulta</span>
                </a>
                <a 
                  href="#especialidades"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-medium text-lg transition-all"
                >
                  <span>Ver Tratamientos</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ESPECIALIDADES */}
        <section id="especialidades" className="py-24 bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-dark mb-6">
                Especialidades y Tratamientos
              </h2>
              <p className="text-lg text-dark/70">
                Soluciones definitivas y personalizadas para recuperar tu movilidad, priorizando técnicas mínimamente invasivas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-muted/30 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/30 rounded-xl flex items-center justify-center mb-6">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-dark mb-3">Hallux Valgus y Dedos en Garra</h3>
                <p className="text-dark/70 leading-relaxed">
                  Corrección de juanetes y deformidades de los dedos mediante cirugía mínimamente invasiva, permitiendo una recuperación más rápida y con menos dolor.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-muted/30 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/30 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-dark mb-3">Fracturas y Rotura de Aquiles</h3>
                <p className="text-dark/70 leading-relaxed">
                  Tratamiento quirúrgico y conservador de fracturas de tobillo, pie, pierna y roturas del tendón de Aquiles, enfocado en una rehabilitación óptima.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-muted/30 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-accent/30 rounded-xl flex items-center justify-center mb-6">
                  <Stethoscope className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-dark mb-3">Pie Plano y Pie Cavo</h3>
                <p className="text-dark/70 leading-relaxed">
                  Evaluación biomecánica y corrección estructural para aliviar el dolor crónico y mejorar la marcha en pacientes con alteraciones del arco plantar.
                </p>
              </div>
            </div>

            <div className="text-center">
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Agendar Consulta
              </a>
            </div>
          </div>
        </section>

        {/* SECCIÓN AUTORIDAD */}
        <section id="dr-sabah" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-5/12">
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-secondary rounded-full translate-x-4 translate-y-4 opacity-20"></div>
                  <img 
                    src="https://lh3.googleusercontent.com/d/1moGQQrLGAaEEZ-i1d8ujtqUYv2HTNUO4" 
                    alt="Dr. Francisco Sabah" 
                    className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-7/12">
                <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-dark mb-4">
                  Dr. Francisco Sabah
                </h2>
                <p className="text-xl text-primary font-medium mb-8">
                  Traumatólogo y Ortopedia, Especialista en Tobillo y Pie
                </p>
                
                <ul className="space-y-5 mb-10">
                  {[
                    "Más de 10 años de experiencia clínica y quirúrgica",
                    "Especialista en Cirugía Mínimamente Invasiva",
                    "Fellowships de especialización en 3 países",
                    "Docente Universitario de Postgrado",
                    "Miembro de la Sociedad Chilena de Ortopedia y Traumatología (SCHOT)",
                    "Miembro de la American Orthopaedic Foot & Ankle Society (AOFAS)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-dark/80">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Agendar Hora</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CASOS CLÍNICOS */}
        <section id="casos-clinicos" className="py-24 bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-dark mb-6">
                Casos Clínicos
              </h2>
              <p className="text-lg text-dark/70">
                Resultados reales de pacientes que han recuperado su calidad de vida tras someterse a cirugía.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              {/* Caso 1: Hallux Valgus */}
              <div className="h-full">
                <Carousel images={[
                  "https://lh3.googleusercontent.com/d/1TM66uSaO6u66f-zitIRtrBA3h20dtP7B",
                  "https://lh3.googleusercontent.com/d/1MvbjXghPOy2DkuV3xX86QADgy-32shEO",
                  "https://lh3.googleusercontent.com/d/1PJXEHQdCtO_8AGa5u_wIXNqZGMIxEeLj"
                ]} />
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN PROCESO */}
        <section id="proceso" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-dark mb-6">
                Proceso de Atención
              </h2>
              <p className="text-xl text-dark/70">Un camino claro y acompañado hacia tu recuperación.</p>
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-muted/30">
              {[
                { title: "Evaluación Inicial", desc: "Agenda tu consulta. Revisaremos tus síntomas, historial médico y exámenes de imagen para un diagnóstico preciso." },
                { title: "Plan de Tratamiento", desc: "Te explicaré detalladamente las opciones, priorizando siempre tratamientos conservadores o cirugía mínimamente invasiva si es necesario." },
                { title: "Gestión y Cobertura", desc: "Te orientaremos sobre las opciones de cobertura, incluyendo convenios con Fonasa e Isapres, para que el proceso sea transparente." },
                { title: "Intervención y Recuperación", desc: "Realizamos el procedimiento en Clínica Indisa y te acompañamos en cada etapa de tu rehabilitación hasta el alta definitiva." }
              ].map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-secondary text-white font-bold text-xl shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {i + 1}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-light border border-muted/20 shadow-sm">
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">{step.title}</h3>
                    <p className="text-dark/70">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Agendar Evaluación
              </a>
            </div>
          </div>
        </section>

        {/* SECCIÓN FAQ */}
        <section id="faq" className="py-24 bg-light">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-dark mb-6">
                Preguntas Frecuentes
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-xl border border-muted/30 overflow-hidden transition-all duration-200"
                >
                  <button
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    <span className="font-bold text-lg text-dark pr-8">{faq.q}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${activeFaq === i ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === i ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-dark/70 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN UBICACIÓN */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-dark mb-6">
                ¿Dónde atiende el Dr. Sabah?
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Providencia */}
              <div className="bg-light rounded-3xl overflow-hidden flex flex-col border border-muted/20 shadow-sm">
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-xl text-dark mb-2">Clínica Indisa Providencia</h3>
                      <p className="text-dark/70 text-lg">Av. Santa María 1810<br/>Providencia, Región Metropolitana</p>
                    </div>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Clinica+Indisa+Providencia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold text-lg transition-all w-fit"
                  >
                    Cómo llegar
                  </a>
                </div>
                <div className="h-64 w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.133742416952!2d-70.61907708480153!3d-33.41973998078261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf6721532891%3A0x6a053c8479e0a811!2sCl%C3%ADnica%20Indisa!5e0!3m2!1ses!2scl!4v1680000000000!5m2!1ses!2scl" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa Clínica Indisa Providencia"
                  ></iframe>
                </div>
              </div>

              {/* Maipú */}
              <div className="bg-light rounded-3xl overflow-hidden flex flex-col border border-muted/20 shadow-sm">
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-xl text-dark mb-2">Clínica Indisa Maipú</h3>
                      <p className="text-dark/70 text-lg">Av. Los Pajaritos 1948<br/>Maipú, Región Metropolitana</p>
                    </div>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Clinica+Indisa+Maipu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-bold text-lg transition-all w-fit"
                  >
                    Cómo llegar
                  </a>
                </div>
                <div className="h-64 w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.694726593922!2d-70.7582522848003!3d-33.4572221807722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c4cf082334e5%3A0x8f2d7c0f1b2b8e3!2sCl%C3%ADnica%20Indisa%20Maip%C3%BA!5e0!3m2!1ses!2scl!4v1680000000001!5m2!1ses!2scl" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa Clínica Indisa Maipú"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN FORMULARIO */}
        <section id="contacto" className="py-24 bg-primary text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-4">
                ¿Listo para dar el primer paso?
              </h2>
              <p className="text-xl text-accent">
                Completa tus datos y te contactaré por WhatsApp para evaluar tu caso.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-bold text-dark mb-2">Nombre completo</label>
                  <input 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-muted bg-light text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                
                <div>
                  <label htmlFor="motivo" className="block text-sm font-bold text-dark mb-2">Motivo de consulta</label>
                  <select 
                    id="motivo" 
                    name="motivo" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-muted bg-light text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  >
                    <option value="">Selecciona una opción...</option>
                    <option value="Juanetes (Hallux Valgus)">Juanetes (Hallux Valgus)</option>
                    <option value="Fractura de Tobillo/Pie">Fractura de Tobillo/Pie</option>
                    <option value="Rotura Tendón de Aquiles">Rotura Tendón de Aquiles</option>
                    <option value="Pie Plano / Pie Cavo">Pie Plano / Pie Cavo</option>
                    <option value="Dedos en Garra">Dedos en Garra</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-bold text-dark mb-2">Mensaje (Opcional)</label>
                  <textarea 
                    id="mensaje" 
                    name="mensaje" 
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-muted bg-light text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                    placeholder="Cuéntame brevemente sobre tu dolencia..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Enviar consulta por WhatsApp
                </button>
                <p className="text-center text-sm text-dark/50 mt-4">
                  Al enviar, se abrirá WhatsApp con un mensaje prellenado.
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12">
            <div>
              <h4 className="font-heading font-bold text-xl mb-4">Dr. Francisco Sabah</h4>
              <p className="text-muted leading-relaxed">
                Especialista en cirugía de tobillo y pie. Atención enfocada en la recuperación funcional y el bienestar del paciente.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Contacto</h4>
              <ul className="space-y-4 text-muted">
                <li>Clínica Indisa Providencia</li>
                <li>Av. Santa María 1810</li>
                <li>hola@drfranciscosabah.com</li>
                <li>+56 9 2628 2933</li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-lg mb-6">Redes Sociales</h4>
              <a 
                href="https://instagram.com/dr.fsabah" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-white transition-colors flex items-center gap-2"
              >
                Instagram @dr.fsabah
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted/60">
            <p>&copy; {new Date().getFullYear()} Dr. Francisco Sabah. Todos los derechos reservados.</p>
            <p className="text-center md:text-right max-w-xl">
              La información contenida en este sitio web es de carácter informativo y no reemplaza la consulta médica presencial.
            </p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOTANTE */}
      <a 
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
        aria-label="Contactar por WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
        <MessageCircle className="w-8 h-8 relative z-10" />
      </a>
    </div>
  );
}

/*
IMÁGENES A REEMPLAZAR:
1. Hero Background: https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000
2. Foto Dr. Sabah: https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800
3. Radiografía Tobillo: https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1600
*/
