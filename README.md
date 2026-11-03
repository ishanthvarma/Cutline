# Cutline on Vercel

1. Put this folder in a GitHub repo and import it at vercel.com/new (framework: Other).
2. In the project, open Storage, create a Blob store and connect it to the project.
   Vercel adds BLOB_READ_WRITE_TOKEN for you.
3. Redeploy. Open your site, pick a file, get a link.

Local testing: npm i -g vercel, then `vercel link`, `vercel env pull` and `vercel dev`.

Files
- public/index.html  the app
- api/upload.js      issues upload tokens (size limit lives here)
- api/delete.js      deletes a file by its link
