export const redirecionar = (msg) => {
  document.querySelector('main').insertAdjacentHTML('afterend', 
          `
            <section class="pg-loaging fadeIn">
            <div class="pg-img"></div>
            <h2 class="pg-h2 font-regular">${msg}...</h2>
            </section>
          `) 
        const pdLoading =  document.querySelector('.pg-loaging')
        setTimeout(()=>{
          pdLoading.classList.remove('fadeIn')
        }, 1500);
}