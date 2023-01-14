import { login } from "../../script/postAPI.js";
import { verifyUser } from "../../script/getsAPI.js";
import { redirecionar } from "../../script/redirecionar.js";

const formLogin = document.querySelector('form');
const btnLogin = document.querySelector('#btnLogin');
const elements = [...formLogin.elements]
let tokenUser


const entrar = async () => {
  const data = {}
  btnLogin.addEventListener('click', async (event) => {
    event.preventDefault()
      
    elements.forEach( elem => {
      if (elem.tagName == 'INPUT' && elem.value != '') {
        data[elem.id] = elem.value
      }
    })

    if(Object.keys(data).length !== 0){
      tokenUser = await login(data);
    }
    
    if(tokenUser != undefined){
      localStorage.setItem('Token', JSON.stringify(tokenUser))
      const is_admin = await verifyUser(tokenUser)
    
      if (is_admin == true) {
        redirecionar('Bem vindo')
        setTimeout(()=>{
          window.location.replace('../admin/index.html')
        }, 2000);
      } else {
        redirecionar('Bem vindo')
        setTimeout(()=>{
          window.location.replace('../user/index.html')
        }, 2000);
      }
    }

  })
}

entrar();

const btnCadastrar = document.querySelector('#cdtro');
const btCadastrar = document.querySelector('#btnCadastrar');
const btnLog = document.querySelector('#lgn');

btnCadastrar.addEventListener('click', () => {

  redirecionar('Redirecionando');
  setTimeout(()=>{
    window.location.replace('../cadastro/index.html')
  }, 2000);
})
btCadastrar.addEventListener('click', () => {
  redirecionar('Redirecionando');
  setTimeout(()=>{
    window.location.replace('../cadastro/index.html')
  }, 2000);
})

btnLog.addEventListener('click', () => {
  redirecionar('Redirecionando');
  setTimeout(()=>{
    window.location.replace('../login/index.html')
  }, 2000);
})