import Link from 'next/link'; // Importante: usar next/link

function Navbar() {
  return (
    <nav
      className={`
        fixed top-0 left-0 w-full bg-blanco-roto p-4 z-50
        transition-transform duration-300 ease-in-out
      `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-gris-oscuro font-bold">
          <Link href="/">
            <span className='flex flex-row'><h1 className="text-xs">vaz</h1><h6 className="text-xs">exp.</h6></span>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/proyectos" className="text-gris-oscuro hover:opacity-70"><h3>Proyectos</h3></Link>
          <Link href="/contacto" className="text-gris-oscuro hover:opacity-70"><h3>Contacto</h3></Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <main className="bg-blanco-roto">
      <section className="text-gris-oscuro min-h-screen flex flex-col justify-center items-center text-center p-6">
        <div className="max-w-4xl">
          <div className="flex flex-row justify-center items-center text-center">  
            <h1>
              vaz
            </h1>
            <h6>
              exp.
            </h6>
          </div>
          <h4>
            DISEÑO DE INTERIORES
          </h4>
        </div>
      </section>
    </main>
  );
}

function Proyecto() {
  return (
    <div className="max-w-7xl mx-auto px-4 bg-verde-grisaceo p-8 text-blanco-roto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del proyecto */}
        <div>
          <img
            src="/ruta-a-la-imagen-del-proyecto.jpg"
            alt="Descripción del proyecto"
            className="w-full h-auto"
          />
        </div>
        {/* Descripción del proyecto */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Nombre del Proyecto</h2>
          <p className="mb-4">
            Breve descripción del proyecto, destacando los aspectos clave y el enfoque de diseño utilizado.
          </p>
          <ul className="list-disc list-inside">
            <li>Característica 1 del proyecto</li>
            <li>Característica 2 del proyecto</li>
            <li>Característica 3 del proyecto</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gris-oscuro text-blanco-roto p-8 text-center"> 
      <div className="max-w-7xl mx-auto">
        <p className="font-outfit text-sm opacity-50 mt-16">
          © 2025 vazexp.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Proyecto />
      <Proyecto />
      <Footer />
    </>
  );
}