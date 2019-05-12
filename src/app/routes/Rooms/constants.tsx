export const ITEM_HEIGHT = 48;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_PAGE = 0;
export const DEFAULT_TOTAL = 0;

export const roomRoutes = {
  chat: (id: string) => `/rooms/${id}/chat`,
  view: (id: string) => `/rooms/${id}`,
  edit: (id: string) => `/rooms/${id}/edit`,
};