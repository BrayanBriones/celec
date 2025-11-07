import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, UserPlus, LogOut, LayoutDashboard, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const landingItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Buscar Combos', path: '/buscar-combos' },
    { name: 'Para Empresas', path: '/para-empresas' },
    { name: 'Nuestra Historia', path: '/nuestra-historia' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const appItems = [{ name: 'Buscar Combos', path: '/buscar-combos' }];

  const navItems = user ? appItems : landingItems;

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-xl font-bold text-[#453255]">KIOSKU BITES</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Icono carrito igual que antes */}
                {user.type === 'cliente' && (
                  <Link to="/carrito">
                    <Button variant="ghost" size="icon" aria-label="Carrito">
                      <ShoppingCart className="w-5 h-5" />
                    </Button>
                  </Link>
                )}

                {/* Botón Dashboard con estilo claro (similar al original) */}
                <Link to={`/dashboard/${user.type}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#F5EBD9] text-[#453255] border-transparent hover:bg-[#efe3cf]"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>

                {/* Botón Cerrar Sesión morado */}
                <Button onClick={logout} size="sm" className="btn-gradient">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-primary">
                    <User className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="btn-gradient">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.path ? 'text-primary bg-accent' : 'text-gray-700 hover:bg-gray-50'}`}>
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                {user ? (
                   <div className="flex flex-col space-y-2">
                     <Link to={`/dashboard/${user.type}`} onClick={() => setIsOpen(false)}>
                       <Button variant="ghost" className="w-full justify-start"><LayoutDashboard className="w-4 h-4 mr-2" />Dashboard</Button>
                     </Link>
                     {user.type === 'cliente' && (
                        <Link to="/carrito" onClick={() => setIsOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start"><ShoppingCart className="w-4 h-4 mr-2" />Carrito</Button>
                        </Link>
                     )}
                     <Button onClick={() => { logout(); setIsOpen(false); }} className="w-full btn-gradient justify-start"><LogOut className="w-4 h-4 mr-2" />Cerrar Sesión</Button>
                   </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start"><User className="w-4 h-4 mr-2" />Iniciar Sesión</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full btn-gradient justify-start"><UserPlus className="w-4 h-4 mr-2" />Registrarse</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;