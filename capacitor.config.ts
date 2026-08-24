import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.homeworkout.app',
  appName: 'Home Workout',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
