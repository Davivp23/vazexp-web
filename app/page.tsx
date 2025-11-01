"use client";
import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ListaProyectos from './components/ListaProyectos';
import Footer from './components/Footer';

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
