import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { History, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import OrderHistory from '@/pages/customer/OrderHistory';
import Profile from '@/pages/customer/Profile';
import { Button } from '@/components/ui/button';

const CustomerDashboard = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '', text: 'Mi Perfil', icon: <User className="w-5 h-5" /> },
    { to: 'pedidos', text: 'Historial de Pedidos', icon: <History className="w-5 h-5" /> },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Mi Cuenta - KIOSKU BITES</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="flex">
          {/* Sidebar para Desktop */}
          <aside className="w-64 bg-white p-4 border-r border-gray-200 hidden md:flex flex-col h-screen fixed top-16 left-0">
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-4 p-2">{user?.name || 'Cliente'}</h2>
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                   <Link
                    key={link.to}
                    to={`/dashboard/cliente/${link.to}`}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      location.pathname === `/dashboard/cliente/${link.to}` || (link.to === '' && location.pathname === '/dashboard/cliente')
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </Link>
                ))}
              </nav>
            </div>
             <div>
                <button onClick={logout} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 w-full">
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
          </aside>

          <main className="flex-1 md:ml-64 p-4 sm:p-6 pt-8">
            {/* Header para Móvil */}
            <div className="md:hidden mb-4 p-2 bg-white rounded-lg shadow-sm flex justify-between items-center">
              <h2 className="text-lg font-semibold">{user?.name || 'Menú del Cliente'}</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>

            {/* Menú para Móvil */}
            {isMobileMenuOpen && (
              <div className="md:hidden mb-4 bg-white rounded-lg shadow-sm p-4">
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={`/dashboard/cliente/${link.to}`}
                      onClick={handleLinkClick}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        location.pathname === `/dashboard/cliente/${link.to}` || (link.to === '' && location.pathname === '/dashboard/cliente')
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {link.icon}
                      <span>{link.text}</span>
                    </Link>
                  ))}
                  <button onClick={() => { logout(); handleLinkClick(); }} className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 w-full">
                      <LogOut className="w-5 h-5" />
                      <span>Cerrar Sesión</span>
                  </button>
                </nav>
              </div>
            )}

            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="pedidos" element={<OrderHistory />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;