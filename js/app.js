window.addEventListener('DOMContentLoaded', () => {
   "use strict"
      // burger
   const burgerBtn = document.querySelector('.header__burger')
   const navContent = document.querySelector('.header__items')
   const navContentActive = document.querySelector('.header__items-active')
   const header = document.querySelector('header')

   burgerBtn.addEventListener('click', () => {
      navContent.classList.toggle('header__items-active')
      if(navContent.classList.contains('header__items-active')){
         document.querySelector("body").style.overflow = 'hidden'
      } else{
         document.querySelector("body").style.overflow = ''
      }   
   })
   window.addEventListener("scroll", () => {        
      if(window.pageYOffset >= header.scrollHeight){
         document.querySelector('.header').classList.add('slice');            
      } else {
         document.querySelector('.header').classList.remove('slice'); 
      }
   })

   const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
      const header = document.querySelector(headerSelector)
      const tab = document.querySelectorAll(tabSelector)
      const content = document.querySelectorAll(contentSelector)
      
      function hideTabContent(){
         content.forEach( item => {
            item.style.display = 'none'
         })
         tab.forEach(item =>{
            item.classList.remove(activeClass)
         })
      }
      function showTabContent(i = 0){
         content[i].style.display = 'block'
         tab[i].classList.add(activeClass)
      }
      hideTabContent()
      showTabContent()
      header.addEventListener('click', (e) => {
         const target = e.target
         if(target && (target.classList.contains(tabSelector.replace(/\./, "")) ||
         target.parentNode.classList.contains(tabSelector.replace(/\./, "")))){
            tab.forEach((item, i) => {
               if(target == item || target.parentNode == item){
                  hideTabContent()
                  showTabContent(i)
               }
            })
         }
      })
   }

   tabs('.resume__btns', '.resume__btn', '.resume__btns-content', 'btn-active')

   function modal(){
      function bindmodal(triggerSelector, modalSelector, closeSelector){
         const trigger = document.querySelector('.contactme__btn')
         const modal = document.querySelector(modalSelector)
         const close = document.querySelector(closeSelector)
         trigger.addEventListener('click', (e) => {
            e.preventDefault()
            console.log('sdsd')
         })
         trigger.addEventListener('click', (e) => {
            e.preventDefault()
            modal.style.display = 'block'
            document.body.style.overflow = "hidden";
         })
         close.addEventListener('click', () => {
            modal.style.display = 'none'
            document.body.style.overflow = ''
         })     
         modal.addEventListener('click', (e) => {
            if(e.target === modal){
               modal.style.display = 'none'
               document.body.style.overflow = ''
            }
         }) 
      }
      bindmodal('.contact__btn', '.modal', '.modal__close')
   }
   modal()

   function filter(menuSelector, itemsSelector, contentsSelector, activeClass){
      const menu = document.querySelector(menuSelector)
      const items = document.querySelectorAll(itemsSelector)
      const contents = document.querySelectorAll(contentsSelector)
      const web = document.querySelectorAll('.web__content')
      const designe = document.querySelectorAll('.designe__content')
      const branding = document.querySelectorAll('.branding__content')

      menu.addEventListener('click', (e) => {
         let target = e.target
         if(target && target.tagName == "BUTTON"){
            items.forEach(btn => btn.classList.remove(activeClass))
            target.classList.add(activeClass)            
         }
         contents.forEach(content => {
            content.style.display = 'none'
            if(target.classList.contains('all')){
               content.style.display = 'flex'
            } else if(target.classList.contains('web')){               
               web.forEach(Item => {
                  Item.style.display = 'flex'
               })
            } else if(target.classList.contains('designe')){               
               designe.forEach(Item => {
                  Item.style.display = 'flex'
               })
            } else if(target.classList.contains('branding')){               
               branding.forEach(Item => {
                  Item.style.display = 'flex'
               })
            }     
         })
      })
   }
   filter('.portfolio__btns', '.portfolio__btn','.portfolio__item', 'portfolio__btn-active')

   const sliders = (slides, dir, prev, next) => {
      let slideIndex = 1
      const items = document.querySelectorAll(slides)
      const prevBtn = document.querySelector(prev)
      const nextBtn = document.querySelector(next)

      function showSlides(n){
         if(n > items.length){
            slideIndex = 1
         } 
         if(n < 1){
            slideIndex = items.length
         }
         items.forEach(item => {
            item.style.display = 'none'
         }) 
         if(document.documentElement.clientWidth < 992){
            items[slideIndex - 1].style.display = 'block'
         } else{
            items[slideIndex - 1].style.display = 'block'
            if(slideIndex == items.length){
               items[slideIndex -2].style.display = 'block'
            } else{
               items[slideIndex].style.display = 'block'
            } 
         }        
         
      }
      showSlides(slideIndex)

      function plusSlides(n){
         showSlides(slideIndex += n)
      }
      try{
         const prevBtn = document.querySelector(prev)
         const nextBtn = document.querySelector(next)
         prevBtn.addEventListener('click', () => {
            plusSlides(-1)
         })
         nextBtn.addEventListener('click', () => {
            plusSlides(1)
         })
      } catch(e){}

   }
   sliders('.testimonial__inner-item', '','.left', '.right')

   // form
   const forms = () => {
      const form = document.querySelectorAll('form')
      const inputs = document.querySelectorAll('input')
      const phoneInputs = document.querySelectorAll('.contact__subject')

      phoneInputs.forEach(item => {
         item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, "")
         })
      })
      const message = {
         loading: 'Loading',
         succes: 'Thannk you! We will ',
         failure: 'Something is wrong'         
      }

      const postData = async (url, data) => {
         document.querySelector('.status').textContent = message.loading
         let res = await fetch(url, {
            method: "POST",
            body: data
         })
         return await res.json()
      }
      const clearInputs = () => {
         inputs.forEach(input => {
            input.value = ""
         })
      } 
      form.forEach(item => {
            item.addEventListener('submit', (e) => {
               e.preventDefault()
               let statusMessage = document.createElement('div')
               statusMessage.classList.add('status')
               item.appendChild(statusMessage)

               const formData = new FormData(item)

               postData('server.php', formData)
               .then(res => {
                  console.log(res)
                  statusMessage.textContent = message.succes
               })
               .catch(() => statusMessage.textContent = message.failure)
               .finally(() => {
                  clearInputs()
                  setTimeout(() => {
                     statusMessage.remove()
                  }, 5000)
               })
           })
      })
   }
   forms()
})
