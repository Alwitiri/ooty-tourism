import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContentStore } from '../../store/useContentStore';

const categories = ['all', 'Tea', 'Chocolate', 'Spices', 'Handicraft', 'Woolens'];

export default function Shops() {
  const { services } = useContentStore();
  const [filter, setFilter] = useState('all');

  let items = [...services.shops];
  if (filter !== 'all') items = items.filter((s) => s.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">Shopping in Ooty</h1>
        <p className="text-gray-500 mb-6">Take home a piece of Ooty — tea, chocolates, spices, and handicrafts</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === c ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'
            }`}>
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className="text-xs font-medium bg-primary-50 text-primary-700 px-2 py-1 rounded-full">{item.category}</span>
              </div>
              <p className="text-sm text-gray-500 mb-1"><span className="font-medium">Famous for:</span> {item.famousFor}</p>
              <p className="text-sm text-gray-500 mb-1">{item.priceRange}</p>
              <p className="text-sm text-gray-400">📍 {item.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
