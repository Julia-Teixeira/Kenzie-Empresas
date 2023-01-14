import { getInfoUser, getCoWorkers, getCompanies, verifyUser } from "../../script/getsAPI.js";
import { openModal, closeModal, openModalEdit } from "../../script/modal.js";
import { editUser } from "../../script/patchAPI.js";
import { redirecionar } from "../../script/redirecionar.js";

const tokenUser = JSON.parse(localStorage.getItem('Token')) || null
const is_admin = await verifyUser(tokenUser)
const companies = await getCompanies()

const username = document.querySelector("#userName");
const email = document.querySelector("#e-mail");
const lvlProfissional = document.querySelector("#lvlProfissional");
const kindOfWork = document.querySelector("#kindOfWork");
const infoUserCom = document.querySelector(".infoUserCompanies")
const nContratado = document.querySelector('#nContratado');
const btnEdit = document.querySelector("#edit")

const infoUser = async () => {
  let dataUser = await getInfoUser(tokenUser)

  username.innerHTML = dataUser.username;
  email.innerHTML = dataUser.email

  if(dataUser.kind_of_work != null){
    kindOfWork.innerHTML = dataUser.kind_of_work;
  } else {
    kindOfWork.innerHTML = '';
  }

  if(dataUser.professional_level != null){
    lvlProfissional.innerHTML = dataUser.professional_level;
  } else {
    lvlProfissional.innerHTML = '';
  }
}

const cardCoworkers = (user) => {
  const ul_coworkers = document.querySelector("#ul_coworkers")
  ul_coworkers.insertAdjacentHTML('beforeend', 
  `
  <li>
    <h4 class="font-bold">${user.username}</h4>
    <p class="font-regular">${user.professional_level}</p>
  </li>
  `)

}

const infoUserCompanies = async () =>{
  let dataUser = await getInfoUser(tokenUser)
  const coworkers = await getCoWorkers(tokenUser)

  if(dataUser.department_uuid == null){
   
  } else {
    nContratado.style.display = 'none'
    infoUserCom.style.display = 'block'
    const companie = companies.filter(comp => comp.uuid == coworkers[0].company_uuid )
    let dataUser = await getInfoUser(tokenUser)
    
    const coWorkersUsers = [...coworkers[0].users]
    const workers = coWorkersUsers.filter((user) => user.uuid != dataUser.uuid)

    infoUserCom.insertAdjacentHTML('afterbegin', 
    `
    <div class="header-contratado">
          <h3 class="font-bold">${companie[0].name} - ${coworkers[0].name}</h3>
        </div>
        <div class="body-contratado">
          <ul id="ul_coworkers">
            
          </ul>
        </div>
    `)



    workers.map((user) => {cardCoworkers(user)})
  }
}

const btnEditUser = () => {
  btnEdit.addEventListener('click', async () => {
    openModal()
    openModalEdit()

    const btnEditar = document.querySelector("#btnEditar");
    const modalContainer = document.querySelector('.modal-container');

    btnEditar.addEventListener('click', async (event) => {
      const modal = document.querySelector('.modal');
      const data = {}
      const form = document.querySelector('form');
      const formElements = [...form.elements]
      event.preventDefault()
      formElements.forEach((e) => {
        if(e.tagName == 'INPUT' && e.value != ''){
          data[e.id] = e.value;
        }
      })

      await editUser(tokenUser,data)
      await infoUser()
      modal.classList.remove("appear-Y")
      modal.classList.add("desappearY")
      modalContainer.classList.remove("fadeIn")
      modalContainer.classList.add("fadeOut")
      setTimeout(() => {
        modalContainer.remove()
      }, 750)
    })

    closeModal()
  })
}

const btnLogout = () => {
  const btn = document.querySelector('#logout');
  btn.addEventListener('click', () => {
    redirecionar('Redirecionando');
    setTimeout(()=>{
      window.location.replace('../../index.html')
    }, 2000);
    localStorage.removeItem('Token')
  })
}



if(tokenUser == null){
  redirecionar('Redirecionando');
  setTimeout(()=>{
    window.location.replace('../../index.html')
  }, 2000);
} else if(is_admin == true){
  redirecionar('Redirecionando');
  setTimeout(()=>{
    window.location.replace('../admin/index.html')
  }, 2000);
}else{
  infoUser()
  infoUserCompanies()
  btnEditUser()
  btnLogout()
}