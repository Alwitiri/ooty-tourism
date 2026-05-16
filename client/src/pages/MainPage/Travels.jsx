import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContentStore } from '../../store/useContentStore';
import { formatPrice } from '../../utils/helpers';
import { HiStar, HiUser } from 'react-icons/hi';

export default function Travels() {
  const { services } = useContentStore();
  const [filter, setFilter] = useState('all');

  let items = [...services.transports];
  if (filter !== 'all') items = items.filter((t) => t.type.toLowerCase() === filter);

  const types = ['all', ...new Set(services.transports.map((t) => t.type.toLowerCase()))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">Travel Options</h1>
        <p className="text-gray-500 mb-6">Rentals, cabs, and group transport for exploring Ooty</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-8">
        {types.map((t) => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === t ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'
            }`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-44 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{item.type}</span>
              </div>
              <p className="text-xs text-gray-500 mb-3"><HiUser className="w-4 h-4 inline mr-1" />Up to {item.capacity} passengers</p>
              <p className="text-xs text-gray-500 mb-3">{item.routes}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">Half Day</p>
                  <p className="font-bold text-gray-900">{formatPrice(item.priceHalfDay)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">Full Day</p>
                  <p className="font-bold text-gray-900">{formatPrice(item.priceFullDay)}</p>
                </div>
              </div>
              {item.driver && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm">
                  <div className="flex items-center space-x-1">
                    <HiUser className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{item.driver.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HiStar className="w-4 h-4 text-amber-500" />
                    <span className="text-gray-600">{item.driver.rating} · {item.driver.trips} trips</span>
                  </div>
                </div>
              )}
              {!item.driver && (
                <p className="text-xs text-amber-600 pt-3 border-t border-gray-100">Self-drive option — no driver included</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
