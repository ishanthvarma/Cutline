import { del } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const url = req.body && req.body.url;
  let ok = false;
  try { ok = new URL(url).hostname.endsWith('.public.blob.vercel-storage.com'); } catch {}
  if (!ok) return res.status(400).json({ error: 'Not a Cutline file' });
  try {
    await del(url);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
