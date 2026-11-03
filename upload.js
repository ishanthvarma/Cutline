import { handleUpload } from '@vercel/blob/client';

// The browser asks this route for a one-time upload token, then sends the
// file straight to Vercel Blob. This avoids the 4.5 MB request limit on
// serverless functions, so large videos work.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  try {
    const json = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async () => ({
        maximumSizeInBytes: 500 * 1024 * 1024, // change the size limit here
        addRandomSuffix: true,                  // makes every link unguessable
        // allowedContentTypes: ['video/*', 'image/*', 'application/pdf'],
      }),
      onUploadCompleted: async ({ blob }) => {
        console.log('Uploaded', blob.url);
      },
    });
    res.status(200).json(json);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
