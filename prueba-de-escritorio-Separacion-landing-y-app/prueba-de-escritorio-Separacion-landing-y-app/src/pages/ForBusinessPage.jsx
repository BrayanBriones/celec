import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DollarSign, Users, Trash2, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ForBusinessPage = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Genera Ingresos Adicionales",
      description: "Convierte el excedente de comida que antes era una pérdida en una nueva fuente de ingresos para tu negocio."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Atrae Nuevos Clientes",
      description: "Date a conocer a una nueva audiencia de clientes que buscan opciones de calidad a buen precio y que valoran la sostenibilidad."
    },
    {
      icon: <Trash2 className="w-8 h-8" />,
      title: "Reduce el Desperdicio",
      description: "Minimiza tu impacto ambiental y los costos asociados a la gestión de residuos. ¡Cada combo vendido es comida salvada!"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Mejora tu Imagen de Marca",
      description: "Posiciona tu negocio como una empresa socialmente responsable y comprometida con el medio ambiente."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Regístrate Fácilmente",
      description: "Completa nuestro sencillo formulario de registro para locales. Nuestro equipo te contactará para verificar tu negocio."
    },
    {
      number: "2",
      title: "Publica tus Combos",
      description: "Al final del día, publica los combos sorpresa con el excedente de comida a través de nuestra plataforma para locales."
    },
    {
      number: "3",
      title: "Prepara los Pedidos",
      description: "Los clientes reservarán y pagarán a través de la app. Solo tienes que preparar los combos para la hora de recogida."
    },
    {
      number: "4",
      title: "Recibe tus Ganancias",
      description: "Recibe los pagos de tus ventas de forma segura y periódica directamente en tu cuenta bancaria."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Para Empresas - KIOSKU BITES</title>
        <meta name="description" content="Únete a KIOSKU BITES y convierte tu excedente de comida en ingresos. Reduce el desperdicio y atrae nuevos clientes." />
      </Helmet>

      <div className="min-h-screen bg-white pt-16">
        <section className="relative py-24 lg:py-32 hero-pattern">
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Convierte tu excedente en <span className="text-gradient">oportunidades</span>.
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Únete a la red de locales de KIOSKU BITES en Guayaquil. Reduce el desperdicio de alimentos, genera ingresos extra y atrae a nuevos clientes comprometidos con la sostenibilidad.
              </p>
              <Link to="/register">
                <Button size="lg" className="btn-gradient px-8 py-4 text-lg">
                  Registra tu local ahora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué unirte a KIOSKU BITES?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Una solución simple y efectiva para un problema complejo. Ganamos todos: tu negocio, los clientes y el planeta.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center card-hover"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img  class="rounded-2xl shadow-xl w-full h-auto" alt="Chef sonriente entregando una bolsa de comida para llevar" src="https://images.unsplash.com/photo-1690373620370-a58238d26d68" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Es tan fácil como contar hasta 4
                </h2>
                <div className="space-y-6">
                  {steps.map((step) => (
                    <div key={step.number} className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full font-bold text-lg mr-4">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Lo que dicen nuestros locales asociados
              </h2>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-2xl relative"
            >
              <div className="absolute -top-8 -left-8 w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white text-5xl font-serif">“</div>
              <blockquote className="text-xl italic text-gray-700">
                "Desde que nos unimos a KIOSKU BITES, hemos reducido nuestro desperdicio de comida en casi un 80%. Además, hemos visto un flujo constante de nuevos clientes que vienen por los combos y terminan volviendo como clientes regulares. ¡Es una situación en la que todos ganan!"
              </blockquote>
              <footer className="mt-6">
                <p className="font-bold text-gray-900">Juan Pérez, Dueño de "Asados de la Garzota"</p>
                <p className="text-gray-500">Guayaquil, Ecuador</p>
              </footer>
            </motion.div>
          </div>
        </section>

        <section className="gradient-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                Únete hoy a la comunidad de KIOSKU BITES y empieza a marcar la diferencia. El registro es rápido, fácil y gratuito.
              </p>
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  Quiero unirme ahora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ForBusinessPage;