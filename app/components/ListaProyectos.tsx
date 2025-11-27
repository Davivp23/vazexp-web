import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import TarjetaProyecto from './TarjetaProyecto';

function ListaProyectos() {

  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {

    if (!sectionRef.current || !triggerRef.current) return;

    const pin = gsap.fromTo(sectionRef.current,
      { translateX: 0 },
      {
        translateX: () => {
          if (!sectionRef.current) return "0px";
          const totalWidth = sectionRef.current.scrollWidth;
          const viewportWidth = sectionRef.current.clientWidth;
          const lastCard = sectionRef.current.lastElementChild as HTMLElement;
          const lastCardWidth = lastCard ? lastCard.offsetWidth : 0;
          const x = viewportWidth / 2 - (totalWidth - lastCardWidth / 2);
          return `${x}px`;
        },
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '4000 top',
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true
        }
      }
    );

    return () => {
      pin.kill();
    };
  }, []);


  return (
    <section className='scroll-section-outer'>
      <div ref={triggerRef}>
        <h2 className='text-gris-oscuro text-5xl py-15 place-self-center'>Proyectos</h2>
        <div ref={sectionRef} className='scroll-section-inner'>
          <TarjetaProyecto />
          <TarjetaProyecto />
          <TarjetaProyecto />
          <TarjetaProyecto />
          <TarjetaProyecto />
          <TarjetaProyecto />
        </div>
      </div>
    </section>
  );
}

export default ListaProyectos;