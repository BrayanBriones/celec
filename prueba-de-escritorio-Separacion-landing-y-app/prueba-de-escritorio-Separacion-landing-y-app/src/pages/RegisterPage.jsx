import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Briefcase, Mail, Lock, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const RegisterPage = () => {
  const [accountType, setAccountType] = useState('cliente');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Esta función no está implementada aún",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo mensaje 🚀",
    });
  };

  const renderForm = () => {
    if (accountType === 'cliente') {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Tu nombre" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="email" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="tu@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="password" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Crea una contraseña" />
            </div>
          </div>
        </motion.div>
      );
    }

    if (accountType === 'local') {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del local</label>
            <div className="mt-1 relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Nombre de tu negocio" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del dueño</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Tu nombre completo" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico de contacto</label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="email" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="email@tu-negocio.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="password" required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Crea una contraseña segura" />
            </div>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Registro - KIOSKU BITES</title>
        <meta name="description" content="Únete a la comunidad de KIOSKU BITES, ya sea como cliente o como local asociado." />
      </Helmet>

      <div className="min-h-screen flex bg-gray-50">
        <div className="hidden lg:block relative w-0 flex-1 lg:w-1/2 xl:w-2/3">
          <img  alt="Un chef preparando comida en un restaurante" className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2787&auto=format&fit=crop" />
          <div className="absolute inset-0 bg-primary/70 flex flex-col items-center justify-center text-white p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link to="/" className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                  <span className="text-primary font-bold text-4xl">K</span>
                </div>
                <span className="text-4xl font-bold">KIOSKU BITES</span>
              </Link>
              <h1 className="text-4xl font-bold leading-tight">Únete a la revolución.</h1>
              <p className="mt-4 text-xl opacity-90">Forma parte de la solución contra el desperdicio de alimentos.</p>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto w-full max-w-sm lg:w-96"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Crea tu cuenta</h2>
              <p className="mt-2 text-lg text-gray-600">
                Elige si quieres salvar comida o venderla.
              </p>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button
                  onClick={() => setAccountType('cliente')}
                  variant={accountType === 'cliente' ? 'default' : 'outline'}
                  className={`${accountType === 'cliente' ? 'btn-gradient' : ''} py-3`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Soy Cliente
                </Button>
                <Button
                  onClick={() => setAccountType('local')}
                  variant={accountType === 'local' ? 'default' : 'outline'}
                  className={`${accountType === 'local' ? 'btn-gradient' : ''} py-3`}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Soy un Local
                </Button>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {renderForm()}
                <div className="flex items-start pt-2">
                  <div className="flex h-5 items-center">
                    <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      Acepto los <a href="#" className="text-primary hover:underline">Términos y Condiciones</a>
                    </label>
                  </div>
                </div>
                <div>
                  <Button type="submit" className="flex w-full justify-center btn-gradient py-3 text-lg">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Crear cuenta
                  </Button>
                </div>
              </form>
              <p className="mt-8 text-center text-md text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-[#1f3a5e]">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;