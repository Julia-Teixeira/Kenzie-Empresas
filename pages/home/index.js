import { getSectors, getCompanies } from "../../script/getsAPI.js";

const setores = await getSectors()
const select = document.querySelector("#sectors");

const selectSetors = () => {

  setores.map(({uuid ,description}) => {
    const option = document.createElement('option');
    option.value = uuid;
    option.innerText = description;

    select.insertAdjacentElement('beforeend', option)
  })
}
selectSetors()

const companies = await getCompanies();
const ul_companies = document.querySelector('.empresas');

const renderCardCompanies = (e) => {

      ul_companies.insertAdjacentHTML('beforeend', 
      `
      <li class="card_empresa" id="${e.uuid}">
      <h2 class="font-bold">${e.name}</h2>
      <div>
        <p class="font-regular">${e.opening_hours}</p>
        <span id="${e.sectors.uuid}">${e.sectors.description}</span>
      </div>
      </li>
      `)
}
companies.map(e => renderCardCompanies(e) )


const searchSector = () => {
  select.addEventListener('change', () => {
    if (select.value != "all") {
      const companiesFiltered = companies.filter(e => select.value == e.sectors.uuid )
      ul_companies.innerText = '';
      companiesFiltered.map(e => renderCardCompanies(e))
    } else {
      ul_companies.innerText = '';
      companies.map(e => renderCardCompanies(e) )
    }
  })
}
searchSector()

const btnLogin = document.querySelector('#lgn');
const btnCadastro = document.querySelector('#cdtro');

btnLogin.addEventListener('click', () =>{
  window.location.href = 'pages/login/index.html'
})

btnCadastro.addEventListener('click', () =>{
  window.location.href = 'pages/cadastro/index.html'
})