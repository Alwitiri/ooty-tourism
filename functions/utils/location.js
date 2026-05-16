const geoip = require('geoip-lite');

function getLocation(ip) {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return { country: 'Local', city: 'Local Network' };
  }
  const geo = geoip.lookup(ip);
  if (geo) {
    return {
      country: geo.country,
      region: geo.region,
      city: geo.city,
      lat: geo.ll?.[0],
      lon: geo.ll?.[1],
    };
  }
  return { country: 'Unknown', city: 'Unknown' };
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.ip || req.socket?.remoteAddress || '0.0.0.0';
}

module.exports = { getLocation, getClientIp };
