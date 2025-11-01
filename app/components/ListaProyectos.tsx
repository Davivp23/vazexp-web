"use client"
import { useState, useEffect, useRef } from 'react';
import ProyectoRojo from './ProyectoRojo';
import ProyectoVerde from './ProyectoVerde';


export default function ListaProyectos() {
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
    
    if (!isIntersecting || !horizontalScroller) {
      return;
    }

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      const scroller = horizontalScrollRef.current;
      if (!scroller) return;

      const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2;
      const atStart = scroller.scrollLeft <= 0;

      if (e.deltaY > 0) {
        if (!atEnd) {
          e.preventDefault();
          scroller.scrollLeft += e.deltaY;
        }
      
      } else {
        if (!atStart) {
          e.preventDefault();
          scroller.scrollLeft += e.deltaY;
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false }); 

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