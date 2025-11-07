
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart as ShoppingCartIcon, CreditCard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, amount) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    );
    updateCart(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateCart(updatedCart);
    toast({
      title: "Combo eliminado",
      description: "El combo ha sido eliminado de tu carrito.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Procesando pedido...",
      description: "🚧 ¡Esta función no está implementada aún, pero tu pedido ha sido simulado! 🚀",
    });
    localStorage.removeItem('cart');
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
        id: new Date().getTime(),
        date: new Date().toISOString(),
        items: cartItems,
        total: subtotal,
        status: 'Completado'
    };
    localStorage.setItem('orders', JSON.stringify([newOrder, ...orders]));
    
    navigate('/dashboard/cliente/pedidos');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);

  return (
    <>
      <Helmet>
        <title>Carrito de Compras - KIOSKU BITES</title>
        <meta name="description" content="Revisa y confirma tu pedido de combos." />
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito de Compras</h1>
            {cartItems.length === 0 ? (
              <div className="text-center bg-white p-12 rounded-lg shadow-md">
                <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-300" />
                <h2 className="mt-4 text-xl font-semibold text-gray-700">Tu carrito está vacío</h2>
                <p className="mt-2 text-gray-500">Parece que aún no has añadido ningún combo. ¡Empieza a explorar!</p>
                <Link to="/buscar-combos">
                  <Button className="mt-6 btn-gradient">Buscar Combos</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.restaurant}</p>
                        <p className="text-lg font-bold text-primary mt-1">${item.discountPrice.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, -1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center font-semibold">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-bold text-lg w-20 text-right">${(item.discountPrice * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                       <div className="flex justify-between text-sm text-gray-500">
                        <span>Gastos de gestión:</span>
                        <span>$0.50</span>
                      </div>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${(subtotal + 0.50).toFixed(2)}</span>
                    </div>
                    <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                      <p><span className="font-bold">Recogida:</span> El Cevichero</p>
                      <p><span className="font-bold">Horario:</span> Hoy, 09:00 - 11:00</p>
                    </div>
                    <Button className="w-full mt-6 btn-gradient text-lg py-3" onClick={handleCheckout}>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceder al Pago
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
