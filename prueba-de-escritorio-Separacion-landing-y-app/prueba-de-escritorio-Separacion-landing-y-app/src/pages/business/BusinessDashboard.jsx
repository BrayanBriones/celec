import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Package, BarChart2, Star, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ManageCombos from '@/pages/business/ManageCombos';
import BusinessStats from '@/pages/business/BusinessStats';
import ManageReviews from '@/pages/business/ManageReviews';
import { Button } from '@/components/ui/button';

const BusinessDashboard = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '', text: 'Estadísticas', icon: <BarChart2 className="w-5 h-5" /> },
    { to: 'combos', text: 'Gestionar Combos', icon: <Package className="w-5 h-5" /> },
    { to: 'opiniones', text: 'Gestionar Opiniones', icon: <Star className="w-5 h-5" /> },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard del Local - KIOSKU BITES</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-16 overflow-x-auto">
        <div className="flex">
          {/* Sidebar para Desktop */}
          <aside className="w-64 bg-white p-4 border-r border-gray-200 hidden md:flex flex-col h-screen fixed top-16 left-0">
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-4 p-2">{user?.name || 'Local'}</h2>
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={`/dashboard/local/${link.to}`}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      location.pathname === `/dashboard/local/${link.to}` || (link.to === '' && location.pathname === '/dashboard/local')
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
              <h2 className="text-lg font-semibold">{user?.name || 'Menú del Local'}</h2>
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
                      to={`/dashboard/local/${link.to}`}
                      onClick={handleLinkClick}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        location.pathname === `/dashboard/local/${link.to}` || (link.to === '' && location.pathname === '/dashboard/local')
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
              <Route path="/" element={<BusinessStats />} />
              <Route path="combos" element={<ManageCombos />} />
              <Route path="opiniones" element={<ManageReviews />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default BusinessDashboard;