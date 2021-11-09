import axios from "axios";
import { API_URL } from "../constantes";
import TenantService from "../tenant/tenant-service";
import LandLordService from "../landlord/landlord-service";
class AuthService {
  login(username, profile, password) {

    return new Promise((resolve, reject) => {
      if (profile === 'locataire') {
        TenantService.getSingleTenantByNameAndPassword(username, password).then(res => {

          localStorage.setItem("user", JSON.stringify({ username, profile, id: res.id }))
          resolve(res)
        })
          .catch((err) => { reject(err) })


      } else {

        LandLordService.getSingleLandLordByNameAndPassword(username, password).then(res => {

          localStorage.setItem("user", JSON.stringify({ username, profile, id: res.id }))
          resolve(res)
        })
          .catch((err) => { reject(err) })


      }
    }
    );
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("isLogged");
  }

  async register(signupData) {
    console.log('ok');

    return new Promise(async (resolve, reject) => {
      if (signupData.profile === 'locataire') {

        await axios.post(API_URL + "tenants", signupData)
          .then((res) => {
            console.log('NICE');

            resolve(res)
          }
          )
          .catch(err => reject(err))
      }
      else if (signupData.profile === 'locateur') {
        console.log("sldjTAIRE");
        await axios.post(API_URL + "landlords", signupData).then((res) => resolve(res)
        )
          .catch(err => reject(err))
      }
    })
  }
}

export default new AuthService();
