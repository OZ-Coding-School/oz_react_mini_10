import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const __dirname = path.resolve();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@data", replacement: path.resolve(__dirname, "src/data") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "@store", replacement: path.resolve(__dirname, "src/store") },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "src/constants"),
      },
      { find: "@supabaseJS", replacement: path.resolve(__dirname, "src/supabase") },
    ],
  },
});
