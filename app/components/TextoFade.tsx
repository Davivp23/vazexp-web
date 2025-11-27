"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface TextoFadeProps {
    triggerRef: React.RefObject<HTMLDivElement | null>;
    titulo?: string;
    descripcion?: string;
    alineacion?: "izq" | "der" | "centro";
    colorTexto?: "blanco-roto" | "gris-oscuro" | "verde-grisaceo" | "terracota";
    // Fases de animación
    inicio?: string;          // Cuándo empieza a aparecer
    fin?: string;             // Cuándo está totalmente visible
    inicioDesvanecer?: string; // Cuándo empieza a irse
    finDesvanecer?: string;    // Cuándo se ha ido del todo
}

export default function TextoFade({
    triggerRef,
    titulo = "Título por defecto",
    descripcion = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    alineacion = "centro",
    colorTexto = "blanco-roto",
    inicio = "40%",
    fin = "50%",
    inicioDesvanecer = "80%",
    finDesvanecer = "90%",
}: TextoFadeProps) {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            if (!triggerRef?.current || !textRef.current) return;

            // Fade In
            gsap.fromTo(
                textRef.current,
                { autoAlpha: 0, y: 50 },
                {
                    autoAlpha: 1,
                    y: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: `${inicio} top`,
                        end: `${fin} top`,
                        scrub: true,
                    },
                }
            );

            // Fade Out
            gsap.fromTo(
                textRef.current,
                { autoAlpha: 1, y: 0 },
                {
                    autoAlpha: 0,
                    y: -50,
                    ease: "none",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: `${inicioDesvanecer} top`,
                        end: `${finDesvanecer} top`,
                        scrub: true,
                    },
                }
            );
        }, textRef);

        return () => ctx.revert();
    }, [triggerRef, inicio, fin, inicioDesvanecer, finDesvanecer]);

    const getAlignmentClasses = () => {
        switch (alineacion) {
            case "izq":
                return "left-10 text-left items-start";
            case "der":
                return "right-10 text-right items-end";
            case "centro":
            default:
                return "left-1/2 -translate-x-1/2 text-center items-center";
        }
    };

    const getColorClass = () => {
        switch (colorTexto) {
            case "gris-oscuro":
                return "text-gris-oscuro";
            case "verde-grisaceo":
                return "text-verde-grisaceo";
            case "terracota":
                return "text-terracota";
            case "blanco-roto":
            default:
                return "text-blanco-roto";
        }
    };

    return (
        <div
            ref={textRef}
            style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.8)" }}
            className={`fixed top-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col invisible opacity-0 max-w-xl w-full p-8 ${getColorClass()} ${getAlignmentClasses()}`}
        >
            <h2 className="text-4xl font-bold mb-4">{titulo}</h2>
            <p className="text-xl font-medium leading-relaxed">
                {descripcion}
            </p>
        </div>
    );
}