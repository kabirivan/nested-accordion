import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-card flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-secondary mb-8">Página no encontrada</p>
        <Link 
          href="/" 
          className="bg-card text-primary px-6 py-3 border border-gray-200 hover:bg-subtle transition-colors duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
