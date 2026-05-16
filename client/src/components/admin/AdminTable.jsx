import { useState, useMemo } from 'react';
import { HiPencil, HiTrash, HiSearch, HiSortAscending, HiSortDescending } from 'react-icons/hi';

export default function AdminTable({ columns, data, onEdit, onDelete, searchPlaceholder }) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    let items = [...data];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((item) =>
        columns.some((c) => String(item[c.key] || '').toLowerCase().includes(q))
      );
    }
    if (sortKey) {
      items.sort((a, b) => {
        const av = a[sortKey] ?? '';
        const bv = b[sortKey] ?? '';
        const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return items;
  }, [data, search, sortKey, sortDir]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-md">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder || 'Search...'}
            className="input-field pl-10" />
        </div>
        <span className="text-sm text-gray-500">{filtered.length} / {data.length} items</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                  onClick={() => col.sortable !== false && handleSort(col.key)}>
                  <div className="flex items-center space-x-1">
                    <span>{col.label}</span>
                    {sortKey === col.key && (
                      sortDir === 'asc' ? <HiSortAscending className="w-4 h-4 text-primary-600" /> : <HiSortDescending className="w-4 h-4 text-primary-600" />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="px-4 py-12 text-center text-gray-500">No items found</td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(item) : <span className="line-clamp-1">{item[col.key] ?? '-'}</span>}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button onClick={() => onEdit(item)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                        <HiPencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(item)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
