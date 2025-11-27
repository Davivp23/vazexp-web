"use client";
import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ListaProyectos from './components/ListaProyectos';
import Footer from './components/Footer';
import ScrollSequence from './components/ScrollSequence';

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
      <div id="hero" ref={heroWrapperRef}>
        <Hero />
      </div>
      <div id="proyectos">
        <ListaProyectos />
        <ScrollSequence
          frameCount={50}        // ¿Cuántas fotos tienes?
          folderPath="/anim/" // Carpeta dentro de public
          fileExtension="png"     // Extensión
        />
      </div>
      <Footer />
    </>
  );
}
