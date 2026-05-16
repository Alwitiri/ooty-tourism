import { Link } from 'react-router-dom';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useContentStore } from '../../store/useContentStore';

const typeConfig = {
  hotels: { link: '/hotels', icon: '🏨' },
  restaurants: { link: '/restaurants', icon: '🍽️' },
  places: { link: '/places', icon: '📍' },
  guides: { link: '/guides', icon: '🧭' },
  transports: { link: '/travel', icon: '🚗' },
  shops: { link: '/shops', icon: '🛍️' },
};

export default function ServiceCard({ item, type, basePath }) {
  const { itinerary, addToItinerary, removeFromItinerary } = useContentStore();
  const inItinerary = itinerary.some((i) => i.id === item.id && i.type === type);
  const cfg = typeConfig[type] || {};

  const toggleItinerary = (e) => {
    e.preventDefault();
    if (inItinerary) removeFromItinerary(item.id);
    else addToItinerary({ ...item, type });
  };

  const title = item.name || item.title || '';
  const image = item.image || item.photo || item.url || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400';

  return (
    <Link to={`/${cfg.link || basePath || type}/${item.id}`} className="card group block overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <button onClick={toggleItinerary}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all">
          {inItinerary ? <HiHeart className="w-5 h-5 text-red-500" /> : <HiOutlineHeart className="w-5 h-5 text-gray-600" />}
        </button>
        {item.category && (
          <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">{item.category}</span>
        )}
        {item.type === 'free' && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">Free</span>
        )}
        {item.type === 'paid' && (
          <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">₹{item.entryFee}</span>
        )}
        {item.isHiddenGem && (
          <span className="absolute top-3 right-12 bg-purple-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">Hidden Gem</span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">{title}</h3>
          {item.rating && (
            <span className="flex items-center text-sm text-amber-500 ml-2 flex-shrink-0">
              ★ {item.rating}
            </span>
          )}
        </div>
        {item.description && <p className="text-sm text-gray-500 line-clamp-2 mb-2">{item.description}</p>}
        {item.shortDesc && <p className="text-sm text-gray-500 line-clamp-2 mb-2">{item.shortDesc}</p>}
        {item.price && (
          <p className="text-lg font-bold text-gray-900">{item.price}</p>
        )}
        {item.pricePerNight && (
          <p className="text-lg font-bold text-gray-900">₹{item.pricePerNight.toLocaleString('en-IN')} <span className="text-sm font-normal text-gray-500">/night</span></p>
        )}
        {item.pricePerPerson && (
          <p className="text-lg font-bold text-gray-900">₹{item.pricePerPerson.toLocaleString('en-IN')} <span className="text-sm font-normal text-gray-500">/person</span></p>
        )}
        {item.costForTwo && (
          <p className="text-sm text-gray-500">₹{item.costForTwo} for two</p>
        )}
        {item.cuisine && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.cuisine.map((c, i) => (
              <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{c}</span>
            ))}
          </div>
        )}
        {item.amenities && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.amenities.slice(0, 3).map((a, i) => (
              <span key={i} className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded-full">{a}</span>
            ))}
            {item.amenities.length > 3 && (
              <span className="text-xs text-gray-400">+{item.amenities.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
