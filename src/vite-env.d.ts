/// <reference types="vite/client" />

declare global {
  interface Window {
    google: typeof google;
    initGoogleMaps: () => void;
  }
}

export {};