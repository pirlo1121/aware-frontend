// export const API_BASE_URL = 'http://localhost:5000/api';
// export const API_BASE_URL = 'https://api.consciousnessmirror.com/api';
// Ruta relativa: Vercel la reenvía al backend real (ver vercel.json).
// Esto hace que la cookie de sesión sea de primera parte para el navegador
// en vez de cross-site, evitando que se bloquee por privacidad (ITP, etc.).
export const API_BASE_URL = '/api';


export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    profile: `${API_BASE_URL}/auth/profile`,
  },
  posts: {
    list: `${API_BASE_URL}/posts`,
    drafts: `${API_BASE_URL}/posts/drafts`,
    bySlug: (slug: string) => `${API_BASE_URL}/posts/${slug}`,
    byId: (id: string) => `${API_BASE_URL}/posts/${id}`,
    publish: (id: string) => `${API_BASE_URL}/posts/${id}/publish`,
  },
  subscribers: {
    list: `${API_BASE_URL}/subscribers`,
    create: `${API_BASE_URL}/subscribers`,
    pause: (id: string) => `${API_BASE_URL}/subscribers/${id}/pause`,
    activate: (id: string) => `${API_BASE_URL}/subscribers/${id}/activate`,
    delete: (id: string) => `${API_BASE_URL}/subscribers/${id}`,
  },
  upload: {
    image: `${API_BASE_URL}/upload`,
  },
} as const;
