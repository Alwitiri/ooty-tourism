import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContentStore } from '../../store/useContentStore';
import ServiceCard from '../../components/ui/ServiceCard';

export default function Places() {
  const { services } = useContentStore();
  const [tab, setTab] = useState('all');

  let items = [...services.places];
  if (tab === 'free') items = items.filter((p) => p.type === 'free');
  if (tab === 'paid') items = items.filter((p) => p.type === 'paid');
  if (tab === 'hidden') items = items.filter((p) => p.isHiddenGem);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'free', label: 'Free Entry' },
    { key: 'paid', label: 'Paid Entry' },
    { key: 'hidden', label: 'Hidden Gems' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">Explore Ooty</h1>
        <p className="text-gray-500 mb-6">Discover breathtaking places, from famous landmarks to hidden valleys</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-8">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t.key ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No places found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <ServiceCard item={item} type="places" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
