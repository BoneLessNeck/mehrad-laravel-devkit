// Canonical Laravel + Inertia entry point used when running under Vite + Laravel PHP.
// In Google AI Studio's Node/Vite preview runtime, src/App.tsx mounts the Starter Kit pages directly.
import '../css/app.css';

export const INERTIA_APP_NAME = import.meta.env.VITE_APP_NAME || 'Mehrad Laravel Devkit';
