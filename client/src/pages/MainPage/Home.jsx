import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContentStore } from '../../store/useContentStore';
import HeroCarousel from '../../components/ui/HeroCarousel';

const features = [
  { icon: '🏨', title: 'Stays', desc: 'Hotels, resorts & homestays', link: '/hotels', color: 'bg-blue-50' },
  { icon: '🍽️', title: 'Dine', desc: 'Restaurants & cafes', link: '/restaurants', color: 'bg-orange-50' },
  { icon: '📍', title: 'Explore', desc: 'Places & attractions', link: '/places', color: 'bg-green-50' },
  { icon: '🧭', title: 'Guides', desc: 'Local tour guides', link: '/guides', color: 'bg-purple-50' },
  { icon: '🚗', title: 'Travel', desc: 'Rentals & transport', link: '/travel', color: 'bg-amber-50' },
  { icon: '🛍️', title: 'Shop', desc: 'Tea, spices & souvenirs', link: '/shops', color: 'bg-pink-50' },
];

export default function Home() {
  const { services } = useContentStore();
  const highlights = [...services.highlights].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <div>
      <HeroCarousel />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-3">Everything You Need</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Plan your perfect Ooty getaway — from cozy stays and delicious food to hidden gems and trusted guides.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={f.link} className={`${f.color} rounded-2xl p-6 text-center block hover:shadow-md transition-shadow`}>
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-semibold text-gray-900 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-3 text-center">Ooty Highlights</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">Experience the magic of the Nilgiris through these iconic attractions.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden bg-gray-50">
                <img src={h.image} alt={h.title} className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{h.title}</h3>
                  <p className="text-sm text-gray-500">{h.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-10 md:p-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Ready for the Hills?</h2>
          <p className="text-primary-100 mb-8 max-w-lg mx-auto">Start planning your Ooty adventure today. From hidden valleys to heritage trains, every moment counts.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/places" className="bg-white text-primary-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">Explore Now</Link>
            <Link to="/travel" className="bg-white/20 backdrop-blur-sm border-2 border-white/30 px-8 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors">Plan Trip</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
