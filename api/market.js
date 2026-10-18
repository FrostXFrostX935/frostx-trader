
const ALLOWED = new Set([
  'EUR/USD', 'GBP/USD', 'AUD/USD',
  'XAU/USD', 'XAG/USD', 'WTI/USD'
]);

const INTERVALS = new Set([
  '1min', '5min', '15min', '1h', '4h', '1day'
]);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const symbol = String(req.query.symbol || '').toUpperCase();
  const interval = String(req.query.interval || '5min');
  const key = process.env.TWELVEDATA_API_KEY;

  if (!key) {
    return res.status(503).json({
      error: 'Add TWELVEDATA_API_KEY in Vercel Environment Variables.'
    });
  }

  if (!ALLOWED.has(symbol) || !INTERVALS.has(interval)) {
    return res.status(400).json({ error: 'Unsupported symbol or interval.' });
  }

  try {
    const url = new URL('https://api.twelvedata.com/time_series');
    url.searchParams.set('symbol', symbol);
    url.searchParams.set('interval', interval);
    url.searchParams.set('outputsize', '300');
    url.searchParams.set('timezone', 'UTC');
    url.searchParams.set('apikey', key);

    const upstream = await fetch(url.toString());
    const body = await upstream.json();

    if (!upstream.ok || body.status === 'error' || !Array.isArray(body.values)) {
      return res.status(502).json({
        error: body.message || body.code || 'Market data unavailable.'
      });
    }

    return res.status(200).json({
      meta: body.meta,
      values: body.values
    });
  } catch {
    return res.status(502).json({
      error: 'Market data provider unavailable.'
    });
  }
}
