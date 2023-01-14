
export const toast = (tipo, message) =>{
  const main = document.querySelector('main')
  const divToast = document.createElement('div');
  
  if(tipo == 'sucess') {
    divToast.classList = 'toast sucess';
  } else {
    divToast.classList = 'toast error';
  }

  const pMessage = document.createElement('p');
  pMessage.classList = 'font-bold';
  pMessage.innerText = message;

  divToast.append(pMessage)
  main.insertAdjacentElement('beforeend', divToast)

  setTimeout(() => {
    divToast.remove();
  }, 2000)
}