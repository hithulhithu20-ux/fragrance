// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],

//   server: {
//     proxy: {
//       '/api': {
//         target:
//           'https://dilkacenter-eqagg4ame5dqdfae.canadacentral-01.azurewebsites.net',
//         changeOrigin: true,
//         secure: true,
//       },
//     },
//   },
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});