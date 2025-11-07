import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Repeat, Filter, ShoppingBag } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const handleRepeatOrder = (orderItems) => {
    localStorage.setItem('cart', JSON.stringify(orderItems));
    toast({
      title: "¡Pedido repetido!",
      description: "Los combos han sido añadidos a tu carrito.",
    });
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    const orderDate = new Date(order.date);
    const filterDate = new Date();
    if (filter === 'last_week') {
      filterDate.setDate(filterDate.getDate() - 7);
      return orderDate >= filterDate;
    }
    if (filter === 'last_month') {
      filterDate.setMonth(filterDate.getMonth() - 1);
      return orderDate >= filterDate;
    }
    return true;
  });

  return (
    <>
      <Helmet><title>Historial de Pedidos - KIOSKU BITES</title></Helmet>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Historial de Pedidos</h1>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm"
            >
              <option value="all">Todos</option>
              <option value="last_week">Última semana</option>
              <option value="last_month">Último mes</option>
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300" />
            <h2 className="mt-4 text-xl font-semibold text-gray-700">No tienes pedidos</h2>
            <p className="mt-2 text-gray-500">Cuando reserves tu primer combo, aparecerá aquí.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-bold text-lg">Pedido #{order.id}</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">${order.items.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0).toFixed(2)}</p>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {order.status || 'Completado'}
                    </span>
                  </div>
                </div>
                <div className="border-t border-b border-gray-200 py-2 my-2 space-y-2">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span>{item.quantity} x {item.name}</span>
                      <span className="text-gray-600">${(item.discountPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={() => handleRepeatOrder(order.items)}>
                    <Repeat className="mr-2 h-4 w-4" /> Repetir Pedido
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
