"use client";
import Link from 'next/link';
import { useState, useEffect, useRef, use } from 'react';

function Navbar({ isVisible }) {
  return (
    <nav
      className={`
        fixed top-0 left-0 w-full bg-blanco-roto p-4 z-50
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}
      `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-gris-oscuro font-bold">
          <Link href="/">
            <span className='flex flex-row'><h1 className="text-xs">vaz</h1><h6 className="text-xs">exp.</h6></span>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/proyectos" className="text-gris-oscuro hover:opacity-70"><h3>Proyectos</h3></Link>
          <Link href="/contacto" className="text-gris-oscuro hover:opacity-70"><h3>Contacto</h3></Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <main className="bg-blanco-roto">
      <section className="text-gris-oscuro min-h-screen flex flex-col justify-center items-center text-center p-6">
        <div className="max-w-4xl">
          <div className="flex flex-row justify-center items-center text-center">  
            <h1>
              vaz
            </h1>
            <h6>
              exp.
            </h6>
          </div>
          <h4>
            DISEÑO DE INTERIORES
          </h4>
        </div>
      </section>
    </main>
  );
}

function ListaProyectos() {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );
    
    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

useEffect(() => {
    const horizontalScroller = horizontalScrollRef.current;
    
    // Si no está visible O no existe el elemento, no hagas nada.
    if (!isIntersecting || !horizontalScroller) {
      return;
    }

    const onWheel = (e: WheelEvent) => {
      // 'e.deltaY' es el scroll vertical. Si es 0, no hagas nada.
      if (e.deltaY === 0) return;

      // Asegúrate de que el elemento scroller todavía existe
      const scroller = horizontalScrollRef.current;
      if (!scroller) return;

      // --- ESTA ES LA MAGIA ---
      // Calcula si estás al principio o al final del scroll horizontal
      // Damos un margen de 2px para problemas de redondeo de píxeles
      const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2;
      const atStart = scroller.scrollLeft <= 0;

      // Si el usuario scrollea "hacia abajo" (e.deltaY > 0)
      if (e.deltaY > 0) {
        // ...y NO estás al final del scroll horizontal...
        if (!atEnd) {
          e.preventDefault(); // ...entonces, ¡secuestra el scroll!
          scroller.scrollLeft += e.deltaY; // Mueve el scroll horizontal
        }
        // Si ESTÁS al final, no se llama a preventDefault() y la página
        // scrollea verticalmente de forma normal.
      
      // Si el usuario scrollea "hacia arriba" (e.deltaY < 0)
      } else {
        // ...y NO estás al principio...
        if (!atStart) {
          e.preventDefault(); // ...entonces, ¡secuestra el scroll!
          scroller.scrollLeft += e.deltaY; // Mueve el scroll horizontal
        }
        // Si ESTÁS al principio, no se llama a preventDefault() y la página
        // scrollea verticalmente de forma normal.
      }
    };

    // Añade el detector A LA VENTANA
    window.addEventListener('wheel', onWheel, { passive: false }); 

    // Limpieza: Quita el detector cuando 'isIntersecting' sea false
    return () => {
      window.removeEventListener('wheel', onWheel); 
    };
  }, [isIntersecting]);

  return (
    <main className="bg-blanco-roto">
      <section
        ref={sectionRef}
        className="text-gris-oscuro min-h-screen flex flex-col justify-center text-center">
        <div
          ref={horizontalScrollRef}
          className="flex flex-row flex-nowrap overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <ProyectoRojo />
            <ProyectoVerde />
            <ProyectoRojo />
            <ProyectoVerde />
            <ProyectoVerde />
            <ProyectoRojo />
            <ProyectoVerde />
        </div>
      </section>
    </main>
  );
}

function ProyectoVerde() {
  return (
    <div className="min-w-[50vw] h-screen px-4 bg-verde-grisaceo p-8 text-blanco-roto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Descripción del proyecto */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Nombre del Proyecto</h2>
          <p className="mb-4">
            Breve descripción del proyecto, destacando los aspectos clave y el enfoque de diseño utilizado.
          </p>
          <ul className="list-disc list-inside">
            <li>Característica 1 del proyecto</li>
            <li>Característica 2 del proyecto</li>
            <li>Característica 3 del proyecto</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProyectoRojo() {
  return (
    <div className="min-w-[50vw] h-screen px-4 bg-terracota p-8 text-blanco-roto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Descripción del proyecto */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Nombre del Proyecto</h2>
          <p className="mb-4">
            Breve descripción del proyecto, destacando los aspectos clave y el enfoque de diseño utilizado.
          </p>
          <ul className="list-disc list-inside">
            <li>Característica 1 del proyecto</li>
            <li>Característica 2 del proyecto</li>
            <li>Característica 3 del proyecto</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gris-oscuro text-blanco-roto p-8 text-center"> 
      <div className="max-w-7xl mx-auto">
        <p className="font-outfit text-sm opacity-50 mt-16">
          © 2025 vazexp.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {

  const [showNav, setShowNav] = useState(false);
  const heroWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroWrapperRef.current) return;

      const heroHeight = heroWrapperRef.current.offsetHeight;
     if (window.scrollY > (heroHeight - 50)) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar isVisible={showNav} />
      <div ref={heroWrapperRef}>
        <Hero />
      </div>
      <ListaProyectos />
      <Footer />
    </>
  );
}