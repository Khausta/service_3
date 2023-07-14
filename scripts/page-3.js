
let selector = document.querySelector('.service-center__select');
let currentCity = null ;
let cityList = document.querySelector('.service-center__city-list');

document.addEventListener('DOMContentLoaded', () => {

  //city choice 
  function  handleOverLay(event) {
    if (event.target.classList.contains('service-center__list-item') || event.target === selector) return;
    close();
  } 

  function open () {
    selector.classList.add('service-center__select_active');
    cityList.classList.add('_city-list_active');
    document.addEventListener('click', handleOverLay);
  }

  function close() {
    selector.classList.remove('service-center__select_active');
    cityList.classList.remove('_city-list_active');
    document.removeEventListener('click', handleOverLay);
  }

  if(localStorage['city']) {
    selector.textContent = localStorage.getItem('city');
  }

  selector.addEventListener('click', () => {
    selector.classList.contains('service-center__select_active') ? close() : open();
  })

  document.querySelectorAll('.service-center__list-item').forEach( e => {
    const city = e;
    e.addEventListener('click', () => {
      selector.textContent = city.dataset.city;
      currentCity = city.dataset.city;
      localStorage.setItem('city', city.dataset.city);
      selector.classList.remove('service-center__select_active');
      cityList.classList.remove('_city-list_active');
    })
  })

      //city choice for mobile

  class CitySelection {
    constructor(selector, list, closeBtn, listItems) {
      this.selector = selector;
      this.list = list;
      this.listItems = listItems;
      this.closeBtn = closeBtn;
      this.currentCityMob = currentCity;
     
      if(localStorage['city']) {
        this.selector.textContent = localStorage.getItem('city');
      }
    }

    open() {
      this.list.classList.add('_openedList');
    }

    close() {
      this.list.classList.remove('_openedList');
    }

    listenSelector() {
      this.selector.addEventListener('click', () => {
      this.open();
      this.listenCloseBtn();
      this.listenItems();
      })
    }

    listenCloseBtn() {
      this.closeBtn.addEventListener('click', () => {
        this.close();
      })
    }

    listenItems() {
      this.listItems.forEach( elem => {
        let city = elem;
        elem.addEventListener('click', () => {
          this.selector.textContent = city.dataset.city;
          currentCity = city.dataset.city;
          localStorage.setItem('city', city.dataset.city);
          this.close();
        })
      })
    }
  }


  let selectorMob = document.querySelector('.__js-mob__select');
  let cityListMob = document.querySelector('.__js-mob__city-list');
  let closeBtnMob = document.querySelector('.__js-mob__city-list__close');
  let cityListItemsMob = document.querySelectorAll('.__js-mob__city-list__item');

  new CitySelection(selectorMob, cityListMob, closeBtnMob, cityListItemsMob ).listenSelector();

    //menu scroll effects
    let header = document.querySelector('.header');

    let headerBlockHeight = +window.getComputedStyle(header, null).height.replace('px', '');

    window.addEventListener('scroll', () => {
      getStickyHeader(header, headerBlockHeight);
    })

    function getStickyHeader(elem, triggerHeight) {
      if (window.scrollY >= triggerHeight) {
        elem.classList.add('header__sticky_js');
      } else {
        elem.classList.remove('header__sticky_js');
      
      }  
    }

  //hide menu on scroll

  function hideUnhideMenuOnScroll() {
    const serviceCenter = document.querySelector('.service-center');
    let scrollPosition = document.documentElement.scrollTop;
  

    window.onscroll = function() {
      let currentScrollPosition = document.documentElement.scrollTop;

      if (scrollPosition < currentScrollPosition && scrollPosition > serviceCenter.clientHeight) {
          header.classList.add('header__hide_js');
      } else {
        header.classList.remove('header__hide_js');
      }

      scrollPosition = currentScrollPosition;
      }
    }

    hideUnhideMenuOnScroll();


     //open moile menu
     function openMobileMenu() {
      let mobMenu = document.querySelector('.header__mobile-list');
      let openBtn = document.querySelector('.header__menu-burger');
      let closeBtn = document.querySelector('.header__mobile-list__close');
      let menuItems = document.querySelectorAll('.header__mobile-list__menu-item');
      openBtn.addEventListener('click', () => {
        mobMenu.classList.add('_active');
      });
      closeBtn.addEventListener('click', () => {
        mobMenu.classList.remove('_active');
      });
  
        menuItems.forEach( item  => {
          
          item.addEventListener('click', () => {
            mobMenu.classList.remove('_active');
          })
        })
      }
  
      openMobileMenu();

  //faq 
  document.querySelectorAll('.faq__question').forEach( item => {
    item.addEventListener('click', () => {
      
      const arrow = item;
      const content = item.nextElementSibling;

      if (content.style.maxHeight) {
        document.querySelectorAll('.faq__text').forEach( item => {
          item.style.maxHeight = null;
          item.style.opacity = null;
          }) 
        document.querySelectorAll('.faq__question').forEach(item => {
          item.classList.remove('_active');
        })
      } else {
        document.querySelectorAll('.faq__text').forEach( item => {
          item.style.maxHeight = null;
          item.style.opacity = null;  
        })
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = 1;
        
        document.querySelectorAll('.faq__question').forEach(item => {
          item.classList.remove('_active');
        })
        arrow.classList.add('_active');
      }
    })
  })


   //validation and sending form
  class ValidationForm {
    constructor (form) {
      this.form = form;
      this.inputWrappers = this.form.querySelectorAll('div');
      this.button = this.form.querySelector('button');
      this.inputs = this.form.querySelectorAll('.__js__input');
      this.modalThanks = document.querySelector('.modal-thanks');
      this.inputs.forEach(element => {
        if (element.name == 'name') {
          this.name = element
        } else if (element.name ==  'tel') {
          this.tel = element
        } else if (element.name == 'email') {
          this.email = element
        } else if (element.name == 'message') {
          this.message = element
        }
      })
            
      // console.log(this.form, this.button, this.name, this.tel, this.email, this.message); checked
  
    }

    initForm() {

      const phoneOptions = {
          mask: '+{7} (000) 000-00-00',
      };

      new IMask(this.tel, phoneOptions);
     
      this.inputWrappers.forEach(wrapper => {
        const input = wrapper.querySelector('input');
        const errText = wrapper.querySelector('p');
        input.addEventListener('input', (event) => this.handleInputChanges(event, input, errText));
        input.addEventListener('blur', (event) => this.handleInputBlur(event, input, errText));
      })


      this.button.addEventListener('click', (event)=> {
        event.preventDefault();
        let isValide = this.form.checkValidity();
        if (isValide) this.sendForm(event);
    })


    }

    setBtnDisabled() {
      this.button.disabled = true;
      this.button.classList.add('_disabled');
    }

    setBtnActive() {
        this.button.disabled = false;
        this.button.classList.remove('_disabled');
    }

    handleInputChanges = (event, input, errText) => {
        (this.form.checkValidity()) ? this.setBtnActive() : this.setBtnDisabled();

        if (input.validity.valid && errText.classList.contains('_unhide')) {
          errText.classList.remove('_unhide');
        }
          
    }

    handleInputBlur = (event, input, errText) => {
      if(!input.validity.valid) {
        errText.classList.add('_unhide');
      }
    }

    sendForm(event) {
      let formData = new FormData(this.form);

      for (let pair of formData.entries()) {
          console.log(pair);
      }

      fetch('https://www.yamaguchi.ru/', {
          method: 'POST',
          body: formData,
          headers: {
              'Access-Control-Allow-Origin': "*"
          }
      })
      .then(res=> {
          alert(res);
          this.showModal();
          this.form.reset();
      })
      .catch(err=>{
          console.log(err);
      })
    }

    hideModal() {
      this.modalThanks.addEventListener('click', (e) =>  {
        if(e.target === e.currentTarget || e.target.classList.contains('modal-thanks__close')) {
          this.modalThanks.classList.remove('modal-thanks__active');
        }
      });
    }

    showModal() {
      this.modalThanks.classList.add('modal-thanks__active');
      this.hideModal();
    }

  }

  new ValidationForm(document.querySelector('.contacts__form')).initForm();
  new ValidationForm(document.querySelector('.service-center__form')).initForm();


})

