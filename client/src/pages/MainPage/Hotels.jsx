import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContentStore } from '../../store/useContentStore';
import ServiceCard from '../../components/ui/ServiceCard';

const categories = ['all', 'luxury', 'resort', 'homestay', 'budget'];

export default function Hotels() {
  const { services } = useContentStore();
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('rating');

  let items = [...services.hotels];
  if (filter !== 'all') items = items.filter((h) => h.category === filter);
  if (sort === 'rating') items.sort((a, b) => b.rating - a.rating);
  if (sort === 'price_asc') items.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') items.sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">Stays in Ooty</h1>
        <p className="text-gray-500 mb-6">Find your perfect accommodation in the Queen of Hills</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-8 items-center">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === c ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'
            }`}>
            {c === 'all' ? 'All' : c}
          </button>
        ))}
        <div className="ml-auto">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field w-auto text-sm">
            <option value="rating">Top Rated</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No stays found matching your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <ServiceCard item={item} type="hotels" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
