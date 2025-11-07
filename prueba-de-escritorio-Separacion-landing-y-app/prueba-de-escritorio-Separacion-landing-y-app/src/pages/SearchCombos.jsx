import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const combos = [
  {
    id: 1,
    name: "Combo Bolón Power",
    restaurant: "El Cevichero",
    rating: 4.8,
    reviews: 124,
    originalPrice: 8,
    discountPrice: 4,
    image: "https://i.postimg.cc/43NWM4VG/bolon-Con-Bistec.jpg",
    description: "Un delicioso bolón de verde (mixto, queso o chicharrón) acompañado de un bistec de carne jugoso y un café pasado. ¡El desayuno perfecto para empezar el día con energía y sin desperdicio!",
    pickupTime: "09:00 - 11:00",
    distance: "1.5 km"
  },
  {
    id: 2,
    name: "Combo Encebollado Resucitador",
    restaurant: "Picantería La Lojanita",
    rating: 4.9,
    reviews: 89,
    originalPrice: 7,
    discountPrice: 3.5,
    image: "https://i.postimg.cc/G2Txw4pW/encebollado.jpg",
    description: "Nuestro famoso encebollado de pescado con extra yuca, chifles y una porción de arroz. ¡El combo que te devuelve a la vida, hecho con el pescado fresco del día!",
    pickupTime: "12:00 - 14:00",
    distance: "2.2 km"
  },
  {
    id: 3,
    name: "Combo Menestra Sorpresa",
    restaurant: "Asados de la Garzota",
    rating: 4.7,
    reviews: 156,
    originalPrice: 10,
    discountPrice: 5,
    image: "https://i.postimg.cc/mg33TxBr/CARNE-ASADA-CON-ARROZ-Y-MENESTRA.jpg",
    description: "Una generosa porción de menestra de lenteja o fréjol, con la carne asada del día (res, pollo o cerdo), patacones y ensalada fresca. ¡Sabor casero garantizado!",
    pickupTime: "18:00 - 20:00",
    distance: "0.8 km"
  },
  {
    id: 4,
    name: "Combo Guatita Especial",
    restaurant: "El Rincón Manabita",
    rating: 4.6,
    reviews: 203,
    originalPrice: 9,
    discountPrice: 4.5,
    image: "https://i.postimg.cc/j5TSK9qR/guatita.jpg",
    description: "La tradicional guatita con maní, acompañada de arroz blanco y aguacate. Un plato criollo que no te puedes perder, ¡a un precio increíble!",
    pickupTime: "13:00 - 15:00",
    distance: "3.1 km"
  },
  {
    id: 5,
    name: "Combo Pan de Yuca Calientito",
    restaurant: "La Casa del Pan de Yuca",
    rating: 4.9,
    reviews: 78,
    originalPrice: 5,
    discountPrice: 2.5,
    image: "https://i.postimg.cc/0NDyTxst/ecuador-2012-1114-YOGUR-Y-PAN-DE-YUCA.jpg",
    description: "Una funda con 5 panes de yuca recién horneados y un yogurt de mora o durazno. ¡La merienda perfecta para compartir o disfrutar solo!",
    pickupTime: "16:00 - 18:00",
    distance: "0.5 km"
  },
  {
    id: 6,
    name: "Combo Cangrejo Criollo",
    restaurant: "El Cangrejal de Urdesa",
    rating: 4.8,
    reviews: 167,
    originalPrice: 15,
    discountPrice: 7.5,
    image: "https://i.postimg.cc/YCJSD0JG/cangrejo.jpg",
    description: "Un combo sorpresa con 2 o 3 cangrejos criollos (dependiendo del tamaño) preparados en nuestra salsa especial, con maduro cocinado y ensalada de cebolla.",
    pickupTime: "19:00 - 21:00",
    distance: "1.8 km"
  }
];

const SearchCombos = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = () => {
    toast({
      title: "🚧 Esta función no está implementada aún",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo mensaje 🚀",
    });
  };

  const filteredCombos = combos.filter(combo =>
    combo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    combo.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Buscar Combos - KIOSKU BITES</title>
        <meta name="description" content="Encuentra los mejores combos de comida cerca de ti con descuentos increíbles en KIOSKU BITES." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-20">
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Buscar Combos en Guayaquil</h1>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar por bolón, encebollado, menestra..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleFilter}
                    className="px-6 py-3"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleFilter}
                    className="px-6 py-3"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Ubicación
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCombos.map((combo, index) => (
                <motion.div
                  key={combo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
                >
                  <Link to={`/combo/${combo.id}`}>
                    <div className="relative">
                      <img
                        src={combo.image}
                        alt={combo.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        -{Math.round((1 - combo.discountPrice / combo.originalPrice) * 100)}%
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{combo.name}</h3>
                      <p className="text-gray-600 mb-3">{combo.restaurant}</p>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium text-gray-700">{combo.rating}</span>
                          <span className="ml-1 text-sm text-gray-500">({combo.reviews})</span>
                        </div>
                        <div className="ml-auto flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {combo.distance}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-primary">${combo.discountPrice.toFixed(2)}</span>
                          <span className="text-lg text-gray-400 line-through">${combo.originalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {combo.pickupTime}
                        </div>
                      </div>
                      
                      <Button
                        className="w-full btn-gradient"
                        asChild
                      >
                        <span>Ver más</span>
                      </Button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SearchCombos;