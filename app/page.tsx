import { ArrowUpRight, Instagram, MessageCircle, MoveUpRight, Sparkles, Box, Layers3, Lightbulb } from "lucide-react";

const lines = [
  {
    id: "01",
    name: "ATEL HOME",
    description: "Objetos decorativos, regalos y piezas personalizadas que hacen especial cada espacio.",
    detail: "Objetos para vivir",
    icon: Sparkles,
  },
  {
    id: "02",
    name: "ATEL PRO",
    description: "Piezas funcionales, repuestos y soluciones diseñadas para resolver necesidades reales.",
    detail: "Soluciones a medida",
    icon: Box,
  },
  {
    id: "03",
    name: "ATEL LAB",
    description: "Diseño 3D, desarrollo de producto y prototipos para explorar ideas y llevarlas más lejos.",
    detail: "Ideas en desarrollo",
    icon: Lightbulb,
  },
];

export default function Home() {
  const whatsapp = "https://wa.me/593998400131?text=Hola%20ATEL%203D,%20quiero%20informaci%C3%B3n";

  return (
    <main>
      <header className="topbar">
        <a className="wordmark" href="#" aria-label="ATEL 3D inicio">ATEL<span>3D</span></a>
        <nav>
          <a href="#estudio">Estudio</a>
          <a href="#lineas">Qué hacemos</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer">Hablemos <ArrowUpRight size={15} /></a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span /> DISEÑO Y FABRICACIÓN DIGITAL · CUENCA, ECUADOR</p>
          <h1>Ideas que<br /><em>toman forma.</em></h1>
          <p className="hero-text">Diseñamos y fabricamos objetos que conectan creatividad, funcionalidad y tecnología. De la primera idea a una pieza real.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#lineas">Explorar ATEL <MoveUpRight size={16} /></a>
            <a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">Cuéntanos tu idea <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="hero-art" aria-label="Composición abstracta de volúmenes tridimensionales">
          <div className="art-grid" />
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="art-block"><div /></div>
          <div className="art-caption"><span>ATEL / 001</span><span>FORM & FUNCTION</span></div>
          <div className="art-cross">✳</div>
        </div>
        <div className="hero-index"><span>01</span><span className="index-line" /><span>03</span></div>
      </section>

      <section className="intro section" id="estudio">
        <p className="eyebrow">01 / EL ESTUDIO</p>
        <div>
          <h2>Un espacio donde<br />las ideas se <em>materializan.</em></h2>
          <p className="intro-copy">ATEL es un atelier de diseño enfocado en el desarrollo de productos, prototipado y fabricación digital. Combinamos pensamiento de diseño y tecnología para crear objetos con intención.</p>
        </div>
      </section>

      <section className="lines section" id="lineas">
        <div className="section-heading">
          <div><p className="eyebrow">02 / LO QUE HACEMOS</p><h2>Tres formas de<br /><em>crear valor.</em></h2></div>
          <p>Desde objetos cotidianos hasta soluciones técnicas y nuevas ideas por explorar.</p>
        </div>
        <div className="line-grid">
          {lines.map((line) => {
            const Icon = line.icon;
            return (
              <article className="line-card" key={line.id}>
                <div className="line-top"><span>{line.id} / ATEL</span><Icon size={23} strokeWidth={1.3} /></div>
                <div className="line-symbol"><span>{line.id === "01" ? "◒" : line.id === "02" ? "⌘" : "✳"}</span></div>
                <p className="line-detail">{line.detail}</p>
                <h3>{line.name}</h3>
                <p className="line-description">{line.description}</p>
                <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={`Consultar por ${line.name}`}>Consultar <ArrowUpRight size={16} /></a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="statement">
        <p className="eyebrow">DISEÑO · TECNOLOGÍA · INTENCIÓN</p>
        <h2>Del concepto<br />al <em>objeto.</em></h2>
        <p>Cada proyecto comienza con una pregunta y toma forma a través del diseño.</p>
      </section>

      <section className="contact section" id="contacto">
        <div><p className="eyebrow">03 / HAGAMOS ALGO</p><h2>¿Tienes una idea<br />en <em>mente?</em></h2></div>
        <div className="contact-side"><p>Cuéntanos qué necesitas. Podemos ayudarte a diseñarlo, desarrollarlo y hacerlo realidad.</p><a className="button button-light" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Contactar por WhatsApp <ArrowUpRight size={16} /></a><span>Cuenca, Ecuador</span></div>
      </section>

      <footer className="footer">
        <a className="wordmark footer-mark" href="#">ATEL<span>3D</span></a>
        <p>Ideas que toman forma.</p>
        <div><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a></div>
        <small>© {new Date().getFullYear()} ATEL 3D · Diseño y Fabricación Digital</small>
      </footer>
    </main>
  );
}
