import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🏔️</span>
              <span className="text-lg font-bold font-display text-white">Ooty Escapes</span>
            </div>
            <p className="text-sm leading-relaxed">Discover the Queen of Hills — your ultimate guide to Ooty's最美的 stays, dining, places, and experiences.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link to="/hotels" className="block hover:text-white">Stays</Link>
              <Link to="/restaurants" className="block hover:text-white">Dine</Link>
              <Link to="/places" className="block hover:text-white">Explore</Link>
              <Link to="/guides" className="block hover:text-white">Guides</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">More</h4>
            <div className="space-y-2 text-sm">
              <Link to="/travel" className="block hover:text-white">Travel</Link>
              <Link to="/shops" className="block hover:text-white">Shop</Link>
              <Link to="/admin" className="block hover:text-white">Admin Panel</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <p>Ooty, Tamil Nadu</p>
              <p>info@ootyescapes.com</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; 2026 Ooty Escapes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
