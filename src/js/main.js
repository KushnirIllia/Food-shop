window.addEventListener('DOMContentLoaded', () => {
  // Tabs 
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items')

  // console.dir(tabsParent)

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none'
    })
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active')
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block'
    tabs[i].classList.add('tabheader__item_active')
  }

  hideTabContent()
  showTabContent()

  tabsParent.addEventListener('click', (event) => {
    const target = event.target
    // console.log(target)
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent()
          showTabContent(i)
        }
      })
    }
  })

  // Timer

  function getTime(endtime) {
    const i = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(i / (1000 * 60 * 60 * 24)),
      hours = Math.floor((i / (1000 * 60 * 60) % 24)), // кількість мс /  на кількість мс в одній годині
      minutes = Math.floor((i / (1000 * 60) % 60)),
      seconds = Math.floor((i / 1000) % 60)
    return {
      'total': i,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }
  }

  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else {
      return num
    }
  }

  function setClock(selector, deadline) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timerInterval = setInterval(updateClock, 1000)
    updateClock()

    function updateClock() {
      const i = getTime(deadline)

      days.innerHTML = setZero(i.days)
      hours.innerHTML = setZero(i.hours)
      minutes.innerHTML = setZero(i.minutes)
      seconds.innerHTML = setZero(i.seconds)

      if (i.total <= 0) {
        clearInterval(timerInterval)
      }
    }
  }

  const deadline = '2021-07-22'
  setClock('.timer', deadline)

  //  Modal
  const openBtnsModal = document.querySelectorAll('[data-modal]'),
    closeBtnModal = document.querySelector('[data-close]'),
    modal = document.querySelector('.modal')

  function closeModal() {
    modal.style.display = 'none'
    document.body.style.overflow = ''
  }

  function openModal() {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    clearInterval(modalTimerId)
  }

  openBtnsModal.forEach(btn => {
    btn.addEventListener('click', openModal)
  })

  closeBtnModal.addEventListener('click', closeModal)

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      closeModal()
    }
  })

  // const modalTimerId = setTimeout(openModal, 5000)

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal()
      window.removeEventListener('scroll', showModalByScroll)
    }
  }

  window.addEventListener('scroll', showModalByScroll)


  // use classes for carts
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.price = price
      this.parent = document.querySelector(parentSelector)
      this.transfer = 27
      this.changeToUAH()
    }

    changeToUAH() {
      this.price = this.price * this.transfer
    }

    render() {
      const el = document.createElement('div')

      el.innerHTML = `
        <div class="menu__item">
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
        </div>
      `
      this.parent.append(el)
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню \"Фитнес\"",
    "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и\n фруктов. Продукт активных" +
    " и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким\n" +
    "качеством!", 9, '.menu .container').render()
})