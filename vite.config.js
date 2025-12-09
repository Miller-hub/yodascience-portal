import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 👇 因為你有買網址，所以這裡必須改成「根目錄」
  base: '/', 
})
