import axios from "axios";
import { API_URL } from "../constantes";
class TenantService{
    getAllTenants(){
         return new Promise((resolve, reject) => {
            axios.get(API_URL+"tenants").then((response)=>{
                resolve(response.data);
            })
            .catch(err=>{
                reject(err);
            })    
        });   
        
    }
    getSingleTenant(id){
        return new Promise((resolve, reject) => {
           axios.get(API_URL+`tenant/${id}`).then((response)=>{
               resolve(response.data);
           })
           .catch(err=>{
               reject(err);
           })    
       });   
       
   }
   deleteSingleTenant(id){
    return new Promise((resolve, reject) => {
       axios.delete(API_URL+`tenant/${id}`).then((response)=>{
           resolve(response.data);
       })
       .catch(err=>{
           reject(err);
       })    
   });   
   
}
UpdateSingleTenant(id,tenantData){
    return new Promise((resolve, reject) => {
       axios.put(API_URL+`tenant/${id}`,tenantData).then((response)=>{
           resolve(response.data);
       })
       .catch(err=>{
           reject(err);
       })    
   });   
   
}
async getSingleTenantByNameAndPassword(name,password){
    return new Promise(async (resolve, reject) => {
       try{const allTenants= await this.getAllTenants();
       if(allTenants){
          const tenant = allTenants.find(tenant=>tenant.username===name && tenant.password===password);
          if(tenant){
              resolve(tenant)
          }
          else{
              reject('Locataire introuvable')
          }
       }
       else{
           reject('Aucun Locataire')
       } }
      catch(err){
          reject(err);
      }       
   });   
   
}

}
export default new TenantService();