import axios from "axios";
import { API_URL } from "../constantes";
class ReservationService {
  getAllReservationsByTenant(tenant_id) {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + `reservationsByTenant/${tenant_id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getAllReservationsByLandlord(landlord_id) {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + `reservationsByLandlord/${landlord_id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getSingleReservation(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + `reservation/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getSingleReservationByRoom(roomPropriety) {
    const foundReservations=[];
     
    this.getAllReservationsByLandlord(roomPropriety.userId).then((res)=>{
      res.forEach(reservation => {
        if(roomPropriety.roomId===reservation.room){
          console.log(reservation);  
          foundReservations.push(reservation);
        }       
      });;

    })
    return foundReservations;
  }
  
  deleteSingleReservation(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(API_URL + `reservation/${id}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  UpdateSingleReservation(id, ReservationData) {
    return new Promise((resolve, reject) => {
      axios
        .put(API_URL + `reservation/${id}`, ReservationData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
export default new ReservationService();
