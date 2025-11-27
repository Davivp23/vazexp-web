"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextoFade from "./TextoFade";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface SecuenciaAnimadaProps {
    frameCount: number;     // Total de imágenes (ej: 300)
    folderPath: string;     // Ruta en public (ej: "/images/hero/")
    filePrefix?: string;    // Si tus archivos tienen prefijo (ej: "img-")
    fileExtension?: string; // (ej: "jpg", "webp")
}

export default function SecuenciaAnimada({
    frameCount,
    folderPath,
    filePrefix = "",
    fileExtension = "png",
}: SecuenciaAnimadaProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context || !containerRef.current) return;

        canvas.width = 1920;
        canvas.height = 1080;

        const images: HTMLImageElement[] = [];
        const imageState = { frame: 0 };

        const getCurrentFrame = (index: number) =>
            `${folderPath}${filePrefix}${index.toString().padStart(2, "0")}.${fileExtension}`;

        const render = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            const img = images[imageState.frame];

            if (!img || !img.complete || img.naturalWidth === 0) {
                return;
            }

            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const src = getCurrentFrame(i);
            img.src = src;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoading(false);
                    render();
                }
            };

            img.onerror = () => {
                console.error(`Error cargando imagen: ${src} - Verifica la ruta y extensión`);
            };

            images.push(img);
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
            }
        });

        tl.to(imageState, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            duration: 1,
            onUpdate: render,
        })
            .to({}, { duration: 0.5 });

        const handleResize = () => render(); // Redibujar al cambiar tamaño
        window.addEventListener("resize", handleResize);

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
            window.removeEventListener("resize", handleResize);
        };
    }, [frameCount, folderPath, filePrefix, fileExtension]);

    return (
        <div ref={containerRef} className="relative w-full h-[500vh] bg-gris-oscuro">
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">

                {/* Loading state opcional */}
                {isLoading && (
                    <div className="absolute text-white font-mono z-10">Cargando secuencia...</div>
                )}

                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />
                <TextoFade
                    triggerRef={containerRef}
                    titulo="Pasillos."
                    descripcion="Gigantescos y con alfombras rojas."
                    alineacion="izq"
                    inicio="0%"
                    fin="15%"
                    colorTexto="verde-grisaceo"
                    inicioDesvanecer="50%"
                    finDesvanecer="60%"
                />
                <TextoFade
                    triggerRef={containerRef}
                    titulo="Cara."
                    descripcion="Una cara extraña al fondo de los pasillos."
                    alineacion="der"
                    inicio="25%"
                    fin="40%"
                    colorTexto="terracota"
                    inicioDesvanecer="50%"
                    finDesvanecer="60%"
                />
                <TextoFade triggerRef={containerRef}
                    inicio="60%"
                    fin="75%"
                    alineacion="centro"
                    titulo="Flores."
                    descripcion=""
                    finDesvanecer="85%"
                    colorTexto="blanco-roto"
                />
            </div>
        </div>
    );
}