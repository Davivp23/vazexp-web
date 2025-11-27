"use client"; // Obligatorio en Next.js App Router para hooks

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registramos el plugin fuera del componente para evitar re-registros
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollSequenceProps {
    frameCount: number;     // Total de imágenes (ej: 300)
    folderPath: string;     // Ruta en public (ej: "/images/hero/")
    filePrefix?: string;    // Si tus archivos tienen prefijo (ej: "img-")
    fileExtension?: string; // (ej: "jpg", "webp")
}

export default function ScrollSequence({
    frameCount,
    folderPath,
    filePrefix = "",
    fileExtension = "png",
}: ScrollSequenceProps) {
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

        // Función corregida para archivos tipo "01.png", "02.png"...
        const getCurrentFrame = (index: number) =>
            `${folderPath}${filePrefix}${index.toString().padStart(2, "0")}.${fileExtension}`;

        // --- FUNCIÓN DE RENDER SEGURA ---
        const render = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            const img = images[imageState.frame];

            // AQUÍ ESTÁ EL FIX:
            // Si la imagen no existe, no se ha cargado, o está rota, NO hacemos nada.
            if (!img || !img.complete || img.naturalWidth === 0) {
                return;
            }

            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        // --- CARGA DE IMÁGENES ---
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const src = getCurrentFrame(i);
            img.src = src;

            // Si carga bien:
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoading(false);
                    render();
                }
            };

            // Si falla (esto te dirá en la consola si la ruta está mal):
            img.onerror = () => {
                console.error(`❌ Error cargando imagen: ${src} - Verifica la ruta y extensión`);
            };

            images.push(img);
        }

        // --- ANIMACIÓN GSAP ---
        const tween = gsap.to(imageState, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
            },
            onUpdate: render,
        });

        const handleResize = () => render(); // Redibujar al cambiar tamaño
        window.addEventListener("resize", handleResize);

        return () => {
            tween.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
            window.removeEventListener("resize", handleResize);
        };
    }, [frameCount, folderPath, filePrefix, fileExtension]);

    return (
        // Altura controlada por Tailwind: h-[500vh] da mucho espacio de scroll
        <div ref={containerRef} className="relative w-full h-[500vh] bg-black">
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">

                {/* Loading state opcional */}
                {isLoading && (
                    <div className="absolute text-white font-mono z-10">Cargando secuencia...</div>
                )}

                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                // object-cover en CSS estira el canvas, aunque la resolución interna sea 1920x1080
                />
            </div>
        </div>
    );
}