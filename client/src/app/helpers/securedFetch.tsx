export default async function securedFetch(url: string, config: RequestInit = {}) {
  return await fetch(url, {
    ...config,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...config.headers,
    }
  });
}
