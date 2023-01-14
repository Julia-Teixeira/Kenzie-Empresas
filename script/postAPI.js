import { baseURL } from "./getsAPI.js";
import { toast } from "./toast.js";

export const createUser = async (data) => {
  const email = document.querySelector('#email')
  const request = await fetch(`${baseURL}auth/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(data)
  })
  const response = await request.json()
  if(request.ok){
    email.style.border = "none"
    toast('sucess', 'Criação de usuário foi bem sucedida!');
    return request
  } else if(response.error == "email alread exists!") { 
    toast('error', "Email jé está sendo usasdo, por favor, insira outro");
    email.style.border = "1px solid red"
    email.innerHTML = ''
    email.focus()
  }
}

export const login = async (data) => {
  const password = document.querySelector('#password')
  try {
    const request = await fetch(`${baseURL}auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(data)
    })
    const response = await request.json()
  
    if(request.ok){
      toast('sucess', 'Você será redirecionado em alguns segundos!')
      password.style.border = "none"
      return response.token
    } else if(response.error == 'password invalid!'){ 
      password.style.border = "1px solid red"
      password.innerHTML = ''
      password.focus()
    }
  } catch (error) {
    toast('error', 'Erro no servidor')
  }
  
}

export const createDepartamento = async (token, data) => {
  const request = await fetch(`${baseURL}departments`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }, 
    body: JSON.stringify(data)
  })

  const response = await request.json()
  if(!request.ok){
    toast('error', response.error)
  } else { 
    toast('sucess', 'Cadastro feito com sucesso!')
    return response.token
  }
}
