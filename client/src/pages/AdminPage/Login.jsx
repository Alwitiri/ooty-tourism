import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import toast from 'react-hot-toast';

const fallbackUsers = [
  { email: 'saina@ooty.com', password: 'sai1234', name: 'Saina', role: 'admin' },
  { email: 'alwin@ooty.com', password: 'alwin123', name: 'Alwin', role: 'customer' },
];

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const setAuth = useAuthStore((s) => s.setAuth);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        await useAuthStore.getState().register(name, email, password);
        toast.success('Account created!');
        navigate('/');
      } else {
        await login(email, password);
        toast.success('Welcome back!');
        const user = useAuthStore.getState().user;
        navigate(user?.role === 'admin' ? '/admin' : '/');
      }
    } catch {
      const fb = fallbackUsers.find((u) => u.email === email && u.password === password);
      if (fb) {
        setAuth({ name: fb.name, email: fb.email, role: fb.role }, 'fallback-token');
        toast.success('Signed in (offline)');
        navigate(fb.role === 'admin' ? '/admin' : '/');
      } else {
        toast.error(isSignup ? 'Signup failed — server may be offline' : 'Invalid email or password');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-3xl">🏔️</span>
          <h1 className="text-2xl font-bold font-display text-gray-900 mt-2">Ooty Escapes</h1>
          <p className="text-sm text-gray-500 mt-1">{isSignup ? 'Create your account' : 'Sign in to your account'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Your name" required />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">{loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}</button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          {isSignup ? (
            <>Already have an account? <button onClick={() => setIsSignup(false)} className="text-primary-600 font-medium hover:underline">Sign In</button></>
          ) : (
            <>Don't have an account? <button onClick={() => setIsSignup(true)} className="text-primary-600 font-medium hover:underline">Sign Up</button></>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
          Demo: saina@ooty.com / sai1234 (Admin) &middot; alwin@ooty.com / alwin123 (Customer)
        </div>
      </div>
    </div>
  );
}
