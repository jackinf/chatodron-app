import {RoomType} from "../types/Room.type";

export default class RoomApi {

  static async getList() {
    const response = await fetch("/rooms/search");
    return await response.json();
  }

  static async getSingle(id: string) {
    const response = await fetch(`/rooms/${id}`);
    return await response.json();
  }

  static async add(room: RoomType) {
    const response = await fetch("/rooms/create", {
      method: "POST",
      body: JSON.stringify(room),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }

  static async update(id: string, room: RoomType) {
    const response = await fetch(`/rooms/${id}`, {
      method: "PUT",
      body: JSON.stringify(room),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }

  static async remove(id: string) {
    const response = await fetch(`/rooms/${id}`, { method: "DELETE" });
    return await response.json();
  }

}
