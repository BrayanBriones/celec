import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Briefcase, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('prueba@usuario.com');
  const [password, setPassword] = useState('1234');
  const [accountType, setAccountType] = useState('cliente');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const userData = {
        email: email,
        name: accountType === 'cliente' ? 'Cliente de Prueba' : 'Local de Prueba',
        type: accountType,
      };
      login(userData);
      toast({
        title: "¡Bienvenido de nuevo!",
        description: `Has iniciado sesión como ${accountType}.`,
      });
      // volver a comportamiento original: redirigir al dashboard según tipo
      navigate(`/dashboard/${accountType}`, { replace: true });
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Por favor, introduce tu correo y contraseña.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - KIOSKU BITES</title>
        <meta name="description" content="Inicia sesión en tu cuenta de KIOSKU BITES para acceder a tus combos y reservas." />
      </Helmet>

      <div className="min-h-screen flex bg-gray-50">
        <div className="hidden lg:block relative w-0 flex-1 lg:w-1/2 xl:w-2/3">
          <img  className="absolute inset-0 h-full w-full object-cover" alt="Deliciosa comida" src="https://images.unsplash.com/photo-1656167718265-a05fe70cdf52" />
          <div className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center text-white p-12 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <Link to="/" className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                  <span className="text-primary font-bold text-4xl">K</span>
                </div>
                <span className="text-4xl font-bold">KIOSKU BITES</span>
              </Link>
              <h1 className="text-4xl font-bold leading-tight">Salva comida, ahorra dinero.</h1>
              <p className="mt-4 text-xl opacity-90">Únete a miles de personas que ya disfrutan de comida deliciosa a precios increíbles.</p>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">¡Hola de nuevo!</h2>
              <p className="mt-2 text-lg text-gray-600">Inicia sesión para seguir salvando comida.</p>
            </div>
            
            <div className="mt-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button onClick={() => setAccountType('cliente')} variant={accountType === 'cliente' ? 'default' : 'outline'} className={`${accountType === 'cliente' ? 'btn-gradient' : ''} py-3`}>
                  <User className="w-4 h-4 mr-2" />
                  Soy Cliente
                </Button>
                <Button onClick={() => setAccountType('local')} variant={accountType === 'local' ? 'default' : 'outline'} className={`${accountType === 'local' ? 'btn-gradient' : ''} py-3`}>
                  <Briefcase className="w-4 h-4 mr-2" />
                  Soy un Local
                </Button>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="tu@email.com" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Tu contraseña" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Recuérdame</label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-primary hover:text-primary/80">¿Olvidaste tu contraseña?</a>
                    </div>
                  </div>

                  <div>
                    <Button type="submit" className="flex w-full justify-center btn-gradient py-3 text-lg">
                      <LogIn className="w-5 h-5 mr-2" />
                      Iniciar Sesión
                    </Button>
                  </div>
                </form>

                <p className="mt-8 text-center text-md text-gray-600">
                  ¿No tienes una cuenta? <Link to="/register" className="font-medium text-primary hover:text-[#1f3a5e]">Regístrate aquí</Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;