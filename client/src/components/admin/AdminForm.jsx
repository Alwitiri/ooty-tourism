import { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';
import { sanitizeObject } from '../../utils/sanitize';

export default function AdminForm({ fields, initial, onSave, onClose, title }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (initial) {
      const defaults = {};
      fields.forEach((f) => { defaults[f.key] = initial[f.key] ?? f.default ?? ''; });
      setForm(defaults);
    } else {
      const defaults = {};
      fields.forEach((f) => { defaults[f.key] = f.default ?? ''; });
      setForm(defaults);
    }
  }, [initial, fields]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(sanitizeObject(form));
  };

  const renderField = (field) => {
    const val = form[field.key] ?? '';

    if (field.type === 'textarea') {
      return (
        <textarea value={val} onChange={(e) => set(field.key, e.target.value)}
          className="input-field" rows={3} placeholder={field.placeholder} />
      );
    }

    if (field.type === 'number') {
      return (
        <input type="number" value={val} onChange={(e) => set(field.key, e.target.value === '' ? '' : Number(e.target.value))}
          className="input-field" placeholder={field.placeholder} min={field.min} max={field.max} step={field.step} />
      );
    }

    if (field.type === 'select') {
      return (
        <select value={val} onChange={(e) => set(field.key, e.target.value)} className="input-field">
          <option value="">Select...</option>
          {field.options?.map((o) => (
            <option key={o.value || o} value={o.value || o}>{o.label || o}</option>
          ))}
        </select>
      );
    }

    if (field.type === 'multi-select') {
      const arrVal = Array.isArray(val) ? val : [];
      return (
        <div className="space-y-1">
          <div className="flex flex-wrap gap-1 mb-1">
            {arrVal.map((v, i) => (
              <span key={i} className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded-full flex items-center space-x-1">
                <span>{v}</span>
                <button type="button" onClick={() => set(field.key, arrVal.filter((_, j) => j !== i))} className="hover:text-red-500">&times;</button>
              </span>
            ))}
          </div>
          <div className="flex space-x-1">
            <input type="text" id={`new-${field.key}`} placeholder={`Add ${field.label.toLowerCase()}...`}
              className="input-field flex-1 text-sm" onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const input = document.getElementById(`new-${field.key}`);
                  const val2 = input.value.trim();
                  if (val2 && !arrVal.includes(val2)) {
                    set(field.key, [...arrVal, val2]);
                    input.value = '';
                  }
                }
              }} />
            <button type="button" onClick={() => {
              const input = document.getElementById(`new-${field.key}`);
              const val2 = input.value.trim();
              if (val2 && !arrVal.includes(val2)) {
                set(field.key, [...arrVal, val2]);
                input.value = '';
              }
            }} className="px-3 py-2 bg-primary-600 text-white rounded-xl text-sm hover:bg-primary-700">Add</button>
          </div>
        </div>
      );
    }

    if (field.type === 'image') {
      return (
        <div className="space-y-2">
          <input type="text" value={val} onChange={(e) => set(field.key, e.target.value)}
            className="input-field" placeholder="Image URL..." />
          {val && <img src={val} alt="preview" className="w-24 h-16 object-cover rounded-lg border" onError={(e) => { e.target.style.display = 'none' }} />}
        </div>
      );
    }

    if (field.type === 'boolean') {
      return (
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" checked={!!val} onChange={(e) => set(field.key, e.target.checked)}
            className="w-4 h-4 text-primary-600 rounded" />
          <span className="text-sm text-gray-600">{field.label}</span>
        </label>
      );
    }

    return (
      <input type={field.type || 'text'} value={val} onChange={(e) => set(field.key, e.target.value)}
        className="input-field" placeholder={field.placeholder} />
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold font-display text-gray-900">{title || (initial ? 'Edit Item' : 'Add New Item')}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><HiX className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              {field.type !== 'boolean' && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
              )}
              {renderField(field)}
            </div>
          ))}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium">Cancel</button>
            <button type="submit" className="btn-primary">{initial ? 'Save Changes' : 'Add Item'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
