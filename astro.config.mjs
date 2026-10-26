// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Static by default; server routes opt in with `export const prerender = false`.
  output: 'static',
  // Hide the floating dev toolbar (the black bar at the bottom in dev).
  devToolbar: { enabled: false },
  adapter: vercel({
    // Bundle the delivered PDFs (outside /public) into the serverless function
    // so the signed download route can read them at runtime.
    includeFiles: ['./private/menopausia/es', './private/menopausia/pt', './private/menopausia/pl'],
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
