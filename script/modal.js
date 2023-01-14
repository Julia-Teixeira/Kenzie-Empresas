const mainUser = document.querySelector('main');

export const openModal = () => {
  mainUser.insertAdjacentHTML('beforeend',
    `
  <section class="modal-container fadeIn">
    <div class="modal appear-Y" id="universal">
    <div id="close-modal-edit" class="close-modal"></div>

    </div>

  </section>
  `)
}

export const closeModal = () => {
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('#universal');
  modalContainer.addEventListener('click', (event) => {

    if (event.target.classList.value == "close-modal" || event.target.classList.value == "modal-container") {
      modal.classList.remove("appear-Y")
      modal.classList.add("desappearY")
      modalContainer.classList.remove("fadeIn")
      modalContainer.classList.add("fadeOut")
      setTimeout(() => {
        modalContainer.remove()
      }, 750)
     
    }
  })

}

export const openModalEdit = () => {
  const modal = document.querySelector('.modal');
  modal.insertAdjacentHTML('beforeend',
    `
  <div id="div-principal">
    <h2 class="font-bold font-Poppins">Editar Perfil</h2>
      <form class="form-modal">
        <input type="text" placeholder="Seu nome" id="username" >
        <input type="text" placeholder="Seu e-mail" id="email" >
        <input type="text" placeholder="Sua senha" id="password" >

        <button type="submit" class="btn-blue2 font-bold" id="btnEditar">Editar perfil</button>

      </form>
  </div>
  `)
}

export const modalCreateDepartament = () => {
  const modal = document.querySelector('.modal');
  modal.insertAdjacentHTML('beforeend',
    `
  <div id="div-principal">
    <h2 class="font-bold font-Poppins">Criar Departamento</h2>
      <form class="form-modal">
        <input type="text" placeholder="Nome do departamento" id="name" >
        <input type="text" placeholder="Descrição" id="description" >
        <select name="empresa" id="company_uuid" title="Seleciona Empresa">
        <option value="null">Selecionar Empresa</option>
      </select>

        <button type="submit" class="btn-blue2 font-bold" id="btnCriar">Criar o departamento</button>

      </form>
  </div>
  `)
}

export const modalEditDepartament = () => {
  const modal = document.querySelector('.modal');
  modal.insertAdjacentHTML('beforeend',
    `
  <div id="div-principal">
    <h2 class="font-bold font-Poppins">Editar Departamento</h2>
      <form class="form-modal">
        <textarea  placeholder="Descrição do departamento" id="description" class="font-regular font-Inter"> </textarea>

        <button type="submit" class="btn-blue2 font-bold " id="btnEditar">Editar o departamento</button>

      </form>
  </div>
  `)
}

export const modalDeleteDepartament = (name) => {
  const modal = document.querySelector('.modal');
  modal.insertAdjacentHTML('beforeend',
    `
  <div id="div-principal">
    <h3 class="font-bold font-Poppins">Realmente deseja deletar o Departamento ${name}<br> e demitir seus funcionários?</h3>
    <div class="divDelete">
      <button type="submit" class="btn-green font-bold " id="btnDelete">Confirmar</button>
    </div>
  </div>
  `)
}

export const modalViewDepartament = (dataDepartamento) => {

  mainUser.insertAdjacentHTML('beforeend',
    `
  <section class="modal-container">
    <div class="modal-delete appear-Y" id="universal">
      <div id="close-modal-edit" class="close-modal"></div>
      <div id="div-principal">
        <h2 class="font-bold font-Poppins">${dataDepartamento.name}</h2>
        <div class="div-left">
          <div class="div-titulos">
            <h3 class="font-bold">${dataDepartamento.description}</h3>
            <p class="font-regular">${dataDepartamento.companies.name}</p>
          </div>
          <div class="div-right">
            <select name="usuario" id="users" title="Seleciona Usuário">
              <option value="null">Selecionar usuário</option>
            </select>

            <button type="button" class="btn-green font-bold" id="btnContratar">Contratar</button>
          </div>
        </div>

        <div class="div-func">
          <ul id="ul-funcionários">
            
          </ul>
        </div>
      </div>
    </div>
  </section>
  `)
}

export const modalEditUser = () => {
  const modal = document.querySelector('.modal');
  modal.insertAdjacentHTML('beforeend',
    `
  <div id="div-principal">
    <h2 class="font-bold font-Poppins">Editar Usuário</h2>
      <form class="form-modal">
      <select name="usuario" id="kind_of_work" title="Seleciona Usuário">
        <option value="null">Selecionar modalidade de trabalho</option>
        <option value="home office">Home Office</option>
        <option value="presencial">Presencial</option>
        <option value="hibrido">Híbrido</option>
      </select>

      <select name="usuario" id="professional_level" title="Seleciona Usuário">
        <option value="null" >Selecionar nível profissional</option>
        <option value="estágio">Estágio</option>
        <option value="júnior">Júnior</option>
        <option value="pleno">Pleno</option>
        <option value="sênior">Sênior</option>
      </select>
     
        <button type="submit" class="btn-blue2 font-bold " id="btnEditarUser">Editar</button>

      </form>
  </div>
  `)
}

export const modalDeleteFunc = (name) => {
  const modal = document.querySelector('.modal');
  modal.insertAdjacentHTML('beforeend',
    `
  <div id="div-principal">
    <h3 class="font-bold font-Poppins">Realmente deseja remover o usuário ${name}?</h3>
    <div class="divDelete">
      <button type="submit" class="btn-green font-bold " id="btnDelete">Confirmar</button>
    </div>
  </div>
  `)
}