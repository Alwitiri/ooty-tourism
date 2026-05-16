import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContentStore } from './store/useContentStore';
import { useAuthStore } from './store/useAuthStore';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Layout from './components/layout/Layout';
import Home from './pages/MainPage/Home';
import Hotels from './pages/MainPage/Hotels';
import Restaurants from './pages/MainPage/Restaurants';
import Places from './pages/MainPage/Places';
import Guides from './pages/MainPage/Guides';
import Travels from './pages/MainPage/Travels';
import Shops from './pages/MainPage/Shops';
import About from './pages/MainPage/About';
import Login from './pages/AdminPage/Login';
import AdminDashboard from './pages/AdminPage/Dashboard';

function AdminGuard({ children }) {
  const user = useAuthStore((s) => s.user);
  if (!user || user.role !== 'admin') return <Navigate to="/login" />;
  return children;
}

export default function App() {
  const fetchFromApi = useContentStore((s) => s.fetchFromApi);
  const loading = useContentStore((s) => s.loading);

  useEffect(() => { fetchFromApi(); }, [fetchFromApi]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/hotels" element={<Layout><Hotels /></Layout>} />
      <Route path="/restaurants" element={<Layout><Restaurants /></Layout>} />
      <Route path="/places" element={<Layout><Places /></Layout>} />
      <Route path="/guides" element={<Layout><Guides /></Layout>} />
      <Route path="/travel" element={<Layout><Travels /></Layout>} />
      <Route path="/shops" element={<Layout><Shops /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
      <Route path="*" element={
        <Layout>
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
              <p className="text-gray-500 mb-6">Page not found</p>
              <a href="/" className="btn-primary">Go Home</a>
            </div>
          </div>
        </Layout>
      } />
    </Routes>
    </ErrorBoundary>
  );
}
