import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bobbe.rs',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
});
