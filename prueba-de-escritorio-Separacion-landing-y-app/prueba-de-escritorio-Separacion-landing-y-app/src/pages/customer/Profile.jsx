import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user } = useAuth();

  const handleEdit = () => {
    toast({
      title: "🚧 Función en desarrollo",
      description: "Pronto podrás editar tu perfil.",
    });
  };

  return (
    <>
      <Helmet><title>Mi Perfil - KIOSKU BITES</title></Helmet>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" /> Editar Perfil
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-500">Miembro desde 2025</p>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 space-y-4">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-4" />
              <span className="font-semibold text-gray-800">{user?.name}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-4" />
              <span className="font-semibold text-gray-800">{user?.email}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-bold mb-4">Mis Estadísticas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-gray-500">Combos Salvados</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">$85.50</p>
              <p className="text-gray-500">Dinero Ahorrado</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-gray-500">Locales Favoritos</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Profile;
