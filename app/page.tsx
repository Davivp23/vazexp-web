"use client";
import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ListaProyectos from './components/ListaProyectos';
import Footer from './components/Footer';
import SecuenciaAnimada from './components/SecuenciaAnimada';

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
        <SecuenciaAnimada
          frameCount={50}
          folderPath="/anim/"
          fileExtension="png"
        />
      </div>
      <h1>Relleno para ver como queda</h1>
      <h2 className="text-9xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</h2>
      <Footer />
    </>
  );
}
