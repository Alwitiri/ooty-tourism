import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useContentStore } from '../../store/useContentStore';
import { moduleConfigs } from '../../data/fieldConfigs';
import { api } from '../../api';
import { sanitizeObject } from '../../utils/sanitize';
import AdminTable from '../../components/admin/AdminTable';
import AdminForm from '../../components/admin/AdminForm';
import PhotoManager from '../../components/admin/PhotoManager';
import { HiRefresh } from 'react-icons/hi';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('photos');
  const { services, photos, addService, updateService, deleteService, resetToDefaults } = useContentStore();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out');
    navigate('/login');
  };

  const configs = [
    { key: 'photos', label: 'Photos', icon: '📸', desc: 'Hero & gallery images' },
    ...Object.entries(moduleConfigs).map(([key, cfg]) => ({
      key, label: cfg.label, icon: cfg.icon, desc: `${cfg.label} management`,
    })),
  ];

  const moduleKeys = Object.keys(moduleConfigs);
  const serviceCounts = {
    photos: photos.hero.length + photos.gallery.length,
    ...Object.fromEntries(moduleKeys.map((k) => [k, (services[k] || []).length])),
  };

  const handleEdit = (item) => {
    const flat = { ...item };
    if (item.driver) {
      flat.driverName = item.driver.name || '';
      flat.driverRating = item.driver.rating || '';
    }
    delete flat.driver;
    setEditing(flat);
    setShowForm(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete "${item.name || item.title || item.id}"? This cannot be undone.`)) {
      deleteService(activeModule, item.id);
      toast.success('Deleted');
      api.remove(activeModule, item.id).catch(() => {});
    }
  };

  const handleSave = async (formData) => {
    const data = sanitizeObject(formData);
    if (activeModule === 'transports') {
      data.driver = data.driverName ? { name: data.driverName, rating: data.driverRating || 0, trips: data.driverTrips || 0 } : null;
      delete data.driverName;
      delete data.driverRating;
      delete data.driverTrips;
    }
    if (editing) {
      updateService(activeModule, editing.id, data);
      api.update(activeModule, editing.id, data).then(() => toast.success('Updated')).catch(() => toast.success('Updated (offline)'));
    } else {
      const tempId = Date.now();
      addService(activeModule, { ...data, id: tempId });
      toast.success('Added');
      api.create(activeModule, data).then((item) => {
        if (item?.id) updateService(activeModule, tempId, { ...item, _tempId: undefined });
      }).catch(() => toast('Server unavailable — saved locally', { icon: '⚠️' }));
    }
    setShowForm(false);
    setEditing(null);
  };

  const renderContent = () => {
    if (activeModule === 'photos') return <PhotoManager />;

    const cfg = moduleConfigs[activeModule];
    if (!cfg) return null;

    const items = services[activeModule] || [];

    const enhancedColumns = cfg.columns.map((col) => {
      if (col.key === 'price' || col.key === 'costForTwo' || col.key === 'entryFee' || col.key === 'priceHalfDay' || col.key === 'priceFullDay') {
        return { ...col, render: (item) => `₹${(item[col.key] ?? 0).toLocaleString('en-IN')}` };
      }
      if (col.key === 'rating') {
        return { ...col, render: (item) => `${'★'.repeat(Math.round(item.rating || 0))} ${item.rating?.toFixed(1)}` };
      }
      if (col.key === 'isHiddenGem') {
        return { ...col, render: (item) => item.isHiddenGem ? <span className="text-purple-600 font-medium">Yes</span> : 'No' };
      }
      if (col.key === 'verified') {
        return { ...col, render: (item) => item.verified ? <span className="text-green-600 font-medium">Yes</span> : 'No' };
      }
      if (col.key === 'cuisine') {
        return { ...col, render: (item) => item.cuisine?.join(', ') || '-' };
      }
      if (col.key === 'type' && activeModule === 'places') {
        return { ...col, render: (item) => <span className={`capitalize ${item.type === 'free' ? 'text-green-600' : 'text-amber-600'}`}>{item.type}</span> };
      }
      return col;
    });

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold font-display text-gray-900">{cfg.icon} {cfg.label}</h2>
            <p className="text-sm text-gray-500">{items.length} items</p>
          </div>
          <button onClick={() => { setEditing(null); setShowForm(true); }}
            className="btn-primary text-sm">+ Add New</button>
        </div>
        <AdminTable
          columns={enhancedColumns}
          data={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchPlaceholder={`Search ${cfg.label.toLowerCase()}...`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col flex-shrink-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏔️</span>
              <span className="font-bold font-display text-gray-900">Admin</span>
            </div>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto">
            {configs.map((m) => (
              <button key={m.key} onClick={() => setActiveModule(m.key)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeModule === m.key ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                <span>{m.icon}</span>
                <span className="flex-1 text-left">{m.label}</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{serviceCounts[m.key]}</span>
              </button>
            ))}
          </nav>
          <div className="space-y-1 pt-4 border-t border-gray-100 mt-4">
            <button onClick={resetToDefaults}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-sm text-amber-600 hover:bg-amber-50 transition-colors">
              <HiRefresh className="w-4 h-4" /><span>Reset Defaults</span>
            </button>
            <button onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors">
              Logout
            </button>
            {user && <p className="text-xs text-gray-400 px-3 pt-1">Signed in as {user.name}</p>}
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-x-auto">
          {renderContent()}
        </main>
      </div>

      {showForm && activeModule !== 'photos' && (
        <AdminForm
          fields={moduleConfigs[activeModule]?.fields || []}
          initial={editing}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(null); }}
          title={editing ? `Edit ${moduleConfigs[activeModule]?.label.slice(0, -1) || 'Item'}` : `Add New ${moduleConfigs[activeModule]?.label.slice(0, -1) || 'Item'}`}
        />
      )}
    </div>
  );
}
