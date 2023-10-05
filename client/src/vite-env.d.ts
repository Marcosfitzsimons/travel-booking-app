/// <reference types="vite/client" />

declare module 'lucide-react'
interface ImportMetaEnv {
    VITE_REACT_APP_GOOGLE_PLACES_API: string;
    VITE_REACT_APP_API_BASE_ENDPOINT: string;
    // Add other environment variables here if you have more.
}
