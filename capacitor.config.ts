import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.safra.travel',
  appName: 'SAFRA',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
