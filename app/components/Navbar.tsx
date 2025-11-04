"use client"
import Link from 'next/link';

export default function Navbar({ isVisible }: any) {
  return (
    <nav
      className={`
        fixed top-0 left-0 w-full bg-blanco-roto p-4 z-50
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}
      `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-gris-oscuro font-bold">
          <Link href="#hero">
            <span className='flex flex-row'><h1 className="text-xs">vaz</h1><h6 className="text-xs">exp.</h6></span>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="#proyectos" className="text-gris-oscuro hover:opacity-70"><h3>Proyectos</h3></Link>
          <Link href="/contacto" className="text-gris-oscuro hover:opacity-70"><h3>Contacto</h3></Link>
        </div>
      </div>
    </nav>
  );
}