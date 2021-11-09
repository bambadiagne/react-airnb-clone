import axios from "axios";
import { API_URL } from "../constantes";
class TownService {
    getAllTowns() {
        return new Promise((resolve, reject) => {
            axios.get(API_URL + "towns").then((res) => {
                resolve(res)
            })
                .catch(err => {
                    reject(err)
                })
        });

    }


}
