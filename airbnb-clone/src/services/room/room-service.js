import axios from "axios";
import { API_URL } from "../constantes";
class RoomService{


    createNewRoom(roomData){
        return new Promise((resolve, reject) => {
            axios.post(API_URL+'rooms',roomData).then((res)=>{
                resolve(res.data)
            })
            .catch((err)=>{
                reject(err);
            })
        })

    }
    
    getAllRooms(){
         return new Promise((resolve, reject) => {
            axios.get(API_URL+"rooms").then((response)=>{
                resolve(response.data);
            })
            .catch(err=>{
                reject(err);
            })    
        });   
        
    }
    getSingleRoom(id){
        return new Promise((resolve, reject) => {
           axios.get(API_URL+`room/${id}`).then((response)=>{
               resolve(response.data);
           })
           .catch(err=>{
               reject(err);
           })    
       });   
       
   }
   deleteSingleRoom(id){
    return new Promise((resolve, reject) => {
       axios.delete(API_URL+`room/${id}`).then((response)=>{
           resolve(response.data);
       })
       .catch(err=>{
           reject(err);
       })    
   });   
   
}
UpdateSingleRoom(id,roomData){
    return new Promise((resolve, reject) => {
       axios.put(API_URL+`room/${id}`,roomData).then((response)=>{
           resolve(response.data);
       })
       .catch(err=>{
           reject(err);
       })    
   });   
   
}
async getSingleRoomByQuery(name,password){
    return new Promise(async (resolve, reject) => {
       try{const allroom= await this.getAllrooms();
       if(allroom){
          const room = allroom.find(room=>room.username===name && room.password===password);
          if(room){
              resolve(room)
          }
          else{
              reject('Locateur introuvable')
          }
       }
       else{
           reject('Aucun Locateur')
       } }
      catch(err){
          reject(err);
      }       
   });   
   
}

}
export default new RoomService();