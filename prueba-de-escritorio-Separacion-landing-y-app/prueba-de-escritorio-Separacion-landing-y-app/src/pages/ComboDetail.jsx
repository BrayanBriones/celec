import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, ChevronLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const allCombos = [
    {
      id: 1,
      name: "Combo Bolón Power",
      restaurant: "El Cevichero",
      rating: 4.8,
      reviewsCount: 124,
      originalPrice: 8,
      discountPrice: 4,
      image: "https://i.postimg.cc/43NWM4VG/bolon-Con-Bistec.jpg",
      description: "Un delicioso bolón de verde (mixto, queso o chicharrón) acompañado de un bistec de carne jugoso y un café pasado. ¡El desayuno perfecto para empezar el día con energía y sin desperdicio!",
      content: ["Bolón de verde (a elección)", "Bistec de carne", "Café pasado"],
      pickupTime: "09:00 - 11:00",
      distance: "1.5 km",
      reviews: [
        { user: "Carlos V.", rating: 5, comment: "¡El mejor bolón de Guayaquil! El bistec estaba suave y el café en su punto.", date: "2025-08-01" },
        { user: "Ana M.", rating: 4, comment: "Muy bueno y contundente. Excelente precio.", date: "2025-07-28" },
      ]
    },
    {
      id: 2,
      name: "Combo Encebollado Resucitador",
      restaurant: "Picantería La Lojanita",
      rating: 4.9,
      reviewsCount: 89,
      originalPrice: 7,
      discountPrice: 3.5,
      image: "https://i.postimg.cc/G2Txw4pW/encebollado.jpg",
      description: "Nuestro famoso encebollado de pescado con extra yuca, chifles y una porción de arroz. ¡El combo que te devuelve a la vida, hecho con el pescado fresco del día!",
      content: ["Encebollado de pescado", "Porción de chifles", "Porción de arroz", "Jugo natural"],
      pickupTime: "12:00 - 14:00",
      distance: "2.2 km",
      reviews: [
        { user: "Luis R.", rating: 5, comment: "¡Levanta muertos! El mejor encebollado que he probado.", date: "2025-08-02" },
        { user: "Sofía C.", rating: 5, comment: "Siempre delicioso y a un precio increíble. 100% recomendado.", date: "2025-07-30" },
      ]
    },
    {
      id: 3,
      name: "Combo Menestra Sorpresa",
      restaurant: "Asados de la Garzota",
      rating: 4.7,
      reviewsCount: 156,
      originalPrice: 10,
      discountPrice: 5,
      image: "https://i.postimg.cc/mg33TxBr/CARNE-ASADA-CON-ARROZ-Y-MENESTRA.jpg",
      description: "Una generosa porción de menestra de lenteja o fréjol, con la carne asada del día (res, pollo o cerdo), patacones y ensalada fresca. ¡Sabor casero garantizado!",
      content: ["Menestra del día", "Carne asada (sorpresa)", "Arroz", "Patacones"],
      pickupTime: "18:00 - 20:00",
      distance: "0.8 km",
      reviews: [
        { user: "David G.", rating: 4, comment: "Buena porción, la carne estaba rica. Me tocó de res.", date: "2025-07-29" },
        { user: "Laura P.", rating: 5, comment: "¡Delicioso! Como la comida de casa. Volveré a pedir.", date: "2025-08-01" },
      ]
    },
    {
      id: 4,
      name: "Combo Guatita Especial",
      restaurant: "El Rincón Manabita",
      rating: 4.6,
      reviewsCount: 203,
      originalPrice: 9,
      discountPrice: 4.5,
      image: "https://i.postimg.cc/j5TSK9qR/guatita.jpg",
      description: "La tradicional guatita con maní, acompañada de arroz blanco y aguacate. Un plato criollo que no te puedes perder, ¡a un precio increíble!",
      content: ["Porción de guatita", "Arroz", "Aguacate"],
      pickupTime: "13:00 - 15:00",
      distance: "3.1 km",
      reviews: [
        { user: "Mario S.", rating: 5, comment: "La guatita estaba espectacular, bien espesita y con mucho sabor.", date: "2025-08-03" },
        { user: "Fernanda V.", rating: 4, comment: "Muy rica, aunque un poco pequeña la porción para mi gusto.", date: "2025-07-25" },
      ]
    },
    {
      id: 5,
      name: "Combo Pan de Yuca Calientito",
      restaurant: "La Casa del Pan de Yuca",
      rating: 4.9,
      reviewsCount: 78,
      originalPrice: 5,
      discountPrice: 2.5,
      image: "https://i.postimg.cc/0NDyTxst/ecuador-2012-1114-YOGUR-Y-PAN-DE-YUCA.jpg",
      description: "Una funda con 5 panes de yuca recién horneados y un yogurt de mora o durazno. ¡La merienda perfecta para compartir o disfrutar solo!",
      content: ["5 panes de yuca", "Yogurt personal (mora o durazno)"],
      pickupTime: "16:00 - 18:00",
      distance: "0.5 km",
      reviews: [
        { user: "Isabel N.", rating: 5, comment: "¡Los mejores panes de yuca! Siempre calientitos y deliciosos.", date: "2025-08-04" },
        { user: "Andrés T.", rating: 5, comment: "Adicto a este combo. El yogurt es el complemento perfecto.", date: "2025-08-02" },
      ]
    },
    {
      id: 6,
      name: "Combo Cangrejo Criollo",
      restaurant: "El Cangrejal de Urdesa",
      rating: 4.8,
      reviewsCount: 167,
      originalPrice: 15,
      discountPrice: 7.5,
      image: "https://i.postimg.cc/YCJSD0JG/cangrejo.jpg",
      description: "Un combo sorpresa con 2 o 3 cangrejos criollos (dependiendo del tamaño) preparados en nuestra salsa especial, con maduro cocinado y ensalada de cebolla.",
      content: ["2-3 cangrejos criollos", "Maduro cocinado", "Ensalada de cebolla y tomate"],
      pickupTime: "19:00 - 21:00",
      distance: "1.8 km",
      reviews: [
        { user: "Roberto M.", rating: 5, comment: "¡Qué ofertón! Los cangrejos estaban gorditos y la salsa espectacular.", date: "2025-07-31" },
        { user: "Valeria J.", rating: 4, comment: "Muy ricos, aunque es una lotería cuántos te tocan. ¡Pero vale la pena!", date: "2025-07-29" },
      ]
    }
];

const ComboDetail = () => {
  const { id } = useParams();
  const combo = allCombos.find(c => c.id === parseInt(id));
  const [sortOrder, setSortOrder] = useState('newest');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleReserve = () => {
    if (!user) {
      toast({
        title: "Inicia sesión para reservar",
        description: "Necesitas una cuenta para poder reservar combos.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (user.type === 'local') {
      toast({
        title: "Acción no permitida",
        description: "Las cuentas de local no pueden reservar combos.",
        variant: "destructive",
      });
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === combo.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...combo, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast({
      title: "¡Combo añadido!",
      description: `${combo.name} ha sido añadido a tu carrito.`,
    });
    navigate('/carrito');
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    toast({
      title: `Comentarios ordenados por: ${order === 'newest' ? 'Más recientes' : 'Mejor calificación'}`,
      description: "¡Funcionalidad de ordenamiento aplicada!",
    });
  };

  const sortedReviews = useMemo(() => {
    if (!combo) return [];
    return [...combo.reviews].sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortOrder === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [combo, sortOrder]);

  if (!combo) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <h1 className="text-2xl font-bold">Combo no encontrado</h1>
      </div>
    );
  }

  const otherCombos = allCombos.filter(c => c.id !== combo.id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{combo.name} - KIOSKU BITES</title>
        <meta name="description" content={combo.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link to="/buscar-combos" className="inline-flex items-center text-primary hover:underline mb-6">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Volver a la búsqueda
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                    <img src={combo.image} alt={combo.name} className="w-full h-auto object-cover rounded-2xl shadow-xl" />
                  </motion.div>

                  <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{combo.name}</h1>
                    <p className="text-xl text-gray-600 mb-4">de <span className="font-semibold text-primary">{combo.restaurant}</span></p>
                    
                    <div className="flex items-center mb-6 space-x-4 flex-wrap">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-bold text-gray-700">{combo.rating}</span>
                        <span className="ml-1 text-gray-500">({combo.reviewsCount} reseñas)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-1" />
                        <span>{combo.pickupTime}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-1" />
                        <span>{combo.distance}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-primary/10 p-4 rounded-lg mb-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl font-bold text-primary">${combo.discountPrice.toFixed(2)}</span>
                        <span className="text-xl text-gray-500 line-through">${combo.originalPrice.toFixed(2)}</span>
                      </div>
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Ahorras ${(combo.originalPrice - combo.discountPrice).toFixed(2)}
                      </span>
                    </div>

                    <Button onClick={handleReserve} size="lg" className="w-full btn-gradient text-lg">
                      <ShoppingBag className="w-6 h-6 mr-2" />
                      Reservar ahora
                    </Button>
                  </motion.div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-xl font-bold mb-3">¿Qué podría incluir tu combo?</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {combo.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">El contenido exacto es una sorpresa basada en el excedente del día para garantizar la máxima frescura y reducir el desperdicio.</p>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-3">Descripción</h2>
                  <p className="text-gray-700">{combo.description}</p>
                </div>

                <div className="mt-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Opiniones de otros usuarios</h2>
                    <div className="flex items-center gap-2">
                        <Button variant={sortOrder === 'newest' ? 'default' : 'outline'} size="sm" onClick={() => handleSortChange('newest')} className={sortOrder === 'newest' ? 'btn-gradient' : ''}>Más recientes</Button>
                        <Button variant={sortOrder === 'rating' ? 'default' : 'outline'} size="sm" onClick={() => handleSortChange('rating')} className={sortOrder === 'rating' ? 'btn-gradient' : ''}>Mejor calificación</Button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {sortedReviews.map((review, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-xl shadow-md"
                      >
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-gray-800">{review.user}</h3>
                          <div className="flex items-center ml-auto">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                            {[...Array(5 - review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-gray-300" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 italic">"{review.comment}"</p>
                        <p className="text-xs text-gray-400 mt-2 text-right">{new Date(review.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-1 space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">Otros combos que te podrían gustar</h3>
                {otherCombos.map(otherCombo => (
                  <motion.div
                    key={otherCombo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/combo/${otherCombo.id}`} className="block bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                      <div className="relative">
                        <img src={otherCombo.image} alt={otherCombo.name} className="w-full h-40 object-cover" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-lg truncate">{otherCombo.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{otherCombo.restaurant}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm font-bold">{otherCombo.rating}</span>
                          </div>
                          <span className="text-lg font-bold text-primary">${otherCombo.discountPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </aside>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ComboDetail;
