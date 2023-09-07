import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  base: '',
  root: 'src',
  build: { outDir: '../dist', 
          emptyOutDir: true ,
          rollupOptions: {
            external: ["react", "react-router", "react-router-dom", "react-redux"],
            output: {
              globals: {
                react: "React",
              },
            },
          },  
        
        
        },
  plugins:[react()],
  
})




