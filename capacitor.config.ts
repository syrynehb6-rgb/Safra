import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.safra.travel',
  appName: 'SAFRA',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
