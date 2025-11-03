"use client"

export default function ProyectoVerde() {
  return (
    <div className="min-w-[50vw] h-screen px-4 bg-blue-400 p-8 text-blanco-roto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Descripción del proyecto */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Nombre del Proyecto</h2>
          <h3 className="mb-4">
            Breve descripción del proyecto, destacando los aspectos clave y el enfoque de diseño utilizado.
          </h3>
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