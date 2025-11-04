"use client"

export default function TarjetaProyecto() {
  return (
    <div className="min-w-[50vw] ml-[25vw] h-[50vh] bg-gris-oscuro text-blanco-roto">
      <div className="flex flex-col h-full items-center px-8 py-4">
        <h2 className="text-2xl font-bold mb-4 place-self-center">Nombre del proyecto</h2>
        <img
          src="/file.svg"
          alt="Imagen del proyecto"
          className="w-28 h-28 object-contain mb-4 place-self-center"
        />
        <h3 className="mt-auto mb-4 text-center place-self-center">
          Breve descripción del proyecto, destacando los aspectos clave y el enfoque de diseño utilizado.
        </h3>
      </div>
    </div>
  );
}