import React, { useRef, useEffect, use } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import TarjetaProyecto from './TarjetaProyecto';

function ListaProyectos() {

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {

      const pin = gsap.fromTo(sectionRef.current, 
        { translateX: 0 }, 
        { translateX: '-600vw',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '4000 top',
            scrub: 0.6,
            pin: true 
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