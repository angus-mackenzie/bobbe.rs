import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bobbe.rs',
  output: 'static',
  redirects: {
    '/join': {
      status: 302,
      destination: 'https://docs.google.com/forms/d/e/1FAIpQLSfbzz7yQetvloySsfVgQchXZo-FlYecqimwJ3v_EBDERDB-bg/viewform',
    },
  },
  vite: { plugins: [tailwindcss()] },
});
