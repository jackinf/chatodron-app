export const routePaths = {
  login: '/login',
};

export const roomRoutes = {
  newRoom: () => 'rooms/new',
  chat: (id: string) => `/rooms/${id}/chat`,
  view: (id: string) => `/rooms/${id}`,
  edit: (id: string) => `/rooms/${id}/edit`,
};