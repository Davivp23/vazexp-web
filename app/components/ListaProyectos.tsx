import React, { useRef, useEffect, use } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import ProyectoRojo from './ProyectoRojo';
import ProyectoVerde from './ProyectoVerde';

function ListaProyectos() {

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {

      const pin = gsap.fromTo(sectionRef.current, 
        { translateX: 0 }, 
        { translateX: '-300vw',
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '2000 top',
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
        <div ref={sectionRef} className='scroll-section-inner'>
          <ProyectoRojo />
          <ProyectoVerde />
          <ProyectoRojo />
          <ProyectoVerde />
          <ProyectoRojo />
        </div>
      </div>
    </section>
  );
}

export default ListaProyectos;