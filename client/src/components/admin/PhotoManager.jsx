import { useState } from 'react';
import { useContentStore } from '../../store/useContentStore';
import { api } from '../../api';
import toast from 'react-hot-toast';
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi';

export default function PhotoManager() {
  const { photos, addPhoto, updatePhoto, removePhoto } = useContentStore();
  const [section, setSection] = useState('hero');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');

  const allPhotos = photos.hero.concat(photos.gallery);

  const handleAdd = () => {
    if (!url.trim()) return toast.error('Image URL is required');
    const payload = { url: url.trim(), caption: caption.trim(), section };
    addPhoto(section, payload);
    api.create('photos', payload).catch(() => {});
    setUrl(''); setCaption('');
    setShowForm(false);
    toast.success('Photo added');
  };

  const handleEdit = (photo) => {
    setEditing(photo);
    setUrl(photo.url);
    setCaption(photo.caption || '');
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (!url.trim()) return toast.error('Image URL is required');
    updatePhoto(editing.section, editing.id, { url: url.trim(), caption: caption.trim() });
    api.update('photos', editing.id, { url: url.trim(), caption: caption.trim() }).catch(() => {});
    setEditing(null); setUrl(''); setCaption('');
    setShowForm(false);
    toast.success('Photo updated');
  };

  const handleDelete = (photo) => {
    removePhoto(photo.section, photo.id);
    api.remove('photos', photo.id).catch(() => {});
    toast.success('Photo deleted');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold font-display text-gray-900">Photo Manager</h2>
          <p className="text-sm text-gray-500">Total: {allPhotos.length} · Hero: {photos.hero.length} · Gallery: {photos.gallery.length}</p>
        </div>
        <button onClick={() => { setEditing(null); setUrl(''); setCaption(''); setShowForm(true); }}
          className="btn-primary text-sm flex items-center space-x-1">
          <HiPlus className="w-4 h-4" /><span>Add Photo</span>
        </button>
      </div>

      <div className="flex space-x-2 mb-6">
        {['hero', 'gallery'].map((s) => (
          <button key={s} onClick={() => setSection(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              section === s ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'
            }`}>
            {s} ({photos[s].length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {photos[section].map((p) => (
          <div key={p.id} className="group relative rounded-xl overflow-hidden border border-gray-200 bg-white">
            <img src={p.url} alt={p.caption} className="w-full h-28 object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/200x150?text=Invalid+URL' }} />
            <div className="p-2">
              <p className="text-xs text-gray-600 truncate">{p.caption || 'No caption'}</p>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button onClick={() => handleEdit(p)} className="p-2 bg-white rounded-lg text-blue-600 hover:bg-blue-50">
                <HiPencil className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(p)} className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50">
                <HiTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {photos[section].length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">No photos in {section} section</div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={(e) => { if (e.target === e.currentTarget) { setShowForm(false); setEditing(null); } }}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <h3 className="text-lg font-bold font-display text-gray-900 mb-4">{editing ? 'Edit Photo' : 'Add Photo'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="input-field" placeholder="https://..." />
              </div>
              {url && <img src={url} alt="preview" className="w-full h-32 object-cover rounded-lg" onError={(e) => { e.target.style.display = 'none' }} />}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="input-field" placeholder="Photo description..." />
              </div>
              {!editing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <select value={section} onChange={(e) => setSection(e.target.value)} className="input-field">
                    <option value="hero">Hero Carousel</option>
                    <option value="gallery">Gallery</option>
                  </select>
                </div>
              )}
              <div className="flex justify-end space-x-3 pt-2">
                <button onClick={() => { setShowForm(false); setEditing(null); }} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={editing ? handleSaveEdit : handleAdd} className="btn-primary">{editing ? 'Save Changes' : 'Add Photo'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
