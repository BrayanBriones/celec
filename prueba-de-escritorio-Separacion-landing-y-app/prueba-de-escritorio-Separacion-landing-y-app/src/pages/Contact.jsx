import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Esta función no está implementada aún",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo mensaje 🚀",
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "hola@kioskubites.com",
      description: "Escríbenos y te responderemos en menos de 24 horas."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Oficina",
      content: "Guayaquil, Ecuador",
      description: "Av. 9 de Octubre y Malecón Simón Bolívar"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfono",
      content: "+593 4 123 4567",
      description: "Lunes a Viernes de 9:00 a 18:00"
    }
  ];

  const socialLinks = [
    {
      icon: <Facebook className="w-6 h-6" />,
      name: "Facebook",
      url: "#",
      color: "hover:text-blue-600"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      name: "Instagram",
      url: "#",
      color: "hover:text-pink-600"
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      name: "Twitter",
      url: "#",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contacto - KIOSKU BITES</title>
        <meta name="description" content="Ponte en contacto con el equipo de KIOSKU BITES. Estamos aquí para ayudarte con cualquier pregunta o sugerencia." />
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
                ¡Hablemos!
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                ¿Tienes alguna pregunta, sugerencia o quieres formar parte de nuestra misión? 
                Nos encantaría escucharte.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-gradient text-white py-3 text-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar mensaje
                  </Button>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white flex-shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                          <p className="text-primary font-medium">{info.content}</p>
                          <p className="text-gray-600 text-sm">{info.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Síguenos en redes sociales</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors ${social.color}`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <img  class="w-full h-64 object-cover rounded-2xl shadow-lg" alt="Mapa de la ciudad de Guayaquil" src="https://images.unsplash.com/photo-1653754935284-d6d7119f0678" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl flex items-end">
                    <div className="p-6 text-white">
                      <h4 className="text-lg font-semibold">¡Ven a visitarnos!</h4>
                      <p className="text-sm opacity-90">Siempre hay un café o un bolón esperándote.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
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
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Preguntas frecuentes
              </h2>
              <p className="text-xl text-gray-600">
                Respuestas a las dudas más comunes sobre KIOSKU BITES
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ¿Cómo funciona KIOSKU BITES?
                </h3>
                <p className="text-gray-600">
                  Es muy simple: los locales publican sus combos disponibles, tú los reservas 
                  a través de nuestra app y los recoges en el horario indicado. ¡Así de fácil!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ¿Qué tipo de comida puedo encontrar?
                </h3>
                <p className="text-gray-600">
                  Desde desayunos típicos como bolones y tigrillo, hasta almuerzos como menestras y encebollados, y mucho más. La variedad es parte de la sorpresa.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ¿Puedo cancelar mi reserva?
                </h3>
                <p className="text-gray-600">
                  Sí, puedes cancelar tu reserva hasta 2 horas antes del horario de recogida 
                  sin ningún coste adicional.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  ¿Cómo puedo registrar mi local?
                </h3>
                <p className="text-gray-600">
                  ¡Es muy fácil! Ve a nuestra sección "Para Empresas" y sigue los pasos. Nuestro equipo te guiará en todo el proceso de registro.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;