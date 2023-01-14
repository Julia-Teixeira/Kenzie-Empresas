const menu = document.querySelector('.menu')
const menuImg = document.querySelector('#menuHamburguer');
const menu_hamburguer = document.querySelector('.menu_hamburguer');
let screenWidth = 0

function btnMenu () {
  menu.addEventListener('click', () => {
    if(menu_hamburguer.style.display != 'flex'){
      menu_hamburguer.style.display = 'flex'
      menuImg.src = "../../img/close.png";
    } else {
      menu_hamburguer.style.display = 'none'
      menuImg.src = "../../img/menu-hamburguer.svg";
    }
  })
}

window.addEventListener('resize', function(){
	screenWidth = window.screen.width

  if(screenWidth < 413){
    menuImg.style.display = 'block'
    menu_hamburguer.style.display = 'none'

    btnMenu()

  } else {
    menu_hamburguer.style.display = 'flex'
    menuImg.style.display = 'none'
  }

});