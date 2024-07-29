import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
    server: {
        https: true,
        proxy: {
            '/DEMO': 'https://demo.limousolution.com/'
        }
    },
    plugins: [
        mkcert(),
        react()
    ]
})