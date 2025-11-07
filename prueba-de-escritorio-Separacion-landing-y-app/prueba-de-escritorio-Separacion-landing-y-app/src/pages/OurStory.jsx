import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Users, Leaf, Target, Eye } from 'lucide-react';

const OurStory = () => {
  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sostenibilidad",
      description: "Reducimos el desperdicio alimentario conectando a personas con comida deliciosa que de otra manera se desperdiciaría."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Comunidad",
      description: "Creamos vínculos entre locales y clientes, fortaleciendo la economía local y las relaciones comunitarias."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Accesibilidad",
      description: "Hacemos que la comida de calidad sea accesible para todos, sin importar el presupuesto."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Comidas salvadas" },
    { number: "1,200+", label: "Locales asociados" },
    { number: "25,000+", label: "Usuarios activos" },
    { number: "75%", label: "Reducción de desperdicio" }
  ];

  return (
    <>
      <Helmet>
        <title>Nuestra Historia - KIOSKU BITES</title>
        <meta name="description" content="Conoce la historia de KIOSKU BITES y cómo estamos revolucionando la forma de combatir el desperdicio alimentario." />
      </Helmet>

      <div className="min-h-screen bg-white pt-20">
        <section className="py-20 hero-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Nuestra <span className="text-gradient">Historia</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Todo comenzó con una simple idea: ¿y si pudiéramos convertir el desperdicio 
                de comida en oportunidades para todos?
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Cómo nació KIOSKU BITES?</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    En 2025, un grupo de jóvenes emprendedores se dio cuenta de una realidad 
                    preocupante: cada día, toneladas de comida perfectamente buena terminaban 
                    en la basura mientras muchas personas luchaban por acceder a comidas de calidad.
                  </p>
                  <p>
                    Inspirados por el éxito de plataformas similares en otros países, decidimos 
                    crear una solución local que no solo ayudara al medio ambiente, sino que 
                    también beneficiara tanto a los comerciantes como a los consumidores.
                  </p>
                  <p>
                    Así nació KIOSKU BITES: una plataforma que conecta a personas con locales 
                    de comida para rescatar alimentos deliciosos a precios increíbles, 
                    creando un impacto positivo en nuestra comunidad y planeta.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img   
                  className="w-full h-auto rounded-2xl shadow-xl"
                  alt="Equipo fundador de KIOSKU BITES" src="https://images.unsplash.com/photo-1531546110571-200f26d0d18b" />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">2025</div>
                    <div className="text-sm">Año de fundación</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Nuestra Misión</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Revolucionar la forma en que consumimos alimentos, creando una plataforma 
                  que conecte a comerciantes y consumidores para reducir el desperdicio 
                  alimentario mientras hacemos que la comida de calidad sea accesible para todos.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Nuestra Visión</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Ser la plataforma líder en España para la reducción del desperdicio alimentario, 
                  creando un futuro más sostenible donde cada comida tenga valor y cada persona 
                  pueda acceder a alimentación de calidad.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nuestros Valores
              </h2>
              <p className="text-xl text-gray-600">
                Los principios que guían cada decisión que tomamos
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nuestro Impacto
              </h2>
              <p className="text-xl text-white opacity-90">
                Números que reflejan nuestro compromiso con el cambio
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center text-white"
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Un Equipo Comprometido
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Somos un equipo diverso de profesionales apasionados por la tecnología, 
                la sostenibilidad y el impacto social positivo.
              </p>
              
              <div className="relative">
                <img   
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                  alt="Equipo de KIOSKU BITES trabajando" src="https://images.unsplash.com/photo-1564531718001-9813bc3fd35d" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">Juntos por un futuro mejor</h3>
                    <p className="text-lg opacity-90">
                      Cada día trabajamos para hacer realidad nuestra visión de un mundo sin desperdicio alimentario.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OurStory;