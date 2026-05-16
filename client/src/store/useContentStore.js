import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { hotels, restaurants, places, guides, transports, shops } from '../data/services';
import { heroPhotos, galleryPhotos } from '../data/photos';
import { api } from '../api';

const initialHighlights = [
  { id: 1, title: 'Nilgiri Mountain Railway', image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600', description: 'UNESCO World Heritage toy train journey through 16 tunnels and 250 bridges.', sortOrder: 1 },
  { id: 2, title: 'Tea Gardens', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600', description: 'Endless rolling hills of lush green tea plantations stretching to the horizon.', sortOrder: 2 },
  { id: 3, title: 'Doddabetta Peak', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600', description: 'The highest point in the Nilgiris at 2,637 meters above sea level.', sortOrder: 3 },
];

const initialAbouts = [
  { id: 1, type: 'hero', title: 'About Ooty Escapes', content: 'Your gateway to the Queen of Hills — curated travels, stays, and experiences since 2015.', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200', subtitle: 'Discover. Explore. Escape.', sortOrder: 1 },
  { id: 2, type: 'story', title: 'Our Story', content: 'Ooty Escapes was born out of a love for the misty hills and winding roads of the Nilgiris. Today, we help thousands of travelers discover Ooty — from heritage train rides to cozy homestays tucked away in the valleys.', sortOrder: 2 },
  { id: 3, type: 'mission', title: 'Our Mission', content: 'To make every Ooty trip unforgettable by connecting travelers with authentic local experiences.', sortOrder: 3 },
  { id: 4, type: 'vision', title: 'Our Vision', content: 'A world where travel supports local communities and preserves the magic of the hills for generations.', sortOrder: 4 },
  { id: 5, type: 'stat', subtitle: '10+ Years', sortOrder: 5 },
  { id: 6, type: 'stat', subtitle: '5000+ Travelers', sortOrder: 6 },
  { id: 7, type: 'stat', subtitle: '50+ Partners', sortOrder: 7 },
  { id: 8, type: 'team', title: 'Ramesh Kumar', content: 'Founder with 15 years exploring every trail in the Nilgiris.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', subtitle: 'Founder & Lead Guide', sortOrder: 8 },
  { id: 9, type: 'team', title: 'Priya Devi', content: 'Customer Experience specialist ensuring every traveler feels welcome.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', subtitle: 'Customer Experience', sortOrder: 9 },
  { id: 10, type: 'values', title: 'Sustainability', content: 'Eco-friendly travel that respects the environment.', sortOrder: 10 },
  { id: 11, type: 'values', title: 'Authenticity', content: 'Real Ooty experiences, crafted by locals.', sortOrder: 11 },
  { id: 12, type: 'values', title: 'Community', content: 'We reinvest in local communities and conservation.', sortOrder: 12 },
];

const initialServices = { hotels, restaurants, places, guides, transports, shops, highlights: initialHighlights, abouts: initialAbouts };
const initialPhotos = { hero: heroPhotos, gallery: galleryPhotos };

export const useContentStore = create(
  persist(
    (set, get) => ({
      photos: initialPhotos,
      services: initialServices,
      itinerary: [],
      loading: false,

      setPhotos: (section, photos) =>
        set((state) => ({ photos: { ...state.photos, [section]: photos } })),

      addPhoto: (section, photo) =>
        set((state) => ({
          photos: { ...state.photos, [section]: [...state.photos[section], { ...photo, id: Date.now() }] },
        })),

      updatePhoto: (section, id, data) =>
        set((state) => ({
          photos: {
            ...state.photos,
            [section]: state.photos[section].map((p) => (p.id === id ? { ...p, ...data } : p)),
          },
        })),

      removePhoto: (section, photoId) =>
        set((state) => ({
          photos: {
            ...state.photos,
            [section]: state.photos[section].filter((p) => p.id !== photoId),
          },
        })),

      fetchFromApi: async () => {
        set({ loading: true });
        try {
          const data = await api.fetchAllServices();
          const merged = { ...get().services };
          let changed = false;
          Object.entries(data).forEach(([type, items]) => {
            if (items) { merged[type] = items; changed = true; }
          });
          if (changed) set({ services: merged });
        } catch { /* use localStorage data */ }
        set({ loading: false });
      },

      updateService: (type, id, data) =>
        set((state) => ({
          services: {
            ...state.services,
            [type]: state.services[type].map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
        })),

      addService: (type, data) =>
        set((state) => ({
          services: {
            ...state.services,
            [type]: [{ ...data, id: data.id || Date.now() }, ...state.services[type]],
          },
        })),

      deleteService: (type, id) =>
        set((state) => ({
          services: {
            ...state.services,
            [type]: state.services[type].filter((item) => item.id !== id),
          },
        })),

      addToItinerary: (item) =>
        set((state) => ({ itinerary: [...state.itinerary, item] })),

      removeFromItinerary: (id) =>
        set((state) => ({
          itinerary: state.itinerary.filter((item) => item.id !== id),
        })),

      getService: (type, id) => {
        return get().services[type]?.find((item) => String(item.id) === String(id));
      },

      resetToDefaults: () =>
        set({ services: initialServices, photos: initialPhotos, itinerary: [] }),
    }),
    {
      name: 'ooty-admin-storage',
      version: 1,
      migrate: (persisted) => ({
        ...persisted,
        services: { ...initialServices, ...persisted.services },
      }),
    }
  )
);
