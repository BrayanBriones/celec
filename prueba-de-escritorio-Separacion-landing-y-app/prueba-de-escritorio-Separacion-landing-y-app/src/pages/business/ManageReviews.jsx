
import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Flag, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const mockReviews = [
  { id: 1, user: 'Usuario Anónimo', combo: 'Combo Bolón Power', date: '2025-08-10', rating: 5, comment: "¡Delicioso! El mejor bolón que he probado en mucho tiempo.", status: 'visible' },
  { id: 2, user: 'Usuario Anónimo', combo: 'Combo Encebollado Resucitador', date: '2025-08-09', rating: 4, comment: "Muy bueno y a un precio increíble. Lo recomiendo.", status: 'visible' },
  { id: 3, user: 'Usuario Anónimo', combo: 'Combo Bolón Power', date: '2025-08-09', rating: 2, comment: "El café estaba un poco frío.", status: 'visible' },
  { id: 4, user: 'Usuario Anónimo', combo: 'Combo Guatita Especial', date: '2025-08-08', rating: 5, comment: "¡Espectacular! Como hecho en casa. Volveré a pedir sin duda.", status: 'destacado' },
  { id: 5, user: 'Usuario Anónimo', combo: 'Combo Cangrejo Criollo', date: '2025-08-07', rating: 3, comment: "Estaba bueno, pero me tocaron pocos cangrejos.", status: 'visible' },
];

const ManageReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [filter, setFilter] = useState('date');

  const handleAction = (id, action) => {
    setReviews(reviews.map(review => {
      if (review.id === id) {
        if (action === 'destacar') {
          return { ...review, status: review.status === 'destacado' ? 'visible' : 'destacado' };
        }
        if (action === 'reportar') {
          return { ...review, status: review.status === 'reportado' ? 'visible' : 'reportado' };
        }
      }
      return review;
    }));
    toast({ title: `Opinión ${action === 'destacar' ? 'destacada/restaurada' : 'reportada/restaurada'}`, description: 'La acción se completó con éxito.' });
  };

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (filter === 'rating_desc') return b.rating - a.rating;
      if (filter === 'rating_asc') return a.rating - b.rating;
      return new Date(b.date) - new Date(a.date);
    });
  }, [reviews, filter]);

  return (
    <>
      <Helmet><title>Gestionar Opiniones - KIOSKU BITES</title></Helmet>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestionar Opiniones</h1>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm"
            >
              <option value="date">Más recientes</option>
              <option value="rating_desc">Mejor calificación</option>
              <option value="rating_asc">Peor calificación</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {sortedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 rounded-lg shadow-md ${
                review.status === 'destacado' ? 'bg-yellow-50 border-l-4 border-yellow-400' : 
                review.status === 'reportado' ? 'bg-red-50 border-l-4 border-red-400' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{review.user} sobre <span className="text-primary">{review.combo}</span></p>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={review.status === 'destacado' ? 'default' : 'outline'}
                    size="sm"
                    className={review.status === 'destacado' ? 'btn-gradient' : ''}
                    onClick={() => handleAction(review.id, 'destacar')}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" /> {review.status === 'destacado' ? 'Destacado' : 'Destacar'}
                  </Button>
                  <Button
                    variant={review.status === 'reportado' ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => handleAction(review.id, 'reportar')}
                  >
                    <Flag className="mr-2 h-4 w-4" /> {review.status === 'reportado' ? 'Reportado' : 'Reportar'}
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-gray-700 italic">"{review.comment}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageReviews;
