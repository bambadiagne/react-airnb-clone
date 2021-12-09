import axios from "axios";
import { API_URL } from "../constantes";
class LandLordService {
  getAllLandLords() {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + "landlords")
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getSingleLandLord(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + `landlord/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  deleteSingleLandLord(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(API_URL + `landlord/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  UpdateSingleLandLord(id, landlordData) {
    return new Promise((resolve, reject) => {
      axios
        .put(API_URL + `landlord/${id}`, landlordData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async getSingleLandLordByNameAndPassword(name, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const allLandLord = await this.getAllLandLords();
        if (allLandLord) {
          const landlord = allLandLord.find(
            (landlord) =>
              landlord.username === name && landlord.password === password
          );
          if (landlord) {
            resolve(landlord);
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
}
export default new LandLordService();
