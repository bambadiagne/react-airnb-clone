import axios from "axios";
import { API_URL } from "../constantes";
class RoomService {
  createNewRoom(roomData) {
    return new Promise((resolve, reject) => {
      axios
        .post(API_URL + "rooms", roomData)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllRooms() {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + "rooms")
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getAllRoomsByLandlord(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + `rooms/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getSingleRoom(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + `room/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  deleteSingleRoom(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(API_URL + `room/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  UpdateSingleRoom(id, roomData) {
    return new Promise((resolve, reject) => {
      axios
        .put(API_URL + `room/${id}`, roomData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async getSingleRoomByQuery(name, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const allroom = await this.getAllrooms();
        if (allroom) {
          const room = allroom.find(
            (room) => room.username === name && room.password === password
          );
          if (room) {
            resolve(room);
          } else {
            reject("Locateur introuvable");
          }
        } else {
          reject("Aucun Locateur");
        }
      } catch (err) {
        reject(err);
      }
    });
  }
  getRoomsbyQuery(query) {
    return new Promise(async (resolve, reject) => {
      try {
        const allrooms = await this.getAllRooms();
        if (allrooms) {
          const rooms = allrooms.filter((room) => {
            const filterValidator = collectedFilter(query, room);
            return Object.keys(filterValidator).every((key) => {
              return filterValidator[key](query[key]);
            });
          });
          //resolve(rooms);
          resolve(rooms);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}
function collectedFilter(query, room) {
  let filterCollected = {};

  if (query.town) {
    filterCollected = {
      ...filterCollected,
      town: (town) => {
        return room.town === town;
      },
    };
  }
  if (query.capacity) {
    filterCollected = {
      ...filterCollected,
      capacity: (capacity) => room.capacity === capacity,
    };
  }
  if (query.minPrice) {
    filterCollected = {
      ...filterCollected,
      minPrice: (minPrice) => room.price >= minPrice,
    };
  }
  if (query.maxPrice) {
    filterCollected = {
      ...filterCollected,
      maxPrice: (maxPrice) => room.price <= maxPrice,
    };
  }
  if (query.in_date) {
    filterCollected = {
      ...filterCollected,
      in_date: (in_date) => new Date(room.in_date) >= new Date(in_date),
    };
  }
  if (query.out_date) {
    filterCollected = {
      ...filterCollected,
      out_date: (out_date) => new Date(room.in_date) <= new Date(out_date),
    };
  }
  return filterCollected;
}

export default new RoomService();
