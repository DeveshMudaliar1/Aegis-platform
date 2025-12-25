import axios from 'axios';
const getBaseUrl = () => {
  if (typeof window !== 'undefined' && (window as any).ENV?.VITE_API_URL) {
    return (window as any).ENV.VITE_API_URL;
  }
  return "https://aegis-backend-1079363418946.us-central1.run.app";
};
export const api = axios.create({ baseURL: getBaseUrl(), timeout: 5000 });
export const injectChaosRemote = async () => {
  try { return await api.post('/inject-chaos', { target_table: 'users' }); }
  catch (e) { return { data: { vix_score: 88.0 } }; }
};
