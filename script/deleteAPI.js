import { baseURL } from "./getsAPI.js";
import { toast } from "./toast.js";

export const deleteDepartament = async (token ,id) => {

  const response = await fetch(`${baseURL}departments/${id}`, {
     method: "DELETE",
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     }
   })
   if (response.ok){
     toast('sucess', 'Departamento deletado com sucesso!')
   } else {
     toast('error', 'A exclusão não feita, verifique seus dados!')
   }
 }

 export const excluiUser = async (token , id) => {

  const response = await fetch(`${baseURL}admin/delete_user/${id}`, {
     method: "DELETE",
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     }
   })
   if (response.ok){
     toast('sucess', 'Exclusão feita com sucesso!')
   } else {
     toast('error', 'Exclusão não feita, verifique seus dados!')
   }
}