import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { heroPhotos } from '../../data/photos';

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % heroPhotos.length), 5000);
    return () => clearInterval(timer);
  }, []);

  if (!heroPhotos.length) return null;

  const photo = heroPhotos[current];

  return (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {heroPhotos.map((p, i) => (
        <div key={p.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-primary-300 font-medium text-sm md:text-base mb-2">Welcome to</p>
            <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-4">Discover the Queen of Hills</h1>
            <p className="text-gray-200 text-lg mb-8">Explore misty mountains, lush tea gardens, and timeless charm in the heart of the Nilgiris.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/places" className="btn-primary text-lg px-8 py-3">Explore Places</Link>
              <Link to="/hotels" className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 px-8 py-3 rounded-xl font-medium hover:bg-white/30 transition-all">Book Stays</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {heroPhotos.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white w-8' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}
