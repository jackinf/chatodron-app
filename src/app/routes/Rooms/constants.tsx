export const ITEM_HEIGHT = 48;

export const roomRoutes = {
  newRoom: () => 'rooms/new',
  chat: (id: string) => `/rooms/${id}/chat`,
  view: (id: string) => `/rooms/${id}`,
  edit: (id: string) => `/rooms/${id}/edit`,
};