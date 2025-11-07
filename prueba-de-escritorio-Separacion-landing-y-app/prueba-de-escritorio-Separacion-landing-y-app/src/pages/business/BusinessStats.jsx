import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DollarSign, Package, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { subDays, format } from 'date-fns';

const generateMockData = (days) => {
  let data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    data.push({
      date: format(date, 'MMM dd'),
      ventas: Math.floor(Math.random() * 500) + 100,
      combos: Math.floor(Math.random() * 20) + 5,
    });
  }
  return data;
};

const BusinessStats = () => {
  const [timeRange, setTimeRange] = useState(15);
  const data = generateMockData(timeRange);

  const totalSales = data.reduce((acc, item) => acc + item.ventas, 0);
  const totalCombos = data.reduce((acc, item) => acc + item.combos, 0);

  const bestSellingCombos = [
    { name: 'Combo Encebollado Resucitador', sold: 150 },
    { name: 'Combo Bolón Power', sold: 120 },
    { name: 'Combo Guatita Especial', sold: 95 },
  ];

  const busiestDays = [
    { day: 'Sábado', activity: 95 },
    { day: 'Viernes', activity: 88 },
    { day: 'Domingo', activity: 76 },
  ];

  const statCards = [
    { title: 'Ingresos Totales', value: `$${totalSales.toLocaleString()}`, icon: <DollarSign />, color: 'text-green-500' },
    { title: 'Combos Vendidos', value: totalCombos, icon: <Package />, color: 'text-blue-500' },
    { title: 'Calificación Promedio', value: '4.8', icon: <Star />, color: 'text-yellow-500' },
  ];

  return (
    <>
      <Helmet>
        <title>Estadísticas - Dashboard Local</title>
      </Helmet>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Estadísticas del Negocio</h1>
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm self-stretch sm:self-auto">
            {[7, 15, 30].map(days => (
              <Button
                key={days}
                variant={timeRange === days ? 'default' : 'ghost'}
                onClick={() => setTimeRange(days)}
                className={`${timeRange === days ? 'btn-gradient' : ''} flex-1 sm:flex-none text-xs sm:text-sm`}
              >
                Últimos {days} días
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4"
            >
              <div className={`p-3 rounded-full bg-primary/10 ${card.color}`}>{card.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Ventas por Día</h2>
          <div className="w-full overflow-x-auto">
            <div style={{ width: '100%', minWidth: 500, height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 97, 95, 0.1)' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #eee' }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" iconSize={10} />
                  <Bar dataKey="ventas" fill="#00615F" name="Ingresos" barSize={20} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Combos Más Vendidos</h2>
            <ul className="space-y-3">
              {bestSellingCombos.map((combo, index) => (
                <li key={index} className="flex justify-between items-center text-sm sm:text-base">
                  <span className="flex-1 pr-2">{index + 1}. {combo.name}</span>
                  <span className="font-bold bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">{combo.sold} vendidos</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Días de Mayor Actividad</h2>
            <ul className="space-y-3">
              {busiestDays.map((day, index) => (
                <li key={index} className="flex justify-between items-center text-sm sm:text-base">
                  <span>{index + 1}. {day.day}</span>
                  <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${day.activity}%` }}></div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BusinessStats;