import { PaginationType } from "./types";
import securedFetch from '../helpers/securedFetch';

export class RoomApiAddPayload {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class RoomApiUpdatePayload {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {}
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;
export default class RoomApi {

  static async getList({ page, limit }: PaginationType = {}) {
    const response = await securedFetch(`/rooms/search?page=${page || DEFAULT_PAGE}&limit=${limit || DEFAULT_LIMIT}`);
    return await response.json();
  }

  static async getSingle(id: string) {
    const response = await securedFetch(`/rooms/${id}`);
    return await response.json();
  }

  static async getLastNMessages(room: string, n: number) {
    const response = await securedFetch(`/messages/get-last-n?room=${room}&n=${n}`);
    return await response.json();
  }

  static async add(room: RoomApiAddPayload) {
    const response = await securedFetch("/rooms/create", {
      method: "POST",
      body: JSON.stringify(room),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }

  static async update(payload: RoomApiUpdatePayload) {
    const response = await securedFetch(`/rooms/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }

  static async remove(id: string) {
    const response = await securedFetch(`/rooms/${id}`, { method: "DELETE" });
    return await response.json();
  }

}
