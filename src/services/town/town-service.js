import axios from "axios";
import { BASE_URL } from "../constantes";
class TownService {
  getAllTowns() {
    return new Promise((resolve, reject) => {
      axios
        .get(BASE_URL + "towns")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
export default new TownService();
