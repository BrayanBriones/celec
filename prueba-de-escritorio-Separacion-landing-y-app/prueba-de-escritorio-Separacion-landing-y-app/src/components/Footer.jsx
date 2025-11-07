// ...existing code...
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-[#453255] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold">KIOSKU BITES</h3>
          <p className="text-gray-300 mt-2">Conectamos personas con locales para reducir desperdicio y ofrecer combos.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Enlaces Rápidos</h4>
          <ul className="space-y-2">
            {!user ? (
              <>
                <li><Link to="/" className="text-gray-300 hover:text-white">Inicio</Link></li>
                <li><Link to="/para-empresas" className="text-gray-300 hover:text-white">Para Empresas</Link></li>
                <li><Link to="/buscar-combos" className="text-gray-300 hover:text-white">Buscar Combos</Link></li>
                <li><Link to="/nuestra-historia" className="text-gray-300 hover:text-white">Nuestra Historia</Link></li>
                <li><Link to="/contacto" className="text-gray-300 hover:text-white">Contacto</Link></li>
              </>
            ) : (
              <li><Link to="/buscar-combos" className="text-gray-300 hover:text-white">Buscar Combos</Link></li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contacto</h4>
          <p className="text-gray-300">hola@kioskubites.com</p>
          <p className="text-gray-300 mt-2">Guayaquil, Ecuador</p>
        </div>
      </div>
    </footer>
  );
}
// ...existing code...