import { createUser } from "../../script/postAPI.js";
import { redirecionar } from "../../script/redirecionar.js";
const formCadastro = document.querySelector('form');
const btnCadastrar = document.querySelector('#btnCadastrar');
const elements = [...formCadastro.elements]

btnCadastrar.addEventListener('click', async () => {

  const data = {}
  
  elements.map(element => {
    if (element.tagName == "INPUT" && element.value !== "") {
      data[element.id] = element.value
    } else if(element.tagName == "SELECT") {
      if(element.value != "null"){
        data[element.id] = element.value
      }
      element.value = 'null'
    }
  })
  const response = await createUser(data)
  if(response.ok){
    redirecionar('Redirecionando');
    setTimeout(()=>{
      window.location.replace('../login/index.html')
    }, 2000);
  }

})

const btnLogin = document.querySelector('#lgn');
const btnCadastro = document.querySelector('#cdtro');
const btnRetornar = document.querySelector('#btnRetornar');

btnCadastro.addEventListener('click', () => {

  redirecionar('Redirecionando');
  setTimeout(()=>{
    window.location.replace('../cadastro/index.html')
  }, 2000);
})

btnRetornar.addEventListener('click', () => {
  redirecionar('Redirecionando');
  setTimeout(()=>{
    window.location.replace('../../index.html')
  }, 2000);
})

btnLogin.addEventListener('click', () => {
  redirecionar('Redirecionando');
  setTimeout(()=>{
    window.location.replace('../login/index.html')
  }, 2000);
})
