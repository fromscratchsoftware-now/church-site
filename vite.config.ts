import { defineConfig, loadEnv } from "vite";  
import react from "@vitejs/plugin-react-swc";  
import tailwindcss from "@tailwindcss/vite";  
import path from "path";  

export default defineConfig(({ mode }) => {  
  const env = loadEnv(mode, process.cwd(), "");
  // IMPORTANT: For deployment at https://church.fromscratchsoftware.net/1
  // set VITE_BASE_PATH=/1/ during build so assets and router work under that subpath.
  const base = env.VITE_BASE_PATH || "/";

  return {  
    base,
    server: {  
      allowedHosts: [  
        '.coderick.ai',  
        '.coderick.net',  
        '.sg-host.com',  
        '.staging.vibe-platform.net',  
        '.vibe-platform.net',  
      ],  
      cors: true,  
    },  
    plugins: [  
      react(),  
      tailwindcss(),  
    ],  
    resolve: {  
      alias: {  
        "@": path.resolve(__dirname, "./src"),  
      },  
    },  
  };  
});
