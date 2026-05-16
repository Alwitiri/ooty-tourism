import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiUser, HiLogout, HiShieldCheck, HiCreditCard } from 'react-icons/hi';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const links = [
  { to: '/', label: 'Home' },
  { to: '/hotels', label: 'Stays' },
  { to: '/restaurants', label: 'Dine' },
  { to: '/places', label: 'Explore' },
  { to: '/guides', label: 'Guides' },
  { to: '/travel', label: 'Travel' },
  { to: '/shops', label: 'Shop' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const isAdminPage = pathname.startsWith('/admin');
  if (isAdminPage) return null;

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏔️</span>
            <span className="text-xl font-bold font-display text-gray-900">Ooty Escapes</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" className="hidden md:flex items-center space-x-1 px-3 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100">
                    <HiShieldCheck className="w-4 h-4" /><span>Admin</span>
                  </Link>
                )}
                <span className="hidden md:block text-sm text-gray-600">{user.name}</span>
                <button onClick={handleLogout} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100" title="Logout">
                  <HiLogout className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-sm px-4 py-2">Sign In</Link>
            )}
            <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100" onClick={() => setOpen(!open)}>
              {open ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 space-y-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                pathname === l.to ? 'bg-primary-50 text-primary-700' : 'text-gray-600'
              }`}>
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <div className="border-t border-gray-100 pt-2 mt-2 text-sm text-gray-500 px-3">Signed in as {user.name}</div>
              {user.role === 'admin' && <Link to="/admin" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-primary-600">Admin Panel</Link>}
              <button onClick={() => { handleLogout(); setOpen(false); }} className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-500">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-primary-600">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
}
