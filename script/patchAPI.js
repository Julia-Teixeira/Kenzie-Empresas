import { baseURL } from "./getsAPI.js";
import { toast } from "./toast.js";

export const editUser = async (token ,data) => {

 const response = await fetch(`${baseURL}users`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }, 
    body: JSON.stringify(data)
  })
  if (response.ok){
    toast('sucess', 'Alteração feita com sucesso!')
  } else {
    toast('error', 'Alteração não feita, verifique seus dados!')
  }
}


export const editDepartament = async (token ,id, data) => {

  const response = await fetch(`${baseURL}departments/${id}`, {
     method: "PATCH",
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     }, 
     body: JSON.stringify(data)
   })
   if (response.ok){
     toast('sucess', 'Alteração feita com sucesso!')
   } else {
     toast('error', 'Alteração não feita, verifique seus dados!')
   }
 }

 export const contratarFunc = async (token , data) => {

  const response = await fetch(`${baseURL}departments/hire/`, {
     method: "PATCH",
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     }, 
     body: JSON.stringify(data)
   })
   if (response.ok){
     toast('sucess', 'Contratação feita com sucesso!')
   } else {
     toast('error', 'Contratação não feita, verifique seus dados!')
   }
 }

 export const demitirFunc = async (token , id) => {

  const response = await fetch(`${baseURL}departments/dismiss/${id}`, {
     method: "PATCH",
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     }
   })
   if (response.ok){
     toast('sucess', 'Demissão feita com sucesso!')
   } else {
     toast('error', 'Demissão não feita, verifique seus dados!')
   }
 }

 export const editFunc = async (token ,id, data) => {

  const response = await fetch(`${baseURL}admin/update_user/${id}`, {
     method: "PATCH",
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     }, 
     body: JSON.stringify(data)
   })
   if (response.ok){
     toast('sucess', 'Alteração feita com sucesso!')
   } else {
     toast('error', 'Alteração não feita, verifique seus dados!')
   }
 }