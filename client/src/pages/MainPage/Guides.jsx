import { motion } from 'framer-motion';
import { useContentStore } from '../../store/useContentStore';
import { formatPrice } from '../../utils/helpers';
import { HiBadgeCheck, HiStar, HiPhone } from 'react-icons/hi';

export default function Guides() {
  const { services } = useContentStore();
  const items = services.guides;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">Local Guides</h1>
        <p className="text-gray-500 mb-6">Experienced guides to make your Ooty trip unforgettable</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((guide, i) => (
          <motion.div key={guide.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card p-5">
            <div className="flex items-center space-x-4 mb-4">
              <img src={guide.photo} alt={guide.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="flex items-center space-x-1">
                  <h3 className="font-semibold text-gray-900">{guide.name}</h3>
                  {guide.verified && <HiBadgeCheck className="w-5 h-5 text-blue-500" />}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <HiStar className="w-4 h-4 text-amber-500 mr-1" /> {guide.experience} yrs exp
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <p className="text-gray-600"><span className="font-medium">Languages:</span> {guide.languages.join(', ')}</p>
              <div className="flex flex-wrap gap-1">
                {guide.specialization.map((s) => (
                  <span key={s} className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <p className="text-lg font-bold text-gray-900">{formatPrice(guide.price)} <span className="text-sm font-normal text-gray-500">/day</span></p>
              <a href={`tel:${guide.phone}`} className="btn-primary text-sm flex items-center space-x-1">
                <HiPhone className="w-4 h-4" /> <span>Contact</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
