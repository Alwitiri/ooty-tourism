import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || '/api';
const client = axios.create({ baseURL: BASE, timeout: 8000 });

function mapDoc(doc) {
  const obj = { ...doc, id: doc._id };
  delete obj._id;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
}

function mapDocs(docs) { return docs.map(mapDoc); }

const serviceTypes = ['hotels', 'restaurants', 'places', 'guides', 'transports', 'shops', 'highlights', 'abouts'];

const endpoints = {
  hotels: '/hotels',
  restaurants: '/restaurants',
  places: '/places',
  guides: '/guides',
  transports: '/transports',
  shops: '/shops',
  highlights: '/highlights',
  abouts: '/abouts',
  photos: '/photos',
};

async function getAll(type) {
  const { data } = await client.get(endpoints[type]);
  return mapDocs(data.data);
}

async function getById(type, id) {
  const { data } = await client.get(`${endpoints[type]}/${id}`);
  return mapDoc(data.data);
}

async function create(type, body) {
  const payload = { ...body };
  delete payload.id;
  const { data } = await client.post(endpoints[type], payload);
  return mapDoc(data.data);
}

async function update(type, id, body) {
  const payload = { ...body };
  delete payload.id;
  const { data } = await client.put(`${endpoints[type]}/${id}`, payload);
  return mapDoc(data.data);
}

async function remove(type, id) {
  await client.delete(`${endpoints[type]}/${id}`);
}

async function fetchAllServices() {
  const results = await Promise.allSettled(serviceTypes.map((t) => getAll(t)));
  const result = {};
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') result[serviceTypes[i]] = r.value;
    else result[serviceTypes[i]] = null;
  });
  return result;
}

export const api = { getAll, getById, create, update, remove, fetchAllServices, serviceTypes, endpoints };
