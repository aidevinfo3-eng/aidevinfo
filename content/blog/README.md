# Blogs

## Primary: Sanity CMS

1. Create a project at https://www.sanity.io/manage
2. Add env vars (see `.env.example`):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
3. Open Studio at `/admin` and create Authors + Blog Posts
4. Set **Published at** and publish — posts appear on `/blogs`

## Legacy markdown (fallback)

If Sanity project ID is empty, the site still loads posts from this folder (`*.md`).
Once Sanity is configured, Sanity becomes the source of truth.
