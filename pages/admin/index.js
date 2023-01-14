import { getAllUsers, getAllDepartament, getCompanies, getDepartament, verifyUser } from "../../script/getsAPI.js";
import { openModal, closeModal, modalCreateDepartament, modalEditDepartament, modalDeleteDepartament, modalViewDepartament, modalEditUser, modalDeleteFunc } from "../../script/modal.js";
import { createDepartamento } from "../../script/postAPI.js";
import { editDepartament, contratarFunc, demitirFunc, editFunc } from "../../script/patchAPI.js";
import { deleteDepartament, excluiUser } from "../../script/deleteAPI.js";
import { toast } from "../../script/toast.js";
import { redirecionar } from "../../script/redirecionar.js";

const token = JSON.parse(localStorage.getItem('Token')) || null;
const is_admin = await verifyUser(token)

const listDepartments = document.querySelector("#listDepartments");
const companiesSelect = document.querySelector('#empresa')
let dataAllDepartament = await getAllDepartament(token);
const companies = await getCompanies();

const cardUser = async () => {
  const dataAllUsers = await getAllUsers(token);
  const listUser = document.querySelector("#listUser");
  listUser.innerHTML = ''
  dataAllUsers.map(async (user) => {
    let companieName = 'Não contratado'
    if(user.department_uuid != null){
      const departamento = await dataAllDepartament.filter(departament => {
        if(departament.uuid == user.department_uuid){
          return departament
        }
      })
      const companie = await companies.filter(comp => comp.uuid == departamento[0].companies.uuid)
      companieName = companie[0].name
    }
    
   
      if(user.uuid != '4ffcff3f-704e-4f9a-8321-d1a6775034e3'){
      listUser.insertAdjacentHTML('afterbegin',
      `
      <li class="user card appear-X" id="${user.uuid}"> 
        <div class="infoUser">
          <h3 class="font-bold">${user.username}</h3>
          <p class="font-regular" id="nivel">${user.professional_level}</p>
          <p class="font-regular">${companieName}</p>
        </div>

        <div class="buttons">
          <img src="../../img/edit.svg" alt="" class="btnUserEdit">
          <img src="../../img/delete.png" alt="" class="btnUserDelete">
        </div>
      </li>
    `)
    }
  })
}
const selectCompanies = (select) => {

  companies.map((compania) => {
    const option = document.createElement('option');
    option.value = compania.uuid;
    option.innerText = compania.name;

    select.insertAdjacentElement('beforeend', option)
  })
}

const searchCompanies = () => {

  companiesSelect.addEventListener('change', async () => {
    if (companiesSelect.value != "null") {
      const companiesFiltered = companies.filter(e => companiesSelect.value == e.uuid)
      const departamentFiltered = await getDepartament(token, companiesFiltered[0].uuid)
      listDepartments.innerText = '';
      departamentFiltered.map(e => renderCardDepartament(e))
    } else {
      listDepartments.innerText = '';
      dataAllDepartament = await getAllDepartament(token);
      dataAllDepartament.map(e => renderCardDepartament(e))
    }
  })
}
const renderCardDepartament = async (departament) => {

  listDepartments.insertAdjacentHTML('beforeend',
    `
      <li class="departament card appear-X" id="${departament.uuid}"> 
      <div class="infoDepartament">
        <h3 class="font-bold">${departament.name}</h3>
        <p class="font-regular">${departament.description}</p>
        <p class="font-regular" id="${departament.companies.uuid}">${departament.companies.name}</p>
      </div>
    
      <div class="buttons">
        <img src="../../img/visibility.png" alt="" class="visualizar">
        <img src="../../img/edit-black.png" alt="" class="editar">
        <img src="../../img/delete.png" alt="" class="apagar">
      </div>
    </li>
    `)
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

const btnCriaDepartamento = async () => {

  const dataDepartament = {}
  const createDepartament = document.querySelector('#createDepartament');

  createDepartament.addEventListener('click', () => {
    openModal()
    const modalContainer = document.querySelector('.modal-container');
    modalCreateDepartament()

    const selectCompanie = document.querySelector('#company_uuid')
    selectCompanies(selectCompanie)

    const btnCriar = document.querySelector("#btnCriar");
    const name = document.querySelector("#name");
    const description = document.querySelector("#description");

    btnCriar.addEventListener('click', async (event) => {
      const modal = document.querySelector('.modal');
      event.preventDefault()

      if (name.value != "" && description.value != "" && selectCompanie.value != 'null') {
        dataDepartament[name.id] = name.value;
        dataDepartament[description.id] = description.value;
        dataDepartament[selectCompanie.id] = selectCompanie.value;

        await createDepartamento(token, dataDepartament)
               
        const dataAllDepartaments = await getAllDepartament(token);
        listDepartments.innerText = '';
        dataAllDepartaments.map(e => renderCardDepartament(e))

        modal.classList.remove("appear-Y")
        modal.classList.add("desappearY")
        modalContainer.classList.remove("fadeIn")
        modalContainer.classList.add("fadeOut")
        setTimeout(() => {
          modalContainer.remove()
        }, 750)
      } else {
        toast('error', 'Ops, tem alguma informação faltando!')
      }
    })
    closeModal()
  })


}

const cardFuncionario = async (uuidDepartament, dataAllDepartament ) => {
  const ul_funcionários = document.querySelector("#ul-funcionários");
  ul_funcionários.innerText = ""

  const dataAllUsers = await getAllUsers(token);
  const usersDepar = await dataAllUsers.filter(user => user.department_uuid == uuidDepartament);

  const companie = await dataAllDepartament.filter(departament => {
    if(departament.uuid == uuidDepartament){
      return departament.companies.name
    }
  })

  
  usersDepar.map(user => {
    ul_funcionários.insertAdjacentHTML('afterbegin', 
    `
      <li class="user card appear-X" id="${user.uuid}"> 
        <div class="infoUser">
          <h3 class="font-bold">${user.username}</h3>
          <p class="font-regular" id="nivel">${user.professional_level}</p>
          <p class="font-regular">${companie[0].companies.name}</p>
        </div>
        <div class="divDesligar">
          <button type="button" class="font-bold btn-red" id="btnDesligar">Desligar</button>
        </div>
      </li>
    `)
  })
}

const selectUser = async () => {

  const selectUsers = document.querySelector("#users");
      const dataAllUsers = await getAllUsers(token);
      selectUsers.innerHTML = "";
      const usersOutofWork = await dataAllUsers.filter(user => user.department_uuid == null && user.uuid != '4ffcff3f-704e-4f9a-8321-d1a6775034e3')
      usersOutofWork.map((user) => {
        const option = document.createElement('option');
        option.value = user.uuid;
        option.innerText = user.username;
        selectUsers.insertAdjacentElement('beforeend', option)
      })   

}

const buttonsDepartament = async () => {
  const data = {}
  const btnEditarDepart = document.querySelector("#listDepartments")
  btnEditarDepart.addEventListener('click', async (event) => {
    
    if(event.target.classList.value == 'editar'){
      openModal()
      
      const modalContainer = document.querySelector('.modal-container');
      const modal = document.querySelector('.modal');
      const uuidDepartament = event.path[2].id
      modalEditDepartament()
      dataAllDepartament = await getAllDepartament(token);
      const departament = dataAllDepartament.filter(e => e.uuid == uuidDepartament);
      const description = document.querySelector("#description");
      description.innerText = departament[0].description;

      const btnEditar = document.querySelector("#btnEditar");
      btnEditar.addEventListener('click', async (event) => {
        event.preventDefault()

        data[description.id] = description.value;
        await editDepartament(token, uuidDepartament, data )

        const dataAllDepartaments = await getAllDepartament(token);
        listDepartments.innerText = '';
        dataAllDepartaments.map(e => renderCardDepartament(e))

        modal.classList.remove("appear-Y")
        modal.classList.add("desappearY")
        modalContainer.classList.remove("fadeIn")
        modalContainer.classList.add("fadeOut")
        setTimeout(() => {
          modalContainer.remove()
        }, 750)
      })

      closeModal()

    } else if(event.target.classList.value == 'apagar'){
      const uuidDepartament = event.path[2].id
      dataAllDepartament = await getAllDepartament(token);
      const departament = dataAllDepartament.filter(e => e.uuid == uuidDepartament);

      openModal()
      modalDeleteDepartament(departament[0].name)

      const btnDelete = document.querySelector("#btnDelete")
      btnDelete.addEventListener('click', async () => {
        const modalContainer = document.querySelector('.modal-container');
        const modal = document.querySelector('.modal');
        await deleteDepartament(token, uuidDepartament)

        const dataAllDepartaments = await getAllDepartament(token);
        listDepartments.innerText = '';
        dataAllDepartaments.map(e => renderCardDepartament(e))

        modal.classList.remove("appear-Y")
        modal.classList.add("desappearY")
        modalContainer.classList.remove("fadeIn")
        modalContainer.classList.add("fadeOut")
        setTimeout(() => {
          modalContainer.remove()
        }, 750)
      })
      closeModal()

      cardUser()

    } else if(event.target.classList.value == 'visualizar'){

      const uuidDepartament = event.path[2].id
      dataAllDepartament = await getAllDepartament(token);
      const departament = dataAllDepartament.filter(e => e.uuid == uuidDepartament);

      modalViewDepartament(departament[0])

      await cardFuncionario( uuidDepartament, dataAllDepartament)

      await selectUser()
      const selectUsers = document.querySelector("#users");
      const btnContratar = document.querySelector("#btnContratar");
      btnContratar.addEventListener('click',async (event) => {
        event.preventDefault()
        data['user_uuid'] = selectUsers.value
        data['department_uuid'] = uuidDepartament;
        await contratarFunc(token, data)

        await cardFuncionario( uuidDepartament, dataAllDepartament)
        await selectUser()
        await cardUser()
      })

      const ul_funcionários = document.querySelector("#ul-funcionários");
      ul_funcionários.addEventListener('click', async (event) => {
        if(event.target.id == 'btnDesligar'){
          let idUser = event.path[2].id;
          await demitirFunc(token, idUser)
          await cardFuncionario( uuidDepartament, dataAllDepartament)
          await selectUser()
          await cardUser()         
        }
      })
      
      

      closeModal()
    }
  })
}

const buttonsUser = async () => {
  const data = {}
  const listUser = document.querySelector("#listUser")
  listUser.addEventListener('click', async (event) => {
    if(event.target.classList.value == "btnUserEdit"){
      openModal()
      
      modalEditUser()
      const iduser = event.path[2].id;
      const btnEditarFunc = document.querySelector("#btnEditarUser");
      btnEditarFunc.addEventListener('click', async (event) => {
        const modalContainer = document.querySelector('.modal-container');
        const modal = document.querySelector('.modal');
        event.preventDefault()
        const selectWork = document.querySelector("#kind_of_work")
        const selectLevel = document.querySelector("#professional_level")

        if(selectWork.value != "null" && selectLevel.value != "null"){
          data["kind_of_work"] = selectWork.value
          data["professional_level"] = selectLevel.value
        } else if(selectWork.value == "null" && selectLevel.value != "null"){
          data["professional_level"] = selectLevel.value
        } else if(selectLevel.value == "null" && selectWork.value != "null"){
          data["kind_of_work"] = selectWork.value
        }
        
        await editFunc(token, iduser, data)
        await cardUser()
        modal.classList.remove("appear-Y")
        modal.classList.add("desappearY")
        modalContainer.classList.remove("fadeIn")
        modalContainer.classList.add("fadeOut")
        setTimeout(() => {
          modalContainer.remove()
        }, 750)
      })
      closeModal()
    } else if(event.target.classList.value == "btnUserDelete") {
      const iduser = event.path[2].id;
      const dataAllUsers = await getAllUsers(token);
      const user = dataAllUsers.filter(u => u.uuid == iduser);

      openModal()
      modalDeleteFunc(user[0].username)

      const btnDeleteUser = document.querySelector("#btnDelete");
      const modalContainer = document.querySelector('.modal-container');
      btnDeleteUser.addEventListener('click', async (event) => {
        const modal = document.querySelector('.modal');
        event.preventDefault()
        await excluiUser(token, iduser)
        await cardUser()
        modal.classList.remove("appear-Y")
        modal.classList.add("desappearY")
        modalContainer.classList.remove("fadeIn")
        modalContainer.classList.add("fadeOut")
        setTimeout(() => {
          modalContainer.remove()
        }, 750)
      })
      
      closeModal()
    }
  })
}


if (token == null) {
  redirecionar('Redirecionando');
  setTimeout(()=>{
    window.location.replace('../../index.html')
  }, 2000);
} else if(is_admin == false){
  redirecionar('Redirecionando');
  setTimeout(()=>{
    window.location.replace('../user/index.html')
  }, 2000);
} else {
  await cardUser()
  selectCompanies(companiesSelect)
  dataAllDepartament.map(e => renderCardDepartament(e))
  searchCompanies()
  btnLogout()
  btnCriaDepartamento()
  buttonsDepartament()
  buttonsUser()
}